'use client'
import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import DayAndTime from './DayAndTime'
import Loader from '@/app/Components/Loader/Loader'

function WorkingHoursPage() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <motion.div 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
        >
          <Header/>
          <DayAndTime/>
        </motion.div>
      </Suspense>
    </>
  )
}

export default WorkingHoursPage