"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PerformancePage() {
  const {t} = useTranslation()
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-3 mb-4 rounded-[3px]'>
        <p className='text-[#0F022E] text-base font-medium'>{t('Performance this month')}</p>
        <div className='border border-[#CDD5DF] mt-3'></div>
        <div className='grid grid-cols-2 gap-3 p-3'>
          {/* Total bookings */}
          <div>
            <p className='text-[#697586] text-base font-normal'>{t('Total bookings')}</p>
            <p className='text-[#364152] text-sm font-normal'>105</p>
          </div>

          {/* Occupancy rate */}
          <div>
            <p className='text-[#697586] text-base font-normal'>{t('Occupancy rate')}</p>
            <p className='text-[#364152] text-sm font-normal'>88%</p>
          </div>

          {/* profits */}
          <div>
            <p className='text-[#697586] text-base font-normal'>{t('profits')}</p>
            <p className='text-[var(--color-primary)] text-sm font-normal'>105</p>
          </div>

          {/* Average rating */}
          <div>
            <p className='text-[#697586] text-base font-normal'>{t('Average rating')}</p>
            <p className='flex gap-1' >
              <img src="/images/icons/star.svg" alt="" />
              <span className='text-[#364152] text-sm font-normal'>4.5</span>
            </p>
          </div>

        </div>
      </div>
      
    </>
  )
}

export default PerformancePage