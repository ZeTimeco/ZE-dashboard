"use client";

import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

/* ✅ Client-only imports */
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
);

/* ✅ fix leaflet icon (safe in Next.js) */
let markerIcon = null;

export default function MapDialog({ open, handleClose, onConfirm }) {
  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]);
  const [address, setAddress] = useState("");
  const [fullAddressDetails, setFullAddressDetails] = useState({});
  const [isClient, setIsClient] = useState(false);

  // Fetch address from coordinates
  const fetchAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&accept-language=ar`
      );
      const data = await response.json();
      if (data && data.display_name) {
        setAddress(data.display_name);
        if (data.address) {
          setFullAddressDetails(data.address);
        }
      }
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  /* ✅ ensure client mount */
  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        markerIcon = new L.Icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        });
      });
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapPosition([
            pos.coords.latitude,
            pos.coords.longitude,
          ]);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }, []);

  function LocationPicker({ position, setPosition }) {
    const { useMapEvents } = require("react-leaflet");

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition([lat, lng]);
        fetchAddress(lat, lng);
      },
    });

    return position && markerIcon ? (
      <Marker position={position} icon={markerIcon} />
    ) : null;
  }

  const handleConfirm = () => {
    onConfirm?.({
      lat: mapPosition[0],
      lng: mapPosition[1],
      address: address,
      details: fullAddressDetails,
    });

    handleClose();
  };

  /* ✅ prevent SSR crash */
  if (!isClient) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <div className="p-5">
        <h3 className="mb-4 text-lg font-semibold text-right">
          اختر موقعك على الخريطة
        </h3>

        <div style={{ height: 400, width: "100%" }}>
          <MapContainer
            center={mapPosition}
            zoom={13}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />

            <LocationPicker
              position={mapPosition}
              setPosition={setMapPosition}
            />
          </MapContainer>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            إلغاء
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            تأكيد الموقع
          </button>
        </div>
      </div>
    </Dialog>
  );
}