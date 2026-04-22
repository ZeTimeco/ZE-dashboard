"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import InformationPage from './Information/page';
import Arrival_DeparturePage from './Arrival_Departure/page';
import Receive_GuestsPage from './Receive_Guests/page';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';

function PropertyDetailsPage() {
  const {t} = useTranslation();

  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');


  return (
    <MainLayout>
      <TitleOfHeader/>
      <div className='border border-[#E6E6E6] p-8 rounded-[3px] mb-4'>
        {/* title */}
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 4 :</span>
            <span>{t('Property details')}</span>
          </p>
            <p className='text-[#697586] text-base font-normal'>الدور 1 . 120 م.ع . المصعد (متاح)</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>
        
        {/* Property Information */}
        <InformationPage/>

        {/* Arrival and departure times */}
        <Arrival_DeparturePage/>

        {/* Service provider available to receive guests */}
        <Receive_GuestsPage/>





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

export default PropertyDetailsPage