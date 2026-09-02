"use client"
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { IMAGE_BASE_URL } from '../../../../../../../../config/imageUrl'

function DetailsContent() {
  const { t } = useTranslation()

  const searchParams = useSearchParams();
  const propertyId = searchParams.get('id');

  const dispatch = useDispatch()
  const { getDetails } = useSelector((state) => state.services)
  const getDetailsData = getDetails?.data

  useEffect(() => {
    if (propertyId) {
      dispatch(getAllDetailsThunk(propertyId));
    }
  }, [dispatch, propertyId]);

  const status = getDetailsData?.activity_status
  const StatusRender = (status) => {
    switch (status) {
      case "active":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-8 rounded-3xl flex justify-center items-center shadow-2xs'>
            <div className='py-1 px-3'>
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#F97066] w-fit h-8 rounded-3xl flex justify-center items-center shadow-2xs'>
            <div className='py-1 px-3'>
              <span className='text-xs lg1:text-sm font-medium'>{t('inactive')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  }; 

  return (
    <>
      <div className='mb-6 w-full flex flex-col sm:flex-row gap-6 border border-[#CDD5DF] bg-white rounded-[3px] p-4 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <div className='w-full sm:w-[28%] overflow-hidden rounded-[2px]'>
          <img 
            src={`${IMAGE_BASE_URL}${getDetailsData?.primary_image?.image_path}`} 
            alt="" 
            className='h-36 w-full object-cover hover:scale-105 transition-transform duration-500' 
          />  
        </div>

        <div className='w-full sm:w-[72%] flex flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between gap-4 mb-2'>
              <p className='text-[#364152] text-lg font-semibold'> {getDetailsData?.title} </p> 
              <div>{StatusRender(status)}</div>
            </div>
            
            <ul className="flex items-center gap-3 text-sm font-normal text-[#4B5565] flex-wrap">
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
                {getDetailsData?.beds_count} {t('bed')}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
                {getDetailsData?.bathrooms_count} {t('bathroom')}
              </li>
              <li className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-[#4B5565] rounded-full"></span> 
                {getDetailsData?.guests_count} {t('guests')}
              </li>
            </ul>
            
            <div className='flex items-center gap-2 mt-3'>
              <img src="/images/icons/locationblue.svg" className="w-4 h-4" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'>{getDetailsData?.location?.address}</p> 
            </div>
          </div>

          <div className='text-[var(--color-primary)] text-base font-semibold mt-3 flex items-center gap-2' > 
            <p>
              <span>{getDetailsData?.base_price}</span> {' '}
              <span>{getDetailsData?.currency}</span>
            </p>
            <p className='text-sm text-slate-500 font-normal'>/ {t('On the night')}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsContent />
    </Suspense>
  );
}