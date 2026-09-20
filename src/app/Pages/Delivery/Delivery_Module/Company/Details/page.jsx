'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Tracking_number from './Tracking_number'
import Shipment_details from './Shipment_details'
import Delivery_points from './Delivery_points'
import Price from './Price'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getActiveDeliveryIDThunk } from '@/redux/slice/Delivery/DeliverySlice'

function DetailsPage() {
  const {t} = useTranslation()
  const router = useRouter()

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log('id' , id);

  const dispatch = useDispatch()
  const {getActiveDeliveryID} = useSelector((state)=>state.Delivery)

  useEffect(()=>{
    if(id){
      dispatch(getActiveDeliveryIDThunk(id))
    }
  },[dispatch , id])

  console.log('getActiveDeliveryID' , getActiveDeliveryID);

  return (
    <MainLayout>
        <div className='flex flex-col gap-3'>
          <h1 className='text-[#364152] text-2xl font-medium'>{t('Order details')}</h1>
          <p className='text-[#697586] text-xl font-normal'>{getActiveDeliveryID?.booking_number}</p>
        </div>

        <>
          <Tracking_number getActiveDeliveryID={getActiveDeliveryID}/>
          <Shipment_details getActiveDeliveryID={getActiveDeliveryID}/>
          <div className='grid grid-cols-2 gap-6 my-6 border border-[#CDD5DF] rounded-3px p-6'>
            <Delivery_points getActiveDeliveryID={getActiveDeliveryID}/>
            <Price getActiveDeliveryID={getActiveDeliveryID}/>
          </div>
        </>


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
          onClick={() => router.push('/Pages/Connections/Delivery_Module/Company/Details/DeliveryTracking')}
        >
          {t('Live coverage')}
        </motion.button>
        
      </motion.div>
        
    </MainLayout>
  )
}

export default DetailsPage