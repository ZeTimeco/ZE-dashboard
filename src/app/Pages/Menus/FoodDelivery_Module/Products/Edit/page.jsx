'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCategoriesMenuThunk, ShowFullItemThunk, updateItemThunk } from '@/redux/slice/Menus/MenusSlice'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()
  const searchParams = useSearchParams();
  const id = searchParams.get("id");


  //api
  const dispatch = useDispatch()
  const {ShowFullItem , getCategoriesMenu} = useSelector((state)=>state.Menus)
  useEffect(()=>{
    dispatch(getCategoriesMenuThunk())
  }, [dispatch])

  // console.log('getCategoriesMenu' , getCategoriesMenu);

  useEffect(()=>{
    if(id){
      dispatch(ShowFullItemThunk(id))
    }
  },[dispatch, id])

  // console.log('ShowFullItem', ShowFullItem);

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
    keep_image_ids: [],
    base_price: "",
    prep_time_min: "",
    calories: "",
    status: "",
    is_visible: "",
    availability_type: "",
  });

  useEffect(() => {
  if (ShowFullItem) {
    setFormData({
      category_id: ShowFullItem.category_id || "",

      name: {
        ar: ShowFullItem.name_ar || "",
        en: ShowFullItem.name_en || "",
      },

      description: {
        ar: ShowFullItem.description_ar || "",
        en: ShowFullItem.description_en || "",
      },

      images: [],

      keep_image_ids:
        ShowFullItem.images?.map((img) => img.id) || [],

      base_price: ShowFullItem.base_price || "",
      prep_time_min: ShowFullItem.prep_time_min || "",
      calories: ShowFullItem.calories || "",
      status: ShowFullItem.status || "",
      is_visible: ShowFullItem.is_visible ?? "",
      availability_type: ShowFullItem.availability_type || "",
    });
  }
  }, [ShowFullItem]);

  const handleSubmit = async () => {
    const data = new FormData();

    data.append("category_id", formData.category_id);

    data.append("name[ar]", formData.name.ar);
    data.append("name[en]", formData.name.en);

    data.append("description[ar]", formData.description.ar);
    data.append("description[en]", formData.description.en);

    data.append("base_price", formData.base_price);
    data.append("prep_time_min", formData.prep_time_min);
    data.append("calories", formData.calories);
    data.append("status", formData.status);
    data.append("is_visible", formData.is_visible);
    data.append("availability_type", formData.availability_type);

    if (Array.isArray(formData.keep_image_ids)) {
      formData.keep_image_ids.forEach((id) => {
        data.append("keep_image_ids[]", id);
      });
    }

    if (Array.isArray(formData.images)) {
      formData.images.forEach((img) => {
        const fileToAppend = img instanceof File ? img : img?.file;

        if (fileToAppend instanceof File) {
          data.append("images[]", fileToAppend);
        }
      });
    }

    try {
      await dispatch(
        updateItemThunk({
          itemID: id,
          formData: data,
        })
      ).unwrap();

      alert("Product updated successfully.");
    } catch (error) {
      alert("Failed to update product.");
      console.error(error);
    }
  }
  const handleCancel = () => {
    if (ShowFullItem) {
      setFormData({
        category_id: ShowFullItem.category_id || "",
        name: {
          ar: ShowFullItem.name_ar || "",
          en: ShowFullItem.name_en || "",
        },
        description: {
          ar: ShowFullItem.description_ar || "",
          en: ShowFullItem.description_en || "",
        },
        images: [],
        keep_image_ids: ShowFullItem.images?.map((img) => img.id) || [],
        base_price: ShowFullItem.base_price || "",
        prep_time_min: ShowFullItem.prep_time_min || "",
        calories: ShowFullItem.calories || "",
        status: ShowFullItem.status || "",
        is_visible: ShowFullItem.is_visible ?? "",
        availability_type: ShowFullItem.availability_type || "",
      });
    }
  };
      
  return (
    <>
    <MainLayout>
      <p className='text-[#364152] text-2xl font-medium mb-6'>{t('Edit a product')}</p>
      <div className='border border-[#E6E6E6] p-6 mb-5 rounded-[3px]'>

        <ImageUpload formData={formData} setFormData={setFormData} existingImages={ShowFullItem?.images || []} />
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
            <button onClick={handleCancel} className=' border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('cancel')}
            </button>

            <button onClick={handleSubmit} className=' bg-[var(--color-primary)] text-white text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('Save changes')}
            </button>
          </div>
          
          
        </div>





      </div>

      
    </MainLayout>

    </>
  )
}

export default EditPage