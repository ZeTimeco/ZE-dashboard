"use client"
import React, { useState } from 'react'
import { styled, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'

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

  const inputClassNameTrue ="w-5 h-5 appearance-none border border-gray-300 rounded-sm bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";
  const [selected, setSelected] = useState("");

  return (
    <>
      {/* Virtual house rules */}
      <div>
        <p className='text-[#364152] text-base font-medium'>{t('Virtual house rules')}</p>
        <textarea
          className='w-full h-35 border border-[#CDD5DF] text-sm font-normal text-[#9AA4B2] outline-0 rounded-[3px] px-4 py-3 resize-none mt-2'
          placeholder={t('Enter the house rules...')}
        ></textarea>
      </div>


      {/*Guest ID verification request  */}
      <div className='mt-6 flex justify-between'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-medium'>{t('Guest ID verification request')}</span>
          <span className='text-[#697586] text-base font-normal'>{t('Guests identities must be verified before booking.')}</span>
        </p>
        <GreenSwitch/>
      </div>

      {/*  */}
      <div className='mt-12'>
        <p className='text-[#364152] text-base font-medium'>{t('Determining how to communicate')}</p>
        <div className='mt-3 grid grid-cols-3 gap-4'>
          {/* call */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "mobile"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p className='flex gap-1'>
              <img src="/images/icons/call.svg" className="w-4.5 h-4.5" />
              <span className='text-[#364152] text-sm font-normal'>{t('Mobile phone')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "mobile"}
              onChange={() => setSelected("mobile")}
            />
          </div>

          {/* WhatsApp */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "WhatsApp"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p className='flex gap-1'>
              <img src="/images/icons/whatsapp.svg" className="w-4.5 h-4.5" />
              <span className='text-[#364152] text-sm font-normal'>{t('WhatsApp')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "WhatsApp"}
              onChange={() => setSelected("WhatsApp")}
            />
          </div>

          {/* App Messages */}
          <div className={`flex justify-between border  py-4 px-3 rounded-[3px] ${
            selected === "Messages"?'border-[var(--color-primary)]':'border-[#CDD5DF]'
          }`}>
            <p className='flex gap-1'>
              <img src="/images/icons/telegram.svg" className="w-4.5 h-4.5" />
              <span className='text-[#364152] text-sm font-normal'>{t('App Messages')}</span>
            </p>
            <input 
              type="radio" 
              className={inputClassNameTrue}
              name='box'
              checked={selected === "Messages"}
              onChange={() => setSelected("Messages")}
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default Content