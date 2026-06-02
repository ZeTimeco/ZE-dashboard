"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getHallTypeThunk } from '@/redux/slice/Halls/HallsSlice'

function AddPage() {
  const {t} = useTranslation();
  //api
  const dispatch = useDispatch();
  const {loading,error,getHallType} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getHallTypeThunk())
  },[dispatch])

  return (
    <MainLayout>

      <div className='flex justify-between mb-10'>
        <div className='flex flex-col gap-2'>
          <p className='text-[#364152] text-2xl font-medium '>{t('Adding a new hall')}</p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Enter the details of the new lounge to start offering it to your customers.')}</p>
        </div>
        
        <button className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[3px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>

      <div className="flex flex-col gap-6 border border-[#CDD5DF] rounded-[3px] py-8 px-6">
        <ImageUpload/>
        <Form getHallType={getHallType}/>
      </div>

      <button className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('save')}
      </button>
      
    </MainLayout>
  )
}

export default AddPage