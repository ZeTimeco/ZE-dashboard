'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { addCoverageAreasThunk } from '@/redux/slice/Setting/SettingSlice'
import Map from './Map'
import { motion } from 'framer-motion'

function AddPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const selectedRef = useRef(null) // { lat, lng, address, city, area, loading }
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAddressSelect = useCallback((data) => {
    selectedRef.current = data
  }, [])

  const handleAdd = async () => {
    if (!selectedRef.current || !selectedRef.current.lat || !selectedRef.current.lng) {
      toast.warning(t('Please select a location on the map'))
      return
    }

    if (selectedRef.current.loading) {
      toast.info(t('Please wait while identifying the address...'))
      return
    }

    try {
      setIsSubmitting(true)
      const lat = String(selectedRef.current.lat)
      const lng = String(selectedRef.current.lng)
      const city = selectedRef.current.city || selectedRef.current.area || 'الموقع'
      const area = selectedRef.current.area || selectedRef.current.city || 'المنطقة'
      const address = selectedRef.current.address || `${city} - ${area}`

      const formData = new FormData()
      formData.append('address', address)
      formData.append('area', area)
      formData.append('city', city)
      formData.append('latitude', lat)
      formData.append('longitude', lng)

      await dispatch(addCoverageAreasThunk(formData)).unwrap()
      toast.success(t('Workplace added successfully'))
      router.push('/Pages/Activity_Settings/Delivery_Module/Company/FleetAndPermissionsSettings/Workplaces')
    } catch (error) {
      toast.error(error?.message || error?.data?.message || t('Failed to add workplace'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <MainLayout>
      <h1 className='text-[#364152] text-2xl font-medium mb-10'>{t('Add workplace')}</h1>

      <Map onAddressSelect={handleAddressSelect} />

      {/* btn */}
      <motion.div
        className="flex justify-between w-full my-10"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.button
          type="button"
          disabled={isSubmitting}
          className="border border-[#697586] w-[20%] h-14 cursor-pointer text-[#697586] text-base font-semibold rounded-3px disabled:opacity-50"
          whileHover={!isSubmitting ? {
            scale: 1.02,
            boxShadow: '0 4px 14px rgba(105,117,134,0.15)',
          } : {}}
          whileTap={!isSubmitting ? { scale: 0.97 } : {}}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={() => router.back()}
        >
          {t('Return')}
        </motion.button>

        <motion.button
          type="button"
          disabled={isSubmitting}
          className="bg-primary w-[20%] h-14 cursor-pointer text-white text-base font-semibold rounded-3px disabled:opacity-50 flex items-center justify-center gap-2"
          whileHover={!isSubmitting ? {
            scale: 1.02,
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            filter: 'brightness(1.06)',
          } : {}}
          whileTap={!isSubmitting ? { scale: 0.97 } : {}}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={handleAdd}
        >
          {isSubmitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
          ) : (
            t('addition')
          )}
        </motion.button>
      </motion.div>
    </MainLayout>
  )
}

export default AddPage