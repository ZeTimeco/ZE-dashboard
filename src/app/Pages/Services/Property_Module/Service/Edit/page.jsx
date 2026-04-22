"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import SectionsPage from './Sections/page'

function EditPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>
      <div className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Property modification')}</p>
        <DetailsPage/>

        <SectionsPage/>
        
        
      </div>
    </MainLayout>
  )
}

export default EditPage