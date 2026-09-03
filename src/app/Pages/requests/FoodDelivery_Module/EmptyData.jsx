'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function EmptyData() {
  const {t} = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col items-center justify-center mt-15 mb-5'
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src="/images/qqq.svg"
        alt=""
        className="select-none"
      />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4 text-center'>{t("No orders currently available")}</p>
      <p className='text-[#697586] text-xl font-normal text-center'>{t('You do not have any active or previous requests at the moment.')}</p>
    </motion.div> 
  )
}

export default EmptyData