'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function PreparationTime({formData , setFormData}) {
  const {t} = useTranslation()

  const increaseMaxGuests = () =>{
    setFormData((prev)=>({
      ...prev,
      order_preparation_time:Number(prev.order_preparation_time) + 1 
    }))
  };
  const decreaseMaxGuests = () =>{
    setFormData((prev)=>({
      ...prev,
      order_preparation_time:Number(prev.order_preparation_time) - 1
    }))
  };
    
    

  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <div className='flex gap-2'>
        <p >
          <img src="/images/icons/clock-yellow.svg" className="w-6 h-6" />
        </p>
        <p className='flex flex-col'>
          <span className='text-[#364152] text-base font-medium'>{t('default preparation time')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Estimated order preparation time (in minutes)')}</span>
        </p>
      </div>

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
          {formData?.order_preparation_time} {t('minute')}
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


  )
}

export default PreparationTime