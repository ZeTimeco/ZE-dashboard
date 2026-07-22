'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const {t} = useTranslation()
  
  return (
    <>

    <div className='flex justify-between'>
      <SearchForm placeholderKey={t('Product search')} />
      <div className='flex gap-4'>
        <button className='flex gap-2 border border-[#E3E8EF] px-4 py-2.5 h-14 rounded-[3px]'>
          <span className='flex items-center'><img src="/images/icons/settings-black.svg" className="w-5 h-5" /></span>
          <span className='text-[#4B5565] text-base font-normal flex items-center'>{t('Menu Settings')}</span>
        </button>

        <button className='flex gap-2 border border-[#E3E8EF] px-4 py-2.5 h-14 rounded-[3px]'>
          <span className='flex items-center'><img src="/images/icons/file-view_gray.svg" className="w-5 h-5" /></span>
          <span className='text-[#4B5565] text-base font-normal flex items-center'>{t('Categories')}</span>
        </button>
      </div>
    </div>
      
    </>
  )
}

export default Header