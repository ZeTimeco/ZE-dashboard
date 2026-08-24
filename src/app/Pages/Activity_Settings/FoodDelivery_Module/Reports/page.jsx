'use client'
import React from 'react'
import Header from './Header'
import Filter from './Filter'
import Boxes from './Boxes'
import BestsellingProducts from './BestsellingProducts'
import Rating from './Rating'
import ExportingReports from './ExportingReports'
import { motion } from 'framer-motion'

function ReportsPage() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className='border border-[#E3E8EF] rounded-[3px] mb-4 bg-white shadow-2xs overflow-hidden'
    >
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-6'>
        <Filter/>

        <Boxes/>
        <BestsellingProducts/>
        <Rating/>
        <ExportingReports/>
      </div>
    </motion.div>
  )
}

export default ReportsPage