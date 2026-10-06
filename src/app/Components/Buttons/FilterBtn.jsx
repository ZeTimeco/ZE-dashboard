"use client";
import Link from 'next/link';
import React from 'react'
import { useTranslation } from 'react-i18next'

function FilterBtn({href , className , onClick}) {
  const {t}= useTranslation();
  return (
    <>
    {/* <Link href={href}> */}
      <button 
      onClick={onClick}
      className={`
        flex gap-4  
        justify-center items-center
        border h-14 w-37.5 
        border-primary rounded-3px
        cursor-pointer
        ${className}
        `}>
        <img src="/images/icons/FlterIcon.svg" alt=""  className='w-6 h-6'/>
        <span className='text-primary text-base font-medium'>{t('filter')} </span>
      </button>
    {/* </Link> */}

    </>
  )
}

export default FilterBtn