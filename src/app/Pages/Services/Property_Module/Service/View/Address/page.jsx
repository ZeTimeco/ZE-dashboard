"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddressPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
          <p className='text-[#364152] text-base font-medium mb-5'>{t('the address')}</p>
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('State')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">مصر</p>
          </div>
          <div className="flex justify-between items-center py-3 ">
            <p className="text-[#4B5565] text-sm font-normal">{t('City')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">القاهرة</p>
          </div>
          <div className="flex justify-between items-center  ">
            <p className="text-[#4B5565] text-sm font-normal">{t('region')}</p>
            <p className="text-[#364152] text-sm font-medium w-[20%]">مصر الجديدة</p>
          </div>

      </div>
    </>
  )
}
export default AddressPage