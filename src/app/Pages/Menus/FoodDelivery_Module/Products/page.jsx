'use client'
import React, { useEffect, Suspense } from 'react'
import Header from './Header'
import Box from './Box'
import Product from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { getMenuStatisticsThunk, getMenusThunk } from '@/redux/slice/Menus/MenusSlice'
import { useSearchParams } from 'next/navigation'
import Loader from '@/app/Components/Loader/Loader'
import EmptyData from '../EmptyData'
import { motion, AnimatePresence } from 'framer-motion'

function ProductsPageContent() {
  const dispatch = useDispatch()
  const {getMenuStatistics , getMenus } = useSelector((state)=>state.Menus)
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''

  useEffect(()=>{
    dispatch(getMenuStatisticsThunk())
  },[dispatch])

  useEffect(()=>{
    dispatch(getMenusThunk(search))
  },[dispatch, search])

  return (
    <div className='mt-10'>
      <Header/>
      <Box getMenuStatistics={getMenuStatistics}/>
      <AnimatePresence mode="wait">
        {getMenus?.data?.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <EmptyData/>
          </motion.div>
        ) : (
          <motion.div
            key={`products-${search}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start my-8"
          >
            <Product getMenus={getMenus}/>
          </motion.div>
        )}
      </AnimatePresence>
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