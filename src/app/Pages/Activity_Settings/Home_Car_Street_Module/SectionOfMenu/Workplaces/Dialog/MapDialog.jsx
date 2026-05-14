"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch, useSelector } from "react-redux";
import { addAreaThunk, getWorkplacesThunk } from "@/redux/slice/Setting/SettingSlice";

const MapContainer = dynamic(() => import("react-leaflet").then((m) => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), { ssr: false });

let L;
let markerIcon;

if (typeof window !== "undefined") {
  L = require("leaflet");
  markerIcon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    shadowSize: [41, 41],
  });
}

// Helper to reverse geocode coordinates
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
    );
    const data = await res.json();
    return {
      city: data.address?.city || data.address?.town || data.address?.village || "",
      state: data.address?.state || "",
      country: data.address?.country || "",
    };
  } catch {
    return { city: "", state: "", country: "" };
  }
}

// ✅ Handles map click
function LocationPicker({ position, setPosition, setLocationInfo }) {
  useMapEvents({
    async click(e) {
      const { lat, lng } = e.latlng;
      setPosition([lat, lng]);
      const info = await reverseGeocode(lat, lng);
      setLocationInfo(info);
    },
  });

  return position && markerIcon ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapDialog({ open, handleClose }) {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.setting);

  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]); // Default to Riyadh
  const [locationInfo, setLocationInfo] = useState({ city: "", state: "", country: "" });

  // ✅ Detect user location initially + reverse geocode default position
  useEffect(() => {
    const initLocation = async (lat, lng) => {
      setMapPosition([lat, lng]);
      const info = await reverseGeocode(lat, lng);
      setLocationInfo(info);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          initLocation(pos.coords.latitude, pos.coords.longitude);
        },
        () => {
          // Fallback: reverse geocode the default Riyadh position
          initLocation(24.7136, 46.6753);
        },
        { enableHighAccuracy: true }
      );
    } else {
      initLocation(24.7136, 46.6753);
    }
  }, []);

  const handleConfirm = async () => {
    const formData = {
      city: locationInfo.city,
      state: locationInfo.state,
      country: locationInfo.country,
      latitude: String(mapPosition[0]),
      longitude: String(mapPosition[1]),
    };

    const result = await dispatch(addAreaThunk(formData));
    if (addAreaThunk.fulfilled.match(result)) {
      dispatch(getWorkplacesThunk());
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} PaperProps={{ className: "AddFuel-dialog" }}>
      <div style={{ padding: 20 }}>
        <h3 className="mb-4 text-lg font-semibold text-right">اختر موقعك على الخريطة</h3>
        <div style={{ height: 400 }}>
          <MapContainer center={mapPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationPicker position={mapPosition} setPosition={setMapPosition} setLocationInfo={setLocationInfo} />
          </MapContainer>
        </div>

        {locationInfo.city && (
          <p className="mt-2 text-sm text-gray-600 text-right">
            {locationInfo.city} - {locationInfo.state} - {locationInfo.country}
          </p>
        )}

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={handleClose} disabled={loading} className="px-4 py-2 bg-gray-300 rounded-[3px] cursor-pointer disabled:opacity-50">
            إلغاء
          </button>
          <button onClick={handleConfirm} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-[3px] cursor-pointer disabled:opacity-50">
            {loading ? "جاري الحفظ..." : "تأكيد الموقع"}
          </button>
        </div>
      </div>
    </Dialog>
  );
}