"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import BoxPage from './Box/page'
import UpcomingBookingsPage from './UpcomingBookings/page'
import WaitingListPage from './WaitingList/page'
import QuickProceduresPage from './QuickProcedures/page'

function ServicesPage() {
  return (
    <MainLayout>
      <BoxPage/>

      <div className='grid grid-cols-2 gap-4'>
        <UpcomingBookingsPage/>
        <WaitingListPage/>
      </div>

      <QuickProceduresPage/>

    </MainLayout>
  )
}

export default ServicesPage