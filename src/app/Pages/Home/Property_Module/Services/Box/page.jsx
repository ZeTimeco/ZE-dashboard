"use client";
import { getProviderStateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '@/app/Components/Loader/Loader';

function BoxPage() {
  const {t} = useTranslation();
  


  return (
    <>

    <section className='mb-10 grid grid-cols-2 lg1:grid-cols-4 gap-4 '>

      {/* Access operations*/}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#B4F0CC] rounded-md'>
            <img src="/images/icons/Access operations.svg" alt="" />
          </p>
          <p className='text-[#4B5565]'>{t('Access operations')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>(100)</p>
      </div>
    
      {/* Departure*/}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF3F2] rounded-md'>
            <img src="/images/icons/Departure.svg" alt="" />
          </p>
          <p className='text-[#4B5565]'>{t('Departure')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>22</p>
      
      </div>

      {/* Pending */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-md'>
            <img src="/images/icons/clock_orange.svg" alt="" />
          </p>
          <p className='text-[#4B5565]'>{t('Pending')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'> 2</p>
      </div>

    {/* Continuous stays */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
            <img src="/images/icons/user-group_blue.svg" alt="" />
          </p>
          <p className='text-[#4B5565]'>{t('Continuous stays')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>2</p>
      </div>

    

    </section>
    </>
  )
}

export default BoxPage