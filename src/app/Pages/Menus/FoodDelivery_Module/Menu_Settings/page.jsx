'use client'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Cards from './Cards'

function Menu_SettingsPage() {
  const {t} = useTranslation()
  return (
    <MainLayout>

      {/* header */}
      <div className=" flex justify-between mb-8">
        <div>
          <p className='text-[#364152] text-2xl font-medium'>{t("Categories")}</p>
        </div>
        <AddBtn               
          href="/Pages/Menus/FoodDelivery_Module/Menu_Settings/Add"
          label="add category" 
        />
      </div>

      {/*  */}
      <div className='grid grid-cols-2 gap-6'>
        <Cards/>
      </div>
    

    </MainLayout>
  )
}

export default Menu_SettingsPage