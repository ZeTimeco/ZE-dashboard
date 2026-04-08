"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ProfitsPage() {
  const {t} = useTranslation()
  return (
    <>  
    <div className='border border-[#E3E8EF] rounded-[3px] p-4'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Your profits')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Total amount')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>500.00 </span>
            <span> ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Platform fees')} (10%)</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

        <div className='border border-dashed border-[#CDD5DF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Net profit')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

      </div>
    </div>
    
    </>
  )
}

export default ProfitsPage