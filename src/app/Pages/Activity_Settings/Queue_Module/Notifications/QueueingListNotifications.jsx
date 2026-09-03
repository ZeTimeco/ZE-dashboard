'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function QueueingListNotifications({formData , setFormData}) {
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
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'
      >
        <p className='text-[#364152] text-base font-medium'>{t('Queueing list notifications')}</p>

        <div>
          {/*  */}
          <div className='flex justify-between items-center mt-4 rounded-[3px] transition-colors duration-150 hover:bg-gray-50/60 -mx-1 px-1'>
            <p className='text-[#364152] text-sm font-normal'>{t('Queue position updates')}</p>
            <p>
              <GreenSwitch
                checked={formData?.notify_queue_position_enabled}
                onChange={(e)=>{
                  setFormData((prev)=>({
                    ...prev,
                    notify_queue_position_enabled:e.target.checked ? 1 : 0
                  }))
                }}
              />
            </p>
          </div>

          <div className='border border-[#E3E8EF] my-3'></div>

          {/*  */}
          <div className='flex justify-between items-center mt-4 rounded-[3px] transition-colors duration-150 hover:bg-gray-50/60 -mx-1 px-1'>
            <p className='text-[#364152] text-sm font-normal'>{t('Table ready notice')}</p>
            <p>
              <GreenSwitch
                checked={formData?.notify_table_ready_enabled}
                onChange={(e)=>{
                  setFormData((prev)=>({
                    ...prev,
                    notify_table_ready_enabled:e.target.checked ? 1 : 0
                  }))
                }}
              />
            </p>
          </div>

        </div>
      </motion.div>

    </>
  )
}

export default QueueingListNotifications