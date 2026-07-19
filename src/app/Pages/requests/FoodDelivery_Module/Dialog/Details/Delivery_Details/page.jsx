'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Delivery_DetailsPage() {
  const {t} = useTranslation()
  
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-base font-normal'>{t('Customer Information')}</p>

      {/*  */}
      <div className='my-3 flex gap-2'>
        <p className='bg-[#F9F5E8] w-7 h-7  rounded-full flex items-center justify-center'>
          <img src="/images/icons/location.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'>شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
      </div>

      {/*  */}
      <div className=' flex gap-2'>
        <p className='bg-[#EDE7FD] w-7 h-7  rounded-full flex items-center justify-center'>
          <img src="/images/icons/clock-blue.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'> 
          {t('Expected time')}: 30-50 دقيقة
        </p>
      </div>

    </div>

    </>
  )
}

export default Delivery_DetailsPage