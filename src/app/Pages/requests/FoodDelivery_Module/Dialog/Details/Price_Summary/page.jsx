'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Price_SummaryPage({getOrderById}) {
    const {t} = useTranslation()
    const getOrderByIdData = getOrderById?.data

  
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Price Summary')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Subtotal')} </p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span> {getOrderByIdData?.subtotal}</span>
            <span>ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Delivery fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getOrderByIdData?.delivery_fee}</span>
            <span>ج.م</span>
          </p> 
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Service fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>{getOrderByIdData?.service_fee}</span>
            <span>ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('payment method')} </p>
          <p className='flex gap-1 text-[#4D0CE7] text-sm font-normal'>
            <img src="/images/icons/credit-card-darkBlue.svg" alt="" />
            {getOrderByIdData?.payment_method === 'card' ? t('card') : getOrderByIdData?.payment_method }
          </p>
        </div>

        <div className='border border-dashed border-[#CDD5DF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Total')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>{getOrderByIdData?.total}</span>
            <span>ج.م</span>
          </p>
        </div>

      </div>


      


    </div>

    </>
  )
}

export default Price_SummaryPage