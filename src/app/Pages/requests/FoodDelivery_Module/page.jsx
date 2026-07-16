"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import Filter from './Filter'
import Cards from './Cards'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getOrdersThunk } from '@/redux/slice/Requests/RequestsSlice'

function FoodDelivery_ModulePage() {

  const {t} = useTranslation()

  //api
  const [page, setPage] = useState(1);
  const [activeTab, setActiveTab] = useState('new');

  const dispatch = useDispatch()
  const {getOrders} = useSelector((state)=>state.requests)
  useEffect(() => {
    dispatch(getOrdersThunk({ page, status: activeTab }));
  }, [dispatch, page, activeTab]);
  
  console.log('getOrders' , getOrders);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setPage(1);
  };

  return (
    <MainLayout>
      
      <Header/>

      <Filter getOrders={getOrders} activeTab={activeTab} setActiveTab={handleTabChange}/>

      <div className='grid grid-cols-2 gap-6 my-8'>
        <Cards getOrders={getOrders?.data}/>
      </div>
      <Pagination
          currentPage={getOrders?.data?.current_page}
          totalPages={getOrders?.data?.last_page}
          onPageChange={setPage}
        />
      
    </MainLayout>
  )
}

export default FoodDelivery_ModulePage