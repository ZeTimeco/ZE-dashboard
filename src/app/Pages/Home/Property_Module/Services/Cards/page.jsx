"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function Cardspage() {
  const { t } = useTranslation();
  const status = "inactive"

  const StatusRender = (status) => {
    switch (status) {
      case "active": //نشط 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('active')}</span>
          </div>
        </div>
        );
      case "inactive"://غير نشط 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  h-9.5 rounded-3xl flex justify-center items-center'>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/remove-circle-red.svg" alt="" className=' w-4 h-4 mt-1' />
            <span className='text-xs lg1:text-sm'>{t('inactive')}</span>
          </div>
        </div>
        );  
    }
  };
  return (
    <>
    <div className='flex justify-between mb-5'>
      <p className='text-[#0F022E] text-2xl font-medium mb-1'>{t('My properties')}</p>
      <button className='flex gap-2 mt-1 cursor-pointer text-[var(--color-primary)] text-base font-normal'>
        {t('More')}
      </button>
    </div>
    <div className='mb-10 grid grid-cols-2 lg1:grid-cols-3 gap-4 '>

        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)]  p-3'>
          <div className='relative w-full'>
            <img src="/images/testyImage.svg" alt="" className='w-full' />
            <div className='absolute top-2 left-2'>{StatusRender(status)} </div>
          </div>
          <div className='mt-4'>
            <p className='text-[#364152] text-base font-medium'>فيلا الروابي الفاخرة</p>
            <div className='flex gap-2 mt-1'>
              <img src="/images/icons/location-gray.svg" alt="" />
              <p className='text-[#697586] text-sm font-normal'>فيلا . جدة, حي الشاطي</p>
            </div>

            {/* btn */}
            <button className='flex gap-2 mt-3 cursor-pointer'>
              <img src="/images/icons/calendar-yellow.svg" alt="" />
              <p className='text-[var(--color-primary)] text-sm font-normal'>{t('Calendar view')} </p>
            </button>

          </div>
        </div>
    </div>
      

    </>
  )
}

export default Cardspage