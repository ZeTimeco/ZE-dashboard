"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import React from 'react'
import { useTranslation } from 'react-i18next';
import TitleOfHeader from '../../TitleOfHeader';
import { useRouter, useSearchParams } from 'next/navigation';

function FacilitiesPage() {
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
            <span>{t('Step')} 5 :</span>
            <span>{t('Facilities')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>واي فاي . صانع القهوة . ميكرويوف</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>
        
        <div className='border border-[#CDD5DF] py-4 px-6'>
          {/*  */}
          <div className='flex gap-2'>
            <img src="/images/icons/guest-house.svg" className="w-6 h-6" />
            <p className='text-[#364152] text-base font-medium'>الاساسيات</p>
          </div>
          {/*  */}
          <div className='mt-6 flex justify-between'>
            <div className='flex gap-2'>
              <img src="/images/icons/guest-house.svg" className="w-6 h-6" />
              <p className='text-[#364152] text-base font-medium'>صانع القهوة</p>
            </div>
            <div>
              <input 
                type="checkbox"
                className="w-5 h-5 appearance-none border rounded-[3px]  border-gray-300 bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  
              />
            </div>
          </div>
        </div>

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

export default FacilitiesPage