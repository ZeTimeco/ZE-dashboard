"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'
import NoTerms_PoliciesPage from './NoTerms_Policies'


function Terms_PoliciesPage() {
  const {t} = useTranslation()
  const data = ["1"]  

  return (
    <>
      <div className='border border-[#E3E8EF] '>
        <Header/>
        <div className='px-6 py-4'>
          {data?.length > 0 ? (
            <Content />
          ) : (
            <NoTerms_PoliciesPage/>
          )}
          <button className='h-14 w-[20%] mt-12 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
        </div>
      </div>

    </>
  )
}

export default Terms_PoliciesPage