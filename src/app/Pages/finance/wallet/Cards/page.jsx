"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import TitleOfCardsPage from './TitleOfCards/page'
import { useTranslation } from 'react-i18next'
import WithdrawDialogPage from './WithdrawDialog/page'

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function CardsPage({TaxesData}) {
  const { t } = useTranslation()
  const [open , setOpen] = useState(false)
  
  return (
    <>
      <TitleOfCardsPage/>

      <div className='grid grid-cols-2  gap-8'>

        {/* first card */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300 flex flex-col justify-between'
        >
          <div>
            {/* title */}
            <div className='flex items-center gap-4 mb-6'>
              <div className='w-14 h-14 bg-[#FEF0C7] text-amber-600 flex justify-center items-center rounded-xl group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
                <img src="/images/icons/Available balance.svg" alt="" className='w-7 h-7 transition-transform duration-300 group-hover:rotate-3' />
              </div>
              <p className='text-slate-600 font-medium text-lg lg1:text-xl group-hover:text-slate-900 transition-colors'>{t('Available balance')}</p>
            </div>

            <p className='text-slate-900 text-2xl lg1:text-[32px] font-bold tracking-tight'>{TaxesData?.total_earnings} جنية</p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* second card */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-6 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-4 mb-6'>
            <div className='w-14 h-14 bg-[#EDE7FD] text-violet-600 flex justify-center items-center rounded-xl group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/Available_withdrawal.svg" alt="" className='w-7 h-7 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-lg lg1:text-xl group-hover:text-slate-900 transition-colors'>{t('Available balance for withdrawal')}</p>
          </div>

          <p className='text-slate-900 text-2xl lg1:text-[32px] font-bold tracking-tight'>{TaxesData?.withdraw_amount} جنية</p>

          <motion.button 
            whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(true)} 
            className='w-full h-14 bg-[var(--color-primary)] text-white rounded-xl text-base font-semibold cursor-pointer my-6 shadow-sm hover:shadow-md transition-all'
          >
            {t('to withdraw')}
          </motion.button>
          <div className='absolute -bottom-6 -left-6 w-24 h-24 bg-violet-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

      </div>

      <WithdrawDialogPage open={open} setOpen={setOpen} />
    </>
  )
}

export default CardsPage