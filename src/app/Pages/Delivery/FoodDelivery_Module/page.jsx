'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import Header from './Header'
import Card from './Card'
import { getOrdersThunk } from '@/redux/slice/Delivery/DeliverySlice'
import { useDispatch, useSelector } from 'react-redux'
import EmptyData from './EmptyData'

function FoodDelivery_Modulepage() {

  //api
  const dispatch = useDispatch();
  const { getOrders } = useSelector((state) => state.Delivery);

  useEffect(()=>{
    dispatch(getOrdersThunk());
  },[dispatch])

  // console.log('getOrders' , getOrders);

  return (
    <MainLayout>
      
      <Header/>
      {getOrders?.data?.length !== 0 ? (
        <EmptyData/>
      ):(
        <div className='grid grid-cols-2 gap-6 mt-10 mb-5'>
          <Card getOrders={getOrders}/>
        </div>
      )}
      

    </MainLayout>
  )
}

export default FoodDelivery_Modulepage