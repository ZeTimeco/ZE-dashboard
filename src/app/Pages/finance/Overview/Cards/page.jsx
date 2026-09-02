"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import TitleOfCardsPage from './TitleOfCards/page'

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

function CardsPage({paymentsData}) {
  const { t } = useTranslation()
  const cash = paymentsData?.weekly_stats?.cash?.percent_change ?? 0;
  const refunded = paymentsData?.weekly_stats?.refunded?.percent_change ?? 0;
  const booking = paymentsData?.weekly_stats?.booking?.percent_change ?? 0;
  const card = paymentsData?.weekly_stats?.card?.percent_change ?? 0;

  return (
    <>
      <TitleOfCardsPage/>

      <div className='grid grid-cols-2 lg1:grid-cols-4 gap-4 mb-12'>

        {/* cash */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] text-violet-600 rounded-3px group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/cash.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('cash')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {paymentsData?.cash_booking_sum}
            </p>
          </div>

          <div className='mt-3 flex gap-1 items-center pt-2 border-t border-slate-100'>
            <p className='text-[#697586] text-xs lg1:text-sm font-light'>{t('Last week')}</p>
            {cash >= 0 ? (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#17B26A] font-semibold'>
                  <span>{cash}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#F04438] font-semibold'>
                  <span>{cash}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            )}
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-violet-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* recovery */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#FEF0C7] text-amber-600 rounded-3px group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/recovery.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('recovery')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {paymentsData?.refunded_sum}
            </p>
          </div>

          <div className='mt-3 flex gap-1 items-center pt-2 border-t border-slate-100'>
            <p className='text-[#697586] text-xs lg1:text-sm font-light'>{t('Last week')}</p>
            {refunded >= 0 ? (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#17B26A] font-semibold'>
                  <span>{refunded}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#F04438] font-semibold'>
                  <span>{refunded}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            )}
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Total profits */}
        <motion.div 
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#B4F0CC] text-emerald-600 rounded-3px group-hover:scale-110 group-hover:bg-emerald-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/Total profits.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Total profits')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {paymentsData?.total_booking_price}
            </p>
          </div>

          <div className='mt-3 flex gap-1 items-center pt-2 border-t border-slate-100'>
            <p className='text-[#697586] text-xs lg1:text-sm font-light'>{t('Last week')}</p>
            {booking >= 0 ? (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#17B26A] font-semibold'>
                  <span>{booking}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#F04438] font-semibold'>
                  <span>{booking}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            )}
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* credit card */}
        <motion.div 
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-rose-200 transition-all duration-300'
        >
          {/* title */}
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#FEF3F2] text-rose-600 rounded-3px group-hover:scale-110 group-hover:bg-rose-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/credit card.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('credit card')}
            </p>
          </div>

          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {paymentsData?.card_booking_sum}
            </p>
          </div>

          <div className='mt-3 flex gap-1 items-center pt-2 border-t border-slate-100'>
            <p className='text-[#697586] text-xs lg1:text-sm font-light'>{t('Last week')}</p>
            {card >= 0 ? (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#17B26A] font-semibold'>
                  <span>{card}%</span>
                  <span>+</span>  
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/green_arrow_up.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            ) : (
              <>
                <p className='flex items-center text-xs lg1:text-sm text-[#F04438] font-semibold'>
                  <span>{card}%</span>
                </p>
                <p className='flex items-center'>
                  <img src="/images/icons/red_arrow_down.svg" alt="" className='w-3.5 h-3.5' />
                </p>
              </>
            )}
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-rose-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

      </div>
    </>
  )
}

export default CardsPage