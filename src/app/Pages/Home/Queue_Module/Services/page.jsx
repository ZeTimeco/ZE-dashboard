"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import UpcomingBookingsPage from './UpcomingBookings/page'
import WaitingListPage from './WaitingList/page'
import QuickProceduresPage from './QuickProcedures/page'
import { useDispatch, useSelector } from 'react-redux'
import { getcountersThunk, getUpcomingThunk } from '@/redux/slice/Home/HomeSlice'

function ServicesPage() {
  const dispatch = useDispatch()
  const {getcounters , getUpcoming} = useSelector((state)=>state.Home)
  useEffect(()=>{
    dispatch(getcountersThunk())
    dispatch(getUpcomingThunk())
  },[dispatch])

  console.log('getUpcoming' ,getUpcoming);

  return (
    <MainLayout>
      <BoxPage getcounters={getcounters}/>

      <div className='grid grid-cols-2 gap-4'>
        <UpcomingBookingsPage getUpcoming={getUpcoming}/>
        <WaitingListPage />
      </div>

      <QuickProceduresPage/>

    </MainLayout>
  )
}

export default ServicesPage