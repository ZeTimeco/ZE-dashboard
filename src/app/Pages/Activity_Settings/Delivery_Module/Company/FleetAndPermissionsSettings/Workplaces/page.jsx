'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import No_WorkPlaces from './No_WorkPlaces'
import Locations from './Locations'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'

function WorkplacesPage() {
    const router = useRouter()
    const {t} = useTranslation()
  
  return (
    <MainLayout>
      


      {/* <No_WorkPlaces/> */}
      <div> 
        <Locations/> 
      
      </div>
    </MainLayout>
  )
}

export default WorkplacesPage