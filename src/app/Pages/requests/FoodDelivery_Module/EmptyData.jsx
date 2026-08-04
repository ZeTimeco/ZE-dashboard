'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function EmptyData() {
  const {t} = useTranslation()
  return (
    <>
        
        
    <div className='flex flex-col items-center justify-center  mt-15 mb-5'>
      <img src="/images/qqq.svg" alt="" />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No orders currently available")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('You do not have any active or previous requests at the moment.')}</p>
    
    </div>
    </>
  )
}

export default EmptyData