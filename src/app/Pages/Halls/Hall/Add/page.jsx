"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect, useState } from 'react'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { AddHallThunk, getHallTypeThunk, getHallsThunk } from '@/redux/slice/Halls/HallsSlice'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

function AddContent() {
  const {t} = useTranslation();
  const router = useRouter();
  //api
  const dispatch = useDispatch();
  const {loading, error, getHallType} = useSelector((state) => state.halls)
  useEffect(() => {
    dispatch(getHallTypeThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    hall_type_id: '',
    name: '',
    status: 1,
    default_reservation_duration_min: '',
    buffer_time_min: '',
    floor_number: '',
    image: '',
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async () => {
    if (saving) return;
    const data = new FormData();

    data.append('hall_type_id', formData.hall_type_id);
    data.append('name', formData.name);
    data.append('status', formData.status);
    data.append('default_reservation_duration_min', formData.default_reservation_duration_min);
    data.append('buffer_time_min', formData.buffer_time_min);
    data.append('floor_number', formData.floor_number);

    if (formData.image instanceof File) {
      data.append('image', formData.image);
    }

    try {
      setSaving(true)
      await dispatch(AddHallThunk(data)).unwrap();

      // Show success animation + toast
      setSaved(true)
      toast.success(t('Hall added successfully') || 'تمت إضافة القاعة بنجاح', {
        position: 'top-right',
        autoClose: 2000,
      })

      // Pre-fetch halls so list page is ready
      await dispatch(getHallsThunk()).unwrap();

      // Short delay so user sees the success state before navigation
      setTimeout(() => {
        router.push('/Pages/Halls/Hall');
      }, 900)

    } catch (error) {
      console.log(error);
      toast.error(t('Failed to add hall') || 'فشل في إضافة القاعة', {
        position: 'top-right',
        autoClose: 3000,
      })
      setSaving(false)
    }
  };

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <div className='flex justify-between mb-10'>
          <div className='flex flex-col gap-2'>
            <p className='text-[#364152] text-2xl font-medium '>{t('Adding a new hall')}</p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Enter the details of the new lounge to start offering it to your customers.')}</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/Pages/Halls/Hall')} 
            className='flex justify-center items-center bg-primary hover:opacity-95 transition-all duration-200 w-8 h-8 rounded-3px cursor-pointer'
          >
            <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
          </motion.button>
        </div>

        <div className="flex flex-col gap-6 border border-[#CDD5DF] rounded-3px py-8 px-6 transition-all duration-200">
          <ImageUpload formData={formData} setFormData={setFormData}/>
          <Form getHallType={getHallType} formData={formData} setFormData={setFormData}/>
        </div>

        {/* Save Button */}
        <motion.button
          whileHover={!saving && !saved ? { scale: 1.02, boxShadow: '0 6px 20px -4px rgba(0,0,0,0.18)' } : {}}
          whileTap={!saving && !saved ? { scale: 0.97 } : {}}
          onClick={handleSubmit}
          disabled={saving}
          className={`relative overflow-hidden text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer transition-all duration-300 ${
            saved
              ? 'bg-green-500'
              : 'bg-primary hover:opacity-95 hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed'
          }`}
        >
          <AnimatePresence mode="wait">
            {saved ? (
              <motion.span
                key="saved"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-center gap-2"
              >
                {/* Checkmark SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </motion.span>
            ) : saving ? (
              <motion.span
                key="saving"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="flex items-center justify-center gap-2"
              >
                <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                {t('Saving...')}
              </motion.span>
            ) : (
              <motion.span
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {t('save')}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>
    </MainLayout>
  )
}

export default function AddPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddContent />
    </Suspense>
  );
}
