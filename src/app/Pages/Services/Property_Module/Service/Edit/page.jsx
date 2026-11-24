"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense } from 'react'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import SectionsPage from './Sections/page'
import Loader from '@/app/Components/Loader/Loader'
import { useRouter } from 'next/navigation'

function EditContent() {
  const { t } = useTranslation()
  const router = useRouter()

  const handleBack = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.push('/Pages/Services/Property_Module/Service')
    } else {
      router.push('/Pages/Services')
    }
  }

  return (
    <MainLayout>
      <div  className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Property modification')}</p>
        <DetailsPage/>

        <Suspense fallback={<Loader/>}>
          <SectionsPage/>
        </Suspense>

        {/* Bottom Back Button */}
        <div className="flex justify-start mt-8 pt-4 border-t border-[#E6E6E6]">
          <button
            onClick={handleBack}
            className="h-12 px-8 flex items-center justify-center gap-2 border border-[#697586] text-[#697586] hover:bg-gray-50 rounded-3px text-base font-medium transition-colors cursor-pointer"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rtl:rotate-180">
              <path d="M10 13L5 8L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{t('Return')}</span>
          </button>
        </div>
      </div>
    </MainLayout>
  )
}



export default function EditPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditContent />
    </Suspense>
  );
}