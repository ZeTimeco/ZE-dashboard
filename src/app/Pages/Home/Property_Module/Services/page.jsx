"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import TileOfSevicesPage from './TileOfSevices/page'
import BoxPage from './Box/page'
import Cardspage from './Cards/page'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAnalysisThunk, getPropertiesTopThunk } from '@/redux/slice/Home/HomeSlice'
import UpcomingBookingsPage from './UpcomingBookings/page'
import PerformancePage from './Performance/page'
import ChatPage from './Chat/page'

function ServicesPage() {
  const dispatch = useDispatch()
  const {analysisProperties ,topProperties} = useSelector((state)=>state.Home)

  useEffect(()=>{
    dispatch(getPropertiesAnalysisThunk())
    dispatch(getPropertiesTopThunk())
  },[dispatch])

  console.log(topProperties);
  return (
    <MainLayout>
      <TileOfSevicesPage/>
      <BoxPage analysisProperties={analysisProperties}/>
      <Cardspage topProperties={topProperties}/>
      <div className='grid grid-cols-2 gap-6'>
        <UpcomingBookingsPage />
        <div>
          <PerformancePage/>
          <ChatPage/>
        </div>
      </div>
      
    </MainLayout>
  )
}

export default ServicesPage