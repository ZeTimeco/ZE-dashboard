'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DeliveryChannels() {
    const {t} = useTranslation() 
  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Delivery channels')}</p>

        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Booking confirmation')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/notification-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('pay')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/smart-phone-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('text message')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/mail-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('mail')}</p>
            </button>
          </div>
        </div>


        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Ready-made table notice')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/notification-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('pay')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/smart-phone-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('text message')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/mail-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('mail')}</p>
            </button>
          </div>
        </div>


        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Provider alerts')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/notification-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('pay')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/smart-phone-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('text message')}</p>
            </button>

            {/*  */}
            <button className={`border border-[#E3E8EF] flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer`}>
              <img src="/images/icons/mail-gray.svg" className="w-5 h-5" />
              <p className='text-[#4B5565] text-sm font-normal'>{t('mail')}</p>
            </button>
          </div>
        </div>
      </div>

    </>
  )
}

export default DeliveryChannels