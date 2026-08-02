'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
    <div className='flex justify-between'>

      <div className='flex flex-col gap-1'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Delivery')}</p>
        <p className='flex items-center gap-2'>
          <img src="/images/icons/delivery-truck-blue.svg" alt="" />
          <span className='text-[#4B5565] text-base font-normal'>5 {t('in the way')}</span>
        </p>
      </div>

      <button 
        onClick={() => router.back()}
        className='w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] text-base font-medium cursor-pointer'>
        {t('Open the menu')}
      </button>

    </div>
      
    </>
  )
}

export default Header