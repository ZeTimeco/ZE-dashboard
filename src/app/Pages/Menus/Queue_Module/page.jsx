'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ItemsPage from './Items/page'
import CategoryPage from './Category/page'
import Add_CategoryPage from './Category/Add_Category/page'
import Item_Of_CategoryPage from './Items/Item_Of_Category/page'
import Add_ItemsPage from './Items/Add_Items/page'
import { motion, AnimatePresence } from 'framer-motion'

function MenusPage() {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState('Category')
  const [openAdd , setOpenAdd]= useState(false)
  const [openAddItem , setOpenAddItem]= useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <MainLayout>
      {/* header */}
      <motion.div
        className='flex justify-between items-center mb-5'
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className='text-[#364152] text-2xl font-medium'>{t('menu')}</p>
        {activeTab === 'Category' ? (
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
              transition: { duration: 0.18 }
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={() => setOpenAdd(true)}
            className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[30%] lg1:w-[20%] rounded-[3px] cursor-pointer transition-opacity hover:opacity-90'
          >
            <p><img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Add a new category')}</p>
          </motion.button>
        ) : (
          <motion.button
            whileHover={{
              scale: 1.03,
              boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
              transition: { duration: 0.18 }
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={() => setOpenAddItem(true)}
            className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[30%] lg1:w-[20%] rounded-[3px] cursor-pointer transition-opacity hover:opacity-90'
          >
            <p><img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Add a new item')}</p>
          </motion.button>
        )}
      </motion.div>

      {/* Tabs */}
      <motion.div
        className='lg1:w-[40%] w-[60%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-6 p-2 rounded-[3px]'
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
      > 
        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('Category')}
          className={`flex justify-center items-center gap-1.5 p-4 cursor-pointer transition-all duration-200
            ${(activeTab === 'Category' || activeTab === 'Item_Of_Category')
              ? 'bg-[var(--color-primary)] text-white rounded-[3px] shadow-sm'
              : 'hover:bg-gray-100/70 rounded-[3px]'
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${(activeTab === 'Category' || activeTab === 'Item_Of_Category') ? 'serving-food-white.svg' : 'serving-food-black.svg'}`} className="w-5 h-5 transition-transform duration-200" alt="" />
          </span>
          <span 
            className={`text-xl font-normal transition-colors duration-200
            ${(activeTab === 'Category' || activeTab === 'Item_Of_Category') ? 'text-white font-medium' : 'text-[#364152]'}`}
          >
            {t('Classification')}
          </span>
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('items')}
          className={`flex justify-center items-center gap-1.5 p-4 cursor-pointer transition-all duration-200
            ${activeTab === 'items'
              ? 'bg-[var(--color-primary)] text-white rounded-[3px] shadow-sm'
              : 'hover:bg-gray-100/70 rounded-[3px]'
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${activeTab === 'items' ? 'dish-white.svg' : 'dish-black.svg'}`} className="w-5 h-5 transition-transform duration-200" alt="" />
          </span>
          <span 
            className={`text-xl font-normal transition-colors duration-200
            ${activeTab === 'items' ? 'text-white font-medium' : 'text-[#364152]'}`}
          >
            {t('Category')}
          </span>
        </motion.button>
      </motion.div>

      <motion.div
        className='mt-10'
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
      >
        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'Category' && (
            <motion.div
              key="category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <CategoryPage 
                onViewCategoryItems={(category) => {
                  setSelectedCategory(category)
                  setActiveTab('Item_Of_Category')
                }} 
                setOpenAdd={setOpenAdd}
              />
            </motion.div>
          )}
          {activeTab === 'items' && (
            <motion.div
              key="items"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <ItemsPage 
                setOpenAddItem={setOpenAddItem}
              />
            </motion.div>
          )}
          {activeTab === 'Item_Of_Category' && (
            <motion.div
              key="item-of-category"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <Item_Of_CategoryPage 
                selectedCategory={selectedCategory} 
                onClickBack={() => setActiveTab('Category')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <Add_CategoryPage 
        open={openAdd}
        setOpen={setOpenAdd}
      />

      <Add_ItemsPage 
        open={openAddItem}
        setOpen={setOpenAddItem}
      />
    </MainLayout>
  )
}

export default MenusPage