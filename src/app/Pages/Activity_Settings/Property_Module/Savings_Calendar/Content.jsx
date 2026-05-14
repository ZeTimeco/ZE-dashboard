"use client"
import React, { useState } from 'react'
import { styled, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Content() {
  const {t} = useTranslation()
  
  const inputClassNameDot = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"

  const [count, setCount] = useState(0)
  const increase = () => {
    setCount((prev) => prev + 1)
  }
  const decrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
    }
  }

  const GreenSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
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
        borderRadius: 24 / 2,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
  }));



  return (
    <>
    <div className='grid grid-cols-2 gap-4 '>
      {/* checkbox 1 */}
      <div className='border border-[#CDD5DF] py-4 px-2 flex justify-between rounded-[3px] '>
        <p className='text-[#364152] text-sm font-normal '>{t('The property is always available')}</p>
        <input
          type='radio'
          name='box'
          className={inputClassNameDot}
        />
      </div>

      {/* checkbox 2 */}
      <div className='border border-[#CDD5DF] py-4 px-2 flex justify-between rounded-[3px]'>
        <p className='text-[#364152] text-sm font-normal '>{t('Manually check property availability.')}</p>
        <input
          type='radio'
          name='box'
          className={inputClassNameDot}
        />
      </div>
    </div>


    {/*  */}
    <div className='mt-4'>
      <p className='text-[#364152] text-sm font-normal'>{t('Time between bookings')}</p>
      <p className='text-[#697586] text-sm font-normal'>{t('The ability to schedule cleaning services between bookings as desired.')}</p>
      
      {/* Time between bookings */}
      <div className='mt-4'>
        <p className='text-[#364152] text-sm font-normal'>{t('Minimum number of nights')}</p>
      
        <div className='flex items-center gap-3   py-2'>
            
            <button
              onClick={decrease}
              className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
            >
              -
            </button>

            <span className='w-full h-11  text-[#4B5565] flex items-center justify-center font-medium  text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px]'>
              {count} {t('dayss')}
            </span>

            <button
              onClick={increase}
              className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
            >
              +
            </button>
        </div>
      </div>


    </div>

    {/* Activate maintenance mode */}
    <div className='mt-4 flex justify-between'>
      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Activate maintenance mode')}</span>
        <span className='text-[#697586] text-base font-normal'>{t('All bookings are blocked during maintenance.')}</span>
      </p>
      <GreenSwitch/>
    </div>
    </>
  )
}

export default Content