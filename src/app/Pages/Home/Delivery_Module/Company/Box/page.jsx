"use client";
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';



function BoxPage({getCompanyDashboard}) {
  const {t} = useTranslation();
  
  const getCompanyDashboardStatistics = getCompanyDashboard?.statistics

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

  return (
    <>
      <section className='grid grid-cols-2  lg1:grid-cols-4 gap-4'>

        {/* New requests */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#FDF7E8] text-amber-600 rounded-3px group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/Connections_yellow.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t("New requests")}
            </p>
          </div>
          <div className='mt-4 '>
            <p className='text-slate-900 text-lg  font-medium tracking-tight'>
              {getCompanyDashboardStatistics?.new_orders_count} {t('pound')}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-red-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>
      
        {/* Today's profits */}
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
              <img src="/images/icons/save-money-dollar-green.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t("Today's profits")}
            </p>
          </div>
          <div className='mt-4'>
            <p className='text-slate-900 text-lg font-medium tracking-tight'>
              {getCompanyDashboardStatistics?.today_earnings}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Active connections */}
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
              <img src="/images/icons/checkmark-circle-orange.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Active connections')}
            </p>
          </div>
          <div className='mt-4 '>
            <p className='text-slate-900 text-lg font-medium tracking-tight'>
              {getCompanyDashboardStatistics?.active_deliveries_count}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Connected drivers */}
        <motion.div 
          custom={3}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] text-violet-600 rounded-3px group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/delivery-truck-blue.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Connected drivers')}
            </p>
          </div>

          <div className='mt-4 '>
            <p className='text-slate-900 text-lg font-medium tracking-tight flex items-center gap-1.5'>
              {getCompanyDashboardStatistics?.online_drivers_count}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-violet-500/5 rounded-3px blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>
      

      </section>
    </>
  )
}

export default BoxPage
