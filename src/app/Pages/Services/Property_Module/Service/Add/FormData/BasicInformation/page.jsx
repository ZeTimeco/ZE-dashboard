"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function BasicInformationPage() {
  const {t} = useTranslation()
  
  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Basic Information')}</p>
          <button className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>
        
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Property type')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            شقه
          </p>
        </div>
        <div className="flex justify-between items-center py-3 ">
          <p className="text-[#4B5565] text-sm font-normal">{t('Maximum number of guests')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>3</span>
            <span>{t('guests')}</span>
          </p>
        </div>
        <div className="flex justify-between items-center  ">
          <p className="text-[#4B5565] text-sm font-normal">{t('measuring')}</p> 
          <p className="text-[#364152] text-sm font-medium w-[20%]">
            <span>233</span>
            <span>م ع</span>
          </p>
        </div>

      </div>

    </>
  )
}
export default BasicInformationPage