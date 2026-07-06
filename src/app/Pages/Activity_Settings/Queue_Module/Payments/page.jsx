'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import DepositSetup from './DepositSetup'
import PaymentSettings from './PaymentSettings'
import NoShowFees from './NoShowFees'


function PaymentsPage() {
  const {t} = useTranslation()

  return (
    <>
  <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <PaymentSettings/>
            <DepositSetup/>
            <NoShowFees/>
        
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>

    </>
  )
}

export default PaymentsPage