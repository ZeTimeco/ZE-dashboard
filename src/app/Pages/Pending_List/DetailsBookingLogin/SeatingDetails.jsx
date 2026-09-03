"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: 'easeOut', delay: i * 0.05 },
  }),
}

function SeatingDetails({getScanWaitlist}) {
  const {t} = useTranslation()
  const getScanWaitlistData = getScanWaitlist?.data

  const fields = [
    { label: t('The hall'), value: getScanWaitlistData?.hall?.name },
    { label: t('Table number'), value: getScanWaitlistData?.hall?.code },
    { label: t('The view'), value: getScanWaitlistData?.selected_view?.name },
  ]

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <motion.p
          className='flex gap-1 items-center'
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img src="/images/icons/restaurant-yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Seating details')}</span>
        </motion.p>

        <div className='mt-6 grid grid-cols-2 gap-6'>
          {fields.map((field, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={rowVariants}
              initial="hidden"
              animate="visible"
              className='font-normal'
            >
              <p className='text-[#697586] text-base'>{field.label}</p>
              <p className='text-[#364152] text-lg'>{field.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Special Notes */}
        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        >
          <p className='text-[#697586] text-base mb-1'>{t('Special Notes')}</p>
          <div className='flex gap-4 flex-wrap'>
            {getScanWaitlistData?.table?.tags?.map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.24 + index * 0.06 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className='bg-[#EDE7FD] border border-[#E2E2E2] w-fit h-10 px-3 rounded-full flex items-center cursor-default'
              >
                <span className='text-[#505050]'>{item}</span>
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default SeatingDetails