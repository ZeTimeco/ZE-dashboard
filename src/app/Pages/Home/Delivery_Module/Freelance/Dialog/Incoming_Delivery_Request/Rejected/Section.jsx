'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Section() {
  const {t} = useTranslation()
  return (
    <>

    <div className="flex flex-col gap-1 items-center justify-center">
    <motion.p
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: [0, -8, 8, -5, 5, 0],
      }}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
      }}
    >
      <img
        src="/images/icons/cancel-circle-redd.svg"
        className="h-30 w-30"
      />
    </motion.p>
      <p className='text-[#364152] text-xl font-medium'>{t('Your offer has been rejected')}</p>  
      <p className='text-[#697586] text-lg font-normal text-center'>{t('Unfortunately, your offer was not selected this time.')}</p>
    </div>

    <div className='mt-10.5 flex flex-col gap-3 bg-[#FDF7E8] border border-[#F5DFA3] p-6'>
      {/* Your offer */}
      <div className='flex justify-between'>
        <p className='text-[#3B3B3B] text-xl font-normal'>{t(t('Your offer'))}</p>
        <p className='text-primary text-xl font-semibold'>5000 {t(t('pound'))}</p>
      </div>

      <div className='border border-[#E8E8E8] '></div>

      {/* request */}
      <div className='flex justify-between'>
        <p className='text-[#848484] text-xl font-normal'>{t(t('request'))}</p>
        <p className='text-[#3B3B3B] text-lg font-medium'>ZT-PR-8842</p>
      </div>

      {/* Competitive offers */}
      <div className='flex justify-between'>
        <p className='text-[#848484] text-xl font-normal'>{t(t('Competitive offers'))}</p>
        <p className='text-[#3B3B3B] text-lg font-medium'>5 {t('Connectors')}</p>
      </div>



    </div>
          
    </>
  )
}

export default Section