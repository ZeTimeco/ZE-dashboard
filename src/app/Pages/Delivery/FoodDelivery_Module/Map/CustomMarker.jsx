'use client'
import React, { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import MarkerPopup from './MarkerPopup'

/**
 * CustomMarker renders a DOM-overlay marker at a given pixel position on the map.
 * It is used by the parent Map component via Leaflet's DivOverlay / custom overlay,
 * so this component itself is pure React — no Leaflet APIs needed here.
 *
 * Props:
 *  - marker: { id, title, address, city, country, postalCode, lat, lng }
 *  - isOpen: boolean  — whether this marker's popup is open
 *  - onClick: () => void — tells parent to set this marker as active
 *  - onClose: () => void — tells parent to close the popup
 */
function CustomMarker({ marker, isOpen, onClick, onClose }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="relative flex flex-col items-center cursor-pointer select-none"
      style={{
        transform: hovered ? 'scale(1.22)' : 'scale(1)',
        transition: 'transform 0.22s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.22s ease',
        transformOrigin: 'bottom center',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        onClick()
      }}
    >
      {/* Popup floats above the marker icon */}
      <AnimatePresence>
        {isOpen && <MarkerPopup marker={marker} onClose={onClose} />}
      </AnimatePresence>

      {/* Purple pin icon */}
      <svg
        width="30"
        height="38"
        viewBox="0 0 30 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: hovered
            ? 'drop-shadow(0 6px 14px rgba(105,65,198,0.55))'
            : 'drop-shadow(0 3px 6px rgba(105,65,198,0.35))',
          transition: 'filter 0.22s ease',
        }}
      >
        {/* Pin body */}
        <path
          d="M15 0C6.716 0 0 6.716 0 15C0 23.284 15 38 15 38C15 38 30 23.284 30 15C30 6.716 23.284 0 15 0Z"
          fill="#6941C6"
        />
        {/* Inner white circle */}
        <circle cx="15" cy="15" r="6" fill="white" />
        {/* Purple center dot */}
        <circle cx="15" cy="15" r="3" fill="#6941C6" />
      </svg>
    </div>
  )
}

export default CustomMarker
