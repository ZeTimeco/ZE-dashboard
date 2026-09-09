
'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Card({getParcelHome}) {
  const { t } = useTranslation()

  const handleStatus = (deliveryType) => {
    switch (deliveryType) {
      case 'instant':
        return (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-fit px-2 py-1 bg-[#FAEFD1] text-primary rounded-full text-xs font-normal"
          >
            {t('Breaking news now')}
          </motion.p>
        )
      case 'scheduled':
        return (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="w-fit px-2 py-1 bg-[#E4E4E4] text-[#666] rounded-full text-xs font-normal"
          >
            {t('tabular')}
          </motion.p>
        )

      default:
        return null
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='border border-[#CDD5DF] my-10 p-6 rounded-3px'
    >
      <p className='text-lg text-[#364152] font-medium mb-6'>
          {t('New incoming requests')}
        </p>
      {/* Cards*** */}
      <div className='grid grid-cols-2 gap-6'>
        
        {getParcelHome?.new_requests?.map((request, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            whileHover={{
              y: -4,
              boxShadow: '0 6px 15px rgba(0,0,0,0.12)',
            }}
            className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-3 rounded-3px flex flex-col gap-3'
            key={index}
          >

            {/* status */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='flex justify-between'
            >
              {handleStatus(request?.delivery_type)}

              <p className='text-[#A5A5A5] text-sm font-normal'>
                الان
              </p>
            </motion.div>

            {/* Route */}
            <div className='w-full text-sm text-gray-700'>
              <div className='relative'>

                {/* line */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: '1.125rem' }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className='absolute right-1 top-5 w-px bg-gray-300'
                />

                {/* first step */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className='flex items-center gap-1.5 w-full'
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.55 }}
                    className='h-2 w-2 shrink-0 rounded-full border-2 border-emerald-500 bg-white'
                  />

                  <span>
                  {request?.pickup?.address}
                  </span>
                </motion.div>

                {/* second step */}
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  className='mt-4 flex items-center gap-1.5'
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.75 }}
                    className='h-2 w-2 shrink-0 rounded-full bg-amber-400'
                  />

                  <span>
                    {request?.dropoff?.address}
                  </span>
                </motion.div>

              </div>
            </div>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.8 }}
              className='border border-[#E3E8EF] origin-right'
            />

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.9 }}
              className='flex justify-between'
            >

              <div className='flex items-center gap-6'>

                {/* Distance */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='flex gap-1'
                >
                  <p>
                    <img
                      src='/images/icons/pin-location-yellow.svg'
                      alt=''
                    />
                  </p>

                  <p className='text-sm text-[#5E5E5E] font-normal'>
                    {request?.distance_km} كم
                  </p>
                </motion.div>

                {/* Time */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className='flex gap-1'
                >
                  <p>
                    <img src='/images/icons/clock-yellow.svg' />
                  </p>

                  <p className='text-sm text-[#5E5E5E] font-normal'>
                    {request?.duration_minutes} {t('minute')}
                  </p>
                </motion.div>

              </div>

              {/* Wage */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1 }}
              >
                <p className='text-[#3B3B3B] text-sm font-normal'>
                  {t('Wage estimate')}
                </p>

                <p className='text-primary text-base font-medium'>
                  {request?.estimated_price} {t('pound')}
                </p>
              </motion.div>

            </motion.div>
          </motion.div>
        ))}
        {/* card */}
      
      </div>

      {/* Active connection*** */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        whileHover={{
          y: -2,
          boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
        }}
        className='border border-[#CDD5DF] p-6 flex justify-between mt-10 rounded-3px'
      >

        <div className='flex flex-col gap-px'>
          <p className='text-lg text-[#364152] font-normal'>
            {t('You have an active connection')}
          </p>

          <p className='text-base text-[#697586]  flex gap-2'>
            <span className='font-normal'>{t('On the way to pick it up')}</span>
            <span className='font-medium'>{getParcelHome?.active_delivery?.booking_number}</span>
          </p>
        </div>

        <div className='flex items-center gap-3'>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='bg-[#DCFAE6] border border-[#ABEFC6] text-[#17B26A] flex gap-1 py-1.5 px-3 rounded-3px cursor-pointer'
          >
            <p>{t('follow up')}</p>

            <p className='flex items-center'>
              <img
                src='/images/icons/chevron-down_right-green.svg'
              />
            </p>
          </motion.button>

        </div>

      </motion.div>
      
    </motion.div>
  )
}

export default Card

