"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

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

function BoxPage({getcounters}) {
  const {t} = useTranslation();
  
  return (
    <>
      <section className='mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4'>

        {/* Today bookings */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-red-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-red-50 text-red-600 rounded-3px group-hover:scale-110 group-hover:bg-red-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/invoice-red.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Today bookings')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {getcounters?.today_reservations_count ?? 0}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-red-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>
      
        {/* Active tables */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-emerald-50 text-emerald-600 rounded-3px group-hover:scale-110 group-hover:bg-emerald-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/invoice-green.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Active tables')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {getcounters?.active_tables_count ?? 0}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* waiting list */}
        <motion.div 
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-amber-50 text-amber-600 rounded-3px group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/loading-yellow.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('waiting list')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {getcounters?.waitlist_count ?? 0}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Complete */}
        <motion.div 
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-violet-50 text-violet-600 rounded-3px group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/tick-blue.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Complete')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {getcounters?.completed_count ?? 0}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-violet-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

      </section>
    </>
  )
}

export default BoxPage