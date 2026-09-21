'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import Concurrent_Orders_Limit from '../Dialogs/Concurrent_Orders_Limit'

const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
}

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

function OrderLimitSettingsPage() {
  const { t } = useTranslation()

  const [open , setOpen] = useState(false)

  return (
    <>
      <motion.div
        className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-4 transition-shadow duration-300 hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.12)]'
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <motion.p
          className='text-[#161616] text-xl font-normal'
          variants={rowVariants}
        >
          {t('Determining the number of orders')}
        </motion.p>

        <div className="h-[0.5px] bg-[#E3E8FEAA] my-4" />

        <motion.div
          className='flex justify-between mt-4'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className='text-[#161616] text-sm font-normal'
            variants={rowVariants}
          >
            {t('Specify concurrent requests')}
          </motion.p>

          <motion.button
            onClick={()=>setOpen(true)}
            className='flex gap-3 cursor-pointer group'
            variants={rowVariants}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <p className='text-primary text-base font-normal transition-opacity duration-200 group-hover:opacity-80'>
              حتي 20 توصيلة
            </p>
            <p className='flex items-center transition-transform duration-200 group-hover:translate-x-0.5'>
              <img src="/images/icons/arrowyellowOnly.svg" alt="" />
            </p>
          </motion.button>
        </motion.div>
      </motion.div>

      <Concurrent_Orders_Limit
        open={open}
        setOpen={setOpen}
      />
    </>
  )
}

export default OrderLimitSettingsPage