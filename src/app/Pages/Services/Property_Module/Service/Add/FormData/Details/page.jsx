"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function DetailsPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className='mb-6 w-full flex gap-8  border border-[#CDD5DF] rounded-[3px] p-3'>
        <div className='w-[25%]  '>
          <img src='/images/property.svg' alt="" className='h-35 w-full' />  
        </div>

        <div className='w-[75%]'>
          <p className='text-[#364152] text-base font-medium mb-2'> شقه الرحاب </p> 
          
          <ul className="flex items-center gap-2 text-sm font-normal text-[#4B5565]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              5 {t('bed')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              2{t('bathroom')}
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
              3 {t('guests')}
            </li>
          </ul>
          
          <div className='flex gap-2 mt-3'>
            <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
            <p className='text-[#4B5565] text-sm font-normal'>el hosary</p> 
          </div>

          <div className='text-[var(--color-primary)] text-base font-medium my-2 flex gap-2' > 
            <p>
              <span>22</span>
              <span>$</span>
            </p>
            <p>{t('On the night')}</p>
          </div>
          
        </div>

      </div>

    </>
  )
}

export default DetailsPage