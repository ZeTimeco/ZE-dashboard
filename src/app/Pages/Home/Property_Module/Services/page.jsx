"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import TileOfSevicesPage from './TileOfSevices/page'
import BoxPage from './Box/page'
import Cardspage from './Cards/page'
import { useDispatch, useSelector } from 'react-redux'
import { getPropertiesAnalysisThunk, getPropertiesTopThunk } from '@/redux/slice/Home/HomeSlice'

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
    </MainLayout>
  )
}

export default ServicesPage