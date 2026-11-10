'use client'
import { Dialog } from '@mui/material'
import React, { Suspense, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'
import { useDispatch, useSelector } from 'react-redux'
import { editViewsThunk, getHallViewThunk, getViewsByIdThunk } from '@/redux/slice/Halls/HallsSlice'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

function EditContent({open , setOpen , viewId, refreshViews}) {
  const{t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getHallView, getViewsById} = useSelector((state) => state.halls)
  useEffect(() => {
    dispatch(getHallViewThunk())
  }, [dispatch])

  const [formData , setFormData] = useState({
    view_id: '',
    name: '',
    side: '',
    description: '',
  })

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (viewId) {
      dispatch(getViewsByIdThunk(viewId));
    }
  }, [dispatch, viewId]);

  useEffect(() => {
    if (getViewsById) {
      const selectedView = getViewsById.all_views?.find((v) => v.is_selected);
      setFormData({
        view_id: getViewsById.view_id || selectedView?.id || '',
        name: getViewsById.name || '',
        side: getViewsById.side || '',
        description: getViewsById.description || '',
      });
    }
  }, [getViewsById]);

  const handleSubmit = async () => {
    if (saving) return;
    try {
      setSaving(true)
      await dispatch(
        editViewsThunk({
          id: viewId,
          formData,
        })
      ).unwrap();

      if (refreshViews) {
        refreshViews();
      }

      // Success feedback
      setSaved(true)
      toast.success(t('View updated successfully') || 'تم تحديث المنظر بنجاح', {
        position: 'top-right',
        autoClose: 2000,
      })

      setTimeout(() => {
        setOpen(false);
        setSaved(false)
        setSaving(false)
      }, 900)

    } catch (error) {
      console.log(error);
      toast.error(t('Failed to update view') || 'فشل في تحديث المنظر', {
        position: 'top-right',
        autoClose: 3000,
      })
      setSaving(false)
    }
  };

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={() => setOpen(false)}
          className="border border-[#CDD5DF] hover:bg-slate-50 active:scale-95 transition-all duration-150 w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      <section className="mt-4 px-6">
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Edit a look")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">
          {t("Configuring appearance settings")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <Form getHallView={getHallView} formData={formData} setFormData={setFormData} getViewsById={getViewsById}/>

      {/* btn */}
      <div className='px-6'>
        <motion.button
          whileHover={!saving && !saved ? { scale: 1.01, boxShadow: '0 4px 16px -4px rgba(0,0,0,0.15)' } : {}}
          whileTap={!saving && !saved ? { scale: 0.98 } : {}}
          onClick={handleSubmit}
          disabled={saving}
          className={`relative overflow-hidden text-white w-full text-base font-medium py-3 px-6 rounded-3px my-6 cursor-pointer transition-all duration-300 ${
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
                {t('Save changes')}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    
    </Dialog>
      
    </>
  )
}


export default function EditPage(props) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EditContent {...props} />
    </Suspense>
  );
}
