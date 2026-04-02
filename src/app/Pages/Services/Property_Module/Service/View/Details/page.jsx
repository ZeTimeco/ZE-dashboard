"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function DetailsPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className='mb-6 w-full flex gap-8  border border-[#CDD5DF] rounded-[3px] p-3'>
        <div className='w-[25%] '>
          <img src="/images/testyImage.svg" alt=""  />
        </div>

        <div className='w-[75%]'>
          <p className='text-[#364152] text-base font-medium mb-2'>شقة حديثة من غرفتي نوم في الجديدة القاهرة </p>
          
          <ul className="flex items-center gap-2 text-sm font-normal text-[#4B5565]">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span>
              2 سرير
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span>
              2 حمام
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span>
              4 ضيوف
            </li>
          </ul>
          
          <div className='flex gap-2 mt-3'>
            <img src="/images/icons/locationblue.svg" className="w-4 h-4 mt-1" />
            <p className='text-[#4B5565] text-sm font-normal'>القاهرة الجديدة، القاهرة، مصر</p>
          </div>

          <p className='text-[var(--color-primary)] text-base font-medium my-2' >
            <span>85 جنية</span>
            <span>{t('On the night')}</span>
          </p>
          
        </div>

      </div>

    </>
  )
}

export default DetailsPage