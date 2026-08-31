"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'

function NavRequest({ onApplyFilters, onResetFilters, onSearch }) {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='flex justify-between mb-10 items-center'
      >
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3 tracking-tight'>{t('Orders and reservations')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('A comprehensive view of all your requests and reservations')}</p>
        </div>
        <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <ExtractBtn/>
        </div>
      </motion.section>

      <motion.section 
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
        className='flex gap-6 items-center'
      >
        <div className="flex-1">
          <SearchForm 
            placeholderKey="Search by order number"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <FilterBtn onClick={handleClickOpen} />
        </div>
      </motion.section>

      <FiltersPage open={open} handleClose={handleClose} onApplyFilters={onApplyFilters} onResetFilters={onResetFilters} />
    </>
  )
}

export default NavRequest