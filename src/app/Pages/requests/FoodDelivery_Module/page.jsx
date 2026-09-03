"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import Filter from './Filter'
import Cards from './Cards'
import Pagination from './Pagination'
import EmptyData from './EmptyData'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersThunk, getRestaurantStatusThunk } from '@/redux/slice/Requests/RequestsSlice'
import { motion, AnimatePresence } from 'framer-motion'

function FoodDelivery_ModulePage() {

  const {t} = useTranslation()

  //api
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('new');

  const dispatch = useDispatch()
  const {getOrders ,getRestaurantStatus} = useSelector((state)=>state.requests)
  useEffect(() => {
    dispatch(getOrdersThunk({ page, status: activeTab }));
  }, [dispatch, page, activeTab]);
  
  // console.log('getOrders' , getOrders);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  useEffect(()=>{
    dispatch(getRestaurantStatusThunk())
  },[dispatch])

  const orders = getOrders?.data?.data;
  const hasOrders = orders && orders.length > 0;

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Header getRestaurantStatus={getRestaurantStatus}/>

        <Filter getOrders={getOrders} activeTab={activeTab} setActiveTab={handleTabChange}/>
        
        <AnimatePresence mode="wait">
          {hasOrders ? (
            <motion.div
              key={`${activeTab}-${page}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <div className='grid grid-cols-1 lg1:grid-cols-2 gap-6 my-8'>
                <Cards getOrders={getOrders?.data}/>
              </div>

              <Pagination
                currentPage={getOrders?.data?.current_page}
                totalPages={getOrders?.data?.last_page}
                onPageChange={setPage}
              />
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyData />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MainLayout>
  )
}

export default FoodDelivery_ModulePage