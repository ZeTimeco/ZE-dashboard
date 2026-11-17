"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { BookingSettingThunk, getBookingSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

function BookingSettingPpage() {
  const { t } = useTranslation()
  
  //api
  const dispatch = useDispatch()
  const { getBookingSetting } = useSelector((state) => state.setting)
  const getBookingSettingData = getBookingSetting?.data

  useEffect(() => {
    dispatch(getBookingSettingThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    approval_type: '',
    min_nights: '',
    max_nights: '',
    min_hours_before_booking: '',
    allow_same_day_booking: false,
    same_day_booking_cutoff_time: '',
    provide_ondemand_cleaning: false,
    provide_repeated_cleaning: false,
    days_between_cleaning: ''
  })

  // Pre-populate formData when GET data arrives
  useEffect(() => {
    if (getBookingSettingData) {
      setFormData({
        approval_type: getBookingSettingData?.approval_type ?? '',
        min_nights: getBookingSettingData?.min_nights ?? '',
        max_nights: getBookingSettingData?.max_nights ?? '',
        min_hours_before_booking: getBookingSettingData?.min_hours_before_booking ?? '',
        allow_same_day_booking: getBookingSettingData?.allow_same_day_booking ?? false,
        same_day_booking_cutoff_time: getBookingSettingData?.same_day_booking_cutoff_time ?? '',
        provide_ondemand_cleaning: getBookingSettingData?.provide_ondemand_cleaning ?? false,
        provide_repeated_cleaning: getBookingSettingData?.provide_repeated_cleaning ?? false,
        days_between_cleaning: getBookingSettingData?.days_between_cleaning ?? ''
      })
    }
  }, [getBookingSettingData])

  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (saving) return
    setSaving(true)
    try {
      await dispatch(BookingSettingThunk(formData)).unwrap()
      toast.success(t('Changes saved successfully') , {
        position: 'top-right',
        autoClose: 2500,
      })
    } catch (err) {
      const errMsg = err?.message || (typeof err === 'string' ? err : null) || t('Failed to save changes') || 'فشل في حفظ التغييرات'
      toast.error(errMsg, { position: 'top-right', autoClose: 3000 })
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-3px shadow-xs'>
        <Header/>
        <div className='px-6 py-6'>
          <Content
            formData={formData}
            setFormData={setFormData}
          />

          <motion.button
            whileHover={!saving ? { scale: 1.02, boxShadow: '0 4px 14px rgba(198, 152, 21, 0.2)' } : {}}
            whileTap={!saving ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={handleSubmit}
            disabled={saving}
            className={`h-14 min-w-[180px] w-full sm:w-[25%] mt-10 bg-primary text-white font-medium rounded-3px transition-colors duration-200 flex items-center justify-center gap-2 ${
              saving ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#b08713] cursor-pointer'
            }`}
          >
            {saving ? (
              <>
                <CircularProgress size={20} color="inherit" />
                <span>{t('Saving...') || 'جاري الحفظ...'}</span>
              </>
            ) : (
              t('Save changes')
            )}
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default BookingSettingPpage