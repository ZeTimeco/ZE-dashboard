'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { addCategoryMenuThunk } from '@/redux/slice/Menus/MenusSlice'

function AddPage() {
  const {t} = useTranslation()
  const router = useRouter()

  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    name: { ar: "", en: "" },
    description: { ar: "", en: "" },
    is_visible: 1,
    status: 1,
    image: null,
    remove_image: 0,
  });

const handleSubmit = async () => {
  const data = new FormData();

  data.append("name[ar]", formData.name.ar);
  data.append("name[en]", formData.name.en);
  data.append("description[ar]", formData.description.ar);
  data.append("description[en]", formData.description.en);
  data.append("is_visible", formData.is_visible ? 1 : 0);
  data.append("status", formData.status ? 1 : 0);

  if (formData.image instanceof File) {
    data.append("image", formData.image);
  }

  data.append("remove_image", formData.remove_image);

  try {
    await dispatch(addCategoryMenuThunk(data)).unwrap();
    router.back();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <MainLayout>
      
      <p className='text-[#364152] text-2xl font-medium mb-8'>{t('Add a new category')}</p>
      <div className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <Form formData={formData} setFormData={setFormData}/>
        <ImageUpload formData={formData} setFormData={setFormData}/>
      </div>


    <div className='flex justify-between'>
      <button
        onClick={()=>router.back()}
        className='border border-[#697586] text-[#697586] w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Return')}
      </button>
      <button
        onClick={handleSubmit}
        className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('save')}
      </button>
    </div>

    </MainLayout>
  )
}

export default AddPage