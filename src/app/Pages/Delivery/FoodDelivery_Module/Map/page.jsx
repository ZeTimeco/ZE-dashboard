'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Map from './Map'
import { getDeliveryMapThunk } from '@/redux/slice/Delivery/DeliverySlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function MapPage() {
  // api
  const dispatch = useDispatch()
  const { getDeliveryMap } = useSelector((state) => state.Delivery)

  useEffect(() => {
    dispatch(getDeliveryMapThunk())
  }, [dispatch])

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full"
      >
        <Header />
        <Map getDeliveryMap={getDeliveryMap} />
      </motion.div>
    </MainLayout>
  )
}

export default MapPage