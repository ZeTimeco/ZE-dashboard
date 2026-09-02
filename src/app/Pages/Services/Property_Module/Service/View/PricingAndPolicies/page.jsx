"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PricingAndPoliciesPage({ getdetailsData }) {
  const { t } = useTranslation()
  return (
    <>
      <div className='w-full border border-[#CDD5DF] bg-white rounded-[3px] p-5 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <p className='text-[#364152] text-base font-semibold mb-5'>{t('Pricing and policies')}</p>

        <div className="flex justify-between items-center py-1.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('Basic price')}</p>
          <p className="text-[#364152] text-sm font-medium">
            <span>{getdetailsData?.base_price}</span>{' '}
            <span>{getdetailsData?.currency}</span> {' '}
            <span className='text-xs text-slate-500 font-normal'>({t('On the night')})</span>
          </p>
        </div>
        <div className="flex justify-between items-center py-2.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('Cleaning fees')}</p>
          <p className="text-[#364152] text-sm font-medium">
            <span>{getdetailsData?.cleaning_fee}</span>{' '}
            <span>{getdetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center py-1.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('Deposit of guarantee')}</p>
          <p className="text-[#364152] text-sm font-medium">
            <span>{getdetailsData?.security_deposit}</span>{' '}
            <span>{getdetailsData?.currency}</span>
          </p>
        </div>
        <div className="flex justify-between items-center py-2.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('cancellation')}</p>
          <p className="text-[#364152] text-sm font-medium">
            {getdetailsData?.cancellation_policy?.policy_name}
          </p>
        </div>
      </div>
    </>
  )
}

export default PricingAndPoliciesPage