'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Views_Aspects() {
  const {t} = useTranslation() 
  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Views/Aspects')}</p>

        <div className='flex justify-between  w-full mt-4'>
          <div className='flex items-center w-full '>
            <p className='flex gap-2 rounded-full px-3 py-2 bg-[#EDE7FD] border border-[#E2E2E2]'>
              <span className='text-[#505050]  text-sm font-normal'>{t('The garden')}</span>
            </p>
          </div>
          <div className='flex justify-end items-center gap-1 w-full'>
            <p className='text-[var(--color-primary)] text-base font-normal'>{t('Viewing Management')}</p>
            <img src="/images/icons/settings-yellow.svg" className='w-5 h-5' />
          </div>
        </div>
      </div>

    </>
  )
}

export default Views_Aspects