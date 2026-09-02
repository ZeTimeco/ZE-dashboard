"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import Header from './Header'
import NoReviews from './NoReviews'

function ReviewsPages() {
  const { t } = useTranslation()
  const data = ["3"]  

  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] shadow-xs'>
        <Header/>
        <div className='px-6 py-6'>
          {data?.length > 0 ? (
            <Content />
          ) : (
            <NoReviews/>
          )}
        </div>
      </div>
    </>
  )
}

export default ReviewsPages