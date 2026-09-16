'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveDeliveryThunk } from '@/redux/slice/Home/HomeSlice'
import Map from './Map'

/* ─── Fallback coordinates (Riyadh) ───────────────────────────── */
const FALLBACK_LAT = 24.7136
const FALLBACK_LNG = 46.6753

function DeliveryTrackingContent() {
  const { t } = useTranslation()
  const router = useRouter()
  
  const lat = 55.55
  const lng = 10.33

  const openGoogleMaps = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const StatusRender = (status) => {
    switch (status) {
      case 'offer_accepted':
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Your offer has been accepted')}
              </span>
            </div>
          </div>
        )

      case 'on_way_to_pickup':
        return (
          <div className="group/badge bg-[#E3E8EF] border border-[#697586] text-[#697586] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(105,117,134,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/cargray.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('On the way to pick it up')}
              </span>
            </div>
          </div>
        )

      case 'arrived_at_pickup':
        return (
          <div className="group/badge bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(23,92,211,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Arrived at the pickup point')}
              </span>
            </div>
          </div>
        )

      case 'picked_up':
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('On the way for delivery')}
              </span>
            </div>
          </div>
        )

      case 'arrived_at_dropoff':
        return (
          <div className="group/badge bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(23,92,211,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Arrived at the delivery point')}
              </span>
            </div>
          </div>
        )

      case 'delivered':
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Delivered')}
              </span>
            </div>
          </div>
        )

      case 'cancelled':
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('cancelled')}
              </span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <MainLayout>

      {/* ── title ──────────────────────────────────────── */}
      <motion.div
        className="flex flex-col gap-2 mb-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className='flex gap-6'>
          <p className="text-[#364152] text-xl font-medium text-right">
            {t('Delivery tracking')}
          </p>
          <>
            {StatusRender('cancelled')}
          </>
        </div>

        <p className='text-[#697586] text-xl font-normal'>
          <span>مباشر</span>   .
          <span> ZT-PR-1254</span>
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
          {t('Order details')}
        </motion.button>
      </motion.div>

    </MainLayout>
  )
}

function DeliveryTrackingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DeliveryTrackingContent />
    </Suspense>
  )
}

export default DeliveryTrackingPage