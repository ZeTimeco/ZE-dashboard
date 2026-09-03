"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getHallsViewThunk, getTageThunk, addTableThunk } from '@/redux/slice/Halls/HallsSlice'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function AddContent() {
  const {t} = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams();
  const hall_id = searchParams.get("hall_id");
  console.log('hall_id' , hall_id);

  //api
  const dispatch = useDispatch()
  const {getTage , getHallsView, loading} = useSelector((state)=>state.halls)
  useEffect(()=>{
    dispatch(getTageThunk())
    if(hall_id){
      dispatch(getHallsViewThunk(hall_id))
    }
  },[dispatch,hall_id])

  console.log("getHallsView********", getHallsView);

  const [formData, setFormData] = useState({
    code: '',
    shape: '',
    views: [],
    capacity: 1,
    tags: [],
    is_bookable: true,
    is_active: true
  });

  const handleSubmit = async () => {
    if (!formData.code) {
      toast.error(t('Table name/number is required'));
      return;
    }
    if (!formData.shape) {
      toast.error(t('Table type is required'));
      return;
    }
    if (!formData.views || formData.views.length === 0) {
      toast.error(t('Views are required'));
      return;
    }

    const data = new FormData();
    data.append('code', formData.code);
    data.append('shape', formData.shape);
    data.append('capacity', String(formData.capacity));
    data.append('is_bookable', formData.is_bookable ? '1' : '0');
    data.append('is_active', formData.is_active ? '1' : '0');

    formData.tags.forEach((tag, index) => {
      data.append(`tags[${index}]`, tag);
    });

    formData.views.forEach((viewId, index) => {
      data.append(`views[${index}]`, viewId);
    });

    try {
      await dispatch(addTableThunk({ id: hall_id, formData: data })).unwrap();
      toast.success(t('Table added successfully'));
      router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`);
    } catch (err) {
      console.error(err);
      toast.error(err?.message || t('Failed to add table'));
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
            <p className='text-[#364152] text-2xl font-medium '>{t('Add a new table')}</p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Configuring table settings')}</p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(`/Pages/Halls/Tables?hall_id=${hall_id}`)} 
            className='flex justify-center items-center bg-[var(--color-primary)] hover:opacity-95 transition-all duration-200 w-8 h-8 rounded-[3px] cursor-pointer'
          >
            <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
          </motion.button>
        </div>

        <Form 
          getTage={getTage} 
          getHallsView={getHallsView}
          formData={formData}
          setFormData={setFormData}
        />

        <motion.button 
          whileHover={!loading ? { scale: 1.01 } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          onClick={handleSubmit} 
          disabled={loading}
          className='bg-[var(--color-primary)] hover:opacity-95 hover:shadow-md transition-all duration-200 text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer disabled:opacity-50'
        >
          {loading ? t('saving...') : t('save')}
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