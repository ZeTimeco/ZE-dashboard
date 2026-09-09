'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Section() {
  const {t} = useTranslation()
  return (
    <>

    <div className="flex flex-col gap-1 items-center justify-center">
      <div className="h-20 w-20 animate-spin rounded-full border-[3px] border-[#F7EBC5] border-t-primary border-r-primary" />  

      <p className='text-[#364152] text-xl font-medium'>{t('Your offer is under review')}</p>  
      <p className='text-[#697586] text-lg font-normal text-center'>{t('We have sent your offer to the customer. A notification will appear as soon as the offer is accepted or another delivery person is chosen.')}</p>
    </div>

    <div className='mt-10.5 flex flex-col gap-3 bg-[#FDF7E8] border border-[#F5DFA3] p-6'>
      {/* Your offer */}
      <div className='flex justify-between'>
        <p className='text-[#3B3B3B] text-xl font-normal'>{t(t('Your offer'))}</p>
        <p className='text-primary text-xl font-semibold'>5000 {t(t('pound'))}</p>
      </div>

      <div className='border border-[#E8E8E8] '></div>

      {/* request */}
      <div className='flex justify-between'>
        <p className='text-[#848484] text-xl font-normal'>{t(t('request'))}</p>
        <p className='text-[#3B3B3B] text-lg font-medium'>ZT-PR-8842</p>
      </div>

      {/* Competitive offers */}
      <div className='flex justify-between'>
        <p className='text-[#848484] text-xl font-normal'>{t(t('Competitive offers'))}</p>
        <p className='text-[#3B3B3B] text-lg font-medium'>5 {t('Connectors')}</p>
      </div>



    </div>
          
    </>
  )
}

export default Section