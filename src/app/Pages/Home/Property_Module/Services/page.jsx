"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import TileOfSevicesPage from './TileOfSevices/page'
import BoxPage from './Box/page'
import Cardspage from './Cards/page'

function ServicesPage() {
  return (
    <MainLayout>
      <TileOfSevicesPage/>
      <BoxPage/>
      <Cardspage/>
    </MainLayout>
  )
}

export default ServicesPage