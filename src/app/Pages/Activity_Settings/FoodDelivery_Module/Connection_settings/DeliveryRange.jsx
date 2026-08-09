'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function DeliveryRange() {
  const {t} = useTranslation()

  const [maxGuests, setMaxGuests] = useState(0);
  const increaseMaxGuests = () => setMaxGuests((prev) => prev + 1);
  const decreaseMaxGuests = () => setMaxGuests((prev) => Math.max(0, prev - 1));
      
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>

      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-sm font-medium'>{t('Delivery range')}</span>
        <span className='text-[#697586] text-xs font-normal'>{t('Maximum allowed delivery distance')}</span>
      </p>

      <div className='border border-[#E3E8EF] my-4'></div>
      
      <div className=''>

        <p className='text-[#364152] text-base font-medium'>{t('Maximum distance')}</p>
        <div className="flex items-center gap-3 mt-4"> 
          {/* Plus */} 
          <button 
            type="button" 
            onClick={increaseMaxGuests} 
            className="flex h-11 w-13 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer" 
          > 
            + 
          </button> 

          {/* Number */} 
          <span className="w-full h-11 bg-[#F9F5E8] flex items-center justify-center rounded-[3px] text-center text-[#364152] text-base font-medium"> 
            {maxGuests} {t('kilometer')}
          </span>

          {/* Minus */} 
          <button 
            type="button" 
            onClick={decreaseMaxGuests} 
            className="flex h-11 w-13 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-xl text-[#0F022E] cursor-pointer" 
          > 
            - 
          </button>


        </div> 
      </div>
      
    </div>
  )
}

export default DeliveryRange