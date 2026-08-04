'use client'
import AddBtn from '@/app/Components/Buttons/AddBtn'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cards from './Cards'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoriesListThunk } from '@/redux/slice/Menus/MenusSlice'
import Pagination from './Pagination'
import EmptyData from './EmptyData'

function Menu_SettingsPage() {
  const {t} = useTranslation()

  const [currentPage, setCurrentPage] = useState(1);

  //api
  const dispatch = useDispatch()
  const { getCategoriesList } = useSelector((state) => state.Menus)
  
  useEffect(() => {
    dispatch(getCategoriesListThunk(currentPage))
  }, [dispatch, currentPage])

  const totalPages = getCategoriesList?.meta?.last_page || 1;

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

      {getCategoriesList?.data?.length  === 0 ? (
        <>
          {/*  */}
          <div className='grid grid-cols-2 gap-6'>
            <Cards getCategoriesList={getCategoriesList} currentPage={currentPage} />
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </>
      ):(
        <EmptyData/>
      )}
      

    </MainLayout>
  )
}

export default Menu_SettingsPage