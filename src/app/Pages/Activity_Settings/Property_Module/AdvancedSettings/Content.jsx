"use client"
import React, { useState } from 'react'
import { styled, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next';


function Content() {
  const {t} = useTranslation()
  
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

  const [count, setCount] = useState(0)
  const increase = () => {
    setCount((prev) => prev + 1)
  }
  const decrease = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
    }
  }

  const inputClassNameTrue ="w-5 h-5 appearance-none border border-gray-300 rounded-sm bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";
  const [selected, setSelected] = useState("");

  return (
    <>
      {/* hours */}
      <div className='mt-6 flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('No-attendance is automatically recorded after')} X {t('hours')}</span>
          <span className='text-[#697586] text-base font-normal'>{t('Automatically setting reservations for non-attendance')}</span>
        </p>
        <GreenSwitch/>
      </div>

      {/* Hours after check-in time */}
      <div className='mt-4'>
        <p className='text-[#364152] text-sm font-normal'>{t('Hours after check-in time')}</p>
      
        <div className='flex items-center gap-3   py-2'>
            
            <button
              onClick={decrease}
              className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
            >
              -
            </button>

            <span className='w-full h-11  text-[#4B5565] flex items-center justify-center font-medium  text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px]'>
              {count} {t('hours')}
            </span>

            <button
              onClick={increase}
              className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
            >
              +
            </button>
        </div>
      </div>

      {/* Booking completed automatically after departure */}
      <div className='mt-6 flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Booking completed automatically after departure')}</span>
          <span className='text-[#697586] text-base font-normal'>{t('The reservation is complete upon the guest s departure.')}</span>
        </p>
        <GreenSwitch/>
      </div>

      {/*  */}
      <div className='mt-6'>
        <p className='text-[#364152] text-base font-medium'>{t('No-attendance policy')}</p>
        <div className='mt-3 grid grid-cols-2 gap-4'>
          {/* Collect the full amount */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "1"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p>
              <span className='text-[#364152] text-sm font-normal'>{t('Collect the full amount')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "1"}
              onChange={() => setSelected("1")}
            />
          </div>

          {/* Charge only for the first night */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "2"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p>
              <span className='text-[#364152] text-sm font-normal'>{t('Charge only for the first night')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "2"}
              onChange={() => setSelected("2")}
            />
          </div>

          {/* Without collection */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "3"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p>
              <span className='text-[#364152] text-sm font-normal'>{t('Without collection')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "3"}
              onChange={() => setSelected("3")}
            />
          </div>

        </div>
      </div>




    </>
  )
}

export default Content