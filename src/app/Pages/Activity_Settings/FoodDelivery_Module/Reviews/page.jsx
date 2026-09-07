'use client'
import React, { useState } from 'react'
import Header from './Header'
import ReviewPage from './Review/page'
import RatingSettingPage from './RatingSetting/page'
import { motion, AnimatePresence } from 'framer-motion'

function ReviewsPage() {
  const [activeView, setActiveView] = useState('review')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <div className='border border-[#E3E8EF] rounded-3px mb-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]'>
        <Header activeView={activeView} setActiveView={setActiveView} />

        <div className='p-6 flex flex-col gap-4'>
          <AnimatePresence mode="wait">
            {activeView === 'rating_setting' ? (
              <motion.div
                key="rating_setting"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <RatingSettingPage />
              </motion.div>
            ) : (
              <motion.div
                key="review"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
              >
                <ReviewPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewsPage
