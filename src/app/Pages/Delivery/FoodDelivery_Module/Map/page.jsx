'use client'
import React from 'react'
import Header from './Header'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Map from './Map'

function MapPage() {
  return (
    <MainLayout>
      <Header/>
      <Map/>
    </MainLayout>
  )
}

export default MapPage