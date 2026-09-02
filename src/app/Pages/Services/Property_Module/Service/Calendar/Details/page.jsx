"use client"
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_BASE_URL } from '../../../../../../../../config/imageUrl';

function DetailsContent() {
  const { t } = useTranslation()

  const dispatch = useDispatch();
  const { getDetails } = useSelector((state) => state.services);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      dispatch(getAllDetailsThunk(id));
    }
  }, [dispatch, id]);

  const getDetailsData = getDetails?.data

  const StatusRender = (status) => {
    switch (status) {
      case "active":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-8 rounded-3xl flex justify-center items-center shadow-2xs'>
            <div className='py-1 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-8 rounded-3xl flex justify-center items-center shadow-2xs'>
            <div className='py-1 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
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
              <div>{StatusRender(getDetailsData?.activity_status)}</div>
            </div>

            <div className='flex items-center gap-2 mt-2'>
              <img src="/images/icons/locationblue.svg" className="w-4 h-4" alt="" />
              <p className='text-[#4B5565] text-sm font-normal'>{getDetailsData?.location?.address}</p> 
            </div>

            <div className='mt-3 flex items-center gap-1.5'> 
              <img src="/images/icons/star.svg" alt="" className='w-4 h-4' />
              <p className='text-sm'>
                <span className='text-[#364152] font-semibold'>{getDetailsData?.rating_avg || 0}</span> {' '}
                <span className='text-[#697586] font-normal'>({getDetailsData?.reviews_count || 0})</span>
              </p>
            </div>
          </div>
        </div>
      </div>  
    </>
  )
}

function DetailsPage() {
  return (
    <Suspense fallback={<div>Loading Details...</div>}>
      <DetailsContent />
    </Suspense>
  )
}

export default DetailsPage