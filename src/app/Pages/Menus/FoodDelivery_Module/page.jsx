"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductsPage from './Products/page'
import { useRouter } from 'next/navigation'

function FoodDelivery_ModulePage() {
  const {t} = useTranslation()
  const router = useRouter()

  
  return (
    <MainLayout>
      {/* header */}
      <div className='flex justify-between mb-5 '>
        <p className='text-[#364152] text-2xl font-medium '>{t('menu')}</p>
          <button 
            onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Products/Add`)} 
            className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[30%] lg1:w-[20%] rounded-[3px] cursor-pointer'
          >
            <p>  <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Adding a new product')}</p>
          </button>
      </div>

      {/*  */}
      <ProductsPage />
    </MainLayout>
  )
}

export default FoodDelivery_ModulePage