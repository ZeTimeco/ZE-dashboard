'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Delivery_DetailsPage({getOrderById}) {
  const {t} = useTranslation()
  const getOrderByIdData = getOrderById?.data

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px] bg-white'
    >
      <p className='text-[#364152] text-base font-normal mb-3'>{t('Customer Information')}</p>

      {/* Address */}
      <div className='my-3 flex items-center gap-2 rounded-[3px] p-1 -mx-1 hover:bg-gray-50/70 transition-colors duration-150'>
        <p className='bg-[#F9F5E8] w-7 h-7 rounded-full flex items-center justify-center shrink-0'>
          <img src="/images/icons/location.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'>{getOrderByIdData?.delivery_address}</p>
      </div>

      {/* Expected time */}
      <div className='flex items-center gap-2 rounded-[3px] p-1 -mx-1 hover:bg-gray-50/70 transition-colors duration-150'>
        <p className='bg-[#EDE7FD] w-7 h-7 rounded-full flex items-center justify-center shrink-0'>
          <img src="/images/icons/clock-blue.svg" className="w-4 h-4" />
        </p>
        <p className='text-[#364152] text-base font-normal'> 
          {t('Expected time')} : {getOrderByIdData?.estimated_time_min} - {getOrderByIdData?.estimated_time_max} {t('minute')}
        </p>
      </div>
    </motion.div>
  )
}

export default Delivery_DetailsPage