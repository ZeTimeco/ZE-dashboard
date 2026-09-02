"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ProfitsPage({ getBookingDetails }) {
  const { t } = useTranslation()
  const getBookingDetailsData = getBookingDetails?.data

  return (
    <>  
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] p-4 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Your profits')}</p>

        <div className='space-y-3'>
          {/* Total amount */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('Total amount')}</p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{getBookingDetailsData?.total_amount}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>

          {/* Platform fees */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>
              {t('Platform fees')} ({getBookingDetailsData?.total_percentage}%)
            </p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{getBookingDetailsData?.total_tax_and_service_fee}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>

          <div className='border-b border-dashed border-[#CDD5DF] my-2'></div>

          {/* Net profit */}
          <div className='flex justify-between items-center pt-1'>
            <p className='text-[#364152] text-sm font-semibold flex items-center'>{t('Net profit')}</p>
            <p className='text-[var(--color-primary)] text-base font-bold flex gap-1'>
              <span>{getBookingDetailsData?.total_profit}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfitsPage