'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import OrderLimitSettingsPage from './OrderLimitSettings/page'
import PricingAndProfitSettingsPage from './PricingAndProfitSettings/page'
import FleetAndPermissionsSettingsPage from './FleetAndPermissionsSettings/page'
import { getShowSettingThunk, ParcelSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

function CompanyPage() {
  const { t } = useTranslation()

  //api
  const dispatch = useDispatch()
  const { getShowSetting } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getShowSettingThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    max_concurrent_orders: '',
    parcel_category_ids: [],
    allow_driver_reject: 1
  })

  useEffect(() => {
    if (getShowSetting) {
      const selectedCategoryIds =
        getShowSetting.parcel_category_ids ??
        getShowSetting.parcel_categories
          ?.filter((item) => item.selected === true)
          .map((item) => item.id) ??
        []

      setFormData({
        max_concurrent_orders: getShowSetting.max_concurrent_orders ?? '',
        parcel_category_ids: selectedCategoryIds,
        allow_driver_reject:
          getShowSetting.allow_driver_reject !== undefined
            ? (Number(getShowSetting.allow_driver_reject) ? 1 : 0)
            : 1
      })
    }
  }, [getShowSetting])

  const handleUpdate = async (updatedFields = {}) => {
    const updatedForm = {
      max_concurrent_orders: formData.max_concurrent_orders,
      parcel_category_ids: formData.parcel_category_ids,
      allow_driver_reject: formData.allow_driver_reject,
      ...updatedFields
    }
    setFormData(updatedForm)
    try {
      await dispatch(ParcelSettingThunk(updatedForm)).unwrap()
      await dispatch(getShowSettingThunk())
      toast.success(t('Settings updated successfully.'))
      return true
    } catch (error) {
      toast.error(error?.message || t('Failed to update settings.'))
      return false
    }
  }

  const handleSubmit = async (updatedFields) => {
    return await handleUpdate(updatedFields || {})
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className='flex flex-col gap-1' variants={fadeInUp}>
        <h1 className='text-[#364152] text-2xl font-medium'>{t('Connection unit settings')}</h1>
        <p className='text-[#697586] text-xl font-normal'>{t('Exclusive to a free connector. Managed independently of your account.')}</p>
      </motion.div>

      {/* Content wrapper */}
      <motion.div
        className='border border-[#CDD5DF] rounded-3px p-6 mt-10 mb-6'
        variants={fadeInUp}
      >
        <div className='grid grid-cols-2 gap-6'>
          <OrderLimitSettingsPage
            getShowSetting={getShowSetting}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
          <PricingAndProfitSettingsPage
            getShowSetting={getShowSetting}
            handleUpdate={handleUpdate}
            handleSubmit={handleSubmit}
          />
        </div>
        <FleetAndPermissionsSettingsPage
          getShowSetting={getShowSetting}
          handleUpdate={handleUpdate}
          handleSubmit={handleSubmit}
        />
      </motion.div>
    </motion.div>
  )
}

export default CompanyPage