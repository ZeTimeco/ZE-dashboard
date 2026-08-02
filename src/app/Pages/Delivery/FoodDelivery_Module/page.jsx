'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import Header from './Header'
import Card from './Card'

function FoodDelivery_Modulepage() {
  return (
    <MainLayout>
      
      <Header/>

      <div className='grid grid-cols-2 gap-6 mt-10'>
        <Card/>
      </div>

    </MainLayout>
  )
}

export default FoodDelivery_Modulepage