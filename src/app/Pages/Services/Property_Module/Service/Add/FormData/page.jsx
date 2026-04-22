"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, Suspense } from 'react'
import AddressPage from './Address/page'
import BasicInformationPage from './BasicInformation/page'
import CheckDetailsPage from './CheckDetails/page'
import AmenitiesPage from './Amenities/page'
import PricingAndPoliciesPage from './PricingAndPolicies/page'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import NotesPage from './Notes/page'
import { useRouter } from 'next/navigation'


function FormDataPageContent() {
  const {t} = useTranslation()

  const router = useRouter();

  return (
    <MainLayout>
      <div className='border border-[#CDD5DF] p-8'>
        <p className='mb-10 text-[#364152] text-2xl font-medium px-6'>{t('Property details')}</p>
        <DetailsPage  />
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage />
          <BasicInformationPage />
          <CheckDetailsPage />
          <AmenitiesPage />
        </div>
        
        <PricingAndPoliciesPage/>

        <NotesPage/>



        
        <button 
          onClick={() => router.push('/Pages/Services/Property_Module/Service')}
          className='bg-[var(--color-primary)] text-white px-4 h-14 w-fit mt-8 rounded-[3px] cursor-pointer'>
          {t('Property submission for review')}
        </button>

      </div>
    </MainLayout>
  )
}
function FormDataPage() {
  return (
    <Suspense fallback={null}>
      <FormDataPageContent />
    </Suspense>
  )
}

export default FormDataPage