'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense } from 'react'
import ChatLayout from './ChatLayout'
import Loader from '@/app/Components/Loader/Loader'

function Chatpage() {
  return (
    <MainLayout>
      <Suspense fallback={<Loader />}>
        <ChatLayout/>
      </Suspense>
    </MainLayout>
  )
}

export default Chatpage
