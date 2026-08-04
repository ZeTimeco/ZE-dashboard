'use client'
import React, { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Dialog from '@mui/material/Dialog'
import 'leaflet/dist/leaflet.css'
import { useTranslation } from 'react-i18next'

// ─── Dynamic imports (no SSR) ─────────────────────────────────────────────────
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
// Tooltip renders in its own Leaflet pane — never clipped by the icon container
const Tooltip = dynamic(
  () => import('react-leaflet').then((m) => m.Tooltip),
  { ssr: false }
)

// ─── Purple pin SVG ────────────────────────────────────────────────────────────
const PIN_SVG = `
<svg width="32" height="40" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg"
  style="filter:drop-shadow(0 3px 8px rgba(105,65,198,0.40));display:block;">
  <path d="M15 0C6.716 0 0 6.716 0 15C0 23.284 15 38 15 38C15 38 30 23.284 30 15C30 6.716 23.284 0 15 0Z" fill="#6941C6"/>
  <circle cx="15" cy="15" r="6" fill="white"/>
  <circle cx="15" cy="15" r="3" fill="#6941C6"/>
</svg>
`

// ─── Tooltip popup card (rendered as React JSX inside Leaflet Tooltip) ────────
function PopupCard({ location }) {
  const { t } = useTranslation()
  if (!location) return null

  return (
    <div style={{
      background: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
      overflow: 'hidden',
      minWidth: '200px',
      maxWidth: '230px',
      fontFamily: 'inherit',
      pointerEvents: 'none',
    }}>
      {/* Title */}
      <div style={{ padding: '10px 12px 8px 12px' }}>
        <p style={{ color: '#364152', fontWeight: 400, fontSize: '13px', margin: 0 }}>
          {t('request')} / {location?.order_number}
        </p>
        <p className='border border-[#4D0CE7] bg-[#EDE7FD] rounded-full text-[#4D0CE7] text-xs font-normal w-fit px-2 flex gap-1'>
          <img src="/images/icons/delivery-truck-blue.svg" className='w-2.5 h-2.5 mt-1' />
          <span>{t('in the way')}</span>
        </p>
      </div>
    
      
      {/* Rows */}
      <div style={{ padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <InfoRow label={t('Captain')}     value={location?.driver?.name}    />
        <InfoRow label={t('Expected time')}        value={location?.estimated_minutes}       />
        <InfoRow label={t('Customer')}     value={location?.customer?.name}    />
        <InfoRow label={t('Location')} value={location.delivery_address} />
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      <span style={{ color: '#667085', fontSize: '11px', fontWeight: 500, whiteSpace: 'nowrap' }}>{label}:</span>
      <span style={{ color: '#667085', fontSize: '11px', fontWeight: 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
    </div>
  )
}

/**
 * MapDialog — MUI Dialog with a Leaflet map.
 * Hovering the marker shows a details tooltip popup above it.
 *
 * Props:
 *   open        — boolean
 *   onClose     — () => void
 *   location    — { lat, lng, title, address, city, country, postalCode }
 */
export default function MapDialog({ open, onClose, location }) {
  const iconRef = useRef(null)
  const [leafletReady, setLeafletReady] = useState(false)
  const { t } = useTranslation(); 
 
  useEffect(() => {
    import('leaflet').then((L) => {
      iconRef.current = L.divIcon({
        className: '',
        iconAnchor: [16, 40],
        html: `<div style="
          position:relative;
          display:flex;
          flex-direction:column;
          align-items:center;
          cursor:pointer;
          transition:transform 0.18s ease;
          transform-origin:bottom center;
        ">${PIN_SVG}</div>`,
        iconSize: [32, 40],
      })
      setLeafletReady(true)
    })
  }, [])

  if (!location) return null

  const lat = location.lat ?? location.latitude ?? 24.7380
  const lng = location.lng ?? location.longitude ?? 46.6890
  const center = [Number(lat), Number(lng)]

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: { borderRadius: '12px', overflow: 'hidden', padding: 0 },
      }}
    >

      <div className='px-6'>
        {/* ── Header ── */}
        <div className='flex justify-end mt-4'>
          <button 
            onClick={onClose} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </button>
        </div>

        <div className='flex flex-col  items-start mt-2 '>
          <p className='text-[#364152] text-lg font-medium mb-2'>
            {t('Delivery')}
          </p>
          <p className='flex items-center gap-2'>
            <img src="/images/icons/delivery-truck-blue.svg" alt="" />
            <span className='text-[#4B5565] text-base font-normal'>5 {t('in the way')}</span>
          </p>
        
        </div>
      </div>

      <div className="w-full h-px bg-[#CDD5DF] my-6"></div>

      {/* ── Map ── */}
      <div className='px-6 pb-6' style={{ height: 460, position: 'relative' }}>
        {/* Override Leaflet tooltip styles to remove default border/bg */}
        <style>{`
          .leaflet-tooltip.custom-map-tooltip {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .leaflet-tooltip.custom-map-tooltip::before {
            display: none !important;
          }
        `}</style>

        {!leafletReady ? (
          <div className="w-full h-full flex items-center justify-center bg-[#F9FAFB]">
            <div className="w-10 h-10 rounded-full border-4 border-[#6941C6] border-t-transparent animate-spin" />
          </div>
        ) : (
          <MapContainer
            key={`${center[0]}-${center[1]}`}
            center={center}
            zoom={15}
            style={{ height: '100%', width: '100%' }}
            zoomControl={true}
            scrollWheelZoom={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
            />
            {iconRef.current && (
              <Marker position={center} icon={iconRef.current}>
                {/* Tooltip shows on hover — direction="top" places it above the pin */}
                <Tooltip
                  direction="top"
                  offset={[0, -44]}
                  opacity={1}
                  className="custom-map-tooltip"
                >
                  <PopupCard location={location} />
                </Tooltip>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>

    </Dialog>
  )
}