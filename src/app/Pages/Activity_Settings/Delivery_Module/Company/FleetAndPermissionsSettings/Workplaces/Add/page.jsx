'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useCallback, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import Map from './Map'
import { motion } from 'framer-motion'

function AddPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const selectedRef = useRef(null) // { lat, lng, address }

  const handleAddressSelect = useCallback((data) => {
    selectedRef.current = data
  }, [])

  const handleAdd = () => {
    if (!selectedRef.current) return

    const existing = JSON.parse(localStorage.getItem('workplaces') || '[]')
    existing.push({
      id: Date.now(),
      address: selectedRef.current.address,
      country: selectedRef.current.country || '',
      city: selectedRef.current.city || '',
      lat: selectedRef.current.lat,
      lng: selectedRef.current.lng,
    })
    localStorage.setItem('workplaces', JSON.stringify(existing))
    router.back()
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
          className="border border-[#697586] w-[20%] h-14 cursor-pointer text-[#697586] text-base font-semibold rounded-3px"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 4px 14px rgba(105,117,134,0.15)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={() => router.back()}
        >
          {t('Return')}
        </motion.button>

        <motion.button
          type="button"
          className="bg-primary w-[20%] h-14 cursor-pointer text-white text-base font-semibold rounded-3px"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            filter: 'brightness(1.06)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={handleAdd}
        >
          {t('addition')}
        </motion.button>

      </motion.div>
    </MainLayout>
  )
}

export default AddPage