"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

let L;
let markerIcon;

if (typeof window !== "undefined") {
  L = require("leaflet");
  markerIcon = new L.Icon({
    iconUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl:
      "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

/* 📍 Handle map click */
function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position && markerIcon ? (
    <Marker position={position} icon={markerIcon} />
  ) : null;
}

export default function MapDialog({
  open,
  handleClose,
  onConfirm,
}) {
  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]);

  // 📍 Detect user location
  useEffect(() => {
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

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapPosition[0]}&lon=${mapPosition[1]}`
      );
      const data = await response.json();
      onConfirm?.(data.display_name || "Address not found");
    } catch (error) {
      console.error("Error fetching address:", error);
      onConfirm?.(`Lat: ${mapPosition[0]}, Lng: ${mapPosition[1]}`);
    }
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      <div className="p-5">
        <h3 className="mb-4 text-lg font-semibold text-right">
          اختر موقعك على الخريطة
        </h3>

        <div style={{ height: 400 }}>
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
