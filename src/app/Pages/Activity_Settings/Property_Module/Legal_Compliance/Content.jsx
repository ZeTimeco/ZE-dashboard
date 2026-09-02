"use client"
import React from 'react'
import { styled, Switch } from '@mui/material'
import { useTranslation } from 'react-i18next'

function Content({ formData, setFormData }) {
  const { t } = useTranslation()
  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }))

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

  const inputClassNameTrue = "w-5 h-5 appearance-none border border-gray-300 rounded-sm bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-colors";

  return (
    <>
      {/* Virtual house rules */}
      <div>
        <p className='text-[#364152] text-base font-semibold'>{t('Virtual house rules')}</p>
        <textarea
          value={formData?.in_house_rules || ''}
          onChange={(e) => (
            setFormData((prev) => ({
              ...prev,
              in_house_rules: e.target.value
            }))
          )}
          className='w-full h-35 border border-[#CDD5DF] text-sm font-normal text-[#364152] outline-0 rounded-[3px] px-4 py-3 resize-none mt-2 transition-colors focus:border-[var(--color-primary)] placeholder:text-[#9AA4B2]'
          placeholder={t('Enter the house rules...')}
        />
      </div>

      {/* Guest ID verification request */}
      <div className='mt-6 pt-4 border-t border-gray-100 flex justify-between items-center'>
        <p className='flex flex-col gap-1'>
          <span className='text-[#364152] text-base font-semibold'>{t('Guest ID verification request')}</span>
          <span className='text-[#697586] text-sm font-normal'>{t('Guests identities must be verified before booking.')}</span>
        </p>
        <GreenSwitch
          checked={!!formData?.ask_guest_identity}
          onChange={(e) => set('ask_guest_identity', e.target.checked)}
        />
      </div>

      {/* Determining how to communicate */}
      <div className='mt-8 pt-4 border-t border-gray-100'>
        <p className='text-[#364152] text-base font-semibold'>{t('Determining how to communicate')}</p>
        <div className='mt-3 grid grid-cols-1 md:grid-cols-3 gap-4'>
          {/* Call */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, enable_phone: !prev.enable_phone }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.enable_phone ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p className='flex items-center gap-2'>
              <img src="/images/icons/call.svg" className="w-4.5 h-4.5" alt="" />
              <span className='text-[#364152] text-sm font-medium'>{t('Mobile phone')}</span>
            </p>
            <input 
              type="checkbox" 
              className={inputClassNameTrue}
              checked={!!formData?.enable_phone}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  enable_phone: e.target.checked
                }))}
            />
          </div>

          {/* WhatsApp */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, enable_whatsapp: !prev.enable_whatsapp }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.enable_whatsapp ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p className='flex items-center gap-2'>
              <img src="/images/icons/whatsapp.svg" className="w-4.5 h-4.5" alt="" />
              <span className='text-[#364152] text-sm font-medium'>{t('WhatsApp')}</span>
            </p>
            <input 
              type="checkbox" 
              className={inputClassNameTrue}
              checked={!!formData?.enable_whatsapp}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  enable_whatsapp: e.target.checked
                }))}
            />
          </div>

          {/* App Messages */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, enable_app_message: !prev.enable_app_message }))}
            className={`flex justify-between items-center border py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData?.enable_app_message ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <p className='flex items-center gap-2'>
              <img src="/images/icons/telegram.svg" className="w-4.5 h-4.5" alt="" />
              <span className='text-[#364152] text-sm font-medium'>{t('App Messages')}</span>
            </p>
            <input 
              type="checkbox" 
              className={inputClassNameTrue}
              checked={!!formData?.enable_app_message}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  enable_app_message: e.target.checked
                }))}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Content