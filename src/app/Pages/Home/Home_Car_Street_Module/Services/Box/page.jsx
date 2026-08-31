"use client";
import { getProviderStateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import Loader from '@/app/Components/Loader/Loader';

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

function BoxPage({current_module_key}) {
  const {t} = useTranslation();
  
  //API
  const dispatch = useDispatch()
  const {providerState , loading}= useSelector((state)=>state.Home)

  useEffect(() => {
    dispatch(getProviderStateThunk())
  }, [dispatch]);

  // Determine the role of the provider
  const role = providerState?.role  // 'freelance'  'company'

  if (loading) return <Loader />;

  return (
    <>
      <section className='grid grid-cols-2  lg1:grid-cols-4 gap-4'>

        {/* New orders */}
        <motion.div 
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-red-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-red-50 text-red-600 rounded-xl group-hover:scale-110 group-hover:bg-red-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/invoice-red.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('New orders')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {t('today')} <span className='text-red-600 font-semibold text-lg'>({providerState?.new_bookings_count ?? 0})</span>
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-red-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>
      
        {/* Current Orders */}
        <motion.div 
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-emerald-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 group-hover:bg-emerald-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/invoice-green.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('Current Orders')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {providerState?.ongoing_bookings_count ?? 0}
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-emerald-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* profits */}
        <motion.div 
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-12 h-12 flex justify-center items-center bg-amber-50 text-amber-600 rounded-xl group-hover:scale-110 group-hover:bg-amber-100/80 transition-all duration-300 shadow-xs'>
              <img src="/images/icons/profits-orange.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
            </div>
            <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
              {t('profits')}
            </p>
          </div>
          <div className='mt-4 flex items-baseline justify-between'>
            <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
              {t('today')} <span className='text-amber-600 font-semibold text-lg'>({providerState?.today_earnings ?? 0})</span>
            </p>
          </div>
          <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
        </motion.div>

        {/* Evaluation / Technicians */}
        {(
          current_module_key === 'street_assistant' ||
          current_module_key === 'home_services' ||
          current_module_key === 'car_services'
        ) && (
          role === 'company' ? (
            <motion.div 
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-violet-200 transition-all duration-300'
            >
              <div className='flex items-center gap-3.5'>
                <div className='w-12 h-12 flex justify-center items-center bg-violet-50 text-violet-600 rounded-xl group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
                  <img src="/images/icons/labor-blue.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
                </div>
                <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
                  {t('Available technicians')}
                </p>
              </div>

              <div className='mt-4 flex items-baseline justify-between'>
                <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight flex items-center gap-1.5'>
                  <span className='text-violet-600 font-bold'>{providerState?.handymen_count ?? 0}</span>{' '}
                  <span className='text-slate-600 text-sm font-normal'>{t('Technicians')}</span>
                </p>
              </div>
              <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-violet-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
            </motion.div>
          ) : (
            <motion.div 
              custom={3}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className='group relative overflow-hidden bg-white border border-slate-200/85 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-amber-200 transition-all duration-300'
            >
              <div className='flex items-center gap-3.5'>
                <div className='w-12 h-12 flex justify-center items-center bg-violet-50 text-violet-600 rounded-xl group-hover:scale-110 group-hover:bg-violet-100/80 transition-all duration-300 shadow-xs'>
                  <img src="/images/icons/Evaluation-blue.svg" alt="" className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3' />
                </div>
                <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
                  {t('Evaluation')}
                </p>
              </div>

              <div className='mt-4 flex items-center gap-1.5'>
                <img src="/images/icons/star.svg" alt="" className='w-5 h-5 transition-transform group-hover:scale-110' />
                <p className='text-amber-500 text-xl lg1:text-2xl font-bold tracking-tight'>
                  {providerState?.average_rating ?? 0}
                </p>
              </div>
              <div className='absolute -bottom-6 -left-6 w-20 h-20 bg-amber-500/5 rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500'></div>
            </motion.div>
          )
        )}

      </section>
    </>
  )
}

export default BoxPage
