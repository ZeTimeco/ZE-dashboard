'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Box() {
  const {t} = useTranslation()
  return (
    <div className='grid grid-cols-3 gap-4 mt-4'>
      {/* Products */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#F4EAD0] rounded-md'>
            <img src="/images/icons/package_yellow.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Products')}</p>
        </div>
        <p className=' text-lg  my-2.5'>
          <span className='text-[#202939] font-medium'>5</span> 
        </p>
      </div>

      {/* available */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#DCFAE6] rounded-md'>
            <img src="/images/icons/checkmark-circle-true.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('available')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>5</p>
      </div>

      {/* Not available */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEE4E2] rounded-md'>
            <img src="/images/icons/checkmark-circle-false.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Not available')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>5</p>
      </div>

    </div>
  )
}

export default Box