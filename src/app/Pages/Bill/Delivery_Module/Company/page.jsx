'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Net_profitPage from './Net_profit/page'
import Monthly_SummaryPage from './Monthly_Summary/page'
import Latest_movementsPage from './Latest_movements/page'
import { useDispatch, useSelector } from 'react-redux'
import { getEarningsThunk } from '@/redux/slice/Bill/BillSlice'

function CompanyPage() {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getEarnings} = useSelector((state)=>state.Bill)
  useEffect(()=>{
    dispatch(getEarningsThunk())
  },[dispatch])

  console.log('getEarnings' , getEarnings);
  return (
    <>
      <h1 className='text-[#364152] text-2xl font-medium'>{t('Profits and Invoice')}</h1>

      <div className='grid grid-cols-2 gap-6 mt-10'>
        <Net_profitPage getEarnings={getEarnings}/>
        <Monthly_SummaryPage getEarnings={getEarnings}/>
      </div>
      <div>
        <Latest_movementsPage getEarnings={getEarnings}/>
      </div>
      
    </>
  )
}

export default CompanyPage