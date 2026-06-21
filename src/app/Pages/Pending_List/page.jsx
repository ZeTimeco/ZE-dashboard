"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './List/Header';
import Box from './List/Box';
import Filter from './List/Filter';
import Cards from './List/Cards';
import MainLayout from '@/app/Components/MainLayout/MainLayout';
import No_Guest_Add from './List/No_Guest_Add';
import { useDispatch, useSelector } from 'react-redux';
import { getwaitlistAnalysisThunk } from '@/redux/slice/Pending_List/Pending_ListSlice';



function Pending_ListPage() {
  const {t} = useTranslation();
  const [activeTab, setActiveTab] = useState('coming');
  
  //api
  const dispatch = useDispatch()
  const {getwaitlistAnalysis} = useSelector((state)=>state.PendingList)

  useEffect (()=>{
    dispatch(getwaitlistAnalysisThunk())
  },[dispatch])

  console.log('getwaitlistAnalysis',getwaitlistAnalysis);
  return (
    <MainLayout>
      <Header/>

      <Box getwaitlistAnalysis={getwaitlistAnalysis}/>

      <div className='border border-[#E3E8EF] rounded-[3px] p-6 mb-6'>
        <Filter activeTab={activeTab} setActiveTab={setActiveTab}/>
        <Cards  activeTab={activeTab}/>
        {/* <No_Guest_Add /> */}
      </div>
      
    </MainLayout>
  )
}

export default Pending_ListPage