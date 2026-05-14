'use client'
import React, { useState } from 'react'
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
    <ul className='flex border-b border-gray-200 gap-1 w-full'>
      {menuItems.map((item) => {
        const isSelected = selectedMenu === item.id
        return (
          <li
            key={item.id}
            className={`flex w-full items-center justify-center gap-2 px-1 lg1:px-4 py-3 cursor-pointer whitespace-nowrap text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              isSelected
                ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                : 'border-transparent text-[#364152] hover:text-[var(--color-primary)] hover:border-gray-300'
            }`}
            onClick={() => setSelectedMenu(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <img
              src={isSelected || hoveredItem === item.id ? item.iconSelected : item.icon}
              alt={item.Label}
              className="w-5 h-5 flex-shrink-0"
            />
            {item.name}
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarMenuPage