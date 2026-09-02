"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PerformancePage({ analysisProperties }) {
  const { t } = useTranslation()
  const analysisPropertiesMonthlyAnalysis = analysisProperties?.monthly_analysis

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.15)] bg-white border border-slate-100 p-4 mb-4 rounded-[3px] transition-all duration-300 hover:shadow-md'>
        <p className='text-[#0F022E] text-base font-medium'>{t('Performance this month')}</p>
        <div className='border-b border-[#CDD5DF]/60 mt-3 mb-2'></div>
        <div className='grid grid-cols-2 gap-4 p-2'>
          {/* Total bookings */}
          <div className='p-2 rounded-[2px] transition-colors duration-200 hover:bg-slate-50/70'>
            <p className='text-[#697586] text-xs lg1:text-sm font-normal'>{t('Total bookings')}</p>
            <p className='text-[#364152] text-sm lg1:text-base font-semibold mt-1'>{analysisPropertiesMonthlyAnalysis?.bookings_count ?? 0}</p>
          </div>

          {/* Occupancy rate */}
          <div className='p-2 rounded-[2px] transition-colors duration-200 hover:bg-slate-50/70'>
            <p className='text-[#697586] text-xs lg1:text-sm font-normal'>{t('Occupancy rate')}</p>
            <p className='text-[#364152] text-sm lg1:text-base font-semibold mt-1'>{analysisPropertiesMonthlyAnalysis?.total_occupancy ?? 0}%</p>
          </div>

          {/* profits */}
          <div className='p-2 rounded-[2px] transition-colors duration-200 hover:bg-slate-50/70'>
            <p className='text-[#697586] text-xs lg1:text-sm font-normal'>{t('profits')}</p>
            <p className='text-[var(--color-primary)] text-sm lg1:text-base font-semibold mt-1'>{analysisPropertiesMonthlyAnalysis?.total_profit ?? 0}</p>
          </div>

          {/* Average rating */}
          <div className='p-2 rounded-[2px] transition-colors duration-200 hover:bg-slate-50/70'>
            <p className='text-[#697586] text-xs lg1:text-sm font-normal'>{t('Average rating')}</p>
            <p className='flex items-center gap-1 mt-1'>
              <img src="/images/icons/star.svg" alt="" className='w-4 h-4' />
              <span className='text-[#364152] text-sm lg1:text-base font-semibold'>{analysisPropertiesMonthlyAnalysis?.avg_rating ?? 0}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default PerformancePage