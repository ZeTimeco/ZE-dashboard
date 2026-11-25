'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Restaurant_informationPage from './Restaurant_information/page';
import Booking_settingsPage from './Booking_settings/page';
import Queue_settingsPage from './Queue_settings/page';
import Seating_tablesPage from './Seating_tables/page';
import Halls_floorPlanPage from './Halls_floorPlan/page';
import NotificationsPage from './Notifications/page';
import PaymentsPage from './Payments/page';
import Staff_AuthoritiesPage from './Staff_Authorities/page';
import Opening_closingHoursPage from './Opening_closingHours/page';

const tabContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const tabItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

const contentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit:   { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
}

function Queue_ModulePage() {
  const {t} = useTranslation() 
  const searchParams = useSearchParams()

  const [activeTab, setActiveTab] = useState(1);
  const tabsContainerRef = useRef(null);
  const tabRefs = useRef({});

  const scrollToTab = (tabId) => {
    const tabEl = tabRefs.current[tabId];
    if (tabEl) {
      tabEl.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    scrollToTab(tabId);
  };

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      const tabNum = Number(tab);
      setActiveTab(tabNum);
      scrollToTab(tabNum);
    }
  }, [searchParams])

  useEffect(() => {
    scrollToTab(activeTab);
  }, [activeTab]);

  const menuTabBar = [
    {id:1, name:t('Restaurant information'), icons:'/images/icons/store-black.svg',          iconSelected:'/images/icons/store-yellow.svg'},
    {id:2, name:t('Booking settings'),       icons:'/images/icons/calendar-gray.svg',         iconSelected:'/images/icons/calendar-yellow2.svg'},
    {id:3, name:t('Queue settings'),         icons:'/images/icons/user-group-black.svg',      iconSelected:'/images/icons/user-group_yellow.svg'},
    {id:4, name:t('Seating and tables'),     icons:'/images/icons/restaurant-black.svg',      iconSelected:'/images/icons/restaurant-yellow.svg'},
    {id:5, name:t('Halls and floor plan'),   icons:'/images/icons/maps-location_Black.svg',   iconSelected:'/images/icons/maps-location-yellow.svg'},
    {id:6, name:t('notifications'),          icons:'/images/icons/notification_black.svg',    iconSelected:'/images/icons/notification-yellow.svg'},
    {id:7, name:t('Payments'),               icons:'/images/icons/credit-card-black.svg',     iconSelected:'/images/icons/credit-card-yellow.svg'},
    {id:8, name:t('Staff and authorities'),  icons:'/images/icons/security_black.svg',        iconSelected:'/images/icons/security_yellow.svg'},
    {id:9, name:t('Opening and closing hours'), icons:'/images/icons/clock-black.svg',        iconSelected:'/images/icons/clock-yellow.svg'},
  ]

  const tabPages = {
    1: <Restaurant_informationPage/>,
    2: <Booking_settingsPage/>,
    3: <Queue_settingsPage/>,
    4: <Seating_tablesPage/>,
    5: <Halls_floorPlanPage/>,
    6: <NotificationsPage/>,
    7: <PaymentsPage/>,
    8: <Staff_AuthoritiesPage/>,
    9: <Opening_closingHoursPage/>,
  }

  return (
    <MainLayout>
      <div>
        {/* Tab Bar */}
        <motion.div
          ref={tabsContainerRef}
          className='flex gap-4 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none scroll-smooth'
          variants={tabContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuTabBar?.map((tab) => (
            <motion.button
              key={tab.id}
              ref={(el) => { tabRefs.current[tab.id] = el; }}
              variants={tabItemVariants}
              onClick={() => handleTabClick(tab.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative flex-shrink-0 cursor-pointer text-sm py-6 px-6 font-normal flex items-center justify-center transition-colors duration-200 ${
                activeTab === tab.id ? 'text-primary' : 'text-[#364152]'
              }`}
            >
              <div className='flex gap-1'>
                <img
                  src={activeTab === tab.id ? tab.iconSelected : tab.icons}
                  className="w-5 h-5 mt-1"
                  alt=""
                />
                <p className='flex items-center'>
                  <span className='text-base font-medium'>{tab.name}</span>
                </p>
              </div>

              {/* Animated active underline */}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="queueModuleActiveTab"
                  className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full'
                  transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Tab Content with AnimatePresence */}
        <div className='mt-4'>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {tabPages[activeTab]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}

export default Queue_ModulePage
