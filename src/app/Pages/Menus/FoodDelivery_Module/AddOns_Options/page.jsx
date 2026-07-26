'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OptionsPage from './Options/page'
import AdditionsPage from './Additions/page'

function AddOns_Options() {
    const {t} = useTranslation()
      const [activeTab, setActiveTab] = useState('Options')
  
  return (
    <MainLayout>
      
      <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Add-ons and Options')}</p>
      <div className='lg1:w-[40%] w-[60%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-6 p-2 rounded-[3px]'> 
        <button 
          onClick={() => setActiveTab('Options')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${(activeTab === 'Options' )
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span 
            className={` text-xl font-normal   
            ${(activeTab === 'Options')?'text-white':'text-[#364152]'}`}
          >
            {t('Options')}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('Additions')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${activeTab === 'Additions'
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span 
            className={` text-xl font-normal   
            ${activeTab === 'Additions'?'text-white':'text-[#364152]'}`}
          >
            {t('Additions')}
          </span>
        </button>
      </div>


      {/*  */}
      <div className='mt-10'>
          {/* Content */}
          {activeTab === 'Options' && (
            <OptionsPage />
            
          )}
          {activeTab === 'Additions' && (
              <AdditionsPage/>
          )}
      </div>
    </MainLayout>
  )
}

export default AddOns_Options