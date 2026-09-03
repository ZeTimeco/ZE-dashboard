'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { getViewsThunk } from '@/redux/slice/Requests/RequestsSlice'
import { addWaitlistThunk, getWaitingListThunk, getwaitlistAnalysisThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

function AddPage({open , setOpen, refresh}) {
  const{t} = useTranslation()

  const dispatch = useDispatch()
  const {getViews} = useSelector((state)=>state?.requests)
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    dispatch(getViewsThunk())
  },[dispatch])

  const [formData ,  setFormData] = useState({
    name:'',
    phone:'',
    number_of_guests: 1,
    favourite_view_id:'',
    notes:''
  })

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setFormData({
        name: '',
        phone: '',
        number_of_guests: 1,
        favourite_view_id: '',
        notes: ''
      })
    }
  }, [open])

  // Check if required fields are filled
  const isFormValid = Boolean(formData?.name?.trim() && formData?.phone?.trim())

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;
    try {
      setLoading(true);
      const payload = {
        ...formData,
        number_of_guests: Number(formData?.number_of_guests) || 1,
      };
      const result = await dispatch(addWaitlistThunk(payload)).unwrap();
      console.log(result);
      toast.success(t('Guest added successfully') || 'تمت إضافة الضيف بنجاح');

      if (refresh) {
        refresh();
      } else {
        dispatch(getWaitingListThunk({ page: 1, type: 'coming' }));
        dispatch(getwaitlistAnalysisThunk());
      }

      setOpen(false);
      setFormData({
        name: '',
        phone: '',
        number_of_guests: 1,
        favourite_view_id: '',
        notes: ''
      });
    } catch (error) {
      console.log(error);
      toast.error(error?.message || t('Failed to add guest') || 'فشل في إضافة الضيف');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <motion.button
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.08, rotate: 5, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-[#f3f4f6]"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </motion.button>
      </section>

      <motion.section
        className="mt-4 px-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add a new guest")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">{t("Enter guest details")}</p>
      </motion.section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <Form getViews={getViews} formData={formData} setFormData={setFormData}/>

      {/* buttons */}
      <motion.div
        className='px-6 grid grid-cols-2 gap-6 mb-6'
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
      >
        <motion.button
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
          className='border border-[var(--color-primary)] text-[var(--color-primary)] w-full text-base font-medium py-3 px-6 rounded-[3px] cursor-pointer transition-colors duration-200 hover:bg-[#fffdf5]'
        >
          {t('cancel')}
        </motion.button>
        <motion.button
          onClick={handleSubmit}
          disabled={!isFormValid || loading}
          whileHover={
            isFormValid && !loading
              ? {
                  scale: 1.02,
                  boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
                  transition: { duration: 0.18 },
                }
              : {}
          }
          whileTap={isFormValid && !loading ? { scale: 0.97, transition: { duration: 0.1 } } : {}}
          className={`w-full text-base font-medium py-3 px-6 rounded-[3px] transition-all duration-200 ${
            isFormValid
              ? 'bg-primary text-white cursor-pointer hover:opacity-90'
              : 'bg-[#E3E8EF] text-[#9AA4B2] cursor-not-allowed'
          } ${loading ? 'opacity-70 cursor-wait' : ''}`}
        >
          {loading ? t('loading...') : t('Add to the queue')}
        </motion.button>
      </motion.div>
    </Dialog>
  )
}

export default AddPage