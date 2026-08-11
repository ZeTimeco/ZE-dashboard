'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function AtWork() {
  const {t} = useTranslation()
  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-medium'>{t('At work')} {t('now')}</p>

      <div className='border border-[#E3E8EF] rounded-[3px] p-4 mt-4 flex justify-between'>
        {/*  */}
        <div className='flex gap-2'>
          <p className='w-11 h-11 rounded-full bg-[#F9F5E8] flex justify-center items-center'>
            <img src="/images/icons/user_yellow.svg" className="w-6 h-6" />
          </p>

          <div>
            <p className='text-[#364152] text-base font-normal'>أحمد محمد سالم</p>
            <p className='text-[#4B5565] text-sm font-normal'>مدير المطعم</p>
          </div>
        </div>

        {/*  */}
        <div className='flex items-center'>
          <p className='border border-[#067647] bg-[#DCFAE6] text-[#067647] w-fit  px-3 rounded-full'>
          {t('active')}
        </p>
        </div>
        


      </div>
    </div>
  )
}

export default AtWork