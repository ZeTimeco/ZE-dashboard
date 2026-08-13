'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function DriverAppointments({formData , setFormData}) {
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
  const increaseMaxGuests = () => {
    setFormData((prev)=>({
      ...prev,
      delivery_driver_accept_time:Number(prev.delivery_driver_accept_time) + 1
    }))
  };

  const decreaseMaxGuests = () => {
    setFormData((prev)=>({
      ...prev,
      delivery_driver_accept_time:Number(prev.delivery_driver_accept_time) - 1
    }))

  };
    
    
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Driver appointments')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t('Managing the order assignment process for drivers')}</span>
      </p>

      <div className='border border-[#E3E8EF] my-4'></div>

      <div className='flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Automatic assignment')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The nearest driver will be automatically assigned when the request is ready.')}</span>
        </p>
        <p className='flex items-center'>
          <GreenSwitch
            checked={formData?.delivery_auto_assign_driver === 1 }
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                delivery_auto_assign_driver : e.target.checked ? 1 : 0
              }))
            }}
          
          />
        </p>

        
      </div>

      <div className='border border-[#E3E8EF] my-4'></div>

      <div className=''>
      
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Driver acceptance deadline')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('The time period allowed for the driver to accept the request before reassignment')}</span>
        </p>

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
            {formData?.delivery_driver_accept_time} {t('second')}
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

    </>
  )
}

export default DriverAppointments