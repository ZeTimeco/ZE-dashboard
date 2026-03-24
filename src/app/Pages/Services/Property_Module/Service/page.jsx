"use client"
import React from 'react'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import No_services_Add from './No_services_Add'
import CardOfService from './CardOfService'

function ServicePage() {
  return (
    <MainLayout>
      
      <div className='grid grid-cols-3'>
        <CardOfService/>
      </div>


      {/* <No_services_Add/> */}
    </MainLayout>
  )
}

export default ServicePage