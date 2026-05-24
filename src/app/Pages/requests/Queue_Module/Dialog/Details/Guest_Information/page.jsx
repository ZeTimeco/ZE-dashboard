"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function Guest_InformationPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/user_yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Guest Information')}</span>
        </p>

        <div className='mt-6 grid grid-cols-2 gap-4'>
          {/* Guest name */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Guest name')}</p>
            <p className='text-[#364152] text-lg'> احمد محمد </p>
          </div>
          {/* phone number */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('phone number')}</p>
            <p className='text-[#364152] text-lg'>+9665012345</p>
          </div>
          {/* Number of people */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Number of people')}</p>
            <p className='text-[#364152] text-lg'> 6 {t('guests')}</p>
          </div>
          {/* Booking status */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Booking status')}</p>
            <p className='text-[#17B26A] text-lg'>  ماكد </p>
          </div>
          {/* Booking code */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('Booking code')}</p>
            <p className='text-[#364152] text-lg'> #121212  </p>
          </div>
          {/* the time */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('the time')}</p>
            <p className='text-[#364152] text-lg'> 7:30 مساءً  </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Guest_InformationPage