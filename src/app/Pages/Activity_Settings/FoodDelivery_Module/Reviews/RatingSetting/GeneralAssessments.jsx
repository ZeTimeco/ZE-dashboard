'use client'
import { styled, Switch } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';

function GeneralAssessments({formData , setFormData}) {
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
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('General assessments')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t("Managing customer reviews on the restaurant's public profile")}</span>
        </p>

        <div className='border border-[#E3E8EF] my-4'></div>

        {/* Allowing public ratings */}
        <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-3px mt-4 p-4'>
        <div>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Allowing public ratings')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Reviews are hidden and not visible to other customers.')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.public_reviews_enabled}
            onChange={(e)=>{
              setFormData((prev)=>({
                ...prev,
                public_reviews_enabled : e.target.checked ? 1 : 0
              }))
            }}
          />
        </div>
        </div>


        {/* note */}
        <div className='border border-[#FEC84B] bg-[#FFFAEB] rounded-3px flex gap-2 mt-4 p-3'>
          <img src="/images/icons/alert-yellow.svg" alt="" />
          <p className='text-[#F79009] text-base font-normal'>{t('All previous ratings will also be hidden.')}</p>
        </div>


      </div>
      
    </>
  )
}

export default GeneralAssessments