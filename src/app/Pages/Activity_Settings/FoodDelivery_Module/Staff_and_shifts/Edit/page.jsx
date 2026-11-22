'use client'

import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { EditStaffThunk, getShowForEditThunk, getStaffManageConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

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
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  const isFormFilled = Boolean(
    formData?.name?.trim() &&
    formData?.phone?.trim() &&
    formData?.role_id !== '' &&
    formData?.role_id !== null &&
    formData?.role_id !== undefined
  )

  const handleSubmit = async () => {
    if (!isFormFilled || isSubmitting) return

    try {
      setIsSubmitting(true)
      await dispatch(EditStaffThunk({
        id: staffId,
        formData
      })).unwrap()
      await dispatch(getStaffManageConfigThunk())
      toast.success(t('Employee updated successfully') || 'تم تعديل بيانات الموظف بنجاح')
      router.push('/Pages/Activity_Settings/FoodDelivery_Module?tab=11')
    } catch (error) {
      console.log(error)
      toast.error(error?.message || error || t('Failed to update employee') || 'فشل تعديل بيانات الموظف')
    } finally {
      setIsSubmitting(false)
    }
  }

// console.log('getShowForEdit' , getShowForEdit);
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
        <div className='flex justify-between items-center'>
          <motion.button
            type="button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.back()}
            className='w-[20%] h-13 border border-[#697586] text-[#697586] rounded-3px cursor-pointer hover:bg-gray-50 transition-colors'
          >
            {t('Return')}
          </motion.button>

          <motion.button
            type="button"
            disabled={!isFormFilled || isSubmitting}
            onClick={handleSubmit}
            whileHover={isFormFilled && !isSubmitting ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
            whileTap={isFormFilled && !isSubmitting ? { scale: 0.98 } : {}}
            className={`w-[20%] h-13 rounded-3px font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
              isFormFilled && !isSubmitting
                ? 'bg-primary text-white cursor-pointer shadow-xs hover:bg-primary/95'
                : 'bg-[#E3E8EF] text-[#9AA4B2] cursor-not-allowed'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                <span>{t('Saving...')}</span>
              </>
            ) : (
              <span>{t('save')}</span>
            )}
          </motion.button>
          
        </div>

      </div>


      

      
    </MainLayout>
  )
}

export default EditPage