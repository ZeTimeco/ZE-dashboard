'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import Content from './Content'
import { useDispatch, useSelector } from 'react-redux'
import { getResturantStatusThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'

function Restaurant_conditionPage() {
  // API
  const dispatch = useDispatch()
  const { getResturantStatus } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getResturantStatusThunk())
  }, [dispatch])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className='border border-[#E3E8EF] rounded-3px mb-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]'>
        <Header />
        <div className='p-6 flex flex-col gap-4'>
          <Content getResturantStatus={getResturantStatus} />
        </div>
      </div>
    </motion.div>
  )
}

export default Restaurant_conditionPage