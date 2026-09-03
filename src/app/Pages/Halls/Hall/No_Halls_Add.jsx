"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function No_Halls_Add() {
    const {t} = useTranslation()
    const router = useRouter()
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className='flex flex-col items-center justify-center'
    >
      <motion.img 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        src="/images/hall.svg" 
        alt="" 
      />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("Start by adding a new lounge")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('Add a new lounge and start organizing restaurant tables with ease.')}</p>
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className='flex justify-center items-center gap-2 bg-[var(--color-primary)] hover:opacity-95 hover:shadow-md transition-all duration-200 text-white px-4 py-2.5 h-14 w-[25%] rounded-[3px] my-6 cursor-pointer'
        onClick={() => router.push('/Pages/Halls/Hall/Add')}
      >
        <p className='text-base flex items-center'>{t("Adding a hall")} </p>
        <p className='flex items-center'>
          <img src="/images/icons/AddIcon.svg" className="w-5 h-5" />
        </p>
      </motion.button>
    </motion.div>
  )
}

export default No_Halls_Add