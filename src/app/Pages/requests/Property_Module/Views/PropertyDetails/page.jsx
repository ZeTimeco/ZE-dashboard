"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function PropertyDetailsPage() {
  const {t} = useTranslation()
    const [open, setOpen] = useState(false) 

  return (
    <>
        <div className="w-full p-3 border border-[#E3E8EF] rounded-[3px] overflow-hidden bg-white select-none mb-4">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between   text-right"
        >
          <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
            <img src="/images/icons/city_yellow.svg" alt="" />
            {t('Property details')}
          </span>

          <div
            className={`transition-transform duration-300 cursor-pointer ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src="/images/icons/ArrowDown.svg" alt="" />
          </div>
        </button>



        {/** content (street) */}
        {open &&(
          <div className="mt-3   ">
            <div className='flex gap-2 mb-4'>
              <p>
                <img src="/images/icons/locationblue.svg" alt="" />
              </p>
              <div className='flex flex-col justify-end '>
                <p className='text-[#364152] text-base font-medium'>فيلا الروابي الفاخرة</p>
                <p className='text-[#697586] text-sm font-normal'>جدة, حي الشاطي</p>
              </div>
            </div>
            <div className='bg-[#EEF2F6] rounded-[3px] px-4 py-2 '>
              <p className='text-[#364152] text-base font-medium mb-2'>{t('Login and logout instructions')}</p>

              <div className='grid grid-cols-2 gap-1 text-[#4B5565] text-sm font-normal'>
                <p>( {t('Login')}:12:00 م )</p>
                <p>( {t('Exit')} :12:00 م )</p>
                <p>{t('The service provider is available from')}</p>
                <p>
                  <span> 12:00م </span> {t('to')} <span> 12:00ص</span>
                </p>
              </div>
            </div>

          </div>

        )}

      </div>

    </>
  )
}

export default PropertyDetailsPage