'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Delivery_DetailsPage({getOrderById}) {
  const {t} = useTranslation()
  const getOrderByIdData = getOrderById?.data

  
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-base font-normal'>{t('Customer Information')}</p>

      {/*  */}
      <div className='my-3 flex gap-2'>
        <p className='bg-[#F9F5E8] w-7 h-7  rounded-full flex items-center justify-center'>
          <img src="/images/icons/location.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'> {getOrderByIdData?.delivery_address}</p>
      </div>

      {/*  */}
      <div className=' flex gap-2'>
        <p className='bg-[#EDE7FD] w-7 h-7  rounded-full flex items-center justify-center'>
          <img src="/images/icons/clock-blue.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'> 
          {t('Expected time')} : {getOrderByIdData?.estimated_time_min} - {getOrderByIdData?.estimated_time_max} {t('minute')}
        </p>
      </div>

    </div>

    </>
  )
}

export default Delivery_DetailsPage