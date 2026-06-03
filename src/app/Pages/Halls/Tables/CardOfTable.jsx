'use client'
import React, { useState } from 'react'
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';

function CardOfTable() {
  const { t } = useTranslation()
  const router = useRouter()

  const status = 1
  const StatusRender = (status) => {
    switch (status) {
      case 1: //نشط 
        return (
          <div className=' bg-[#DCFAE6] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center justify-center gap-1'>
              <span className='text-xs lg1:text-sm'>{t('active')}</span>
            </div>
          </div>
        );

      case 0: //مغلق
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center justify-center  gap-1'>
              <span className='text-xs lg1:text-sm'>{t('closed')}</span>
            </div>
          </div>
        );

    }
  }
  const StatusRender2 = (status) => {
    switch (status) {
      case 1: //قابل للحجز 
        return (
          <div className=' bg-[#DCFAE6] border border-[#17B26A] text-[#067647] w-fit  h-7.5 rounded-full flex justify-center items-center '>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex  items-center justify-center gap-1'>
              <img src="/images/icons/true.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('Available for booking')}</span>
            </div>
          </div>
        );

      case 0: //غير قابل للحجز
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-7.5 rounded-full flex  items-center '>
            <div className='py-1 px-2 flex  items-center justify-center  gap-1'>
              <img src="/images/icons/xxx.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm'>{t('Not available for booking')}</span>
            </div>
          </div>
        );

    }
  }




  return (
    <>
      <div className='grid grid-cols-1  lg1:grid-cols-2 gap-6'>
      
        <div className={`relative  shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] p-3 grid grid-cols-4 gap-4   `}>
          
          {/* image */}
          <div className='bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] flex justify-center items-center rounded-[3px] text-[#FCFCFD] text-[28px] font-medium'>
            <p>T1</p>
          </div>

          <div className='col-span-3 '>
          
            {/*  */}
            <div className='flex justify-between mt-4'>
              <div className='flex flex-col gap-2'>
                <p className='text-[#364152] text-lg font-normal '>إطلالة على الرووف</p>
                <p className='flex gap-1 border border-[#9AA4B2] bg-[#EEF2F6] w-fit px-2  rounded-full'>
                  <span className='flex items-center'>
                    <img src="/images/icons/user-group_grey.svg" className="w-4 h-4" />
                  </span>
                  
                  <span className='text-[#697586] text-base font-normal'>8</span>
                </p>

              </div>

              <div className='flex flex-col gap-2'>
                {StatusRender2(status)}
                {StatusRender(status)}
              </div>
            </div>


          
          </div>
          
          {/* btns */} 
          <div className='grid grid-cols-3 gap-4 col-span-4 w-full '>
            

          <button  className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
            <img src="/images/icons/EditYellow.svg" className='w-5 h-5' alt="" />
            <p className='text-[#364152] text-sm font-normal'>{t('modification')}</p>
          </button>
          {status ? (
              <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
                <img src="/images/icons/shut-down.svg" className='w-5 h-5' alt="" />
                <p className='text-[#364152] text-sm font-normal'>{t('closing')}</p>
              </button>
            ) : (
              <button className='flex items-center justify-center gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
                <img src="/images/icons/checkmark-circle-true.svg" className='w-5 h-5' alt="" />
                <p className='text-[#364152] text-sm font-normal'>{t('reactivation')}</p>
              </button>
            )}

          <button className='flex items-center justify-center  gap-1 rounded-[3px] border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer'>
            <img src="/images/icons/delete-darkRed.svg" className='w-5 h-5' alt="" />
            <p className='text-[#364152] text-sm font-normal'>{t('delete')}</p>
          </button>
            
          </div>

        </div>
      
  
      </div>
    

    </>
  )
}

export default CardOfTable