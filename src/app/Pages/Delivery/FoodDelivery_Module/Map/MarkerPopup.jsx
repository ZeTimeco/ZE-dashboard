'use client'
import React from 'react'

function MarkerPopup({ marker, onClose }) {
  if (!marker) return null

  return (
    <div
      className="absolute z-[9999] pointer-events-auto"
      style={{
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginBottom: '12px',
        minWidth: '200px',
        maxWidth: '220px',
      }}
    >
      {/* Arrow pointing down */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-[8px] w-0 h-0"
        style={{
          borderLeft: '8px solid transparent',
          borderRight: '8px solid transparent',
          borderTop: '8px solid white',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.08))',
        }}
      />

      {/* Card */}
      <div className="bg-white rounded-[8px] shadow-[0_4px_24px_rgba(0,0,0,0.12)] overflow-hidden">
        {/* Header */}
        <div className="px-3 pt-3 pb-2">
          <div className="flex items-start justify-between gap-2">
            <p className="text-[#6941C6] font-semibold text-sm leading-snug flex-1">
              {marker.title}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onClose()
              }}
              className="text-gray-400 hover:text-gray-600 text-base leading-none font-bold flex-shrink-0 mt-[1px] transition-colors duration-150 cursor-pointer"
              aria-label="Close popup"
            >
              ×
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#F2F4F7] mx-3" />

        {/* Info rows */}
        <div className="px-3 py-2.5 flex flex-col gap-[6px]">
          <InfoRow label="Address" value={marker.address} />
          <InfoRow label="City" value={marker.city} />
          <InfoRow label="Country" value={marker.country} />
          <InfoRow label="Postal Code" value={marker.postalCode} />
        </div>
      </div>
    </div>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[#667085] text-[11px] font-medium whitespace-nowrap">{label}:</span>
      <span className="text-[#667085] text-[11px] font-normal truncate">{value}</span>
    </div>
  )
}

export default MarkerPopup
