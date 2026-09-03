"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const fieldVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: i * 0.06 },
  }),
}

function Seating_detailsPage({getReservationsById}) {
  const {t} = useTranslation()

  const fields = [
    { label: t('The hall'), value: getReservationsById?.seating_details?.hall, colSpan: '' },
    { label: t('The view'), value: getReservationsById?.seating_details?.views?.[0]?.name, colSpan: '' },
    { label: t('The table'), value: getReservationsById?.seating_details?.table, colSpan: '' },
    { label: t('Special requests'), value: getReservationsById?.notes, colSpan: 'col-span-3' },
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

        <div className='mt-6 grid grid-cols-3 gap-6'>
          {fields.map((field, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={fieldVariants}
              initial="hidden"
              animate="visible"
              className={`font-normal ${field.colSpan}`}
            >
              <p className='text-[#697586] text-base'>{field.label}</p>
              <p className='text-[#364152] text-lg'>{field.value}</p>
            </motion.div>
          ))}
        </div>

        {/* notifications */}
        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.28 }}
        >
          <p className='text-[#364152] text-base mb-1'>{t('notifications')}</p>
          <div className='flex gap-4 flex-wrap'>
            {getReservationsById?.notifications?.map((item, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, ease: 'easeOut', delay: 0.32 + index * 0.06 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
                className='bg-primary w-fit h-10 px-3 rounded-full flex items-center cursor-default'
              >
                <span className='text-white'>{item}</span>
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default Seating_detailsPage