'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Boxes() {
    const {t} = useTranslation()
  
  return (
    <div>
      <p className='text-[#364152] text-base font-medium mt-4 mb-4'>{t('Key indicators')}</p>
      {/* main box */}
      <div className='grid grid-cols-4 gap-4 '>
        {/* Total sales */}
        <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
          <div className='flex items-center gap-3'>
            <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
              <img src="/images/icons/dollar_blue.svg" alt="" />
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Total sales')}</p>
          </div>
          <p className=' text-lg  my-2.5'>
            <span className='text-[#202939] font-medium'>4,000 {t('pound')}</span> 
          </p>
        </div>

        {/* Number of requests */}
        <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
          <div className='flex items-center gap-3'>
            <p className=' w-10 h-10 flex justify-center items-center bg-[#DCFAE6] rounded-md'>
              <img src="/images/icons/square-green.svg" alt="" />
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Number of requests')}</p>
          </div>
          <p className='text-[#202939] text-lg font-medium my-2.5'>3</p>
        </div>

        {/* Number of customers */}
        <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
          <div className='flex items-center gap-3'>
            <p className=' w-10 h-10 flex justify-center items-center bg-[#FFFAEB] rounded-md'>
              <img src="/images/icons/user-group-brown.svg" alt="" />
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Number of customers')}</p>
          </div>
          <p className='text-[#202939] text-lg font-medium my-2.5'>33</p>
        </div>

        {/* Average rating */}
        <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
          <div className='flex items-center gap-3'>
            <p className=' w-10 h-10 flex justify-center items-center bg-[#F9F5E8] rounded-md'>
              <img src="/images/icons/auto-conversations_brown.svg" alt="" />
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Average rating')}</p>
          </div>
          <p className='text-[#202939] text-lg font-medium my-2.5'>33</p>
        </div>

      </div>
      
    </div>
  )
}

export default Boxes