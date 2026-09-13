'use client'
import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import TitleOfDetails from './TitleOfDetails'
import TrackingStatus from './TrackingStatus'
import DeliveryPoints from './DeliveryPoints'
import DriverDetails from './DriverDetails'
import { useTranslation } from 'react-i18next'

function DetailsActiveConnectionsContent() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const {t} = useTranslation()

  return (
    <MainLayout>
      
      {/* DetailsActiveConnectionsPage {id ? `(ID: ${id})` : ''} */}
    
      <TitleOfDetails/>
      <div className='grid grid-cols-2 gap-6 mt-10'>
        <TrackingStatus/>
        <DeliveryPoints/>
      </div>
      
      <DriverDetails/>


      {/* btn */}
      <div  className="flex justify-between  w-full  mb-6">
        <button
          type="button"
          className="border border-[#697586] w-[20%] h-14 cursor-pointer text-[#697586] text-base font-semibold rounded-3px"
        >
          {t('Return')}
        </button>

        <button
          type="button"
          className="bg-primary w-[20%] h-14 cursor-pointer text-white text-base font-semibold rounded-3px "
        >
          {t('Proceed to the pickup point')}
        </button>
      </div>

      

    </MainLayout>
  )
}

function DetailsActiveConnectionsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DetailsActiveConnectionsContent />
    </Suspense>
  )
}

export default DetailsActiveConnectionsPage