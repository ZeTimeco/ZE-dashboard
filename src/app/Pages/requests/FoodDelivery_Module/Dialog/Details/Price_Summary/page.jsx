'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Price_SummaryPage() {
    const {t} = useTranslation()
  
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Price Summary')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Subtotal')} </p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span> 45</span>
            <span>EG</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Delivery fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>12</span>
            <span>EG</span>
          </p> 
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Service fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>32</span>
            <span>EG</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('payment method')} </p>
          <p className='flex gap-1 text-[#4D0CE7] text-sm font-normal'>
            <img src="/images/icons/credit-card-darkBlue.svg" alt="" />
            بطاقة
          </p>
        </div>

        <div className='border border-dashed border-[#CDD5DF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Total')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>44</span>
            <span>eg</span>
          </p>
        </div>

      </div>


      


    </div>

    </>
  )
}

export default Price_SummaryPage