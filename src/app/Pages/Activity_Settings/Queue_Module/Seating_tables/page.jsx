'use client'
import React from 'react'
import Header from './Header'
import SeatingOptions from './SeatingOptions'
import AutomaticControl from './AutomaticControl'
import QR_Login from './QR_Login'
import TableControl from './TableControl'
import { useTranslation } from 'react-i18next'

function Seating_tablesPage() {
  const {t} = useTranslation()
  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <SeatingOptions/>
            <AutomaticControl/>
            <QR_Login/>
            <TableControl/>
        
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>

    </>
  )
}

export default Seating_tablesPage