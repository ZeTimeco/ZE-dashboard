'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingStatus() {
  const {t} = useTranslation()
  const [selectedStatus, setSelectedStatus] = useState('active')

  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
  
  const getCardStyle = (status) => {
    return selectedStatus === status
      ? 'border-[var(--color-primary)] bg-[#FFFDF5]'
      : 'border-[#E3E8EF] bg-white'
  }

  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-normal'>{t('Booking status')}</p>

      {/*  */}
      <div className='grid grid-cols-3 gap-4 mt-4'>
        {/* maintenance */}
        <div 
          onClick={() => setSelectedStatus('maintenance')}
          className={`flex gap-4 border rounded-[3px] p-4 w-full cursor-pointer transition-all duration-200 ${getCardStyle('maintenance')}`}
        >
          <div className='flex items-center'>
            <input 
              type="radio" 
              name="bookingStatus" 
              checked={selectedStatus === 'maintenance'}
              onChange={() => setSelectedStatus('maintenance')}
              className={inputClassName}
            />
          </div>
          <div>
            <p className='text-[#364152] text-base font-normal'>{t('maintenance')}</p>
            <p className='text-[#4B5565] text-sm font-normal'>{t('We are temporarily not accepting any new bookings.')}</p>
          </div>
        </div>

        {/* limited */}
        <div 
          onClick={() => setSelectedStatus('limited')}
          className={`flex gap-4 border rounded-[3px] p-4 w-full cursor-pointer transition-all duration-200 ${getCardStyle('limited')}`}
        >
          <div className='flex items-center'>
            <input 
              type="radio" 
              name="bookingStatus" 
              checked={selectedStatus === 'limited'}
              onChange={() => setSelectedStatus('limited')}
              className={inputClassName}
            />
          </div>
          <div>
            <p className='text-[#364152] text-base font-normal'>{t('limited')}</p>
            <p className='text-[#4B5565] text-sm font-normal'>{t('Reservations only (no direct entry or waiting list)')}</p>
          </div>
        </div>

        {/* active */}
        <div 
          onClick={() => setSelectedStatus('active')}
          className={`flex gap-4 border rounded-[3px] p-4 w-full cursor-pointer transition-all duration-200 ${getCardStyle('active')}`}
        >
          <div className='flex items-center'>
            <input 
              type="radio" 
              name="bookingStatus" 
              checked={selectedStatus === 'active'}
              onChange={() => setSelectedStatus('active')}
              className={inputClassName}
            />
          </div>
          <div>
            <p className='text-[#364152] text-base font-normal'>{t('active')}</p>
            <p className='text-[#4B5565] text-sm font-normal'>{t('Accepting all bookings and waiting lists as normal')}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookingStatus