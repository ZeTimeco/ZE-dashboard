'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Card() {
  const { t} = useTranslation()
    return (
    <>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] rounded-[3px] p-4 '>

      {/*  */}
      <div className='flex justify-between w-full'>
        <div className='w-full'>
          <p className='border border-[#4D0CE7] bg-[#EDE7FD] rounded-full text-[#4D0CE7] text-sm font-normal w-fit px-2 py-1 flex gap-1'>
            <img src="/images/icons/delivery-truck-blue.svg" alt="" />
            <span>{t('in the way')}</span>
          </p>
        </div>

        <div className='flex flex-col gap-1 items-end w-full'>
          <p className='text-[#364152] text-base font-medium'>#ORD-NZACC-91170</p>
          <p className='text-[#697586] text-sm font-normal'>{t('since')}3{t('minutes')}</p>
        </div>
      </div>

      {/*  */}
      <div className='flex justify-between mt-3'>
        <p className='text-base font-medium'>
          <span className='text-[#697586]'>{t('Captain')} : </span>
          <span className='text-[#364152]'>أحمد محمد</span>
        </p>
        <button className='w-7 h-7 bg-[var(--color-primary)] rounded-full flex justify-center items-center'>
          <img src="/images/icons/call white.svg" className='w-4 h-4' />
        </button>
      </div>

      <div className='border border-[#E3E8EF] my-3'></div>

      {/*  */}
      <div className='flex justify-between mb-3'>
        <p className='text-[#364152] text-base font-medium flex gap-1'>
          <span className='flex items-center'>
            <img src="/images/icons/user_gray.svg" className='w-4 h-4' />
          </span>
          <span>{t('Customer')} : </span>
          <span>أحمد محمد</span>
        </p>
        <button className='w-7 h-7 bg-[var(--color-primary)] rounded-full flex justify-center items-center'>
          <img src="/images/icons/call white.svg" className='w-4 h-4' />
        </button>
      </div>

      {/*  */}
      <button className='flex gap-1'>
        <p className='flex items-center'>
          <img src="/images/icons/location-gray2.svg" className='w-4 h-4' />
        </p>
        <p className='text-[var(--color-primary)] text-base font-normal underline'>شارع الملك فهد، الرياض، المملكة العربية السعودية</p>
      </button>


    </div>
      

    </>
  )
}

export default Card