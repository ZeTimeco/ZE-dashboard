"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function SectionsPage() {
    const {t} = useTranslation()
    const router = useRouter()
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
  
  return (
    <>
      <div className='mb-6 w-full  gap-8  border border-[#CDD5DF] rounded-[3px] p-6 '>
        <p className=' text-[#364152] text-lg font-normal mb-6'>{t('Select the section you want to edit.')}</p>
        

        <div className='grid grid-cols-2 gap-4'>
          {/* Basic Information */}
          <div className='border border-[#CDD5DF] p-4 flex justify-between gap-4 rounded-[3px]'>
            <div className='flex  gap-4'>
              <div className='flex items-start'>
                <p className='w-8 h-8 bg-[var(--color-primary)] flex justify-center items-center rounded-[3px]'>
                  <img src="/images/icons/home_white.svg" alt="" />
                </p>
              </div>
          
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-medium'>{t('Basic Information')}</p>
                  <p className='text-[#4B5565] text-base font-normal'>
                    <span>{t('The entire apartment')} - </span>
                    <span>5</span> {" "}
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
                    القاهره, مصر , مدينة نصر
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
                    <span>{t('bedrooms')} 4 </span> - {" "}
                    <span>{t('bathroom')} 4</span>  - {" "} 
                    <span>{t('family')}</span>
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
                    <span>{t('The role')} 1 </span> - {" "}
                    <span>120 م.ع </span>  - {" "} 
                    <span>{t('elevator')}(متاح)</span>
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
                    واي فاي • صانع القهوة • مكيرويوف
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
                    250 جنية في الليلة • سياسة إلغاء معتدلة
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
                    تم تمكين مزامنة التقويم • 45 ليلة متاحة
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
                    تم تحميل 8 صور  
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

export default SectionsPage