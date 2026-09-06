'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Box({getMenuStatistics}) {
  const {t} = useTranslation()

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
      {/* Products */}
      <motion.div 
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        className='border border-[#CDD5DF] rounded-[3px] p-4 bg-white transition-all duration-200'
      >
        <div className='flex items-center gap-3'>
          <p className='w-10 h-10 flex justify-center items-center bg-[#F4EAD0] rounded-md shrink-0'>
            <img src="/images/icons/package_yellow.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Products')}</p>
        </div>
        <p className='text-lg my-2.5'>
          <span className='text-[#202939] font-medium'>{getMenuStatistics?.statistics?.total_products ?? 0}</span> 
        </p>
      </motion.div>

      {/* available */}
      <motion.div 
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        className='border border-[#CDD5DF] rounded-[3px] p-4 bg-white transition-all duration-200'
      >
        <div className='flex items-center gap-3'>
          <p className='w-10 h-10 flex justify-center items-center bg-[#DCFAE6] rounded-md shrink-0'>
            <img src="/images/icons/checkmark-circle-true.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('available')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{getMenuStatistics?.statistics?.total_available ?? 0}</p>
      </motion.div>

      {/* Not available */}
      <motion.div 
        whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
        className='border border-[#CDD5DF] rounded-[3px] p-4 bg-white transition-all duration-200'
      >
        <div className='flex items-center gap-3'>
          <p className='w-10 h-10 flex justify-center items-center bg-[#FEE4E2] rounded-md shrink-0'>
            <img src="/images/icons/checkmark-circle-false.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Not available')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{getMenuStatistics?.statistics?.total_unavailable ?? 0}</p>
      </motion.div>
    </div>
  )
}

export default Box