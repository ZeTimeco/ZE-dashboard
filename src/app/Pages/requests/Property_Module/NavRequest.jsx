"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'

function NavRequest({ onApplyFilters }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <section className='flex justify-between mb-10'>
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Orders')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your orders')}</p>
        </div>
        <ExtractBtn/>
      </section>

      <section className='flex gap-6'>
        <SearchForm placeholderKey="Search by order number"/>
        <FilterBtn onClick={handleClickOpen}/>
      </section>

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