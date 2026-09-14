'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function DriverDetails({getActiveDelivery}) {
  const { t } = useTranslation()
  const getActiveDeliveryData = getActiveDelivery?.data

  return (
    <>
      <motion.div
        className='my-10 border border-[#CDD5DF] rounded-3px p-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className='flex justify-between'>
          {/* Driver info */}
          <motion.div
            className='flex gap-3'
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className='flex items-center'>
              <motion.p
                className='bg-[#F9F5E8] w-12 h-12 rounded-full flex justify-center items-center'
                whileHover={{ scale: 1.08, boxShadow: '0 4px 14px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.2 }}
              >
                <img src="/images/icons/user_yellow.svg" alt="" />
              </motion.p>
            </div>

            <div className='flex flex-col gap-px'>
              <p className='text-[#364152] text-lg font-normal'>{getActiveDeliveryData?.contact?.name} </p>
              <p className='text-[#4B5565] text-base font-normal'>{getActiveDeliveryData?.contact?.phone}</p>
            </div>
          </motion.div>

          {/* Communication button */}
          <motion.button
            className='bg-[#FAEFD1] rounded-3px flex items-center gap-2 w-fit h-10 px-3 cursor-pointer'
            whileHover={{
              scale: 1.03,
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              backgroundColor: '#f5e4bb',
            }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() =>
              window.location.href = `tel:${getActiveDeliveryData?.contact?.phone}`
            }
          >
            <p className='text-primary text-lg font-medium'>{t('communication')}</p>
            <motion.p
              whileHover={{ rotate: [0, -8, 8, 0] }}
              transition={{ duration: 0.4 }}
            >
              <img src="/images/icons/call_yellow.svg" alt="" />
            </motion.p>
          </motion.button>
        </div>

        {/* Delivery fee */}
        <motion.div
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 mt-6 rounded-3px flex justify-between'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.25 }}
          whileHover={{
            boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
            y: -1,
          }}
        >
          <p className='text-[#364152] text-lg font-normal'>{t('Delivery fee')}</p>
          <p className='text-primary text-xl font-semibold'>{getActiveDeliveryData?.earnings?.amount} {getActiveDeliveryData?.earnings?.currency} </p>
        </motion.div>
      </motion.div>
    </>
  )
}

export default DriverDetails
