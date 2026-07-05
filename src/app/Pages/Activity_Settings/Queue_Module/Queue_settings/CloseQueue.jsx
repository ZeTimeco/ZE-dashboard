'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'

function CloseQueue() {
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
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Close Queue')}</p>

        {/* Automatic removal from the list */}
        <div className='flex justify-between items-center mt-4'>
          <div>
            <p className='text-[#364152] text-sm font-normal'>{t('The menu closes automatically at the end of working hours.')}</p>
            <p className='text-[#4B5565] text-xs font-normal mt-1'>{t('The waiting list will close automatically when the restaurant closes.')}</p>

          </div>
          <p><GreenSwitch/></p>
        </div>

      </div>
    </>
  )
}

export default CloseQueue