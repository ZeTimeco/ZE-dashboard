'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

function Header() {
  const {t} = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  useEffect(() => {
    setSearchTerm(searchParams.get('search') || '')
  }, [searchParams])

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentVal = searchParams.get('search') || ''
      if (searchTerm !== currentVal) {
        const params = new URLSearchParams(searchParams.toString())
        if (searchTerm.trim()) {
          params.set('search', searchTerm)
        } else {
          params.delete('search')
        }
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      }
    }, 400)

    return () => clearTimeout(delayDebounceFn)
  }, [searchTerm, pathname, router, searchParams])
  
  return (
    <>

    <div className='flex justify-between'>
      <SearchForm 
        placeholderKey={t('Product search')} 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
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