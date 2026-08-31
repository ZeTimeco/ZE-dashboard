'use client'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FilterPage from '../Filter/page'

function TitleOfTransactionsPage({onFilterApply}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='flex justify-between items-center mb-8'>
        <div className='flex items-center gap-3'>
          <p className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] rounded-[3px] shrink-0'>
            <img src="/images/icons/Transactions.svg" alt="" className='w-6 h-6' />
          </p>
          <div>
            <p className='text-[#364152] text-xl font-medium'>{t('Transactions')}</p>
            <p className='text-[#697586] text-base font-light'>{t('Track your financial transactions accurately and easily from one organized place.')}</p>
          </div>
        </div>

        {/* FilterBtn */}
        <div>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)}
            className='flex gap-3 justify-center items-center border h-12 px-5 border-[#C69815] rounded-[3px] cursor-pointer transition-colors'
          >
            <img src="/images/icons/FlterIcon.svg" alt="" className='w-5 h-5' />
            <span className='text-[var(--color-primary)] text-base font-medium'>{t('filter')}</span>
          </motion.button>
        </div>
      </div>

      <FilterPage open={open} setOpen={setOpen} onFilterApply={onFilterApply}/>
    </>
  )
}

export default TitleOfTransactionsPage