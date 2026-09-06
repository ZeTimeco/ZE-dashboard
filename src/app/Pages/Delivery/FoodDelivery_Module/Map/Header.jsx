'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Header() {
  const { t } = useTranslation()
  const router = useRouter()
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='flex justify-between items-center'
    >
      <div className='flex flex-col gap-1'>
        <p className='text-[#364152] text-2xl font-medium tracking-tight'>{t('Delivery')}</p>
        <p className='flex items-center gap-2'>
          <img
            src="/images/icons/delivery-truck-blue.svg"
            alt=""
            className='transition-transform duration-200 hover:scale-110'
          />
          <span className='text-[#4B5565] text-base font-normal'>5 {t('in the way')}</span>
        </p>
      </div>

      <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(198, 152, 21, 0.06)' }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.2 }}
        onClick={() => router.back()}
        className='w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] text-base font-medium cursor-pointer shadow-sm hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-1'
      >
        {t('Open the menu')}
      </motion.button>
    </motion.div>
  )
}

export default Header