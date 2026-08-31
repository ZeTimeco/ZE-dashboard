"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Dialog from "@mui/material/Dialog";
import { useMapEvents } from "react-leaflet";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import "leaflet/dist/leaflet.css";

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

// ✅ Handles map click
function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position && markerIcon ? <Marker position={position} icon={markerIcon} /> : null;
}

export default function MapDialog({ open, handleClose, formData, setFormData }) {
  const { t } = useTranslation();
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [mapPosition, setMapPosition] = useState([
    formData?.latitude ? parseFloat(formData.latitude) : 24.7136,
    formData?.longitude ? parseFloat(formData.longitude) : 46.6753,
  ]);

  // ✅ Detect user location initially
  useEffect(() => {
    if (!formData?.latitude && !formData?.longitude && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setMapPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        () => {},
        { enableHighAccuracy: true }
      );
    }
  }, [formData?.latitude, formData?.longitude, open]);

  // ✅ Reverse Geocoding via OpenStreetMap Nominatim
  const handleConfirm = async () => {
    const lat = mapPosition[0];
    const lng = mapPosition[1];
    setLoadingAddress(true);

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json&accept-language=ar`
      );
      const data = await res.json();
      const formattedAddress = data.display_name || `${lat}, ${lng}`;
      const addr = data.address || {};

      setFormData((prev) => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
        address: formattedAddress,
        city: addr.city || addr.town || addr.village || addr.county || addr.state_district || "",
        state: addr.state || addr.region || "",
        country: addr.country || "",
      }));
    } catch (error) {
      console.error("Error fetching address:", error);
      setFormData((prev) => ({
        ...prev,
        latitude: lat.toString(),
        longitude: lng.toString(),
        address: `${lat}, ${lng}`,
      }));
    } finally {
      setLoadingAddress(false);
      handleClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      PaperProps={{ 
        className: "ServicePage-dialog",
        style: { width: "100%", maxWidth: "600px", padding: 0, borderRadius: "6px" } 
      }}
    >
      <div className="p-5">
        <h3 className="mb-4 text-lg font-semibold text-[#364152] text-right">
          {t("Choose your location on the map")}
        </h3>
        
        <div style={{ height: 380 }} className="rounded-[4px] overflow-hidden border border-[#E3E8EF] shadow-inner">
          <MapContainer center={mapPosition} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            <LocationPicker position={mapPosition} setPosition={setMapPosition} />
          </MapContainer>
        </div>

        <div className="flex justify-end mt-5 gap-3">
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleClose} 
            className="px-5 py-2.5 border border-[#C69815] text-[#C69815] rounded-[3px] font-medium transition-colors cursor-pointer"
          >
            {t("cancel")}
          </motion.button>
          
          <motion.button 
            whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConfirm} 
            disabled={loadingAddress}
            className="px-5 py-2.5 bg-[#C69815] text-white rounded-[3px] font-medium shadow-xs disabled:opacity-50 transition-all cursor-pointer"
          >
            {loadingAddress ? (t("Loading...")) : (t("Confirm location"))}
          </motion.button>
        </div>
      </div>
    </Dialog>
  );
}
