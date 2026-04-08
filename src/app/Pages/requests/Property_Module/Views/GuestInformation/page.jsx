"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function GuestInformationPage() {
  const {t} = useTranslation()
  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[3px] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium mb-6'>{t('Guest Information')}</p>

      {/*  */}
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <p className='w-10 h-10 bg-[#007AFF] text-white rounded-full flex justify-center items-center'>a</p>
          <div>
            <p className='text-[#364152] text-base font-medium'>شاكر سعيد</p>
            <p className='text-[#4B5565] text-base font-normal'>2 {t('Reservations')}</p> 
          </div>
        </div>

        {/* ضيف متكرر */}
        <p className='border border-[#079455] bg-[#DCFAE6] text-[#079455] h-7.5 px-2 py-1 rounded-[3px]'>
          {t('Frequent guest')}
        </p>

      </div>

      <div className='border border-[#E3E8EF] my-4 h-0.5'></div>

      {/*  */}
      <div className='flex justify-between font-normal'>
        <p className='text-[#4B5565] text-base '>{t('Mobile number')}</p>
        <p className='text-[#364152] text-base '>1 123-4567(555)+</p>
      </div>

      {/*  */}
      <div className='flex justify-between font-normal mt-3 mb-6'>
        <p className='text-[#4B5565] text-base '>{t('Email')}</p>
        <p className='text-[#364152] text-base '>Exmple@gmail.com</p>
      </div>

      {/*  */}
      <div className='flex gap-4'>
        <button className='flex justify-center items-center gap-2.5 h-14 bg-[#ECFDF3] py-2.5 px-4 w-full rounded-[3px] cursor-pointer'>
          <img src="/images/icons/call-green.svg" className="w-5 h-5" />
          <p className='text-[#079455] text-base font-medium'>{t('communication')}</p>
        </button>

        <button className='flex justify-center items-center h-14 gap-2.5 bg-[#EDE7FD] py-2.5 px-4 w-full rounded-[3px] cursor-pointer'>
          <img src="/images/icons/chat_blue.svg" className="w-5 h-5" />
          <p className='text-[#4D0CE7] text-base font-medium'>{t('conversation')}</p>
        </button>
      </div>

    </div>

    </>
  )
}

export default GuestInformationPage