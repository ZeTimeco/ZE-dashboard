"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import DetailsPage from './Details/page'
import { useTranslation } from 'react-i18next'
import CalenderDaysPage from './CalenderDays/page'

function CalendarPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>
      <div className='mb-10'>
        <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Property valuation')}</p>
        <p className='text-[#697586] text-base font-normal'>{t('Available this month')}</p>
      </div>

      <div className='border border-[#E6E6E6] p-8'>
        <DetailsPage/>

        <CalenderDaysPage/>
      </div>
      
    </MainLayout>
  )
}

export default CalendarPage