'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import Map from './Map'
import { getDeliveryMapThunk } from '@/redux/slice/Delivery/DeliverySlice'
import { useDispatch, useSelector } from 'react-redux'

function MapPage() {
  //api
  const dispatch = useDispatch();
  const { getDeliveryMap } = useSelector((state) => state.Delivery);

  useEffect(()=>{
    dispatch(getDeliveryMapThunk());
  },[dispatch])

  console.log('getDeliveryMap' , getDeliveryMap);


  return (
    <MainLayout>
      <Header/>
      <Map getDeliveryMap={getDeliveryMap}/>
    </MainLayout>
  )
}

export default MapPage