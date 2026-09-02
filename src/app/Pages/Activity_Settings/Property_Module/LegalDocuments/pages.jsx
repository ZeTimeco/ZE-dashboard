"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'

function LegalDocumentsPages() {
  const { t } = useTranslation()
  
  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] shadow-xs'>
        <Header/>
        <div className='px-6 py-6'>
          <Content/>
        </div>
      </div>
    </>
  )
}

export default LegalDocumentsPages
