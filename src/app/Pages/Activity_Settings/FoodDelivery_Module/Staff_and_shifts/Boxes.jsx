'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Boxes({getStaffManageConfig}) {
  const {t} = useTranslation()
  return (
    <>
    <div className='grid grid-cols-2 gap-4 mt-4'>
      {/* At work */}
      <div className=' border border-[#CDD5DF] rounded-3px p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#DCFAE6] rounded-md'>
            <img src="/images/icons/checkmark-circle-true.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('At work')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium mt-2.5'>{getStaffManageConfig?.counts?.in_shift}</p>
      </div>

      {/* Overtime */}
      <div className=' border border-[#CDD5DF] rounded-3px p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEE4E2] rounded-md'>
            <img src="/images/icons/cancel-circle-redd.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Overtime')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium mt-2.5'>{getStaffManageConfig?.counts?.out_of_shift}</p>
      </div>


    </div>
      
      
    </>
  )
}

export default Boxes