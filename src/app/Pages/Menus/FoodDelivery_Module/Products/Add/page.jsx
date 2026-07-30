'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addItemsThunk, getCategoriesMenuThunk } from '@/redux/slice/Menus/MenusSlice'

function AddPage() {
  const {t} = useTranslation()
  const router = useRouter()

  const dispatch = useDispatch()
  const { getCategoriesMenu } = useSelector((state) => state.Menus)
  useEffect(() => {
    dispatch(getCategoriesMenuThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    category_id: "",
    name: {
      ar: "",
      en: "",
    },
    description: {
      ar: "",
      en: "",
    },
    images: [],
    base_price: "",
    prep_time_min: "",
    calories: "",
    status: "active",
    is_visible: 1,
    availability_type: "all_day",
  });
  
  const handleSubmit = async () => {
    const data = new FormData();

    data.append("category_id", formData.category_id);

    data.append("name[ar]", formData.name.ar);
    data.append("name[en]", formData.name.en);

    data.append("description[ar]", formData.description.ar || "");
    data.append("description[en]", formData.description.en || "");

    data.append("base_price", formData.base_price);
    data.append("prep_time_min", formData.prep_time_min || "");
    data.append("calories", formData.calories || "");
    data.append("status", formData.status || "active");
    data.append("is_visible", formData.is_visible ?? 1);
    data.append("availability_type", formData.availability_type || "all_day");

    if (Array.isArray(formData.images)) {
      formData.images.forEach((img) => {
        const fileToAppend = img instanceof File ? img : img?.file;
        if (fileToAppend instanceof File) {
          data.append("images[]", fileToAppend);
        }
      });
    }

    try {
      await dispatch(addItemsThunk({ formData: data })).unwrap();
      alert("Product added successfully.");
      router.push('/Pages/Menus/FoodDelivery_Module');
    } catch (error) {
      alert("Failed to add product.");
      console.error(error);
    }
  };

  return (
    <MainLayout>
      <p className='text-[#364152] text-2xl font-medium mb-6'>{t('Add a new product')}</p>
      <div className='border border-[#E6E6E6] p-6 mb-5 rounded-[3px]'>

        <ImageUpload formData={formData} setFormData={setFormData} />
        <div className='grid grid-cols-2 gap-4 mt-5'>
          <Form formData={formData} setFormData={setFormData} getCategoriesMenu={getCategoriesMenu}/>
        </div>
        
        <div className="border-[0.5px] border-[#E3E8EF] my-6" />

        {/* btn */}
        <div className=' flex justify-between gap-4 '>

          <button onClick={() => router.back()} className=' border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('Return')}
          </button>

          <div className='flex gap-2'>
            <button onClick={handleSubmit} className=' border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('Save the product')}
            </button>

            <button onClick={handleSubmit} className=' bg-[var(--color-primary)] text-white text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('Save and go to options and add-ons')}
            </button>
          </div>

        </div>

      </div>

    </MainLayout>
  )
}

export default AddPage