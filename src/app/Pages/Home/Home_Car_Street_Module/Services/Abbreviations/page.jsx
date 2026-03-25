"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function AbbreviationsPage() {
  const {t} = useTranslation();
  return (
    <>
    <div className='border border-[#CDD5DF] rounded-[3px] p-4 mb-10'>
      <h2 className='text-[#0F022E] text-xl font-medium mb-4'>{t('Abbreviations')}</h2>
      <div className='grid grid-cols-3 gap-4'>
        <div className='flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center'>
          <img src="/images/icons/Submit_complaint.svg" alt="" className='w-6 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal'>{t('Submit a complaint')}</p>
        </div>

        <div className='flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center'>
          <img src="/images/icons/technical-support.svg" alt="" className='w-8 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal'>{t('technical support')}</p>
        </div>

        <div className='flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center'>
          <img src="/images/icons/working_hours.svg" alt="" className='w-6 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal'>{t('working hours')}</p>
        </div>
      </div>
    </div>

    </>
  )
}

export default AbbreviationsPage