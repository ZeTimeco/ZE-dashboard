'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DefaultSettings() {
  const {t} = useTranslation() 
  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Default Settings')}</p>
      </div>

    </>
  )
}

export default DefaultSettings