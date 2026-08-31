"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import SectionOfMenuPage from './SectionOfMenu/page'
import { useTranslation } from 'react-i18next'

const menuItems = [
  {
    Label: 'Company_data',
    nameKey: 'Company data',
    icon: '/images/icons/Company_dataBlack.svg',
    iconSelected: '/images/icons/Company_data_yellow.svg',
    subItems: [
      { Label: 'BasicInformation', nameKey: 'Basic Information' },
      { Label: 'YourFiles', nameKey: 'Your Files' },
      { Label: 'ContactInformation', nameKey: 'Contact Information' },
      { Label: 'ChangePassword', nameKey: 'Change Password' },
      { Label: 'CompanyAddress', nameKey: 'Company Address' },
    ],
  },
  { Label: 'Personal_data', nameKey: 'Personal data', icon: '/images/icons/Personal_dataBlack.svg', iconSelected: '/images/icons/Personal_data_yellow.svg' },
  { Label: 'Marketer_Panel', nameKey: 'Marketer panel', icon: '/images/icons/Marketer_PanelBlack.svg', iconSelected: '/images/icons/Marketer_Panel_yellow.svg' },
]

function Home_Car_Street_ModulePage() {
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState('BasicInformation')

  const activeParent = menuItems.find(
    (item) => item.Label === selectedMenu || item.subItems?.some((s) => s.Label === selectedMenu)
  )

  const handleTabClick = (item) => {
    if (item.subItems) {
      setSelectedMenu(item.subItems[0].Label)
    } else {
      setSelectedMenu(item.Label)
    }
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        {/* Main Tab Bar */}
        <div className="flex border-b border-gray-200 gap-1 w-full relative">
          {menuItems.map((item) => {
            const isActive = activeParent?.Label === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => handleTabClick(item)}
                className={`relative flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-[var(--color-primary)] font-semibold'
                    : 'text-[#4B5565] hover:text-[var(--color-primary)]'
                }`}
              >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.15 }}
                  src={isActive ? item.iconSelected : item.icon}
                  alt={item.Label}
                  className="w-5 h-5"
                />
                <span>{t(item.nameKey)}</span>
                {isActive && (
                  <motion.div
                    layoutId="settingsTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Sub-Tab Bar (shown only when active parent has subItems) */}
        {activeParent?.subItems && (
          <div className="flex gap-1 border border-[#EEF2F6] bg-[#EEF2F6] w-fit h-14 rounded-[3px] p-2">
            {activeParent.subItems.map((sub) => {
              const isSelected = selectedMenu === sub.Label
              return (
                <button
                  key={sub.Label}
                  onClick={() => setSelectedMenu(sub.Label)}
                  className={`relative px-3 py-2 text-sm rounded-[3px] cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[var(--color-primary)] text-white font-medium shadow-xs'
                      : 'text-[#4B5565] hover:text-[var(--color-primary)]'
                  }`}
                >
                  <span className="relative z-10">{t(sub.nameKey)}</span>
                </button>
              )
            })}
          </div>
        )}

        {/* Content */}
        <div>
          <SectionOfMenuPage selectedMenu={selectedMenu} />
        </div>
      </div>
    </MainLayout>
  )
}

export default Home_Car_Street_ModulePage