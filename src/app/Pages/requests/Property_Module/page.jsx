import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import NavRequest from './NavRequest'
import CardOfRequest from './CardOfRequest'

function Property_ModulePage() {
  return (
    <MainLayout>
      <NavRequest/>
      <div className='grid grid-cols-3'>
        <CardOfRequest/>
      </div>
    </MainLayout>
  )
}

export default Property_ModulePage