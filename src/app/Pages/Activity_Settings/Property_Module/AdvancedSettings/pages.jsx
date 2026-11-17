"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'
import { useDispatch, useSelector } from 'react-redux'
import { AdvancedSettingThunk, getAdvancedSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { CircularProgress } from '@mui/material'

function AdvancedSettingsPages() {
  const { t } = useTranslation()
  //api
  const dispatch = useDispatch()
  const { getAdvancedSetting } = useSelector((state) => state.setting)
  const getAdvancedSettingData = getAdvancedSetting?.data

  useEffect(() => {
    dispatch(getAdvancedSettingThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    auto_set_no_show: false,
    no_show_after_hours: '',
    auto_complete_booking_on_no_show: false,
    no_show_collection_policy: ''        
  })

  useEffect(() => {
    if (getAdvancedSettingData) {
      setFormData({
        auto_set_no_show: getAdvancedSettingData?.auto_set_no_show ?? false,
        no_show_after_hours: getAdvancedSettingData?.no_show_after_hours ?? '',
        auto_complete_booking_on_no_show: getAdvancedSettingData?.auto_complete_booking_on_no_show ?? false,
        no_show_collection_policy: getAdvancedSettingData?.no_show_collection_policy ?? ''
      })
    }
  }, [getAdvancedSettingData])

  const [saving, setSaving] = useState(false)

  const handleSubmit = async () => {
    if (saving) return
    setSaving(true)
    try {
      await dispatch(AdvancedSettingThunk(formData)).unwrap()
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

export default AdvancedSettingsPages