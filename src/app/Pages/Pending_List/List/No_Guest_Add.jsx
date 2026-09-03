"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function No_Guest_Add({setOpenAdd}) {
  const {t} = useTranslation()

  return (
    <>
      <motion.div
        className='flex flex-col items-center justify-center my-15'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.img
          src="/images/clock.svg"
          alt=""
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
        <p className='text-[#4B5565] text-xl font-semibold mt-6 mb-4'>{t("There are no guests on the waiting list.")}</p>
        <p className='text-[#697586] text-lg font-normal'>{t('Add a guest to get started')}</p>
        <motion.button
          onClick={() => setOpenAdd(true)}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
            transition: { duration: 0.18 },
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[3px] my-6 cursor-pointer transition-opacity duration-200 hover:opacity-90'
        >
          <p className='text-base flex items-center'>{t('Add guest')}</p>
          <p className='flex items-center'>
            <img src="/images/icons/AddIcon.svg" className="w-5 h-5" alt="" />
          </p>
        </motion.button>
      </motion.div>
    </>
  )
}

export default No_Guest_Add