import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import AddressPage from './Address/page'
import BasicInformationPage from './BasicInformation/page'
import CheckDetailsPage from './CheckDetails/page'
import AmenitiesPage from './Amenities/page'
import PricingAndPoliciesPage from './PricingAndPolicies/page'
import DetailsPage from './Details/page'

function ViewPage() {
  return (
    <MainLayout>

      <DetailsPage/>
      <div className='grid grid-cols-2 gap-4'>
        <AddressPage/>
        <BasicInformationPage/>
        <CheckDetailsPage/>
        <AmenitiesPage/>
      </div>
      
      <PricingAndPoliciesPage/>
      
    </MainLayout>
  )
}
export default ViewPage