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
      <div className='border border-[#CDD5DF] p-8'>

        <DetailsPage/>
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage/>
          <BasicInformationPage/>
          <CheckDetailsPage/>
          <AmenitiesPage/>
        </div>
        
        <PricingAndPoliciesPage/>
      </div>
    </MainLayout>
  )
}
export default ViewPage