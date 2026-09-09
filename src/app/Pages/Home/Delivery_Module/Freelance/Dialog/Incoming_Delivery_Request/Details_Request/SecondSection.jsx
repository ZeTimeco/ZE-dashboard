'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function SecondSection() {
  const { t } = useTranslation()

  return (
    <>
    <motion.div 
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className='shadow-[0_0_6px_0_rgba(0,0,0,0.12)] hover:shadow-[0_3px_12px_0_rgba(0,0,0,0.10)] border border-[#E3E8EF]/60 rounded-3px p-3.5 transition-all duration-200 bg-white'
    >
      <div>
        {/* Pickup */}
        <div className="flex items-start gap-3 group">
          {/* Icon + line */}
          <div className="relative flex w-8 shrink-0 flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="z-10 flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4EAD0] text-[#D5A900] transition-colors duration-200 group-hover:bg-[#EDE1C0]"
            >
              <img src="/images/icons/map-pinpoint_yellow.svg" alt="" className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
            </motion.div>

            {/* Dotted line */}
            <div className="h-14 border-r-2 border-dotted border-[#D5A900]/80" />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-0.5">
            <p className="text-xs text-[#697586] font-normal">
              {t('Receipt')}
            </p>

            <p className="text-sm font-medium text-[#364152]">
              وسط المدينة، 123 شارع غلين
            </p>

            <ul className="flex items-center gap-3 text-xs text-[#697586] mt-0.5">
              <li>وثائق</li>
              <li className="relative before:content-['•'] before:ml-1">
                صندوق متوسط
              </li>
              <li className="relative before:content-['•'] before:ml-1">
                2.5 كجم
              </li>
            </ul>
          </div>
        </div>

        {/* Delivery */}
        <div className="flex items-start gap-3 group mt-1">
          {/* Icon */}
          <div className="flex w-8 shrink-0 justify-center">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
              className="flex h-6 w-6 items-center justify-center rounded-lg bg-[#F4EAD0] text-[#D5A900] transition-colors duration-200 group-hover:bg-[#EDE1C0]"
            >
              <img src="/images/icons/Connections_yellow.svg" alt="" className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
            </motion.div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col gap-0.5">
            <p className="text-xs text-[#697586] font-normal">
              {t('Delivery')}   
            </p>

            <p className="text-sm font-medium text-[#364152]">
              321 شارع يان، جناح 200
            </p>

            <p className='text-[#697586] text-xs font-light mt-0.5'>
              <span>{t('recipient')} : </span>
              <span className="font-normal text-[#364152]">{`أمير هارون`}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats footer bar */}
      <div className='flex gap-3 w-full bg-[#F5F5F5] p-2 mt-3 rounded-3px border border-[#ECECEC]'> 
        <div className='flex flex-col gap-1 items-center border-l border-[#E2E2E2] w-full py-1 hover:bg-black/[0.02] rounded-3px transition-colors duration-150'>
          <span className='text-[#191919] text-sm font-medium'>نقدي</span>
          <span className='text-[#A1A1A1] text-xs font-normal'>{t('Payment')}</span>
        </div>

        <div className='flex flex-col gap-1 items-center border-l border-[#E2E2E2] w-full py-1 hover:bg-black/[0.02] rounded-3px transition-colors duration-150'>
          <span className='text-[#191919] text-sm font-medium'>3 {t('minute')}</span>
          <span className='text-[#A1A1A1] text-xs font-normal'>{t('the time')}</span>
        </div>

        <div className='flex flex-col gap-1 items-center w-full py-1 hover:bg-black/[0.02] rounded-3px transition-colors duration-150'>
          <span className='text-[#191919] text-sm font-medium'>75 كم</span>
          <span className='text-[#A1A1A1] text-xs font-normal'>{t('Distance')}</span>
        </div>
      </div>
    </motion.div>
    </>
  )
}

export default SecondSection