"use client"
import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import FirstNote from './FirstNote';
import UploadImage from './UploadImage';
import UploadVideo from './UploadVideo';

function MediaPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  const router = useRouter();
  
  return (
    <>
    <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
      <div>
        <p className='text-[#364152] text-xl font-medium mb-3'>
          <span>{t('Step')} 8 :</span>
          <span>{t('Media')}</span>
        </p>
        <p className='text-[#697586] text-base font-normal'>{t('Enter the media details to begin adding them.')}</p>
        <div className='border border-[#CDD5DF] my-4'></div>
      </div>
      

      {/*  */}
      <FirstNote   />
      <UploadImage />
      <UploadVideo />

      



      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={() => router.push('/Pages/Services/Property_Module/Service/Add/FormData')}
            className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
    </div>
    </>
  )
}

export default MediaPage