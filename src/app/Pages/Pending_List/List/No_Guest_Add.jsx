"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function No_Guest_Add() {
  const {t} = useTranslation()
  
  return (
    <>
      <div className='flex flex-col items-center justify-center  my-15'>
        <img src="/images/clock.svg" alt="" />
        <p className='text-[#4B5565] text-xl font-semibold mt-6 mb-4'>{t("There are no guests on the waiting list.")}</p>
        <p className='text-[#697586] text-lg font-normal '>{t('Add a guest to get started')}</p>
        <button 
          className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[3px] my-6 cursor-pointer'
        >
          <p className='text-base flex items-center'>{t('Add guest')} </p>
          <p className='flex items-center'>
            <img src="/images/icons/AddIcon.svg" className="w-5 h-5" />
          </p>
          
        </button>
      </div>

    </>
  )
}

export default No_Guest_Add