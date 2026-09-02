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
import { addSubmitForReviewThunk, getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'

function FormDataPageContent() {
  const { t } = useTranslation()

  const router = useRouter();
  const searchParams = useSearchParams();
  const propertyId = searchParams.get('property_id');

  const dispatch = useDispatch();
  const { getDetails, addSubmitForReview } = useSelector((state) => state.services);
  const getDetailsData = getDetails?.data;

  useEffect(() => {
    const idToFetch = propertyId || sessionStorage.getItem('property_id');
    if (idToFetch) {
      dispatch(getAllDetailsThunk(idToFetch));
    }
  }, [dispatch, propertyId]);

  const handleSubmitReview = async () => {
    const idToSubmit = propertyId || sessionStorage.getItem('property_id');
    if (idToSubmit) {
      const res = await dispatch(addSubmitForReviewThunk(idToSubmit));
      if (res.payload?.status === true) {
        router.push('/Pages/Services/Property_Module/Service');
      }
    }
  };
  
  return (
    <MainLayout>
      <div className='border border-[#CDD5DF] bg-white rounded-[3px] p-6 sm:p-8 shadow-xs transition-shadow duration-200'>
        <p className='mb-8 text-[#364152] text-2xl font-medium px-2'>{t('Property details')}</p>
        
        <DetailsPage getDetailsData={getDetailsData} />
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 my-6'>
          <AddressPage getDetailsData={getDetailsData} propertyId={propertyId}/>
          <BasicInformationPage getDetailsData={getDetailsData} propertyId={propertyId} />
          <CheckDetailsPage getDetailsData={getDetailsData} propertyId={propertyId} />
          <AmenitiesPage getDetailsData={getDetailsData} propertyId={propertyId}/>
        </div>
        
        <PricingAndPoliciesPage getDetailsData={getDetailsData} propertyId={propertyId} />

        <NotesPage/>

        {addSubmitForReview?.status === false && addSubmitForReview?.missing_steps && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-[3px] shadow-xs">
            <p className="font-semibold mb-2">{t('Please complete the following missing steps:')}</p>
            <ul className="list-disc ml-5 space-y-1 text-sm">
              {addSubmitForReview.missing_steps.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ul>
          </div>
        )}
        
        <button 
          onClick={handleSubmitReview}
          className='bg-[var(--color-primary)] hover:bg-[#b08713] text-white font-medium px-6 h-14 w-fit mt-8 rounded-[3px] cursor-pointer transition-all duration-200 hover:shadow-md active:scale-98'
        >
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