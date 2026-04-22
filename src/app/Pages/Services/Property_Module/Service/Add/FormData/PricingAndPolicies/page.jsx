"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingAndPoliciesPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>

        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Pricing and policies')}</p>
          <button className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Basic price')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>233</span>
            <span>$</span> {' '}
            <span>{t('On the night')}</span>
            
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Cleaning fees')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>2333</span>
            <span>$</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Deposit of guarantee')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>4444</span>
            <span>$</span>
          </p>
        </div>
        <div className="flex justify-between items-center  py-3">
          <p className="text-[#4B5565] text-sm font-normal">{t('cancellation')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            policy_name
          </p>
        </div>

      </div>
    </>
  )
}
export default PricingAndPoliciesPage