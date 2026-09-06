'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import Header from './Header'
import Card from './Card'
import { getOrdersThunk } from '@/redux/slice/Delivery/DeliverySlice'
import { useDispatch, useSelector } from 'react-redux'
import EmptyData from './EmptyData'
import { motion, AnimatePresence } from 'framer-motion'

function FoodDelivery_Modulepage() {
  // api
  const dispatch = useDispatch()
  const { getOrders } = useSelector((state) => state.Delivery)

  useEffect(() => {
    dispatch(getOrdersThunk())
  }, [dispatch])

  // console.log('getOrders',getOrders?.data?.data);
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Header />
        <AnimatePresence mode="wait">
          {getOrders?.data?.data?.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <EmptyData />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-5'
            >
              <Card getOrders={getOrders} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MainLayout>
  )
}

export default FoodDelivery_Modulepage