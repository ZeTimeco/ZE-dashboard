"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function BasicInformationPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Basic Information')}</p>

        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Property type')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">شقة</p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Maximum number of guests')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">4 ضيوف</p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('measuring')}</p>
          <p className="text-[#364152] text-sm font-medium w-[20%]">120 م.ع </p>
        </div>

      </div>

    </>
  )
}
export default BasicInformationPage