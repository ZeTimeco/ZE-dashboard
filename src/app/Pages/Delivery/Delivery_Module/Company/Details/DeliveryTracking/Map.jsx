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

      {/* ── Figma Tracking & Driver Overlay Card ───────────────────── */}
      <motion.div
        className="absolute bottom-5 left-4 z-[999] bg-white rounded-[10px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] border border-[#E5E7EB] p-3.5 w-[40%] max-w-[calc(100%-32px)] max-h-[calc(100%-32px)] overflow-y-auto flex flex-col gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        dir="rtl"
      >
        {/* ── 1. Driver Profile Card ─────────────────────────── */}
        <div className="bg-white border border-[#D6D6D6] rounded-3px p-3 flex items-center justify-between w-full">
          {/* Driver details + avatar (Right in RTL) */}
          <div className="flex items-center gap-2.5">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center shrink-0">
              <img src="/images/icons/user_gray.svg" alt="" />
            </div>

            <div className="flex flex-col items-start text-right">
              <span className="text-[#0B0E11] text-[15px] font-medium leading-tight">سيد علي</span>
              <div className="flex items-center gap-1.5 mt-1 text-[#0B0E11]">
                <span className="text-[13px] font-light">Honda PCX 150</span>
                <div className="flex items-center gap-0.5">
                  <img src="/images/icons/star.svg" alt="" />
                  <span className="text-[12px] font-medium text-[#0B0E12]">4.8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Call button (Left in RTL) */}
          <motion.button
            type="button"
            onClick={() => window.open('tel:+966500000000')}
            className="bg-[#FAEFD1] hover:bg-[#F5E5BE] text-primary h-9 px-3 py-1.5 rounded-3px flex items-center gap-1.5 text-[14px] font-normal cursor-pointer transition-colors shrink-0"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            title={t('اتصال') || 'اتصال'}
          >
            <span>{t('اتصال') || 'اتصال'}</span>
            <img src="/images/icons/call_yellow.svg" alt="" />
          </motion.button>
        </div>

        {/* ── 2. Tracking Status Card ─────────────────────── */}
        <div className="bg-white rounded-3px p-3.5 w-full shadow-[0px_0px_2px_rgba(0,0,0,0.2)]">
          {/* Header */}
          <div className="flex items-center justify-between w-full mb-4">
            <span className="text-[#0B0E11] text-[16px] font-medium">
              {t('Tracking status')}
            </span>
            <span className="text-[#364152] text-[14px] font-normal">
              {t('Destination')}  (1)
            </span>
          </div>

          {/* Timeline steps */}
          <div className="flex flex-col">
            {[
              { id: 1, title: t('The order has been confirmed') || 'تم تأكيد الطلب', time: '1:15م', status: 'done' },
              { id: 2, title: t('It was received') || 'تم الاستلام', time: '1:15م', status: 'done' },
              { id: 3, title: t('in the way') || 'في الطريق', time: t('الان') || 'الان', status: 'done' },
              { id: 4, title: t('nearby') || 'قريب', time: '-', status: 'pending' },
              { id: 5, title: t('Delivered') || 'تم التوصيل', time: '-', status: 'pending' },
            ].map((step, idx, arr) => {
              const isDone = step.status === 'done'
              const nextStep = arr[idx + 1]
              const isLast = idx === arr.length - 1
              const lineIsDone = isDone && nextStep && nextStep.status === 'done'

              return (
                <div key={step.id} className="flex items-start gap-2.5">
                  {/* Indicator & Line (Right side in RTL) */}
                  <div className="flex flex-col items-center shrink-0">
                    {isDone ? (
                      <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-white shrink-0">
                        <img src="/images/icons/true_white.svg" className="w-4 h-4" />
                      </div>
                    ) : (
                      <div className="w-5.5 h-5.5 rounded-sm bg-[#9CA3AF] shrink-0" />
                    )}

                    {/* Connecting vertical line */}
                    {!isLast && (
                      <div
                        className={`w-0.5 h-6 ${
                          lineIsDone ? 'bg-primary' : 'bg-[#D0D5DD]'
                        }`}
                      />
                    )}
                  </div>

                  {/* Step texts (Left side of indicator in RTL) */}
                  <div className="flex-1 flex flex-col text-right -mt-0.5">
                    <span
                      className={`text-[14px] font-normal leading-tight ${
                        isDone ? 'text-[#0B0E11]' : 'text-[#9F9F9F]'
                      }`}
                    >
                      {step.title}
                    </span>
                    <span className="text-[#697586] text-[12px] font-light mt-1 leading-tight">
                      {step.time}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Map