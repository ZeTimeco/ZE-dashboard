"use client"
import React, { useState } from 'react'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import No_services_Add from './No_services_Add'
import CardOfService from './CardOfService'
import Pagination from './Pagination'
import SearchForm from '@/app/Components/Forms/SearchForm'
import FilterBtn from '@/app/Components/Buttons/FilterBtn'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import { useTranslation } from 'react-i18next'
import FiltersPage from './Filters/page'

function ServicePage() {
  const {t} = useTranslation()

    const [open, setOpen] = useState(false);
  
    const handleClickOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <MainLayout>
      <div>
        <div className=" flex justify-between mb-8">
          <div>
            <p className="text-[#000] text-2xl font-medium flex items-center mb-3">{t("My properties")}</p>
            <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your properties')}</p>
          </div>
          
          <AddBtn               
            href="/Pages/Services/Home_Car_Module/Service/Add"
            label="Adding a new property" 
          />
        </div>
        {/* //search and filter */}
        <div className="flex gap-6 mb-4">
          <SearchForm  placeholderKey="Search by property name or number" />
          <FilterBtn onClick={handleClickOpen}/>
        </div>

        <div className='grid grid-cols-3 gap-6'>
          <CardOfService/>
        </div>
        <Pagination/>
      </div>

      {/* <No_services_Add/> */}

      <FiltersPage
        open={open} 
        setOpen={setOpen}
        handleClose={handleClose} 
      />
    </MainLayout>
  )
}

export default ServicePage