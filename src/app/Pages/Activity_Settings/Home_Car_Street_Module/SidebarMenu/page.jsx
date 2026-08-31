'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function SidebarMenuPage({ selectedMenu, setSelectedMenu }) {
  const { t } = useTranslation()
  const [hoveredItem, setHoveredItem] = useState(null)

  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key

  const menuHomeCarItems = [
    { id: 1, Label: 'Terms and Policies', name: t('Terms and Policies'), icon: '/images/icons/Terms and Policies_Black.svg',      iconSelected: '/images/icons/Terms and Policies_yellow.svg' },
    { id: 2, Label: 'Workplaces',         name: t('Workplaces'),         icon: '/images/icons/maps-location_Black.svg',           iconSelected: '/images/icons/maps-location-yellow.svg' },
    { id: 3, Label: 'Working hours',      name: t('Working hours'),      icon: '/images/icons/date-time-black.svg',               iconSelected: '/images/icons/date-time-yellow.svg' },
    { id: 4, Label: 'Legal documents',    name: t('Legal documents'),    icon: '/images/icons/document-attachment_black.svg',     iconSelected: '/images/icons/document-attachment_yellow.svg' },
    { id: 5, Label: 'Reviews',            name: t('Reviews'),            icon: '/images/icons/star_black.svg',                    iconSelected: '/images/icons/star_yellow.svg' },
  ]

  const menuStreetItems = [
    { id: 1, Label: 'Terms and Policies', name: t('Terms and Policies'), icon: '/images/icons/Terms and Policies_Black.svg',      iconSelected: '/images/icons/Terms and Policies_yellow.svg' },
    { id: 2, Label: 'Workplaces',         name: t('Workplaces'),         icon: '/images/icons/maps-location_Black.svg',           iconSelected: '/images/icons/maps-location-yellow.svg' },
    { id: 4, Label: 'Legal documents',    name: t('Legal documents'),    icon: '/images/icons/document-attachment_black.svg',     iconSelected: '/images/icons/document-attachment_yellow.svg' },
    { id: 5, Label: 'Reviews',            name: t('Reviews'),            icon: '/images/icons/star_black.svg',                    iconSelected: '/images/icons/star_yellow.svg' },
  ]

  let menuItems
  switch (current_module_key) {
    case 'home_services':
    case 'car_services':
      menuItems = menuHomeCarItems
      break
    case 'street_assistant':
      menuItems = menuStreetItems
      break
    default:
      menuItems = menuHomeCarItems
  }

  return (
    <ul className='flex border-b border-gray-200 gap-1 w-full relative'>
      {menuItems.map((item) => {
        const isSelected = selectedMenu === item.id
        return (
          <li
            key={item.id}
            className={`relative flex w-full items-center justify-center gap-2 px-1 lg1:px-4 py-3 cursor-pointer whitespace-nowrap text-sm font-medium transition-colors ${
              isSelected
                ? 'text-[var(--color-primary)] font-semibold'
                : 'text-[#364152] hover:text-[var(--color-primary)]'
            }`}
            onClick={() => setSelectedMenu(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.15 }}
              src={isSelected || hoveredItem === item.id ? item.iconSelected : item.icon}
              alt={item.Label}
              className="w-5 h-5 flex-shrink-0"
            />
            <span>{item.name}</span>
            {isSelected && (
              <motion.div
                layoutId="activitySettingsMenuUnderline"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarMenuPage