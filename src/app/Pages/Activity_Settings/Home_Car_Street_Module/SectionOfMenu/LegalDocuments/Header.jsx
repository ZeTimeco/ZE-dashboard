'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
      const {t} = useTranslation()
  
  return (
    <>

      <div className='py-4 px-6 flex gap-2 '>
        <p className='w-10 h-10 bg-[#EDE7FD] flex justify-center items-center rounded-[3px]'>
          <img src="/images/icons/Legal Documents _blue.svg" alt=""  className='w-6 h-6 '/>
        </p>
        <p className='flex items-center text-[#364152] text-base font-normal'>{t('Legal Documents')}</p>
      </div>
      <hr className='border-0.5 border-[#E4E6EF]'/>

    </>
  )
}

export default Header