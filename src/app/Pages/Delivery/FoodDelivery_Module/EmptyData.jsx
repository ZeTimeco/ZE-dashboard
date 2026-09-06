'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function EmptyData() {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className='flex flex-col items-center justify-center mt-15 mb-5 select-none'
    >
      <motion.img
        src="/images/car.svg"
        alt=""
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -6, 0],
        }}
        transition={{
          scale: { duration: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.4 },
          y: { repeat: Infinity, duration: 4, ease: 'easeInOut' },
        }}
        className='pointer-events-none'
      />
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4 text-center'
      >
        {t("No active delivery flights")}
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className='text-[#697586] text-xl font-normal text-center'
      >
        {t('You have no orders pending delivery at the moment.')}
      </motion.p>
    </motion.div>
  )
}

export default EmptyData