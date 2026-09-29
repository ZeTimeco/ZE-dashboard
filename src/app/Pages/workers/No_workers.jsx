'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'


function No_workers() {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className='flex flex-col gap-4 items-center justify-center mt-10 mb-5'
      >
        <motion.img
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src="/images/WorkPlaces.svg"
          alt=""
          className="select-none"
        />
        <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4 text-center'>{t("She hasn't added any worker yet.")}</p>

        <button
          onClick={() => router.push(`/Pages/workers/Add`)}
          className="flex gap-2 justify-center items-center bg-primary w-[40%] h-14 rounded-3px px-3 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="text-white text-base font-medium">{t('Adding a worker')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
        </button>

      </motion.div>
    </>
  )
}

export default No_workers