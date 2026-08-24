'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function Rating() {
  const { t } = useTranslation()
  const { getReport } = useSelector((state) => state.setting)

  const timeDistribution = getReport?.time_distribution
  const timeSlots = timeDistribution 

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className='bg-white border border-[#E3E8EF] shadow-2xs hover:shadow-md rounded-3px p-5 flex flex-col gap-4 w-full transition-shadow duration-300'
    >
      {/* Header */}
      <div className='flex items-center gap-2.5 border-b border-slate-100 pb-3'>
        <div className="p-2 rounded-3px bg-primary/10 text-primary">
          <img src="/images/icons/clock.svg" className='w-5 h-5' alt="" />
        </div>
        <p className='text-[#0B0E11] text-base font-semibold'>{t('Orders by time')}</p>
      </div>

      {/* Progress bars */}
      <div className='flex flex-col gap-4 mt-1'>
        {timeSlots?.map((slot, index) => {
          const pct = slot?.percentage ?? slot?.percent ?? 0;
          return (
            <div key={index} className='flex flex-col gap-2 group'>
              {/* Labels row */}
              <div className='flex items-center justify-between'>
                {/* Time label */}
                <p className='text-[#364152] text-sm font-medium group-hover:text-primary transition-colors'>
                  {slot.label}
                </p>
                {/* Indicator */}
                <div className='flex items-center gap-2 text-xs'>
                  <span className='font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-3px'>
                    %{pct}
                  </span>
                  <span className='text-[#697586] font-medium'>
                    {slot.count}
                  </span>
                </div>
              </div>

              {/* Progress track */}
              <div className='bg-[#EBEBEF] h-2.5 rounded-full overflow-hidden w-full p-0.5'>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
                  className='h-full bg-gradient-to-r from-primary to-primary/80 rounded-full shadow-2xs'
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  )
}

export default Rating