'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import Pagination from './Pagination'
import { motion } from 'framer-motion'

function All_CategoryPage({ onViewCategoryItems, getCategories, meta, currentPage, onPageChange }) {
  const {t} = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='border border-[#E3E8EF] py-8 px-6 rounded-[3px] bg-white'
    >
      <p className='text-[#364152] text-xl font-medium mb-6'>{t('List categories')}</p>

      <div className='grid grid-cols-2 gap-6'>
        <Card onViewCategoryItems={onViewCategoryItems} getCategories={getCategories}/>
      </div>
      
      <div className='mt-6'>
        <Pagination
          currentPage={currentPage}
          totalPages={meta?.last_page || 1}
          onPageChange={onPageChange}
        />
      </div>
    </motion.div>
  )
}

export default All_CategoryPage