'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import Box from './Box'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuStatisticsThunk } from '@/redux/slice/Menus/MenusSlice'

function ProductsPage() {
  const dispatch = useDispatch()
  const {getMenuStatistics} = useSelector((state)=>state.Menus)
  useEffect(()=>{
    dispatch(getMenuStatisticsThunk())
  },[dispatch])

  console.log('getMenuStatistics' , getMenuStatistics);

  return (
    <div className='mt-10'>
      <Header/>
      <Box getMenuStatistics={getMenuStatistics}/>

      <div  className='grid grid-cols-2 gap-6'>
        <Product/>
      </div>



    </div>
  )
}

export default ProductsPage