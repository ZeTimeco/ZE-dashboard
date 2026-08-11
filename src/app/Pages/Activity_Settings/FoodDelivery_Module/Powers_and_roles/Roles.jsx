'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import RoleData from './Dialog/RoleData'

function Roles() {
  const {t} = useTranslation()

  const [openRole , setOpenRole] = useState(false)
  return (
    <>

      <motion.div
        className='border border-[#E3E8EF] rounded-[3px] p-4 flex justify-between'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        whileHover={{
          scale: 1.01,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          // borderColor: 'var(--color-primary)',
          transition: { duration: 0.2 }
        }}
      >
        <div className='flex flex-col gap-2'>
          <motion.h1
            className='text-[#364152] text-base font-medium'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            مدير المطعم
          </motion.h1>

          <motion.p
            className='text-[#697586] text-sm font-normal'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            صلاحيات كاملة لإدارة جميع جوانب المطعم
          </motion.p>

          <motion.p
            className='w-fit px-3 border border-[var(--color-primary)] bg-[#F9F5E8] rounded-full'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <span className='text-[var(--color-primary)] text-xs font-normal'>20 {t('power')}</span>
          </motion.p>
        </div>

        <div className='flex items-center'>
          <motion.button
            onClick={()=>setOpenRole(true)}
            className='w-8 h-8 rounded-full bg-[#EEF2F6] flex items-center justify-center cursor-pointer'
            whileHover={{ scale: 1.15, backgroundColor: '#E3E8EF' }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <motion.img
              src="/images/icons/arrow-right-blackk.svg"
              alt=""
              whileHover={{ x: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            />
          </motion.button>
        </div>

      </motion.div>


      <RoleData
        open={openRole}
        setOpen={setOpenRole}
      />

    </>
  )
}

export default Roles