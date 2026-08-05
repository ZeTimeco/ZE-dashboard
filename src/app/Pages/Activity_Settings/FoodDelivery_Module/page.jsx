'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
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
          {activeTab===1 && <Restaurant_conditionPage/>}
          {activeTab===2 && <Restaurant_informationPage/>}
          {activeTab===3 && <Order_settingsPage/>}
          {activeTab===4 && <ListPage/>}
          {activeTab===5 && <Working_hoursPage/>}
          {activeTab===6 && <Connection_settingsPage/>}
          {activeTab===7 && <NotificationsPage/>}
          {activeTab===8 && <ReviewsPage/>}
          {activeTab===9 && <Powers_and_rolesPage/>}
          {activeTab===10 && <ReportsPage/>}
          {activeTab===11 && <Staff_and_shiftsPage/>}

        </div>
      </div>

    </MainLayout>
  )
}

export default FoodDelivery_ModulePage