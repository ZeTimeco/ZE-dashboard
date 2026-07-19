'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Products_RequestedPage() {
  const {t} = useTranslation()
  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Required products')}</p>

        
        <div>
          <div className='flex gap-2'>
            <p className='bg-[var(--color-primary)] text-white w-5.5 h-5.5 rounded-full flex justify-center items-center'>
              <span>1</span>
            </p>
            <p className='text-[#364152] text-base font-normal '>برجر كلاسيك</p>
          </div>

          <div className='flex gap-2 mt-3'>
            <button className='flex items-center bg-[#EDE7FD] h-8 px-2 rounded-full'>
              <span className='flex items-center'>
                <img src="/images/icons/AddGrayIcon.svg" className="w-4 h-4" />
              </span>
              <span className='text-[#364152] text-sm'>جبنة إضافية</span>
            </button>
          </div>

          <div className='flex justify-end'>
            <p className='text-[var(--color-primary)] text-base font-medium'>25.00 جنية</p>
          </div>

          <div className='border border-[#E3E8EF] my-4'></div>

        </div>

      </div>

    </>
  )
}

export default Products_RequestedPage