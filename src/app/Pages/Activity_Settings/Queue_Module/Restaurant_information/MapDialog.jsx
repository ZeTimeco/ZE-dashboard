"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useTranslation } from "react-i18next";
import { useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Dynamically load react-leaflet components to avoid SSR errors
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
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });
}

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

export default function MapDialog({ open, handleClose, onConfirm, formData }) {
  const { t } = useTranslation();
  const [mapPosition, setMapPosition] = useState([24.7136, 46.6753]); // Default: Riyadh

  // Detect user's current location or existing restaurant location on open
  useEffect(() => {
    if (open) {
      if (formData?.latitude && formData?.longitude) {
        setMapPosition([parseFloat(formData.latitude), parseFloat(formData.longitude)]);
      } else if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setMapPosition([pos.coords.latitude, pos.coords.longitude]);
          },
          () => {},
          { enableHighAccuracy: true }
        );
      }
    }
  }, [open, formData?.latitude, formData?.longitude]);

const handleConfirm = async () => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${mapPosition[0]}&lon=${mapPosition[1]}&addressdetails=1&zoom=14`
    );
    const data = await response.json();
    const addr = data.address || {};

    onConfirm?.({
      address: data.display_name || `${mapPosition[0].toFixed(5)}, ${mapPosition[1].toFixed(5)}`,
      latitude: mapPosition[0],
      longitude: mapPosition[1],
      country: addr.country || '',
      city:
        addr.city ||
        addr.town ||
        addr.village ||
        addr.municipality ||
        addr.county ||
        addr.state_district ||
        addr.state ||
        '',
      area: addr.suburb || addr.neighbourhood || addr.quarter || addr.county || '',
    });
  } catch (error) {
    console.error("Error fetching address:", error);
    onConfirm?.({
      address: `${mapPosition[0].toFixed(5)}, ${mapPosition[1].toFixed(5)}`,
      latitude: mapPosition[0],
      longitude: mapPosition[1],
      country: '',
      city: '',
      area: '',
    });
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
          {t("select location")}
        </h3>

        <div className="relative w-full h-[400px] border border-[#CDD5DF] rounded-[3px] overflow-hidden">
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
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-[3px] transition-colors cursor-pointer"
          >
            {t("cancel")}
          </button>

          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-[3px] transition-colors cursor-pointer"
          >
            {t("confirmation")}
          </button>
        </div>
      </div>
    </Dialog>
  );
}
