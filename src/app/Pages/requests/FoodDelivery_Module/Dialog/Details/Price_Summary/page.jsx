'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Price_SummaryPage({getOrderById}) {
  const {t} = useTranslation()
  const getOrderByIdData = getOrderById?.data

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px] bg-white'
    >
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Price Summary')}</p>

      <div>
        {/* Subtotal */}
        <div className='flex justify-between items-center py-1'>
          <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('Subtotal')}</p>
          <p className='text-[#364152] text-base font-medium flex items-center gap-1'>
            <span>{getOrderByIdData?.subtotal}</span>
            <span>ج.م</span>
          </p>
        </div>

        {/* Delivery fees */}
        <div className='flex justify-between items-center py-1 mt-2'>
          <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('Delivery fees')}</p>
          <p className='text-[#364152] text-base font-medium flex items-center gap-1'>
            <span>{getOrderByIdData?.delivery_fee}</span>
            <span>ج.م</span>
          </p> 
        </div>

        {/* Service fees */}
        <div className='flex justify-between items-center py-1 mt-2'>
          <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('Service fees')}</p>
          <p className='text-[#364152] text-base font-medium flex items-center gap-1'>
            <span>{getOrderByIdData?.service_fee}</span>
            <span>ج.م</span>
          </p>
        </div>

        {/* Payment method */}
        <div className='flex justify-between items-center py-1 mt-2'>
          <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('payment method')}</p>
          <p className='flex items-center gap-1 text-[#4D0CE7] text-sm font-normal'>
            <img src="/images/icons/credit-card-darkBlue.svg" alt="" />
            <span>{getOrderByIdData?.payment_method === 'card' ? t('card') : getOrderByIdData?.payment_method}</span>
          </p>
        </div>

        <div className='border border-dashed border-[#CDD5DF] my-3'></div>

        {/* Total */}
        <div className='flex justify-between items-center py-1'>
          <p className='text-[#364152] text-sm font-medium flex items-center'>{t('Total')}</p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex items-center gap-1'>
            <span>{getOrderByIdData?.total}</span>
            <span>ج.م</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Price_SummaryPage