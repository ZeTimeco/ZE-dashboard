'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import NoReviewsPage from './NoReviews/page'
import HaveReviewsPage from './HaveReviews/page'
import { useDispatch, useSelector } from 'react-redux'
import { getReviewThunk } from '@/redux/slice/Setting/SettingSlice'
import Loader from '@/app/Components/Loader/Loader'

function ReviewsPage() {
  const dispatch = useDispatch();
  const {reviews , loading , error} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getReviewThunk())
  },[dispatch])

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
      >
        <Header />

        {loading ? (
          <div className="py-12 flex justify-center"><Loader /></div>
        ) : error ? (
          <p className="p-6 text-red-500">Error: {error}</p>
        ) : reviews?.data && reviews?.data.length > 0 ? (
          <HaveReviewsPage reviews={reviews} />
        ) : (
          <NoReviewsPage />
        )}
      </motion.div>
    </>
  )
}

export default ReviewsPage