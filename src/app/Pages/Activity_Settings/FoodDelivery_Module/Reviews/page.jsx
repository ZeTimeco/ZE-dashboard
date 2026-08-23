'use client'
import React, { useState } from 'react'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Header from './Header'
import ReviewPage from './Review/page'
import RatingSettingPage from './RatingSetting/page'

function ReviewsPage() {
  const [activeView, setActiveView] = useState('review')

  return (
    <>
      <div className='border border-[#E3E8EF] rounded-3px mb-4'>
        <div>
          <Header activeView={activeView} setActiveView={setActiveView} />
        </div>

        <div className='p-6 flex flex-col gap-4'>
          {activeView === 'rating_setting' ? (
            <RatingSettingPage />
          ) : (
            <ReviewPage />
          )}
        </div>
      </div>
    </>
  )
}

export default ReviewsPage
