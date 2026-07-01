'use client'
import React from 'react'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import QueueManagement from './QueueManagement'
import BookingRules from './BookingRules'
import WaitingTimeLogic from './WaitingTimeLogic'
import NoShowRules from './NoShowRules'
import CloseQueue from './CloseQueue'

function Queue_settingsPage() {
  const {t} = useTranslation() 
  
  return (
    <>

    <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <QueueManagement/>
            <BookingRules/>
            <WaitingTimeLogic/>
            <NoShowRules/>
            <CloseQueue/>
        
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>

    </>
  )
}

export default Queue_settingsPage