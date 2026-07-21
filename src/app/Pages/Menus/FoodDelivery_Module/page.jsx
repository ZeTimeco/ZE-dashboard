"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import AdditionsPage from './Additions/page'
import ProductsPage from './Products/page'

function FoodDelivery_ModulePage() {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState('Products')
  
  return (
    <MainLayout>
      {/* header */}
      <div className='flex justify-between mb-5 '>
        <p className='text-[#364152] text-2xl font-medium '>{t('menu')}</p>
          <button className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[30%] lg1:w-[20%] rounded-[3px] cursor-pointer'>
            <p>  <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Adding a new product')}</p>
          </button>
      </div>

      {/*  */}
      <div className='lg1:w-[40%] w-[60%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-6 p-2 rounded-[3px]'> 
        <button 
          onClick={() => setActiveTab('Products')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${(activeTab === 'Products' )
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span 
            className={` text-xl font-normal   
            ${(activeTab === 'Products')?'text-white':'text-[#364152]'}`}
          >
            {t('Products')}
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
          {activeTab === 'Products' && (
            <ProductsPage />
          )}
          {activeTab === 'Additions' && (
            <AdditionsPage />
          )}
      </div>
    </MainLayout>
  )
}

export default FoodDelivery_ModulePage