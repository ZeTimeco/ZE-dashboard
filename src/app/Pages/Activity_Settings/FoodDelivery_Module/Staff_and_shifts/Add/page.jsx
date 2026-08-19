'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { addStaffThunk } from '@/redux/slice/Setting/SettingSlice'

function AddPage() {
  const {t} = useTranslation()
  const router = useRouter()

  //API
  const dispatch = useDispatch()
  const [formData , setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    role_id:'',
  })

  const handleSubmit = async()=>{
    try{
      await dispatch(addStaffThunk(formData)).unwrap()
    }catch(error){
      console.log(error);
    }
  }

  console.log('formData' , formData);
  return (
    <MainLayout>
      {/* header */}
      <header className='flex justify-between mb-10'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Add a new employee')}</p>

        <button
          type="button"
          onClick={() => router.back()}
          className=" bg-[var(--color-primary)] rounded-[3px] w-8 h-8 flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/arrow-right-go.svg" className="w-5 h-5" />
        </button>
      </header>

      {/*  */}
      <div className='border border-[#E6E6E6] rounded-3px p-8'>

        <Form formData={formData} setFormData={setFormData}/>
      

        {/* note */}
        <div className='border border-[#48A1FF] bg-[#EFF6FF] p-3 mt-4'>
          <p>
            <span className='text-[#0B0E11] text-base font-normal'>{t('advice')} : </span>
            <span className='text-[#3473B7] text-base font-normal'>{t("Permissions are managed by the 'Permissions and Roles' section.")}</span>
          </p>
        </div>

      

        <div className='border border-0.5 border-[#CDD5DF] my-10 '></div>

        {/* btn */}
        <div className='flex justify-between'>
          <button  className='w-[20%] h-13 border border-[#697586] text-[#697586] rounded-3px cursor-pointer'>
            {t('Return')}
          </button>

          <button onClick={handleSubmit} className='w-[20%] h-13  bg-[#E3E8EF] text-[#9AA4B2] rounded-3px cursor-pointer'>
            {t('save')}
          </button>
          
        </div>

      </div>


      

      
    </MainLayout>
  )
}

export default AddPage