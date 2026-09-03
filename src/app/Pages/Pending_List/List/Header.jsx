"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import AddPage from '../Add/page';
import { motion } from 'framer-motion'

function Header({openAdd , setOpenAdd, refresh}) {
  const {t} = useTranslation();
  return (
    <>
      <header className='flex justify-between items-center'>
        <motion.div
          className='flex flex-col gap-3'
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <p className='text-[#364152] text-2xl font-medium'>{t('pending list')}</p>
          <p className='text-[#697586] text-xl font-normal'>{t('Guests expected to arrive soon')}</p>
        </motion.div>

        {/* btn add */}
        <motion.button
          onClick={() => setOpenAdd(true)}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          whileHover={{
            scale: 1.03,
            boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
            transition: { duration: 0.18 },
          }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          className='flex justify-center items-center gap-3 w-fit px-4 h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer transition-opacity duration-200 hover:opacity-90'
        >
          <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
          <span className="text-[#fff] text-base font-medium">{t('Add a new guest')}</span>
        </motion.button>
      </header>

      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
        refresh={refresh}
      />
    </>
  )
}

export default Header