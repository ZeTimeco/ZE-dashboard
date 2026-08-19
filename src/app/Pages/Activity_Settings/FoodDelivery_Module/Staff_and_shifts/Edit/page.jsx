'use client'

import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { EditStaffThunk, getShowForEditThunk } from '@/redux/slice/Setting/SettingSlice'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams()
  const staffId = searchParams.get('id')

  //api
  const dispatch = useDispatch()
  const {getShowForEdit} = useSelector((state)=>state.setting)
  const getShowForEditEmployee = getShowForEdit?.employee
  useEffect(()=>{
    if(staffId){
      dispatch(getShowForEditThunk(staffId))
    }
  },[dispatch , staffId])

  const [formData , setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    role_id:'',
  })

  useEffect(() => {
  if (getShowForEditEmployee) {
    setFormData({
      name: getShowForEditEmployee.name ?? "",
      email: getShowForEditEmployee.email ?? "",
      phone: getShowForEditEmployee.phone ?? "",
      role_id: getShowForEditEmployee.role_id ?? "",
    });
  }
}, [getShowForEditEmployee]);

const handleSubmit = ()=>{
  dispatch(EditStaffThunk({
    id:staffId,
    formData
  }))
}

console.log('getShowForEdit' , getShowForEdit);
  return (
    <MainLayout>
      {/* header */}
      <header className='flex justify-between mb-10'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Employee modification')}</p>

        <button
          type="button"
          onClick={() => router.push('/Pages/Activity_Settings/FoodDelivery_Module/Staff_and_shifts?openDetails=true')}
          className=" bg-primary rounded-3px w-8 h-8 flex justify-center items-center cursor-pointer"
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
          <button className='w-[20%] h-13 border border-[#697586] text-[#697586] rounded-3px cursor-pointer'>
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

export default EditPage