"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'
import { motion } from 'framer-motion'

function NavRequest({ onApplyFilters, onSearch }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className='flex justify-between items-center mb-10'
      >
        <div>
          <motion.p 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className='text-[#364152] text-2xl font-medium mb-3'
          >
            {t('Orders')}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className='text-[#697586] text-base font-normal'
          >
            {t('A comprehensive overview of all your orders')}
          </motion.p>
        </div>

        <motion.div
          whileHover={{ scale: 1.03, boxShadow: '0 4px 14px rgba(198, 152, 21, 0.15)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <ExtractBtn/>
        </motion.div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.12, ease: 'easeOut' }}
        className='flex gap-6 items-center mb-6'
      >
        <div className='flex-1 transition-transform duration-200 focus-within:scale-[1.005]'>
          <SearchForm 
            placeholderKey="Search by order number"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.03, boxShadow: '0 4px 14px rgba(198, 152, 21, 0.15)' }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        >
          <FilterBtn onClick={handleClickOpen}/>
        </motion.div>
      </motion.section>

      <FiltersPage
        open={open}
        handleClose={handleClose}
        onApplyFilters={(filters) => {
          onApplyFilters(filters);
          handleClose();
        }}
      />
    </>
  )
}

export default NavRequest