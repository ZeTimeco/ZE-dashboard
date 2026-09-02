"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AbbreviationsPage() {
  const {t} = useTranslation();

  return (
    <>
      <div className='bg-white border border-slate-200/90 rounded-3px p-6 shadow-xs'>
        <h2 className='text-slate-900 text-xl font-semibold tracking-tight mb-5'>
          {t('Abbreviations')}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {/* Submit a complaint */}
          <motion.div 
            custom={0}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className='group relative overflow-hidden flex flex-col gap-3 bg-white border border-slate-200/90 rounded-3px p-5 items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300'
          >
            <div className='w-14 h-14 rounded-3px bg-red-50/80 flex items-center justify-center border border-red-100/60 group-hover:scale-110 group-hover:bg-red-100 group-hover:rotate-3 transition-all duration-300 shadow-2xs'>
              <img src="/images/icons/Submit_complaint.svg" alt="" className='w-6 h-7 object-contain transition-transform duration-300' />
            </div>
            <p className='text-slate-700 text-sm md:text-base font-medium group-hover:text-slate-900 transition-colors text-center'>
              {t('Submit a complaint')}
            </p>
          </motion.div>

          {/* Technical support */}
          <motion.div 
            custom={1}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className='group relative overflow-hidden flex flex-col gap-3 bg-white border border-slate-200/90 rounded-3px p-5 items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300'
          >
            <div className='w-14 h-14 rounded-3px bg-blue-50/80 flex items-center justify-center border border-blue-100/60 group-hover:scale-110 group-hover:bg-blue-100 group-hover:rotate-3 transition-all duration-300 shadow-2xs'>
              <img src="/images/icons/technical-support.svg" alt="" className='w-7 h-7 object-contain transition-transform duration-300' />
            </div>
            <p className='text-slate-700 text-sm md:text-base font-medium group-hover:text-slate-900 transition-colors text-center'>
              {t('technical support')}
            </p>
          </motion.div>

          {/* Working hours */}
          <motion.div 
            custom={2}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, scale: 1.015 }}
            whileTap={{ scale: 0.98 }}
            className='group relative overflow-hidden flex flex-col gap-3 bg-white border border-slate-200/90 rounded-3px p-5 items-center justify-center cursor-pointer hover:border-[var(--color-primary)] hover:shadow-md transition-all duration-300'
          >
            <div className='w-14 h-14 rounded-3px bg-amber-50/80 flex items-center justify-center border border-amber-100/60 group-hover:scale-110 group-hover:bg-amber-100 group-hover:rotate-3 transition-all duration-300 shadow-2xs'>
              <img src="/images/icons/working_hours.svg" alt="" className='w-6 h-7 object-contain transition-transform duration-300' />
            </div>
            <p className='text-slate-700 text-sm md:text-base font-medium group-hover:text-slate-900 transition-colors text-center'>
              {t('working hours')}
            </p>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default AbbreviationsPage
