'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'

function SeatingOptions({formData , setFormData}) {
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
        <p className='text-[#364152] text-base font-medium'>{t('Seating Options')}</p>
      
        <div>
          {/*  */}
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[#364152] text-sm font-normal'>{t('The customer chooses the table.')}</p>
            <p>
              <GreenSwitch
                checked={formData?.seating_mode==='manual'}
                onChange={(e)=>{
                  if(e.target.checked){
                    setFormData((prev)=>({
                      ...prev,
                      seating_mode:'manual'
                    }))
                  }
                }}
              />
            </p>
          </div>

          <div className='border border-[#E3E8EF] my-3'></div>

          {/*  */}
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[#364152] text-sm font-normal'>{t('The restaurant assigns the table.')}</p>
              <p>
              <GreenSwitch
                checked={formData?.seating_mode==='auto_assign'}
                onChange={(e)=>{
                  if(e.target.checked){
                    setFormData((prev)=>({
                      ...prev,
                      seating_mode:'auto_assign'
                    }))
                  }
                }}
              />
            </p>
          </div>
        </div>

      </div>

    </>
  )
}

export default SeatingOptions