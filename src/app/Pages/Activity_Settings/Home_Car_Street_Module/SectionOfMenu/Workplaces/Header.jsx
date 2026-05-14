'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
      const {t} = useTranslation()
  
  return (
    <>

      <div className='py-4 px-6 flex gap-2 '>
        <p className='w-10 h-10 bg-[#EDE7FD] flex justify-center items-center rounded-[3px]'>
          <img src="/images/icons/maps-location-blue.svg" alt=""  className='w-10 h-10 '/>
        </p>
        <p className='flex items-center text-[#364152] text-base font-normal'>{t('Workplaces')}</p>
      </div>
      <hr className='border-0.5 border-[#E4E6EF]'/>

    </>
  )
}

export default Header