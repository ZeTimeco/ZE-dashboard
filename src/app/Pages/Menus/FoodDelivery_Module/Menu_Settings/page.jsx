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
import { motion, AnimatePresence } from 'framer-motion'

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
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        {/* header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className='text-[#364152] text-2xl font-medium'>{t("Categories")}</p>
          </div>
          <AddBtn               
            href="/Pages/Menus/FoodDelivery_Module/Menu_Settings/Add"
            label="add category" 
          />
        </div>

        <AnimatePresence mode="wait">
          {getCategoriesList?.data?.length !== 0 ? (
            <motion.div
              key={`categories-${currentPage}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              {/* Cards Grid */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <Cards getCategoriesList={getCategoriesList} currentPage={currentPage} />
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => setCurrentPage(page)}
                />
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <EmptyData/>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </MainLayout>
  )
}

export default Menu_SettingsPage