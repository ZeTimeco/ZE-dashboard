'use client'
import React, { useEffect } from 'react'
import Rate from './Rate'
import { useDispatch, useSelector } from 'react-redux'
import { getRatingConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import Comment from './Comment'
import { motion } from 'framer-motion'

function ReviewPage() {
  const dispatch = useDispatch()
  const { getRatingConfig } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getRatingConfigThunk())
  }, [dispatch])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Rate getRatingConfig={getRatingConfig?.summary} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.12 }}
      >
        <Comment getRatingConfig={getRatingConfig?.data} />
      </motion.div>
    </motion.div>
  )
}

export default ReviewPage