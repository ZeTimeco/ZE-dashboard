'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function EmptyData() {
  const {t} = useTranslation()
  return (
    <>
        
        
    <div className='flex flex-col items-center justify-center  mt-15 mb-5'>
      <img src="/images/car.svg" alt="" />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No active delivery flights")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('You have no orders pending delivery at the moment.')}</p>
    
    </div>
    </>
  )
}

export default EmptyData