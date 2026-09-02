"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function ActionPage({ analysisProperties }) {
  const { t } = useTranslation()
  const analysisPropertiesPending = analysisProperties?.pending

  return (
    <>
      {analysisPropertiesPending?.show_section && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='group border border-[#FEC84B] bg-[#FFFCF5] rounded-[3px] p-5 mb-8 transition-shadow duration-300 hover:shadow-md'
        >
          <div className='flex items-center gap-2 mb-2'>
            <img src="/images/icons/alert-yellow.svg" className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" alt="" />
            <p className='text-[#364152] text-lg font-medium'>{t('Action required')}</p>
          </div>

          <p className='text-[#697586] text-base font-normal mb-3'>{analysisPropertiesPending?.message}</p>
            
          <motion.button 
            whileHover={{ scale: 1.01, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
            whileTap={{ scale: 0.98 }}
            className='bg-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-12 rounded-[3px] cursor-pointer transition-all duration-200'
          >
            <span className='text-white text-sm font-medium'>{t('Review now')}</span>  
            <img src="/images/icons/arrow-left-white.svg" className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" alt="" />
          </motion.button>
        </motion.div>
      )}
    </>
  )
}

export default ActionPage