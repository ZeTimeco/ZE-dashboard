"use client"
import AddBtn from '@/app/Components/Buttons/AddBtn'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
    const {t} = useTranslation()
  
  return (
    <>
      <div className='py-4 px-6  '>
        <div className='flex justify-between'>
          <div className='flex gap-2 '>
            <p className='w-10 h-10 bg-[#EDE7FD] flex justify-center items-center rounded-[3px]'>
              <img src="/images/icons/user-settings-blue.svg" alt=""  className='w-5.5 h-5.5 '/>
            </p>
            <p className='flex items-center text-[#364152] text-base font-normal'>{t('Staff and shifts')}</p>
          </div>
          <AddBtn
            label={t('Add a new employee')}
            href='/Pages/Activity_Settings/FoodDelivery_Module/Staff_and_shifts/Add'
          
          />

        </div>
        
        
      </div>
      <hr className='border-0.5 border-[#E4E6EF]'/>

    </>
  )
}

export default Header