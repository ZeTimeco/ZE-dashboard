"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function Header() {
  const {t} = useTranslation();
  return (
    <>
      <header className='flex justify-between items-center'>
        <div className='flex flex-col gap-3'>
          <p className='text-[#364152] text-2xl font-medium'>{t('pending list')}</p>
          <p className='text-[#697586] text-xl font-normal'>{t('Guests expected to arrive soon')}</p>
        </div>
        {/* btn add */}
        <button className='flex justify-center items-center gap-3 w-[20%] h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer'>
          <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
          <span className="text-[#fff] text-base font-medium">{t('Add a new guest')}</span>
        </button>
        
      </header>

    </>
  )
}

export default Header