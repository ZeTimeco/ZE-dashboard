'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

/* ─── Dynamic Leaflet (no SSR) ──────────────────────────────────── */
const MapContainer = dynamic(
  () => import('react-leaflet').then((m) => m.MapContainer),
  { ssr: false }
)
const TileLayer = dynamic(
  () => import('react-leaflet').then((m) => m.TileLayer),
  { ssr: false }
)
const Marker = dynamic(
  () => import('react-leaflet').then((m) => m.Marker),
  { ssr: false }
)

/* ─── Yellow pickup pin SVG ─────────────────────────────────────── */
const YELLOW_PIN_SVG = `
<svg width="34" height="44" viewBox="0 0 34 44" fill="none" xmlns="http://www.w3.org/2000/svg"
  style="filter:drop-shadow(0 6px 12px rgba(193,148,0,0.35));display:block;">
  <path d="M17 0C7.611 0 0 7.611 0 17C0 26.389 17 44 17 44C17 44 34 26.389 34 17C34 7.611 26.389 0 17 0Z" fill="#C49400"/>
  <circle cx="17" cy="17" r="7" fill="white"/>
  <circle cx="17" cy="17" r="3.5" fill="#C49400"/>
</svg>
`


const FALLBACK_LAT = 24.7136
const FALLBACK_LNG = 46.6753

function Map({ lat, lng }) {
  const position = [lat ?? FALLBACK_LAT, lng ?? FALLBACK_LNG]
  const { t } = useTranslation()
  const [leafletReady, setLeafletReady] = useState(false)
  const iconRef = useRef(null)

  /* Build Leaflet DivIcon once on client */
  useEffect(() => {
    if (typeof window === 'undefined') return
    import('leaflet').then((L) => {
      iconRef.current = L.divIcon({
        className: '',
        iconAnchor: [17, 44],
        html: `<div style="display:flex;flex-direction:column;align-items:center;">${YELLOW_PIN_SVG}</div>`,
        iconSize: [34, 44],
      })
      setLeafletReady(true)
    })
  }, [])

  return (
    <motion.div
      className="relative w-full rounded-lg overflow-hidden border border-[#E7E7E7]"
      style={{ height: '420px' }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Loading placeholder */}
      {!leafletReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9FAFB] z-10">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-3" />
          <p className="text-[#697586] text-sm">{t('Loading map...')}</p>
        </div>
      )}

      {/* Leaflet Map */}
      {leafletReady && (
        <MapContainer
          center={position}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <Marker
            position={position}
            icon={iconRef.current}
          />
        </MapContainer>
      )}

      {/* ── Pickup info card overlay ─────────────────────────── */}
      <motion.div
        className="absolute bottom-4 right-4 z-[999] bg-white rounded-lg shadow-[0_8px_24px_rgba(0,0,0,0.14)] border border-[#EAECF0] p-4 w-[280px]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        dir="rtl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <p className="text-[#364152] text-sm font-medium">{t('Pickup point')}</p>
          <motion.button
            type="button"
            className="w-8 h-8 rounded-sm bg-[#F4EAD0] flex items-center justify-center cursor-pointer"
            whileHover={{ scale: 1.1, backgroundColor: '#EDD98A' }}
            whileTap={{ scale: 0.93 }}
            transition={{ duration: 0.18 }}
            title={t('Copy address')}
          >
            <svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="#C49400" strokeWidth="1.8" fill="none"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="#C49400" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </motion.button>
        </div>

        {/* Address */}
        <p className="text-[#364152] text-sm font-semibold mb-1 leading-5">
          City center, 123 Main Street
        </p>

        {/* Sender */}
        <p className="text-[#697586] text-xs font-normal mb-4">
        Ask about: Client Ahmed· Documents
        </p>

        {/* Action buttons */}
        <div className="flex gap-2">
          {/* Call — primary */}
          <motion.button
            type="button"
            className="flex-1 h-10 bg-primary text-white text-sm font-semibold rounded-[6px] cursor-pointer"
            whileHover={{ scale: 1.03, filter: 'brightness(1.07)', boxShadow: '0 4px 14px rgba(196,148,0,0.30)' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            Call
          </motion.button>

          {/* Message — outlined */}
          <motion.button
            type="button"
            className="flex-1 h-10 border border-[#CDD5DF] text-[#364152] text-sm font-semibold rounded-[6px] cursor-pointer bg-white"
            whileHover={{ scale: 1.03, boxShadow: '0 4px 12px rgba(0,0,0,0.08)', borderColor: '#9CA3AF' }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {t('Message')}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Map