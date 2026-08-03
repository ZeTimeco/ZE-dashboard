'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { editCategoryMenuThunk, getCategoryDetailsThunk } from '@/redux/slice/Menus/MenusSlice'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()
  
  //API
  const params= useSearchParams();
  const id = params.get('id');

  const dispatch = useDispatch()
  const { getCategoryDetails } =useSelector((state) => state.Menus)
  useEffect(() => {
    if (id) {
      dispatch(getCategoryDetailsThunk(id));
    }
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    name: {
      ar: "",
      en: "",
    },
    description: {
      ar: "",
      en: "",
    },
    is_visible: 1,
    status: 1,
    image: null,
    remove_image: 0,
  });

  useEffect(() => {
    if (getCategoryDetails) {
      setFormData({
        name: {
          ar: getCategoryDetails?.name?.ar || "",
          en: getCategoryDetails?.name?.en || "",
        },
        description: {
          ar: getCategoryDetails?.description?.ar || "",
          en: getCategoryDetails?.description?.en || "",
        },
        is_visible: getCategoryDetails?.is_visible ?? 1,
        status: getCategoryDetails?.status === "active" ? 1 : 0,
        image: getCategoryDetails?.image || null,
        remove_image: 0,
      });
    }
  }, [getCategoryDetails]);

  const handleSubmit = () => {
    const data = new FormData();

    data.append("name[ar]", formData.name.ar);
    data.append("name[en]", formData.name.en);
    data.append("description[ar]", formData.description.ar);
    data.append("description[en]", formData.description.en);
    data.append("is_visible", formData.is_visible);
    data.append("status", formData.status);

    if (formData.image instanceof File) {
      data.append("image", formData.image);
    }

    data.append("remove_image", formData.remove_image);

    dispatch(editCategoryMenuThunk({ id, formData: data }));
  }

  return (
    <MainLayout>
      
      <p className='text-[#364152] text-2xl font-medium mb-8'>{t('Edit category')}</p>
      <div className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <Form formData={formData} setFormData={setFormData}/>
        <ImageUpload formData={formData} setFormData={setFormData} />
      </div>


    <div className='flex justify-between'>
      <button 
        onClick={()=>router.back()}
        className='border border-[#697586] text-[#697586] w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Return')}
      </button>
      <button onClick={handleSubmit} className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Save changes')}
      </button>
    </div>

    </MainLayout>
  )
}

export default EditPage