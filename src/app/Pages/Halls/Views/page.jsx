'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import No_Views_Add from './No_Views_Add'
import CardOfViews from './CardOfViews'
import { useTranslation } from 'react-i18next'
import AddBtn from '@/app/Components/Buttons/AddBtn'

function ViewsPage() {
  const {t} = useTranslation()

  return (
    <MainLayout>
      
      {/* <No_Views_Add/> */}

      <div>
        {/* header */}
        <div className=" flex justify-between mb-8">
          <div>
            <p className='text-[#364152] text-2xl font-medium'>{t("Lounge view")}</p>
            <p className='text-[#697586] text-xl font-normal'>{t("Identifying aspects of the showroom offered to customers")}</p>
          </div>
          <AddBtn               
            href="/Pages/Halls/Views/Add"
            label="Add new view" 
          />
        </div>

        {/* cards */}
        <div  className='border border-[#E3E8EF] py-8 px-6 rounded-[3px]'>
          <CardOfViews />
        </div>
        


        </div>

    </MainLayout>
  )
}

export default ViewsPage