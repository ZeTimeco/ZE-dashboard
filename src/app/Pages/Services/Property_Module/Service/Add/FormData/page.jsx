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
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'


function FormDataPageContent() {
  const {t} = useTranslation()

  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property_id');


  const dispatch = useDispatch();
  const { getDetails } = useSelector((state) => state.services);
  const getDetailsData = getDetails?.data;

  useEffect(() => {
    const idToFetch = propertyId || sessionStorage.getItem('property_id');
    if (idToFetch) {
      dispatch(getAllDetailsThunk(idToFetch));
    }
  }, [dispatch, propertyId]);

  console.log(getDetails?.data);
  
  return (
    <MainLayout>
      <div className='border border-[#CDD5DF] p-8'>
        <p className='mb-10 text-[#364152] text-2xl font-medium px-6'>{t('Property details')}</p>
        <DetailsPage getDetailsData={getDetailsData} />
        <div className='grid grid-cols-2 gap-6'>
          <AddressPage getDetailsData={getDetailsData} />
          <BasicInformationPage getDetailsData={getDetailsData} />
          <CheckDetailsPage getDetailsData={getDetailsData} />
          <AmenitiesPage getDetailsData={getDetailsData} />
        </div>
        
        <PricingAndPoliciesPage getDetailsData={getDetailsData} />

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