'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Tracking_number from './Tracking_number'
import Shipment_details from './Shipment_details'

function DetailsPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>
        <div className='flex flex-col gap-3'>
          <h1 className='text-[#364152] text-2xl font-medium'>{t('Order details')}</h1>
          <p className='text-[#697586] text-xl font-normal'>ZT-PR-1234</p>
        </div>

        <>
          <Tracking_number/>
          <Shipment_details/>
        </>
        
    </MainLayout>
  )
}

export default DetailsPage