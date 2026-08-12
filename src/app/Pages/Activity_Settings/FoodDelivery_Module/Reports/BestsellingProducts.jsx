'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function BestsellingProducts() {
  const {t} = useTranslation()
  return (
    <div>

      <p className='text-[#364152] text-base font-medium mb-4'>{t('Bestselling products')}</p>
      
      <div className='border border-[#E3E8EF] p-3 rounded-[3px] flex justify-between'>
        <div className='flex gap-2'>
          <p className='w-6 h-6 rounded-full bg-[#EEF2F6] text-[#697586] text-sm font-normal flex justify-center items-center'>1</p>
          <div  className='flex flex-col gap-1'>
            <p className='text-[#364152] text-sm font-medium'>برجر كلاسيك</p>
            <p className='text-[#4B5565] text-xs font-normal'>24 {t('to request')}</p>
          </div>
        </div>

        <div className='flex items-center'>
          <p className='text-[var(--color-primary)] text-base font-medium'>568 {t('pound')}</p>
        </div>

      </div>
    </div>
  )
}

export default BestsellingProducts