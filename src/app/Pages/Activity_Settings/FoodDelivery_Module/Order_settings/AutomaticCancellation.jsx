'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function AutomaticCancellation() {
  const {t} = useTranslation()

  const GreenSwitch = styled((props) => (
    <Switch
      focusVisibleClassName=".Mui-focusVisible"
      disableRipple
      {...props}
    />
    ))(({ theme }) => ({
      width: 53,
      height: 24,
      padding: 0,
  
      '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 3,
        transitionDuration: '500ms',
  
        '&.Mui-checked': {
          transform: 'translateX(31px)',
          color: '#fff',
  
          '& + .MuiSwitch-track': {
            backgroundColor: '#10B981',
            opacity: 1,
            border: 0,
          },
  
          '&.Mui-disabled + .MuiSwitch-track': {
            opacity: 0.5,
          },
        },
  
        '&.Mui-focusVisible .MuiSwitch-thumb': {
          color: '#33cf4d',
          border: '6px solid #fff',
        },
  
        '&.Mui-disabled .MuiSwitch-thumb': {
          color: theme.palette.grey[100],
        },
      },
  
      '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 18,
        height: 18,
      },
  
      '& .MuiSwitch-track': {
        borderRadius: 12,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    }));
    

  const [maxGuests, setMaxGuests] = useState(0);
  const increaseMaxGuests = () => setMaxGuests((prev) => prev + 1);
  const decreaseMaxGuests = () => setMaxGuests((prev) => Math.max(0, prev - 1));
    
  
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <div className='flex gap-2'>
        <p >
          <img src="/images/icons/cancel-circle-redd.svg" className="w-5 h-5" />
        </p>
        <p className='flex flex-col'>
          <span className='text-[#364152] text-base font-medium'>{t('Automatic cancellation')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Cancel unpaid orders after a specified time period')}</span>
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
        <span className="w-full h-11 bg-[#FEE4E2] flex items-center justify-center rounded-[3px] text-center text-[#364152] text-base font-medium"> 
          {maxGuests} {t('minute')}
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

export default AutomaticCancellation