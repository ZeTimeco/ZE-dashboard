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

function Box({getwaitlistAnalysis}) {
  const {t} = useTranslation()
  const getwaitlistAnalysisData = getwaitlistAnalysis?.data

  const cards = [
    {
      iconBg: 'bg-[#F4EAD0]',
      iconHoverBg: 'group-hover:bg-[#ede0b8]',
      borderHover: 'hover:border-[#d4b96a]',
      blobColor: 'bg-[#9E7A11]/5',
      icon: '/images/icons/user-group_yellow.svg',
      label: t('Expected guests'),
      badge: (
        <p className='bg-[#F9F5E8] text-[var(--color-primary)] w-fit flex items-center px-1 py-1 lg1:py-1.5 lg1:px-2 rounded-full'>
          <img src="/images/icons/tick-yellow.svg" className="w-6 h-6 hidden lg1:block" alt="" />
          <span className='text-[10px] lg1:text-sm'>{t('Active list')}</span>
        </p>
      ),
      value: (
        <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
          <span>{getwaitlistAnalysisData?.waitinglist_count}</span>{' '}
          <span className='text-slate-500 text-base font-normal'>{t('during')} 3 {t('past hours')}</span>
        </p>
      ),
    },
    {
      iconBg: 'bg-[#FEF0C7]',
      iconHoverBg: 'group-hover:bg-[#fde9a8]',
      borderHover: 'hover:border-amber-200',
      blobColor: 'bg-amber-500/5',
      icon: '/images/icons/clock_orange.svg',
      label: t('Average wait time'),
      badge: null,
      value: (
        <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight flex items-baseline gap-1.5'>
          <span>{getwaitlistAnalysisData?.avg_wait_time}</span>
          <span className='text-slate-500 text-base font-normal'>{t('minute')}</span>
        </p>
      ),
    },
    {
      iconBg: 'bg-[#EDE7FD]',
      iconHoverBg: 'group-hover:bg-[#ddd2fb]',
      borderHover: 'hover:border-violet-200',
      blobColor: 'bg-violet-500/5',
      icon: '/images/icons/checkmark-circle-blue.svg',
      label: t('Ready for the seat'),
      badge: null,
      value: (
        <p className='text-slate-900 text-xl lg1:text-2xl font-bold tracking-tight'>
          {getwaitlistAnalysisData?.available_tables}
        </p>
      ),
    },
  ]

  return (
    <>
      <div className='my-12 grid grid-cols-3 gap-4'>
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
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3.5'>
                <div className={`w-12 h-12 flex justify-center items-center ${card.iconBg} rounded-3px group-hover:scale-110 ${card.iconHoverBg} transition-all duration-300 shadow-xs flex-shrink-0`}>
                  <img
                    src={card.icon}
                    alt=""
                    className='w-6 h-6 transition-transform duration-300 group-hover:rotate-3'
                  />
                </div>
                <p className='text-slate-600 font-medium text-xs lg1:text-base group-hover:text-slate-900 transition-colors'>
                  {card.label}
                </p>
              </div>
              {card.badge && <div>{card.badge}</div>}
            </div>

            <div className='mt-4'>
              {card.value}
            </div>

            {/* Decorative blur orb */}
            <div className={`absolute -bottom-6 -left-6 w-20 h-20 ${card.blobColor} rounded-full blur-xl pointer-events-none group-hover:scale-150 transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default Box