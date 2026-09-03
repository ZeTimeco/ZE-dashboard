"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const rowVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: i * 0.06 },
  }),
}

function Guest_InformationPage({getReservationsById}) {
  const {t} = useTranslation()

  // '!pending','!confirmed','!seated','!completed','!cancelled','no_show','!arrived','!rejected'
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed":
        return <p className='text-[#067647] text-lg font-normal flex items-center'>{t('certain')}</p>;
      case "completed":
        return <p className='text-[#067647] text-lg font-normal flex items-center'>{t('Complete')}</p>;
      case "pending":
        return <p className='text-[#DC6803] text-lg font-normal flex items-center'>{t('Pending')}</p>;
      case "arrived":
        return <p className='text-[#9E7A11] text-lg font-normal flex items-center'>{t('receipt')}</p>;
      case "seated":
        return <p className='text-[#4B5565] text-lg font-normal flex items-center'>{t('sitting')}</p>;
      case "no_show":
        return <p className='text-[#713DEC] text-lg font-normal flex items-center'>{t('not_attend')}</p>;
      case "canceled":
        return <p className='text-[#D92D20] text-lg font-normal flex items-center'>{t('cancelled')}</p>;
      case "rejected":
        return <p className='text-[#D92D20] text-lg font-normal flex items-center'>{t('rejected')}</p>;
    }
  };

  const fields = [
    { label: t('Guest name'), value: getReservationsById?.guest_name },
    { label: t('phone number'), value: getReservationsById?.guest_phone },
    { label: t('Number of people'), value: `${getReservationsById?.guest_count ?? ''} ${t('guests')}` },
    { label: t('Booking status'), value: StatusRender(getReservationsById?.status), isNode: true },
    { label: t('Booking code'), value: `# ${getReservationsById?.code ?? ''}` },
    {
      label: t('the time'),
      value: getReservationsById?.start_time
        ? new Date(`1970-01-01T${getReservationsById.start_time}`).toLocaleTimeString('ar-EG', {
            hour: 'numeric', minute: '2-digit', hour12: true,
          })
        : '',
    },
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
              {field.isNode
                ? <div>{field.value}</div>
                : <p className='text-[#364152] text-lg'>{field.value}</p>
              }
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Guest_InformationPage