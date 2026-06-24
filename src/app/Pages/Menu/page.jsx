'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import CategoryPage from './Category/page'
import ClassificationPage from './Classification/page'

function MenuPage() {
  const {t} = useTranslation( )
  const [activeTab, setActiveTab] = useState('Classification')
  return (
    <MainLayout>
      <p className='text-[#364152] text-2xl font-medium mb-5'>{t('menu')}</p>
      <div className='w-[40%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-6 p-2 rounded-[3px]'> 
        <button 
          onClick={() => setActiveTab('Classification')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${activeTab === 'Classification'
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${activeTab === 'Classification'?'serving-food-white.svg':'serving-food-black.svg'}`} className="w-5 h-5" />
          </span>
          <span 
            className={` text-xl font-normal   
            ${activeTab === 'Classification'?'text-white':'text-[#364152]'}`}
          >
            {t('Classification')}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('Category')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${activeTab === 'Category'
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${activeTab === 'Category'?'dish-white.svg':'dish-black.svg'}`} className="w-5 h-5" />
          </span>
          <span 
            className={` text-xl font-normal   
            ${activeTab === 'Category'?'text-white':'text-[#364152]'}`}
          >
            {t('Category')}
          </span>
        </button>

      </div>

      <div className='mt-10'>
        {/* Content */}
        {activeTab === 'Classification' && (
          <ClassificationPage />
        )}

        {activeTab === 'Category' && (
          <CategoryPage />
        )}
      </div>
    </MainLayout>
  )
}

export default MenuPage