"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function SeatingDetails() {
  const {t} = useTranslation()
  
  return (
    <>

  <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='flex gap-1'>
          <img src="/images/icons/restaurant-yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Seating details')}</span>
        </p>

        <div className='mt-6 grid grid-cols-2 gap-6'>
          {/* The hall */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The hall')}</p>
            <p className='text-[#364152] text-lg'>القاعة الرئيسية</p>
          </div>
          {/* The view */}
          <div className='font-normal '>
            <p className='text-[#697586] text-base'>{t('Table number')}</p>
            <p className='text-[#364152] text-lg'>t5</p>
          </div>
          {/* The table */}
          <div className='font-normal'>
            <p className='text-[#697586] text-base'>{t('The view')}</p>
            <p className='text-[#364152] text-lg'> الاطلالة علي الحديقة</p>
          </div>

          
        </div>

        {/* Special Notes  */}
        <div className='mt-4'>
          <p className='text-[#697586] text-base mb-1'>{t('Special Notes')}</p>
          <div className='flex gap-4'>
            <p className='bg-[#EDE7FD] border border-[#E2E2E2] w-fit h-10 px-3 rounded-full flex  items-center'>
              <span className='text-[#505050]'> ممنوع التدخين</span>
            </p>

          </div>
          
        </div>
      </div>

    </>
  )
}

export default SeatingDetails