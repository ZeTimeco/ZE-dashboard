"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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

  return (
    <>
      <div className='grid grid-cols-3 gap-4 mb-12 mt-5'>

        {/* Gross Profit */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#F4EAD0] text-amber-600 rounded-xl group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/Gross Profit.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Gross Profit')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {TaxesData?.total_earnings} جنيه
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Net Profit */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] text-violet-600 rounded-xl group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/cash.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Net Profit')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {TaxesData?.withdraw_amount} جنيه
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-violet-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* tax due */}
        <motion.div 
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-slate-300 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#EEF2F6] text-slate-600 rounded-xl group-hover:scale-110 group-hover:bg-slate-200/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/tax due.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('tax due')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {TaxesData?.total_taxes} جنيه
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-slate-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

      </div>
    </>
  )
}

export default CardsPage