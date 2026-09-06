'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { editCategoryMenuThunk, getCategoryDetailsThunk } from '@/redux/slice/Menus/MenusSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()
  
  //API
  const params= useSearchParams();
  const id = params.get('id');

  const dispatch = useDispatch()
  const { getCategoryDetails } = useSelector((state) => state.Menus)
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

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
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

    try {
      await dispatch(editCategoryMenuThunk({ id, formData: data })).unwrap();
      toast.success(t("Category updated successfully.") || "Category updated successfully.");
      router.back();
    } catch (error) {
      toast.error(error?.message || t("Failed to update category.") || "Failed to update category.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className='text-[#364152] text-2xl font-medium mb-8'>{t('Edit category')}</p>
        <div className='border border-[#E6E6E6] rounded-[3px] p-8 bg-white shadow-2xs'>
          <Form formData={formData} setFormData={setFormData}/>
          <ImageUpload formData={formData} setFormData={setFormData} />
        </div>

        <div className='flex justify-between items-center my-6'>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>router.back()}
            className='border border-[#697586] text-[#697586] w-[20%] text-base font-medium py-3 px-6 rounded-[3px] cursor-pointer hover:bg-gray-50 transition-colors duration-150'
          >
            {t('Return')}
          </motion.button>
          
          <motion.button 
            whileHover={!loading ? { scale: 1.01 } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            disabled={loading}
            onClick={handleSubmit} 
            className={`bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] transition-all duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:opacity-95 hover:shadow-md"
            }`}
          >
            {loading ? t("Saving...") || "Saving..." : t('Save changes')}
          </motion.button>
        </div>
      </motion.div>
    </MainLayout>
  )
}

export default EditPage