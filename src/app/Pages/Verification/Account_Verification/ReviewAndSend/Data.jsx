'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Data({ onGoToFirstStage }) {
  const { t } = useTranslation()
  return (
    <div className='border border-[#E7E5E4E5] rounded-3px p-3'>
      <div className='flex justify-between mb-3 border-b border-[#E7E5E4E5] pb-2'>
        <p className='flex items-center gap-2 '>
          <span className='inline-block w-2 h-2 rounded-full bg-primary'></span>
          <span className='text-[#1C1917] text-base font-semibold'>{t('Business establishment data')}</span>
        </p>

        <button 
          type="button"
          onClick={onGoToFirstStage}
          className='text-primary text-sm font-bold cursor-pointer'
        >
          {t('modification')}
        </button>
      </div>
      

      <div className='flex flex-col gap-3'>
        <div className='flex justify-between '>
          <h3 className='text-[#A8A29E] text-sm font-medium'>{t('Store/Activity Name')} :</h3>
          <p className='text-[#292524] text-sm font-medium'>أسواق النور المركزية</p>
        </div>

        <div className='flex justify-between '>
          <h3 className='text-[#A8A29E] text-sm font-medium'>{t('Commercial Registration Number')} :</h3>
          <p className='text-[#292524] text-sm font-medium'>123456789</p>
        </div>

        <div className='flex justify-between '>
          <h3 className='text-[#A8A29E] text-sm font-medium'>{t('Detailed address')} :</h3>
          <p className='text-[#292524] text-sm font-medium'>أسواق النور المركزية</p>
        </div>

      </div>
      
    </div>
  )
}

export default Data