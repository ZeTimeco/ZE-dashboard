"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
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
        <div className="flex border-b border-gray-200 gap-1 w-full">
          {menuItems.map((item) => {
            const isActive = activeParent?.Label === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => handleTabClick(item)}
                className={`flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[#4B5565] '
                }`}
              >
                <img
                  src={isActive ?  item.iconSelected : item.icon}
                  alt={item.Label}
                  className="w-5 h-5"
                  // style={isActive ? { filter: 'invert(40%) sepia(80%) saturate(500%) hue-rotate(180deg)' } : {}}
                />
                {t(item.nameKey)}
              </button>
            )
          })}
        </div>

        {/* Sub-Tab Bar (shown only when active parent has subItems) */}
        {activeParent?.subItems && (
          <div className="flex gap-1 border border-[#EEF2F6]  bg-[#EEF2F6] w-fit  h-14 rounded-[3px] p-2">
            {activeParent.subItems.map((sub) => (
              <button
                key={sub.Label}
                onClick={() => setSelectedMenu(sub.Label)}
                className={`px-3 py-2 text-sm rounded-[3px] cursor-pointer  ${
                  selectedMenu === sub.Label
                    ? 'bg-[var(--color-primary)] text-[white] font-medium'
                    : 'border-transparent text-[#4B5565] hover:text-[var(--color-primary)]'
                }`}
              >
                {t(sub.nameKey)}
              </button>
            ))}
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