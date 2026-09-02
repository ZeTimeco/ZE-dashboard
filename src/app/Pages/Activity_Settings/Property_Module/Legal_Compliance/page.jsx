"use client"
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Content from './Content'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getRuleSettingThunk, RuleSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'

function Legal_CompliancePage() {
  const { t } = useTranslation()
  //api
  const dispatch = useDispatch()
  const { getRuleSetting } = useSelector((state) => state.setting)
  const getRuleSettingData = getRuleSetting?.data
  useEffect(() => {
    dispatch(getRuleSettingThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    in_house_rules: '',
    ask_guest_identity: false,
    enable_whatsapp: false,
    enable_phone: false,
    enable_app_message: false
  })

  useEffect(() => {
    if (getRuleSettingData) {
      setFormData({
        in_house_rules: getRuleSettingData?.in_house_rules ?? '',
        ask_guest_identity: getRuleSettingData?.ask_guest_identity ?? false,
        enable_whatsapp: getRuleSettingData?.enable_whatsapp ?? false,
        enable_phone: getRuleSettingData?.enable_phone ?? false,
        enable_app_message: getRuleSettingData?.enable_app_message ?? false
      })
    }
  }, [getRuleSettingData])
  
  const handleSubmit = () => {
    dispatch(RuleSettingThunk(formData))
  }

  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] shadow-xs'>
        <Header/>
        <div className='px-6 py-6'>
          <Content 
            formData={formData}
            setFormData={setFormData}
          />

          <motion.button 
            whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(198, 152, 21, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            onClick={handleSubmit}
            className='h-14 min-w-[180px] w-full sm:w-[25%] mt-10 bg-[var(--color-primary)] hover:bg-[#b08713] text-white font-medium rounded-[3px] cursor-pointer transition-colors duration-200'
          >
            {t('Save changes')}
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default Legal_CompliancePage