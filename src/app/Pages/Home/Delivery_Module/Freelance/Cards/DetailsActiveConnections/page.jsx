'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import TitleOfDetails from './TitleOfDetails'
import TrackingStatus from './TrackingStatus'
import DeliveryPoints from './DeliveryPoints'
import DriverDetails from './DriverDetails'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveDeliveryThunk, updateBookingStatusThunk } from '@/redux/slice/Home/HomeSlice'
import Loader from '@/app/Components/Loader/Loader'

function DetailsActiveConnectionsContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const { t } = useTranslation()
  const router = useRouter()

  //api
  const dispatch = useDispatch()
  const { getActiveDelivery, loading } = useSelector((state) => state.Home)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (id) {
      dispatch(getActiveDeliveryThunk(id))
    }
  }, [dispatch, id])

  const handleProceedToPickup = async () => {
    const bookingId = id 
    if (!bookingId) return

    try {
      setIsSubmitting(true)
      await dispatch(
        updateBookingStatusThunk({
          BookingID: bookingId,
          formData: { status: 'on_way_to_pickup' },
        })
      ).unwrap()
      await dispatch(getActiveDeliveryThunk(bookingId))
      router.push(`/Pages/Home/Delivery_Module/Freelance/Cards/DetailsActiveConnections/Pickup_point?id=${bookingId}`)
    } catch (error) {
      console.error('Failed to update booking status:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  console.log('getActiveDelivery', getActiveDelivery)

  if (loading) return <Loader />

  return (
    <MainLayout>

      {/* DetailsActiveConnectionsPage {id ? `(ID: ${id})` : ''} */}

      <TitleOfDetails getActiveDelivery={getActiveDelivery} />
      <div className='grid grid-cols-2 gap-6 mt-10'>
        <TrackingStatus getActiveDelivery={getActiveDelivery} />
        <DeliveryPoints getActiveDelivery={getActiveDelivery} />
      </div>

      <DriverDetails getActiveDelivery={getActiveDelivery} />

      {/* btn */}
      <motion.div
        className="flex justify-between w-full mb-6"
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
          onClick={() => router.push('/Pages/Home/Delivery_Module/Freelance')}
        >
          {t('Return')}
        </motion.button>

        {getActiveDelivery?.data?.status === 'offer_accepted'? (
          <motion.button
            type="button"
            disabled={isSubmitting}
            className="bg-primary w-[20%] h-14 cursor-pointer text-white text-base font-semibold rounded-3px disabled:opacity-60 disabled:cursor-not-allowed"
            whileHover={{
              scale: isSubmitting ? 1 : 1.02,
              boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
              filter: 'brightness(1.06)',
            }}
            whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            onClick={handleProceedToPickup}
          >
            {isSubmitting ? t('Loading...') : t('Proceed to the pickup point')}
          </motion.button>
        ):getActiveDelivery?.data?.status === 'offer_accepted'? (
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
            {t('Head to the delivery point')}
          </motion.button>
        ):null}
        
      </motion.div>

    </MainLayout>
  )
}

function DetailsActiveConnectionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsActiveConnectionsContent />
    </Suspense>
  )
}

export default DetailsActiveConnectionsPage
