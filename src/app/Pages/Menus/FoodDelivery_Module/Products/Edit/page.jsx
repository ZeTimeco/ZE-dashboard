'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter, useSearchParams } from 'next/navigation'
import { getCategoriesMenuThunk, ShowFullItemThunk, updateItemThunk } from '@/redux/slice/Menus/MenusSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

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

  useEffect(()=>{
    if(id){
      dispatch(ShowFullItemThunk(id))
    }
  },[dispatch, id])

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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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

      toast.success(t("Product updated successfully.") || "Product updated successfully.");
    } catch (error) {
      toast.error(error?.message || t("Failed to update product.") || "Failed to update product.");
      console.error(error);
    } finally {
      setLoading(false);
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
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className='text-[#364152] text-2xl font-medium mb-6'>{t('Edit a product')}</p>
        <div className='border border-[#E6E6E6] p-6 mb-5 rounded-[3px] bg-white shadow-2xs'>

          <ImageUpload formData={formData} setFormData={setFormData} existingImages={ShowFullItem?.images || []} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5'>
            <Form formData={formData} setFormData={setFormData} getCategoriesMenu={getCategoriesMenu}/>
          </div>
          
          <div className="border-[0.5px] border-[#E3E8EF] my-6" />

          {/* btn */}
          <div className='flex flex-col sm:flex-row justify-between gap-4'>
            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.back()} 
              className='border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[3px] cursor-pointer hover:bg-[#FFFDF5] transition-colors duration-150'
            >
              {t('Return')}
            </motion.button>

            <div className='flex gap-2'>
              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCancel} 
                className='border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-semibold py-3 px-6 rounded-[3px] cursor-pointer hover:bg-[#FFFDF5] transition-colors duration-150'
              >
                {t('cancel')}
              </motion.button>

              <motion.button 
                whileHover={!loading ? { scale: 1.01 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                disabled={loading}
                onClick={handleSubmit} 
                className={`bg-[var(--color-primary)] text-white text-base font-semibold py-3 px-6 rounded-[3px] transition-all duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-95 hover:shadow-md"
                }`}
              >
                {loading ? t("Saving...") || "Saving..." : t('Save changes')}
              </motion.button>
            </div>
          </div>

        </div>
      </motion.div>
    </MainLayout>
  )
}

export default EditPage