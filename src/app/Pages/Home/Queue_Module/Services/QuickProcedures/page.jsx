"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function QuickProceduresPage() {
  const {t} = useTranslation()
  return (
    <>

    <div className='border border-[#CDD5DF] rounded-[3px] p-4 mb-10 mt-10'>
      <p className='text-[#364152] text-xl font-medium mb-4'>{t('Quick procedures')}</p>

      <div className='grid grid-cols-4 gap-4'>
        <button className='group  flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center hover:border-[var(--color-primary)] transition duration-200 active:border-[var(--color-primary)] cursor-pointer'>
          <img src="/images/icons/menu-square.svg" alt="" className='w-6 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)] transition duration-200'>{t('Menu and Prices')}</p>
        </button>

        <button className='group flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center hover:border-[var(--color-primary)] transition duration-200 active:border-[var(--color-primary)] cursor-pointer'>
          <img src="/images/icons/restaurant-yellow.svg" alt="" className='w-8 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)] transition duration-200'>{t('Hall layout')}</p>
        </button>

        <button className='group flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center hover:border-[var(--color-primary)] transition duration-200 active:border-[var(--color-primary)] cursor-pointer'>
          <img src="/images/icons/add-circle.svg" alt="" className='w-6 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)] transition duration-200'>{t('Add booking')}</p>
        </button>

        <button className='group flex flex-col gap-2 border border-[#E4E7EC] rounded-[3px] p-4 items-center hover:border-[var(--color-primary)] transition duration-200 active:border-[var(--color-primary)] cursor-pointer'>
          <img src="/images/icons/dish-yellow.svg" alt="" className='w-6 h-8' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-[var(--color-primary)] group-active:text-[var(--color-primary)] transition duration-200'>{t('Halls')}</p>
        </button>
      </div>
    </div>
    </>
  )
}

export default QuickProceduresPage