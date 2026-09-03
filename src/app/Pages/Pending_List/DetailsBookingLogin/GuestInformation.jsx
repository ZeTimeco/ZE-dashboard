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

function GuestInformation({getScanWaitlist}) {
  const {t} = useTranslation()
  const getScanWaitlistData = getScanWaitlist?.data

  const formattedDate = getScanWaitlistData?.reservation_date
    ? new Date(getScanWaitlistData.reservation_date).toLocaleDateString("ar-EG", {
        day: "numeric", month: "long", year: "numeric",
      })
    : "";

  const formattedTime = getScanWaitlistData?.start_time
    ? new Date(`1970-01-01T${getScanWaitlistData.start_time}`)
        .toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", hour12: true })
        .replace("م", "مساءً").replace("ص", "صباحاً")
    : "";

  const fields = [
    { label: t('Guest name'), value: getScanWaitlistData?.guest_name },
    { label: t('phone number'), value: getScanWaitlistData?.guest_phone },
    { label: t('Number of people'), value: `${getScanWaitlistData?.guest_count ?? ''} ${t('guests')}` },
    { label: t('Booking status'), value: getScanWaitlistData?.status },
    { label: t('the date'), value: formattedDate },
    { label: t('the time'), value: formattedTime },
  ]

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 my-6'>
        <motion.p
          className='flex gap-1 items-center'
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <img src="/images/icons/user_yellow.svg" alt="" />
          <span className='text-[#364152] text-xl font-medium'>{t('Guest Information')}</span>
        </motion.p>

        <div className='mt-6 grid grid-cols-2 gap-4'>
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
      </div>
    </>
  )
}

export default GuestInformation