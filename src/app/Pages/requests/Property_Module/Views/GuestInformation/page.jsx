"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function GuestInformationPage({ getBookingDetails }) {
  const { t } = useTranslation()
  const getBookingDetailsData = getBookingDetails?.data

  const guestRepeated = getBookingDetailsData?.guest_is_repeated

  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] p-4 mb-4 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <p className='text-[#364152] text-base font-medium mb-6'>{t('Guest Information')}</p>

        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <p className='w-11 h-11 bg-[#007AFF] text-white text-base font-semibold rounded-full flex justify-center items-center shadow-xs'>
              {getBookingDetailsData?.guest_name ? getBookingDetailsData.guest_name.charAt(0) : 'U'}
            </p>
            <div>
              <p className='text-[#364152] text-base font-medium'>{getBookingDetailsData?.guest_name}</p>
              <p className='text-[#697586] text-xs font-normal mt-0.5'>{getBookingDetailsData?.guest_total_bookings} {t('Reservations')}</p> 
            </div>
          </div>

          {guestRepeated && (
            <p className='border border-[#079455] bg-[#DCFAE6] text-[#079455] text-xs font-medium h-7.5 px-2.5 flex items-center rounded-[3px] shadow-xs'>
              {t('Frequent guest')}
            </p>
          )}
        </div>

        <div className='border-b border-[#E3E8EF] my-4'></div>

        <div className='flex justify-between font-normal py-1'>
          <p className='text-[#4B5565] text-sm'>{t('Mobile number')}</p>
          <p className='text-[#364152] text-sm font-medium'>{getBookingDetailsData?.guest_phone}</p>
        </div>

        <div className='flex justify-between font-normal py-1 mb-4'>
          <p className='text-[#4B5565] text-sm'>{t('Email')}</p>
          <p className='text-[#364152] text-sm font-medium'>{getBookingDetailsData?.guest_email}</p>
        </div>

        <div className='flex gap-4'>
          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#dcfce7' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={() => {
              if (getBookingDetailsData?.guest_phone) {
                window.location.href = `tel:${getBookingDetailsData.guest_phone}`
              }
            }}
            className='flex justify-center items-center gap-2.5 h-12 bg-[#ECFDF3] border border-[#dcfce7] py-2.5 px-4 w-full rounded-[3px] cursor-pointer transition-colors duration-200'
          >
            <img src="/images/icons/call-green.svg" className="w-5 h-5" alt="" />
            <p className='text-[#079455] text-sm font-medium'>{t('communication')}</p>
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: '#e9d5ff' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className='flex justify-center items-center h-12 gap-2.5 bg-[#EDE7FD] border border-[#f3e8ff] py-2.5 px-4 w-full rounded-[3px] cursor-pointer transition-colors duration-200'
          >
            <img src="/images/icons/chat_blue.svg" className="w-5 h-5" alt="" />
            <p className='text-[#4D0CE7] text-sm font-medium'>{t('conversation')}</p>
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default GuestInformationPage