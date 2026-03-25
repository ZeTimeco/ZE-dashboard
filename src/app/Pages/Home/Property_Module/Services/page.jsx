"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import TileOfSevicesPage from './TileOfSevices/page'
import BoxPage from './Box/page'

function ServicesPage() {
  return (
    <MainLayout>
      <TileOfSevicesPage/>
      <BoxPage/>
    </MainLayout>
  )
}

export default ServicesPage