"use client"
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import TitleOfIncome_analysisPage from './TitleOfIncome_analysis/page'
import ChartPage from './Chart/page'
import { useDispatch, useSelector } from 'react-redux'
import { getRevenueChartDataThunk } from '@/redux/slice/Finance/FinanceSlice'

function Income_analysisPage() {
  const dispatch = useDispatch();
  const { revenueChartData } = useSelector((state) => state.finance);
  const [filter, setFilter] = useState('all');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    dispatch(getRevenueChartDataThunk({ year: currentYear, filter }));
  }, [dispatch, currentYear, filter]);

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
        className='border border-[#E3E8EF] rounded-[3px] mb-12 bg-white hover:shadow-[0_4px_16px_rgba(0,0,0,0.04)] transition-shadow duration-200 overflow-hidden w-full'
      >
        <TitleOfIncome_analysisPage selectedFilter={filter} onFilterChange={setFilter}/>
        <hr className='border border-[#E3E8EF] w-full mt-4'></hr>
        <ChartPage dispatch={dispatch} revenueChartData={revenueChartData}/>
      </motion.div>
    </>
  )
}

export default Income_analysisPage