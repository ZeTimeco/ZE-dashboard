"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import UpcomingBookingsPage from './UpcomingBookings/page'
import WaitingListPage from './WaitingList/page'
import QuickProceduresPage from './QuickProcedures/page'
import { useDispatch, useSelector } from 'react-redux'
import { getcountersThunk, getUpcomingThunk, getWaitlistThunk } from '@/redux/slice/Home/HomeSlice'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const sectionVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function ServicesPage() {
  const dispatch = useDispatch()
  const {getcounters , getUpcoming ,getWaitlist} = useSelector((state)=>state.Home)
  useEffect(()=>{
    dispatch(getcountersThunk())
    dispatch(getUpcomingThunk())
    dispatch(getWaitlistThunk())
  },[dispatch])

  console.log('getWaitlist' ,getWaitlist);

  return (
    <MainLayout>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <motion.div variants={sectionVariants}>
          <BoxPage getcounters={getcounters}/>
        </motion.div>

        <motion.div variants={sectionVariants} 
          className={`grid grid-cols-1 ${
              getUpcoming?.data?.length > 0 && getWaitlist?.data?.length > 0
                ? 'lg:grid-cols-2'
                : 'lg:grid-cols-1'
            } gap-4`}>
          {getUpcoming?.data?.length > 0 && <UpcomingBookingsPage getUpcoming={getUpcoming}/>}
          {getWaitlist?.data?.length > 0 && <WaitingListPage getWaitlist={getWaitlist}/>}
        </motion.div>

        <motion.div variants={sectionVariants}>
          <QuickProceduresPage getcounters={getcounters}/>
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}

export default ServicesPage