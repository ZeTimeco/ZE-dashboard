import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function FirstSection() {
  const { t } = useTranslation()

  const stataus = 'scheduled'  //instant , scheduled 
  return (
    <>
    <motion.div 
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className='rounded-3px border border-[#F5DFA3] bg-[#FDF7E8] p-3.5 transition-shadow duration-200 hover:shadow-[0_2px_8px_rgba(213,169,0,0.10)]'
    >
      {/* Top Row */}
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-[#697586] text-base font-normal'>مجدول</p>
          <p className='text-[#364152] text-base font-normal'>توقف واحد</p>
        </div>

        <div className='flex flex-col gap-1 items-end'>
          <p className='text-[#3B3B3B] text-base font-normal'>{t('Proposed fee for the system')}</p>
          <p className='text-primary text-xl font-semibold tracking-tight'>20.99 {t('pound')} </p>
        </div>
      </div>

      {/* Scheduled Details */}
      {stataus === 'scheduled' ? (
        <>
          <div className="my-3 border-t border-[#F5DFA3]/60" />
          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#A1A1A1] text-base font-normal'>{t('Delivery time')}</p>
              <p className='text-[#191919] text-base font-medium'>01:25م </p>
            </div>

            <div className='flex flex-col gap-1 items-end'>
              <p className='text-[#A1A1A1] text-base font-normal'>{t('Date of receipt')}</p>
              <p className='text-[#191919] text-base font-medium'>20.99 {t('pound')} </p>
            </div>
          </div>
        </>
      ) : null}
    </motion.div>
    </>
  )
}

export default FirstSection