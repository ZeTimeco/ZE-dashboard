"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AmenitiesPage({getDetailsData}) {
  const {t} = useTranslation()

  const amentiesList = getDetailsData?.amenities

  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
        
        <div className='mb-5 flex justify-between'>
          <p className='text-[#364152] text-base font-medium '>{t('Amenities')}</p>
          <button className='flex gap-1'>
            <img src="/images/icons/EditYellow.svg" className="w-5 h-5 mt-1" />
            <span className='text-[var(--color-primary)]'>{t('modification')}</span>
          </button>
        </div>

        <div className='flex flex-wrap gap-1.5'>
          {amentiesList?.map((items , index)=>(
            <p key={index} className='bg-[#EEF2F6] text-[#364152] text-sm p-2.5 rounded-[55px] w-fit'>
            {items?.name}
            </p>
          ))}
          
        </div>
        
      </div>

    </>
  )
}
export default AmenitiesPage