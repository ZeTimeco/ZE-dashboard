'use client'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function NavWorker({handleClickOpen, onSearch}) {
  const {t} = useTranslation()
  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className='flex justify-between mb-10 items-center'
      >
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3 tracking-tight'>{t('List of workers')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('Manage your workers easily — review all workers and track their performance.')}</p>
        </div>
        <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <AddBtn
            href="/Pages/workers/Add"
            label="Adding a worker"
            className=""
          />
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
            placeholderKey="Search by name" 
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        <div className="transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]">
          <FilterBtn onClick={handleClickOpen}/>
        </div>
      </motion.section>
    </>
  )
}

export default NavWorker