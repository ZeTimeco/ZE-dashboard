"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect , Suspense } from 'react'
import NavRequest from './NavRequest'
import CardOfRequest from './CardOfRequest'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingPropertyThunk } from '@/redux/slice/Requests/RequestsSlice'
import Loader from '@/app/Components/Loader/Loader'

function Property_ModulePage() {

  //api
  const dispatch = useDispatch()
  const {getBooking} = useSelector((state)=>state.requests)
  useEffect(()=>{
    dispatch(getAllBookingPropertyThunk())
  },[dispatch])




  return (
    <MainLayout>
      <Suspense fallback={<div><Loader/></div>}>
        <NavRequest/>
      
        <div className='grid grid-cols-2 lg1:grid-cols-3 gap-6'>
          <CardOfRequest getBooking={getBooking}/>
        </div>
        <Pagination/>
      </Suspense>
    </MainLayout>
  )
}

export default Property_ModulePage