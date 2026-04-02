"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function AmenitiesPage() {
  const {t} = useTranslation()

  return (
    <>
      <div className=' w-full   border border-[#CDD5DF] rounded-[3px] p-4'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Amenities')}</p>

        <div className='grid grid-cols-4 gap-1.5'>
          <p className='bg-[#EEF2F6] text-[#364152] text-sm p-2.5 rounded-[55px] w-fit'>
            وقوف السيارات 
          </p>
        </div>
        
      </div>

    </>
  )
}
export default AmenitiesPage