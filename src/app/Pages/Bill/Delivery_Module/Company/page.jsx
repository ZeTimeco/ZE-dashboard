'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Net_profitPage from './Net_profit/page'
import Monthly_SummaryPage from './Monthly_Summary/page'
import Latest_movementsPage from './Latest_movements/page'

function CompanyPage() {
  const {t} = useTranslation()
  return (
    <>
      <h1 className='text-[#364152] text-2xl font-medium'>{t('Profits and Invoice')}</h1>

      <div className='grid grid-cols-2 gap-6'>
        <Net_profitPage/>
        <Monthly_SummaryPage/>
      </div>
      <div>
        <Latest_movementsPage/>
      </div>
      
    </>
  )
}

export default CompanyPage