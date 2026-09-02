"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import BookingSettingPpage from './BookingSettings/page';
import Savings_CalendarPage from './Savings_Calendar/page';
import Legal_CompliancePage from './Legal_Compliance/page';
import ReviewsPages from './Reviews/pages';
import AdvancedSettingsPages from './AdvancedSettings/pages';
import Terms_PoliciesPage from './Terms_Policies/page';
import LegalDocumentsPages from './LegalDocuments/pages';
import { motion, AnimatePresence } from 'framer-motion';

function Property_ModulePage() {
  const { t } = useTranslation() 
  const [activeTab, setActiveTab] = useState(1);

  const menuTabBar = [
    { id: 1, name: t('Booking settings'), icons: '/images/icons/calendar-gray.svg', iconSelected: '/images/icons/calendar-yellow2.svg' },
    { id: 2, name: t('Reviews'), icons: '/images/icons/Star_blackk.svg', iconSelected: '/images/icons/star-yellow.svg' },
    { id: 3, name: t('Savings and Calendar'), icons: '/images/icons/clock-black.svg', iconSelected: '/images/icons/clock-yellow.svg' },
    { id: 4, name: t('Legal and Compliance'), icons: '/images/icons/web-protection-black.svg', iconSelected: '/images/icons/web-protection-yellow.svg' },
    { id: 5, name: t('Advanced settings'), icons: '/images/icons/settings-black.svg', iconSelected: '/images/icons/settings-yellow.svg' },
    { id: 6, name: t('Terms and Policies'), icons: '/images/icons/security_black.svg', iconSelected: '/images/icons/security_yellow.svg' },
    { id: 7, name: t('Legal documents'), icons: '/images/icons/document-attachment-black.svg', iconSelected: '/images/icons/document-attachment-yellow.svg' },
  ]

  return (
    <MainLayout>
      <div className="w-full">
        {/* Tab Navigation with hidden scrollbar */}
        <div className='flex gap-2 sm:gap-4 border-b border-gray-300 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] bg-white px-2'>
          {menuTabBar?.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative cursor-pointer text-sm py-5 px-3 font-medium flex items-center justify-center transition-colors duration-200 ${
                  isActive ? "text-[var(--color-primary)]" : "text-[#364152] hover:text-[var(--color-primary)]"
                }`}
              >
                <div className='flex items-center gap-2'>
                  <img src={isActive ? tab.iconSelected : tab.icons} className="w-4 h-4" alt="" />
                  <span className='text-sm sm:text-base font-medium'>{tab.name}</span>
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="propertyTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className='p-4 sm:p-6'>
          <AnimatePresence mode="sync">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 1 && <BookingSettingPpage/>}
              {activeTab === 2 && <ReviewsPages/>}
              {activeTab === 3 && <Savings_CalendarPage/>}
              {activeTab === 4 && <Legal_CompliancePage/>}
              {activeTab === 5 && <AdvancedSettingsPages/>}
              {activeTab === 6 && <Terms_PoliciesPage/>}
              {activeTab === 7 && <LegalDocumentsPages/>}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}

export default Property_ModulePage