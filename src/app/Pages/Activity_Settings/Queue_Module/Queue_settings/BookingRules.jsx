'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingRules() {
  const {t} = useTranslation() 

  const [maxGuests, setMaxGuests] = useState(0);
  const increaseMaxGuests = () => setMaxGuests((prev) => prev + 1);
  const decreaseMaxGuests = () => setMaxGuests((prev) => Math.max(0, prev - 1));

  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] pt-4 px-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Booking Rules')}</p>

        <div className='flex justify-between items-center '>
          <p className='text-[#364152] text-sm font-normal'>{t('Maximum number of guests')}</p>
          
          <div className="h-14 px-3 flex items-center justify-between rounded-[3px] ">
            <button
              type="button"
              onClick={increaseMaxGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              +
            </button>

            <div className=" mx-5">
              <p className="text-sm font-normal text-[#364152]">
                {maxGuests}
              </p>
            </div>

            <button
              type="button"
              onClick={decreaseMaxGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              −
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default BookingRules