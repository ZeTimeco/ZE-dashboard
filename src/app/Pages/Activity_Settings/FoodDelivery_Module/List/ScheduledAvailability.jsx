'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'

function ScheduledAvailability({formData , setFormData}) {
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
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <div className='flex gap-2'>
        <p>
          <img src="/images/icons/clock-yellow.svg" className="w-6 h-6" />
        </p>
        <p className='flex flex-col'>
          <span className='text-[#364152] text-base font-medium'>{t('Scheduled availability')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Activate scheduling of item availability according to specific times')}</span>
        </p>
      </div>

      <div className='flex justify-between mt-6'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Activate scheduling')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Specific times can be set for the availability of each item (e.g., breakfast only in the morning).')}</span>
        </p>

        <p className='flex items-center'>
          <GreenSwitch
            checked={formData?.menu_schedule_enabled === 1}
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                menu_schedule_enabled:e.target.checked ? 1 : 0
              }))
            }}
          
          />
        </p>
      </div>


    </div>

      

    </>
  )
}

export default ScheduledAvailability