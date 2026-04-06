"use client"
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'


function NavRequest() {
  const{t}= useTranslation()


  

  return (
    <>
      <section className=' flex justify-between mb-10'>
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Orders')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your orders')}</p>
        </div>
        <ExtractBtn/>

      </section>

      <section className='flex gap-6'>
        <SearchForm 
          placeholderKey="Search by order number"
        />
        <FilterBtn />
      </section>




    </>
  )
}

export default NavRequest