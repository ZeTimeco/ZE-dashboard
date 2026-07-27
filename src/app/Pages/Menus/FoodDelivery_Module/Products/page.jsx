'use client'
import React, { useEffect, Suspense } from 'react'
import Header from './Header'
import Box from './Box'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuStatisticsThunk, getMenusThunk } from '@/redux/slice/Menus/MenusSlice'
import { useSearchParams } from 'next/navigation'
import Loader from '@/app/Components/Loader/Loader'

function ProductsPageContent() {
  const dispatch = useDispatch()
  const {getMenuStatistics , getMenus} = useSelector((state)=>state.Menus)
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(()=>{
    dispatch(getMenuStatisticsThunk())
  },[dispatch])

  useEffect(()=>{
    dispatch(getMenusThunk(search))
  },[dispatch, search])

  // console.log('getMenus' , getMenus);

  return (
    <div className='mt-10'>
      <Header/>
      <Box getMenuStatistics={getMenuStatistics}/>

      <div className="grid grid-cols-2 gap-6 items-start my-8">
        <Product getMenus={getMenus}/>
      </div>
    </div>
  )
}

function ProductsPage() {
  return (
    <Suspense fallback={<div><Loader/></div>}>
      <ProductsPageContent />
    </Suspense>
  )
}

export default ProductsPage