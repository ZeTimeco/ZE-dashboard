"use client"
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next';
import BookingTypePage from './BookingType/page';
import SpecialPricesPage from './SpecialPrices/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';
import Loader from '@/app/Components/Loader/Loader';

function AvailabilityPageContent() {
  const {t} = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  return (
    <MainLayout>
      <TitleOfHeader/>
      
      <div className='border border-[#E6E6E6] p-8 rounded-[3px] mb-4'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 7 :</span>
            <span>{t('Availability')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>تم تمكين مزامنة التقويم . 45 ليلة متاحة</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>




        <BookingTypePage/>
        <SpecialPricesPage/>


      {/* btn */}
        <div className="flex  mt-6">
          
          <div className='flex gap-2 justify-start w-full '>
            <button
              onClick={()=> router.push(`/Pages/Services/Property_Module/Service/Edit?id=${id}`)}
              className="h-15 w-[15%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
            >
              {t('Return')}
            </button>

            <button
              className="h-15 w-[15%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
            >
              {t('Save changes')}
            </button>
          </div>
          
        </div> 

      </div>
    </MainLayout>
  )
}

export default function AvailabilityPage() {
  return (
    <Suspense fallback={<Loader/>}>
      <AvailabilityPageContent />
    </Suspense>
  )
}