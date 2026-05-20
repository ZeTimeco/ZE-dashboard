"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function BoxPage() {
  const {t} = useTranslation();
  
  return (
    <>
    <section className='mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4 '>

      {/* Today bookings */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF3F2] rounded-md'>
            <img src="/images/icons/invoice-red.svg" alt="" />
          </p>
          <p className=''>{t('Today bookings')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>22</p>
      </div>
    
      {/* Active tables */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#B4F0CC] rounded-md'>
            <img src="/images/icons/invoice-green.svg" alt="" />
          </p>
          <p className=''>{t('Active tables')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>22</p>
      
      </div>

      {/* profits */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-md'>
            <img src="/images/icons/profits-orange.svg" alt="" />
          </p>
          <p className=''>{t('profits')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{t('today')} (22)</p>
      </div>

      {/* Evaluation */}
      <div className='border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className='w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
            <img src="/images/icons/labor-blue.svg" alt="" />
          </p>
          <p>{t('Available technicians')}</p>
        </div>

        <div className='my-2.5 flex gap-1'>
          <p className='text-[#121926] text-base font-medium'>
            <span>11</span>{' '}
            <span>{t('Technicians')}</span>
          </p>
        </div>
      </div>


    </section>

    </>
  )
}

export default BoxPage