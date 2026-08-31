"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function HeaderOfTaxesPage() {
  const { t } = useTranslation()

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className='flex justify-between items-center mb-2'
      >
        <div className='w-[65%] lg1:w-fit'>
          <p className='text-[#364152] text-2xl font-medium'>{t('Taxes')}</p>

          <div className='flex items-center bg-[#FEF3F2] h-auto min-h-14 py-3 px-4 rounded-[3px] mt-3 border border-[#FECDCA]'>
            <p className='text-[#DC6803] text-sm font-normal'>{t('Profits and taxes are calculated for the current fiscal year from 01/07/2025 to 31/06/2026')}</p>
          </div>
        </div>

        <div className='flex justify-end items-center transition-transform duration-150 hover:scale-[1.02] active:scale-[0.98]'>
          <ExtractBtn/>
        </div>
      </motion.div>
    </>
  )
}

export default HeaderOfTaxesPage