'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CustomerModifications({formData , setFormData}) {
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
    

  const increaseMaxGuests = () => {
    setFormData((prev)=>({
      ...prev,
      order_edit_time_limit:Number(prev.order_edit_time_limit) + 1 
    }))
  };
  const decreaseMaxGuests = () =>{
    setFormData((prev)=>({
      ...prev, 
      order_edit_time_limit:Number(prev.order_edit_time_limit) - 1
    }))
  };
    
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <p className='flex flex-col'>
        <span className='text-[#364152] text-base font-medium'>{t('Customer modifications')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t('Allowing customers to modify their orders')}</span>
      </p>

      <div className='border border-[#E3E8EF] my-4'></div>

      {/* Allow modification */}
      <div className='flex justify-between'>
        <p className='flex flex-col'>
          <span className='text-[#364152] text-base font-medium'>{t('Allow modification')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The customer can modify the order before preparation begins.')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={formData?.order_allow_edit}
            onChange={
              (e)=>{
                setFormData((prev)=>({
                  ...prev,
                  order_allow_edit:e.target.checked? 1 : 0
                }))

              }
            }
          />
        </p>

        
      </div>

      <div className='border border-[#E3E8EF] my-4'></div>


      {/* Allowance period for modification */}
      <div className=''>
      
        <p className='text-[#364152] text-base font-medium'>{t('Allowance period for modification')}</p>

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
            {formData?.order_edit_time_limit} {t('minute')}
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

export default CustomerModifications