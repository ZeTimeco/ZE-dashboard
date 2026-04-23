"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense } from 'react'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import SectionsPage from './Sections/page'
import Loader from '@/app/Components/Loader/Loader'

function EditPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>
      <div  className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Property modification')}</p>
        <DetailsPage/>

        <Suspense fallback={<Loader/>}>
          <SectionsPage/>
        </Suspense>
        
        
      </div>
    </MainLayout>
  )
}

export default EditPage