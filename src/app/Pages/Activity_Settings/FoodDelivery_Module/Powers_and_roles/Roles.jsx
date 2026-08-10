'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Roles() {
  const {t} = useTranslation()
  return (
    <>

      <div className='border border-[#E3E8EF] rounded-[3px] p-4 flex justify-between'>
        <div className='flex flex-col gap-2'>
          <h1 className='text-[#364152] text-base font-medium'>مدير المطعم</h1>
          <p className='text-[#697586] text-sm font-normal'>صلاحيات كاملة لإدارة جميع جوانب المطعم</p>
          <p className='w-fit px-3 border border-[var(--color-primary)] bg-[#F9F5E8] rounded-full'>
            <span className='text-[var(--color-primary)] text-xs font-normal'>20 {t('power')}</span>
          </p>

        </div>

        <div className='flex items-center'>
          <button className='w-8 h-8 rounded-full bg-[#EEF2F6] flex items-center justify-center cursor-pointer'>
            <img src="/images/icons/arrow-right-blackk.svg" alt="" />
          </button>
        </div>

    </div>
      

    </>
  )
}

export default Roles