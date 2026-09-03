"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.07,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function BoxPage({getReservationsSummary}) {
  const {t} = useTranslation()

  const cards = [
    {
      iconBg: 'bg-[#F4EAD0]',
      iconHoverBg: 'group-hover:bg-[#ede0b8]',
      borderHover: 'hover:border-[#d4b96a]',
      blobColor: 'bg-[#9E7A11]/5',
      icon: '/images/icons/calendar-true_yellow.svg',
      label: t('today'),
      value: getReservationsSummary?.today,
      extra: null,
    },
    {
      iconBg: 'bg-[#DBCEFA]',
      iconHoverBg: 'group-hover:bg-[#c9b6f7]',
      borderHover: 'hover:border-violet-200',
      blobColor: 'bg-violet-500/5',
      icon: '/images/icons/date-time_blue.svg',
      label: t('Coming'),
      value: getReservationsSummary?.upcoming,
      extra: t('minute'),
    },
    {
      iconBg: 'bg-[#FEE4E2]',
      iconHoverBg: 'group-hover:bg-[#fccbc8]',
      borderHover: 'hover:border-red-200',
      blobColor: 'bg-red-500/5',
      icon: '/images/icons/calendar-remove-red2.svg',
      label: t('Late'),
      value: getReservationsSummary?.late,
      extra: null,
    },
  ]

  return (
    <>
      <section className='mb-10 grid grid-cols-3 lg1:grid-cols-3 gap-4'>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className={`group relative overflow-hidden bg-white border border-slate-200/85 rounded-3px p-5 shadow-xs hover:shadow-lg ${card.borderHover} transition-all duration-300 cursor-default`}
          >
            <div className='flex items-center gap-3.5'>
              <div className={`w-12 h-12 flex justify-center items-center ${card.iconBg} rounded-3px group-hover:scale-110 ${card.iconHoverBg} transition-all duration-300 shadow-xs`}>
                <img
                  src={card.icon}
                  alt=""
                  className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3'
                />
              </div>
              <p className='text-slate-600 font-medium text-sm lg1:text-base group-hover:text-slate-900 transition-colors'>
                {card.label}
              </p>
            </div>

            <div className='mt-4 flex items-baseline gap-1.5'>
              <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
                {card.value}
              </p>
              {card.extra && (
                <span className='text-slate-500 text-sm font-normal'>{card.extra}</span>
              )}
            </div>

            {/* Decorative blur orb */}
            <div className={`absolute -bottom-6 -left-6 w-20 h-20 ${card.blobColor} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />
          </motion.div>
        ))}
      </section>
    </>
  )
}

export default BoxPage