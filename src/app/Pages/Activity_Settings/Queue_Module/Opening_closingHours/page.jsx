'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import OpeningHours from './OpeningHours'
import HiddenDates from './HiddenDates'
import HiddenTables from './HiddenTables'


function Opening_closingHoursPage() {
  const {t} = useTranslation() 


  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <OpeningHours/>
            <HiddenDates/>
            <HiddenTables/>



            {/* btn */}
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
            </button>

          </div>
    
          
          
      </div>

    </>
  )
}

export default Opening_closingHoursPage