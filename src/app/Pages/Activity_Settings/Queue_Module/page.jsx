'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import Restaurant_informationPage from './Restaurant_information/page';
import Booking_settingsPage from './Booking_settings/page';
import Queue_settingsPage from './Queue_settings/page';
import Seating_tablesPage from './Seating_tables/page';
import Halls_floorPlanPage from './Halls_floorPlan/page';
import NotificationsPage from './Notifications/page';
import PaymentsPage from './Payments/page';
import Staff_AuthoritiesPage from './Staff_Authorities/page';
import Opening_closingHoursPage from './Opening_closingHours/page';

function Queue_ModulePage() {
  const {t} = useTranslation() 

  const [activeTab, setActiveTab] = useState(1);

  const menuTabBar = [
    {id:1 , name:t('Restaurant information') , icons:'/images/icons/store-black.svg' , iconSelected:'/images/icons/store-yellow.svg'},
    {id:2 , name:t('Booking settings') , icons:'/images/icons/calendar-gray.svg' , iconSelected:'/images/icons/calendar-yellow2.svg'},
    {id:3 , name:t('Queue settings') , icons:'/images/icons/user-group-black.svg' , iconSelected:'/images/icons/user-group_yellow.svg'},
    {id:4 , name:t('Seating and tables') , icons:'/images/icons/restaurant-black.svg' , iconSelected:'/images/icons/restaurant-yellow.svg'},
    {id:5 , name:t('Halls and floor plan') , icons:'/images/icons/maps-location_Black.svg' , iconSelected:'/images/icons/maps-location-yellow.svg'},
    {id:6 , name:t('notifications') , icons:'/images/icons/notification_black.svg' , iconSelected:'/images/icons/notification-yellow.svg'},
    {id:7 , name:t('Payments') , icons:'/images/icons/credit-card-black.svg' , iconSelected:'/images/icons/credit-card-yellow.svg'},
    {id:8 , name:t('Staff and authorities') , icons:'/images/icons/security_black.svg' , iconSelected:'/images/icons/security_yellow.svg'},
    {id:9 , name:t('Opening and closing hours') , icons:'/images/icons/clock-black.svg' , iconSelected:'/images/icons/clock-yellow.svg'},
  ]

  return (
    <MainLayout>
      
      <div>
        <div className='flex  gap-4 border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none '>
          {menuTabBar?.map((tab)=>(
            <button 
              key={tab.id}
              onClick={()=>setActiveTab(tab.id)}
              className={`w-full cursor-pointer text-sm py-6 px-6 font-normal flex items-center justify-center ${
                activeTab === tab.id ? "text-[var(--color-primary)] border-b w-full border-[var(--color-primary)]" :"text-[#364152]"
              }`}
            >
              <div className='flex gap-1'>
                <img src={activeTab === tab.id ? tab.iconSelected : tab.icons} className="w-5 h-5 mt-1" />
                <p className='flex items-center'>
                  <span className='text-base font-medium' >{tab.name}</span>
                </p>
              </div>
              
            </button>
          ))}
        </div>
        
        <div className='mt-4'>
          {activeTab===1 && <Restaurant_informationPage/>}
          {activeTab===2 && <Booking_settingsPage/>}
          {activeTab===3 && <Queue_settingsPage/>}
          {activeTab===4 && <Seating_tablesPage/>}
          {activeTab===5 && <Halls_floorPlanPage/>}
          {activeTab===6 && <NotificationsPage/>}
          {activeTab===7 && <PaymentsPage/>}
          {activeTab===8 && <Staff_AuthoritiesPage/>}
          {activeTab===9 && <Opening_closingHoursPage/>}

        </div>
      </div>
    </MainLayout>
  )
}

export default Queue_ModulePage