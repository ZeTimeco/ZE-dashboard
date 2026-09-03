'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Products_RequestedPage({getOrderById}) {
  const {t} = useTranslation()
  const getOrderByIdData = getOrderById?.data

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px] bg-white'
    >
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Required products')}</p>

      {getOrderByIdData?.items?.map((item , index)=>(
        <div key={item?.id} className="transition-colors duration-150">
          <div className='flex items-center gap-2'>
            <p className='bg-[var(--color-primary)] text-white w-5.5 h-5.5 rounded-full flex justify-center items-center text-xs font-semibold shrink-0'>
              <span>{item?.quantity}</span>
            </p>
            <p className='text-[#364152] text-base font-normal'>{item?.name}</p>
          </div>

          <div className='flex flex-wrap gap-2 mt-3'>
            {item?.extras?.map((extra)=>(
              <button
                key={extra?.id}
                className='flex items-center gap-1 bg-[#EDE7FD] h-8 px-2.5 rounded-full hover:bg-[#E2D8FB] transition-colors duration-150'
              >
                <img src="/images/icons/AddGrayIcon.svg" className="w-3.5 h-3.5" />
                <span className='text-[#364152] text-xs font-medium'>{extra?.name}</span>
              </button>
            ))}
          </div>

          <div className='flex justify-end mt-2'>
            <p className='text-[var(--color-primary)] text-base font-medium'>{item?.total_price} جنية</p>
          </div>

          {index !== getOrderByIdData?.items?.length - 1 && (
            <div className='border border-[#E3E8EF] my-4'></div>
          )}
        </div>
      ))}
    </motion.div>
  )
}

export default Products_RequestedPage