'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Role() {
    const {t} = useTranslation() 
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-medium'>{t('Select your role')}</p>

      <div className='grid grid-cols-3 gap-4 mt-4'>
        <button className={`border border-[#E3E8EF] rounded-[3px] text-[#4B5565] text-base font-normal w-full h-14 cursor-pointer`}>
          {t('receptionist')}
        </button>

        <button className={`border border-[#E3E8EF] rounded-[3px] text-[#4B5565] text-base font-normal w-full h-14 cursor-pointer`}>
          {t('manager')}
        </button>

        <button className={`border border-[#E3E8EF] rounded-[3px] text-[#4B5565] text-base font-normal w-full h-14 cursor-pointer`}>
          {t('employee')}
        </button>

      </div>
    </div>

    </>
  )
}

export default Role