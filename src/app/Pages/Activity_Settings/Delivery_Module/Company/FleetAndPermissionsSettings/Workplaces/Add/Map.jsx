'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
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

/* ─── MapClickHandler (inside MapContainer context) ─────────────── */
const MapClickHandler = dynamic(
  () =>
    import('react-leaflet').then((m) => {
      const { useMapEvents } = m
      function ClickHandler({ onMapClick }) {
        useMapEvents({
          click(e) {
            onMapClick(e.latlng.lat, e.latlng.lng)
          },
        })
        return null
      }
      return ClickHandler
    }),
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

/* ─── Reverse-geocode via OSM Nominatim ─────────────────────────── */
async function reverseGeocode(lat, lng) {
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
      { headers: { 'Accept-Language': 'ar' } }
    )
    const data = await res.json()
    const address = data.display_name || `${lat.toFixed(5)}, ${lng.toFixed(5)}`
    const country = data.address?.country || ''
    const city =
      data.address?.city ||
      data.address?.town ||
      data.address?.village ||
      data.address?.municipality ||
      data.address?.county ||
      data.address?.state ||
      ''
    const area =
      data.address?.suburb ||
      data.address?.neighbourhood ||
      data.address?.quarter ||
      data.address?.city_district ||
      data.address?.district ||
      city ||
      ''
    return { address, country, city: city || area, area: area || city }
  } catch {
    return { address: `${lat.toFixed(5)}, ${lng.toFixed(5)}`, country: '', city: '', area: '' }
  }
}

function Map({ onAddressSelect }) {
  const { t } = useTranslation()
  const [leafletReady, setLeafletReady] = useState(false)
  const [markerPos, setMarkerPos] = useState(null)
  const [address, setAddress] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [geocoding, setGeocoding] = useState(false)
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

  const handleMapClick = useCallback(
    async (lat, lng) => {
      setMarkerPos([lat, lng])
      setGeocoding(true)
      setAddress('')
      setCountry('')
      setCity('')
      if (onAddressSelect) {
        onAddressSelect({ lat, lng, address: '', country: '', city: '', area: '', loading: true })
      }
      const result = await reverseGeocode(lat, lng)
      setAddress(result.address)
      setCountry(result.country)
      setCity(result.city)
      setGeocoding(false)
      if (onAddressSelect) {
        onAddressSelect({
          lat,
          lng,
          address: result.address,
          country: result.country,
          city: result.city,
          area: result.area,
          loading: false,
        })
      }
    },
    [onAddressSelect]
  )

  return (
    <motion.div
      className="relative w-full rounded-lg overflow-hidden border border-[#E7E7E7]"
      style={{ height: '500px' }}
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
          center={[FALLBACK_LAT, FALLBACK_LNG]}
          zoom={14}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />
          <MapClickHandler onMapClick={handleMapClick} />
          {markerPos && iconRef.current && (
            <Marker position={markerPos} icon={iconRef.current} />
          )}
        </MapContainer>
      )}

      {/* Hint — before any selection */}
      {!markerPos && leafletReady && (
        <motion.div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[999] bg-white/90 backdrop-blur-sm rounded-full shadow-md border border-[#E5E7EB] px-4 py-2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-[#697586] text-sm text-center">
            {t('اضغط على الخريطة لتحديد الموقع')}
          </p>
        </motion.div>
      )}

      {/* Address pill — after selection */}
      {markerPos && (
        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[999] bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#E5E7EB] px-5 py-2.5 flex items-center gap-2.5 max-w-[80%]"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {geocoding ? (
            <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin shrink-0" />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#C49400" />
              <circle cx="12" cy="9" r="2.5" fill="white" />
            </svg>
          )}
          <p className="text-[#0B0E11] text-sm font-medium truncate" dir="rtl" title={address}>
            {geocoding ? t('جاري تحديد العنوان...') : address}
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default Map