'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import { motion } from 'framer-motion'

function All_ItemsPage({getItems}) {
  const {t} = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='border border-[#E3E8EF] py-8 px-6 rounded-[3px] bg-white'
    >
      <div className='mb-6'>
        <p className='text-[#364152] text-xl font-medium'>{t('List of items')}</p>
      </div>
      <div className='grid grid-cols-2 gap-6'>
        <Card getItems={getItems}/>
      </div>
    </motion.div>
  )
}

export default All_ItemsPage