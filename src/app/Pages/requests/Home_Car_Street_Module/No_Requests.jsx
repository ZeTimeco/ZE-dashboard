'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import { useRouter } from 'next/navigation'


function No_Requests() {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col gap-4 items-center justify-center mt-20 mb-5'
      >
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src="/images/emptyRequest.svg"
          alt=""
          className="select-none"
        />
        <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4 text-center'>{t("No additional requests")}</p>

      

        </motion.div> 
      
    </>
  )
}

export default No_Requests