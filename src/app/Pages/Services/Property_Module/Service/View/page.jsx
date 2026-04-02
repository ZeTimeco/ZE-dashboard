"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import AddressPage from './Address/page'
import BasicInformationPage from './BasicInformation/page'
import CheckDetailsPage from './CheckDetails/page'
import AmenitiesPage from './Amenities/page'
import PricingAndPoliciesPage from './PricingAndPolicies/page'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'

function ViewPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>
      <div className='border border-[#CDD5DF] p-8'>
        <p className='mb-10 text-[#364152] text-2xl font-medium px-6'>{t('Property details')}</p>
        <DetailsPage/>
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage/>
          <BasicInformationPage/>
          <CheckDetailsPage/>
          <AmenitiesPage/>
        </div>
        
        <PricingAndPoliciesPage/>

        <button className='bg-[var(--color-primary)] text-white px-4 h-14 w-50 mt-8 rounded-[3px] cursor-pointer'>
          {t('modification')}
        </button>

      </div>
    </MainLayout>
  )
}
export default ViewPage