"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ProductsPage from './Products/page'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function FoodDelivery_ModulePage() {
  const {t} = useTranslation()
  const router = useRouter()

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* header */}
        <div className='flex justify-between items-center mb-5'>
          <p className='text-[#364152] text-2xl font-medium'>{t('menu')}</p>
          <motion.button 
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Products/Add`)} 
            className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[30%] lg1:w-[20%] rounded-[3px] cursor-pointer hover:opacity-95 hover:shadow-md transition-all duration-200'
          >
            <p><img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Adding a new product')}</p>
          </motion.button>
        </div>

        {/* content */}
        <ProductsPage />
      </motion.div>
    </MainLayout>
  )
}

export default FoodDelivery_ModulePage