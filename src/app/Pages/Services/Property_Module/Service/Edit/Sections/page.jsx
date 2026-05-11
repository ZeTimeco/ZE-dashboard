"use client"
import Loader from '@/app/Components/Loader/Loader'
import { getAllDetailsThunk } from '@/redux/slice/Services/ServicesSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

function SectionsPageContent() {
    const {t} = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    //api
    const dispatch = useDispatch()
    const {getDetails} = useSelector((state)=>state.services)
    const getDetailsData = getDetails?.data
    useEffect((id)=>{
      dispatch(getAllDetailsThunk(id))
    },[dispatch])

    console.log(getDetailsData);
  
  return (
    <>
      <div className='mb-6 w-full  gap-8  border border-[#CDD5DF] rounded-[3px] p-6 '>
        <p className=' text-[#364152] text-lg font-normal mb-6'>{t('Select the section you want to edit.')}</p>
        

        <div className='grid grid-cols-2 gap-4'>

          {/* Basic Information */}
          <div 
            className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'
          >
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/home_white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Basic Information')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    <span>{getDetailsData?.property_type?.name} - </span>
                    <span>{getDetailsData?.guests_count}</span> {" "}
                    <span>{t('Maximum number of guests')}</span>
                  </p>
              </div>

            </div>

            <div className='flex items-center'>
              <button
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/BasicInformation?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* the address */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/location_white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('the address')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    {getDetailsData?.location?.country} , {getDetailsData?.location?.city} , {getDetailsData?.location?.area}
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Address?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Room and bathroom details */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/bed-single-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Room and bathroom details')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    <span>{getDetailsData?.rooms_count} {t('bedrooms')}</span> - {" "}
                    <span>{getDetailsData?.bathrooms_count} {t('bathroom')}</span>  - {" "} 
                    <span>{getDetailsData?.bathrooms_count} {t('beds')}</span>
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/RoomsAndBathrooms?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Property details */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/building-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Property details')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    <span>
                      {t('The role')}{" "}
                      {getDetailsData?.floor_number === 0
                        ? "الأرضي"
                        : getDetailsData?.floor_number}
                    </span>{" "} -
                    <span>{getDetailsData?.area} م.ع </span>  - {" "} 
                    <span>
                      {t('elevator')}{" "}
                      {getDetailsData?.has_elevator ? (t('available'))  : (t('Not available'))}
                    </span>
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/PropertyDetails?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Property amenities */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/wifi-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Property amenities')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    {getDetailsData?.amenities?.map((item) => (
                      <span key={item.id}>{item?.name} • {' '}</span> 
                      
                    ))}
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Facilities?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Pricing and policies */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/dollar-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Pricing and policies')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    <span>{getDetailsData?.base_price}{t('On the night')} </span>  {' '} {' '} {' '}•  {' '}
                    <span>{getDetailsData?.cancellation_policy?.policy_name}</span>
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Pricing?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Availability */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/calendar-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Availability')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    {getDetailsData?.available_nights} {t('available night')}
                  </p>
              </div>

            </div>
            <div className='flex items-center'>
              <button 
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Availability?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

          {/* Images and Media */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/camera-white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Images and Media')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    {t('Loaded')} {getDetailsData?.images_count} {t('photo')}  
                  </p>
              </div>
            </div>
            <div className='flex items-center'>
              <button 
                onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit/Sections/Form/Media?id=${id}`)}
                className='bg-[#EEF2F6] rounded-full w-10 h-10 flex justify-center items-center cursor-pointer'>
                <img src="/images/icons/arrow_grey_left.svg" className="w-6 h-6" />
              </button>
            </div>

          </div>

        </div>

      </div>

    </>
  )
}

export default function SectionsPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <SectionsPageContent />
    </Suspense>
  )
}