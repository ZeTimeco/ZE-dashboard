'use client'
import React from 'react'
import Header from './Header'
import BookingConfirmation from './BookingConfirmation'
import BookingTimeline from './BookingTimeline'
import BookingRules from './BookingRules'
import ModificationaAndCancellation from './ModificationaAndCancellation'
import { useTranslation } from 'react-i18next'

function Booking_settingsPage() {
    const {t} = useTranslation() 
  
  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <BookingConfirmation/>
            <BookingTimeline/>
            <BookingRules/>
            <ModificationaAndCancellation/>
        
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>
    </>
  )
}

export default Booking_settingsPage