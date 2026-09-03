'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Card from './Card'
import { useDispatch, useSelector } from 'react-redux'
import { getItemByIdThunk } from '@/redux/slice/Menus/MenusSlice'
import { motion } from 'framer-motion'

function Item_Of_CategoryPage({ onClickBack, selectedCategory }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getItemById, loading } = useSelector((state) => state.Menus)

  useEffect(() => {
    if (selectedCategory?.id) {
      dispatch(getItemByIdThunk(selectedCategory.id))
    }
  }, [dispatch, selectedCategory?.id])

  const items = getItemById?.data ?? (Array.isArray(getItemById) ? getItemById : [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className='border border-[#E3E8EF] py-8 px-6 rounded-[3px] bg-white'
    >
      <div className='flex justify-between items-center gap-3 mb-6'>
        <p className='text-[#364152] text-xl font-medium'>{selectedCategory?.name || t('Classification')}</p>
        <motion.button 
          whileHover={{ scale: 1.08, boxShadow: '0 4px 12px 0 rgba(var(--color-primary-rgb,158,122,17),0.3)', transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
          onClick={onClickBack}
          className='w-10 h-10 bg-[var(--color-primary)] rounded-[3px] flex justify-center items-center cursor-pointer transition-opacity hover:opacity-90'
        >
          <img src="/images/icons/arrow-right-go.svg" className="w-5 h-5" alt="back" />
        </motion.button>
      </div>
      
      <div className='grid grid-cols-2 gap-6'>
        {items.map((item, i) => (
          <Card key={item?.id} item={item} index={i} selectedCategoryId={selectedCategory?.id} />
        ))}
      </div>
    </motion.div>
  )
}

export default Item_Of_CategoryPage