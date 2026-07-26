'use client'
import { Dialog, styled, Switch } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Edit_group({open , setOpen}) {
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
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-start px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      
      <p className='text-[#364152] text-xl font-medium px-6 text-center'>{t('Edit group')}</p>
      
      <div className='px-4 mt-8 flex flex-col gap-4'>
        {/* Mandatory */}
        <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-base font-medium'>{t('mandatory')}</span>
            <span className='text-[#697586] text-sm font-normal'>{t('The customer must select an option.')}</span>
          </p>
          <p className='flex items-center'>
            <GreenSwitch/>
          </p>
        </div>

        {/* Multiple selection */}
        <div className='border border-[#EEF2F6] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-base font-medium'>{t('Multiple selection')}</span>
            <span className='text-[#697586] text-sm font-normal'>{t('Allow multiple selections')}</span>
          </p>
          <p className='flex items-center'>
            <GreenSwitch/>
          </p>
        </div>


        <div className='w-full flex gap-4 my-4 '>
          <button
            className='w-full  bg-[var(--color-primary)] rounded-[3px]  px-4 py-2.5 cursor-pointer'
          >
            <p className='text-white text-base font-normal'>{t('save')}</p>
          </button>
          <button
            onClick={()=>setOpen(false)}
            className='w-full border border-[#CDD5DF] rounded-[3px]  px-4 py-2.5 cursor-pointer'
          >
            <p className='text-[#4B5565] text-base font-normal'>{t('cancel')}</p>
          </button>

        </div>

      </div>
      </Dialog>
    
    </>
  )
}

export default Edit_group