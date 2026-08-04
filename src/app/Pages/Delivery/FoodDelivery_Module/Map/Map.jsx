'use client'
import React, { useState, useCallback, useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'

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

// ─── Marker data ──────────────────────────────────────────────────────────────
const MARKERS = [
  {
    id: 1,
    lat: 24.7250,
    lng: 46.6550,
    title: 'طلب #13584',
    address: 'شارع الأمير محمد',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '12244',
  },
  {
    id: 2,
    lat: 24.7380,
    lng: 46.6890,
    title: 'طلب #13521',
    address: 'شارع الملك فهد',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '11321',
  },
  {
    id: 3,
    lat: 24.7100,
    lng: 46.7100,
    title: 'طلب #13499',
    address: 'شارع التحلية',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '11534',
  },
  {
    id: 4,
    lat: 24.6970,
    lng: 46.6700,
    title: 'طلب #13478',
    address: 'شارع العليا',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '11564',
  },
  {
    id: 5,
    lat: 24.7460,
    lng: 46.6400,
    title: 'طلب #13461',
    address: 'شارع الستين',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '12872',
  },
  {
    id: 6,
    lat: 24.7160,
    lng: 46.6280,
    title: 'طلب #13440',
    address: 'شارع الإمام سعود',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '13312',
  },
  {
    id: 7,
    lat: 24.6850,
    lng: 46.7250,
    title: 'طلب #13419',
    address: 'طريق الدائري الشرقي',
    city: 'الرياض',
    country: 'المملكة العربية السعودية',
    postalCode: '14522',
  },
]

// ─── Purple pin SVG string ────────────────────────────────────────────────────
const PIN_SVG = `
<svg width="30" height="38" viewBox="0 0 30 38" fill="none" xmlns="http://www.w3.org/2000/svg"
  style="filter:drop-shadow(0 3px 6px rgba(105,65,198,0.35));display:block;">
  <path d="M15 0C6.716 0 0 6.716 0 15C0 23.284 15 38 15 38C15 38 30 23.284 30 15C30 6.716 23.284 0 15 0Z" fill="#6941C6"/>
  <circle cx="15" cy="15" r="6" fill="white"/>
  <circle cx="15" cy="15" r="3" fill="#6941C6"/>
</svg>
`

// ─── Popup HTML builder ───────────────────────────────────────────────────────
function buildPopupHtml(marker) {
  const row = (label, value) => value ? `
    <div style="display:flex;align-items:center;gap:6px;">
      <span style="color:#667085;font-size:11px;font-weight:500;white-space:nowrap;">${label}:</span>
      <span style="color:#667085;font-size:11px;font-weight:400;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${value}</span>
    </div>
  ` : ''

  const orderTitle = marker.order_number ? `طلب / ${marker.order_number}` : (marker.title || `#${marker.id}`)
  const captain = marker.driver?.name || ''
  const expectedTime = marker.estimated_minutes ? `${marker.estimated_minutes}` : (marker.expected_time || marker.city || '')
  const customer = marker.customer?.name 
  const locationAddr = marker.delivery_address || marker.address || ''

  return `
    <div style="
      position:absolute;
      bottom:calc(100% + 12px);
      left:50%;
      transform:translateX(-50%);
      min-width:200px;
      max-width:230px;
      z-index:9999;
      pointer-events:auto;
    " class="map-popup-card">
      <!-- Arrow -->
      <div style="
        position:absolute;left:50%;transform:translateX(-50%);
        bottom:-8px;width:0;height:0;
        border-left:8px solid transparent;
        border-right:8px solid transparent;
        border-top:8px solid white;
      "></div>
      <!-- Card -->
      <div style="background:white;border-radius:8px;box-shadow:0 4px 24px rgba(0,0,0,0.14);overflow:hidden;font-family:inherit;">
        <div style="padding:10px 12px 8px 12px;">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:8px;">
            <div>
              <p style="color:#364152;font-weight:400;font-size:13px;line-height:1.3;margin:0 0 4px 0;">${orderTitle}</p>
              <div style="border:1px solid #4D0CE7;background:#EDE7FD;border-radius:9999px;color:#4D0CE7;font-size:12px;font-weight:400;width:fit-content;padding:2px 8px;display:flex;align-items:center;gap:4px;">
                <img src="/images/icons/delivery-truck-blue.svg" alt="" style="width:14px;height:14px;" />
                <span>في الطريق</span>
              </div>
            </div>
            <button
              data-popup-close="${marker.id}"
              style="color:#9CA3AF;font-size:18px;font-weight:700;background:none;border:none;cursor:pointer;line-height:1;flex-shrink:0;padding:0;margin-top:-1px;"
            >×</button>
          </div>
        </div>
        <div style="height:1px;background:#F2F4F7;margin:0 12px;"></div>
        <div style="padding:10px 12px;display:flex;flex-direction:column;gap:6px;">
          ${row('الكابتن', captain)}
          ${row('الوقت المتوقع', expectedTime)}
          ${row('العميل', customer)}
          ${row('الموقع', locationAddr)}
        </div>
      </div>
    </div>
  `
}

// ─── Main Map component ───────────────────────────────────────────────────────
export default function Map({ getDeliveryMap }) {
  const [activeId, setActiveId] = useState(null)
  const [leafletReady, setLeafletReady] = useState(false)
  const iconMapRef = useRef({})
  const activeIdRef = useRef(null)

  // Keep ref in sync with state for event handlers
  activeIdRef.current = activeId

  const rawMarkers = Array.isArray(getDeliveryMap)
    ? getDeliveryMap
    : Array.isArray(getDeliveryMap?.data?.data)
    ? getDeliveryMap?.data?.data
    : Array.isArray(getDeliveryMap?.data)
    ? getDeliveryMap?.data
    : []

  const markersList = rawMarkers.length > 0 ? rawMarkers : MARKERS

  const formattedMarkers = markersList.map((m, idx) => ({
    ...m,
    id: m.id ?? idx + 1,
    lat: Number(m.lat ?? m.latitude ?? m.delivery_lat ?? (24.7250 + idx * 0.005)),
    lng: Number(m.lng ?? m.longitude ?? m.delivery_lng ?? (46.6550 + idx * 0.005)),
  }))

  // Build Leaflet DivIcons once on client
  useEffect(() => {
    if (typeof window === 'undefined') return
    import('leaflet').then((L) => {
      formattedMarkers.forEach((m) => {
        iconMapRef.current[m.id] = L.divIcon({
          className: '',
          iconAnchor: [15, 38],
          html: `
            <div
              id="mk-${m.id}"
              style="
                position:relative;
                display:flex;
                flex-direction:column;
                align-items:center;
                cursor:pointer;
                transition:transform 0.18s ease;
                transform-origin:bottom center;
              "
            >
              ${PIN_SVG}
            </div>
          `,
          iconSize: [30, 38],
        })
      })
      setLeafletReady(true)
    })
  }, [getDeliveryMap])

  // Inject / remove popups when activeId changes
  useEffect(() => {
    if (!leafletReady) return

    formattedMarkers.forEach((m) => {
      const el = document.getElementById(`mk-${m.id}`)
      if (!el) return

      // Remove existing popup
      const existing = el.querySelector('.map-popup-card')
      if (existing) existing.remove()

      if (activeId === m.id) {
        // Inject popup
        const wrapper = document.createElement('div')
        wrapper.innerHTML = buildPopupHtml(m)
        const popup = wrapper.firstElementChild
        el.appendChild(popup)

        // Close button
        const closeBtn = popup.querySelector(`[data-popup-close="${m.id}"]`)
        if (closeBtn) {
          closeBtn.addEventListener('click', (e) => {
            e.stopPropagation()
            setActiveId(null)
          })
        }

        el.style.transform = 'scale(1.15)'
        el.style.zIndex = '10000'
      } else {
        el.style.transform = 'scale(1)'
        el.style.zIndex = ''
      }
    })
  }, [activeId, leafletReady, getDeliveryMap])

  // Attach hover listeners once map is ready
  useEffect(() => {
    if (!leafletReady) return
    const timer = setTimeout(() => {
      formattedMarkers.forEach((m) => {
        const el = document.getElementById(`mk-${m.id}`)
        if (!el) return

        const handleMouseEnter = () => {
          if (activeIdRef.current !== m.id) {
            el.style.transform = 'scale(1.2)'
          }
        }
        const handleMouseLeave = () => {
          if (activeIdRef.current !== m.id) {
            el.style.transform = 'scale(1)'
          }
        }

        el.addEventListener('mouseenter', handleMouseEnter)
        el.addEventListener('mouseleave', handleMouseLeave)
      })
    }, 400)
    return () => clearTimeout(timer)
  }, [leafletReady, getDeliveryMap])

  const handleMarkerClick = useCallback((id) => {
    setActiveId((prev) => (prev === id ? null : id))
  }, [])

  // Loading state
  if (!leafletReady) {
    return (
      <div
        className="w-full mt-4 rounded-[8px] overflow-hidden bg-[#F9FAFB] flex items-center justify-center"
        style={{ height: 'calc(100vh - 180px)' }}
      >
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-[#6941C6] border-t-transparent animate-spin" />
          <p className="text-[#667085] text-sm">Loading map...</p>
        </div>
      </div>
    )
  }

  const center = [
    formattedMarkers[0]?.lat || 24.7136,
    formattedMarkers[0]?.lng || 46.6753
  ]

  return (
    <div
      className="w-full mt-4 rounded-[8px] overflow-hidden shadow-sm"
      style={{ height: 'calc(100vh - 180px)' }}
    >
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />

        {formattedMarkers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={iconMapRef.current[m.id]}
            eventHandlers={{
              click: () => handleMarkerClick(m.id),
            }}
          />
        ))}
      </MapContainer>
    </div>
  )
}