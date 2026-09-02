"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddressPage({ getdetailsData }) {
  const { t } = useTranslation()
  return (
    <>
      <div className='w-full border border-[#CDD5DF] bg-white rounded-[3px] p-5 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <p className='text-[#364152] text-base font-semibold mb-5'>{t('the address')}</p>
        <div className="flex justify-between items-center py-1.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('State')}</p>
          <p className="text-[#364152] text-sm font-medium">{getdetailsData?.location?.country}</p>
        </div>
        <div className="flex justify-between items-center py-2.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('City')}</p>
          <p className="text-[#364152] text-sm font-medium">{getdetailsData?.location?.city}</p>
        </div>
        <div className="flex justify-between items-center py-1.5 transition-colors duration-150 hover:bg-slate-50/70 px-1 rounded-[2px]">
          <p className="text-[#4B5565] text-sm font-normal">{t('region')}</p>
          <p className="text-[#364152] text-sm font-medium">{getdetailsData?.location?.area}</p>
        </div>
      </div>
    </>
  )
}

export default AddressPage