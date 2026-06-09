"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsViewThunk, getTageThunk } from '@/redux/slice/Halls/HallsSlice'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams();
  const hall_id = searchParams.get("hall_id");

  console.log('hall_id' , hall_id);


  //api
  const dispatch = useDispatch()
  const {getTage ,getHallsView} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getTageThunk())
    if(hall_id){
        dispatch(getHallsViewThunk(hall_id))
      }
  },[dispatch , hall_id])

  console.log('getTage' , getTage);
  return (
    <MainLayout>

      <div className='flex justify-between mb-10'>
        <div className='flex flex-col gap-2'>
          <p className='text-[#364152] text-2xl font-medium '>{t('Table adjustment')}</p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Configuring table settings')}</p>
        </div>
        
        <button onClick={() => router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`)} className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[3px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>



      <Form
        getTage={getTage}
        getHallsView={getHallsView}
      />

      <button className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Save changes')}
      </button>

    </MainLayout>
  )
}

export default EditPage