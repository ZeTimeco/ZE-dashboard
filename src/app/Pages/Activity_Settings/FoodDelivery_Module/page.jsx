'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Restaurant_conditionPage from './Restaurant_condition/page';
import Restaurant_informationPage from './Restaurant_information/page';
import Order_settingsPage from './Order_settings/page';
import ListPage from './List/page';
import Working_hoursPage from './Working_hours/page';
import Connection_settingsPage from './Connection_settings/page';
import NotificationsPage from './Notifications/page';
import ReviewsPage from './Reviews/page';
import Powers_and_rolesPage from './Powers_and_roles/page';
import ReportsPage from './Reports/page';
import Staff_and_shiftsPage from './Staff_and_shifts/page';

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

function FoodDelivery_ModulePage() {
  const {t} = useTranslation() 

  const [activeTab, setActiveTab] = useState(1);

  const menuTabBar = [
    {id:1  , name:t('Restaurant condition')    , icons:'/images/icons/store-black.svg'         , iconSelected:'/images/icons/store-yellow.svg'        },
    {id:2  , name:t('Restaurant information')  , icons:'/images/icons/store-black.svg'         , iconSelected:'/images/icons/store-yellow.svg'    },
    {id:3  , name:t('Order settings')          , icons:'/images/icons/IconSetting_gray.svg'    , iconSelected:'/images/icons/IconSetting_yellow.svg'   },
    {id:4  , name:t('list')                    , icons:'/images/icons/dish-black.svg'          , iconSelected:'/images/icons/dish-yellow.svg'   },
    {id:5  , name:t('working hours')           , icons:'/images/icons/clock-black.svg'         , iconSelected:'/images/icons/clock-yellow.svg'        },
    {id:6  , name:t('Connection settings')     , icons:'/images/icons/delivery-truck.svg'      , iconSelected:'/images/icons/delivery-truck-yellow.svg'  },
    {id:7  , name:t('notifications')           , icons:'/images/icons/notification_black.svg'  , iconSelected:'/images/icons/notification-yellow.svg' },
    {id:8  , name:t('Reviews')                 , icons:'/images/icons/star_black.svg'          , iconSelected:'/images/icons/star-yellow.svg'     },
    {id:9  , name:t('Powers and roles')        , icons:'/images/icons/user-group-black.svg'    , iconSelected:'/images/icons/user-group_yellow.svg'},
    {id:10 , name:t('Reports')                 , icons:'/images/icons/fileGray.svg'           , iconSelected:'/images/icons/fileYellow.svg'},
    {id:11 , name:t('Staff and shifts')        , icons:'/images/icons/user-settings-gray.svg'  , iconSelected:'/images/icons/user-settings-yellow.svg'},
  ]

  const tabPages = {
    1:  <Restaurant_conditionPage/>,
    2:  <Restaurant_informationPage/>,
    3:  <Order_settingsPage/>,
    4:  <ListPage/>,
    5:  <Working_hoursPage/>,
    6:  <Connection_settingsPage/>,
    7:  <NotificationsPage/>,
    8:  <ReviewsPage/>,
    9:  <Powers_and_rolesPage/>,
    10: <ReportsPage/>,
    11: <Staff_and_shiftsPage/>,
  }

  return (
    <MainLayout>
      <div>
        {/* Tab Bar */}
        <motion.div
          className='flex gap-4 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none'
          variants={tabContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {menuTabBar?.map((tab) => (
            <motion.button
              key={tab.id}
              variants={tabItemVariants}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`relative w-full cursor-pointer text-sm py-6 px-6 font-normal flex items-center justify-center transition-colors duration-200 ${
                activeTab === tab.id ? 'text-[var(--color-primary)]' : 'text-[#364152]'
              }`}
            >
              <div className='flex gap-1'>
                <img
                  src={activeTab === tab.id ? tab.iconSelected : tab.icons}
                  className="w-5 h-5 mt-1"
                />
                <p className='flex items-center'>
                  <span className='text-base font-medium'>{tab.name}</span>
                </p>
              </div>

              {/* Animated active underline */}
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabIndicator"
                  className='absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--color-primary)] rounded-full'
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

export default FoodDelivery_ModulePage