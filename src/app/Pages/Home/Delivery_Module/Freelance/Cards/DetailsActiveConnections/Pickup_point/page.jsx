'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import Map from './Map'

/* ─── Fallback coordinates (Riyadh) ───────────────────────────── */
const FALLBACK_LAT = 24.7136
const FALLBACK_LNG = 46.6753

function Pickup_pointPage() {
  const { t } = useTranslation()
  const router = useRouter()

  /* ── Read pickup location from Redux ─────────────────────────── */


  const lat = 55.55
  const lng = 10.33

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  return (
    <MainLayout>

      {/* ── title ──────────────────────────────────────── */}
      <motion.div
        className="flex gap-2 mb-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-[#364152] text-xl font-medium text-right">
          {t('Head to pick-up')}
        </p>
      </motion.div>

      {/* ── Map ───────────────────────────────────────────────────── */}
      <Map lat={lat} lng={lng} />
      <div className="flex justify-end">
        <button onClick={openGoogleMaps} className='text-primary cursor-pointer border border-primary w-full h-10 mt-3 rounded-3px'>Open map</button>
      </div>
      {/* ── Bottom action buttons ──────────────────────────────────── */}
      <motion.div
        className="flex justify-between w-full mt-6 mb-6"
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
        >
          {t('The pickup point has arrived')}
        </motion.button>
      </motion.div>

    </MainLayout>
  )
}

export default Pickup_pointPage