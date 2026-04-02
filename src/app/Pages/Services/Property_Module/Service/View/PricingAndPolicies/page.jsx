"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingAndPoliciesPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Pricing and policies')}</p>

        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Basic price')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">85 جنية في الليلة</p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Cleaning fees')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">25 جنية </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Deposit of guarantee')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">200 جنية</p>
        </div>
        <div className="flex justify-between items-center  py-3">
          <p className="text-[#4B5565] text-sm font-normal">{t('cancellation')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">معتدل </p>
        </div>

      </div>
    </>
  )
}
export default PricingAndPoliciesPage