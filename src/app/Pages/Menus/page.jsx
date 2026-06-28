'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ItemsPage from './Items/page'
import CategoryPage from './Category/page'
import Add_CategoryPage from './Category/Add_Category/page'
import Item_Of_CategoryPage from './Items/Item_Of_Category/page'
import Add_ItemsPage from './Items/Add_Items/page'

function MenusPage() {
  const {t} = useTranslation( )
  const [activeTab, setActiveTab] = useState('Category')
  const [openAdd , setOpenAdd]= useState(false)
  const [openAddItem , setOpenAddItem]= useState(false)

  
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <MainLayout>
      {/*  */}
      <div className='flex justify-between mb-5'>
        <p className='text-[#364152] text-2xl font-medium '>{t('menu')}</p>
        {(activeTab==='Category') ?(
          <button onClick={()=>setOpenAdd(true)} className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[20%] rounded-[3px] cursor-pointer'>
            <p>  <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Add a new category')}</p>
          </button>
        ):(
          <button onClick={()=>setOpenAddItem(true)} className='bg-[var(--color-primary)] flex justify-center items-center gap-2 h-14 w-[20%] rounded-[3px] cursor-pointer'>
            <p> <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" /></p>
            <p className='text-white text-base font-medium'>{t('Add a new item')}</p>
          </button>
        )}
      </div>


      {/*  */}
      <div className='w-[40%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-6 p-2 rounded-[3px]'> 
        <button 
          onClick={() => setActiveTab('Category')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${(activeTab === 'Category' || activeTab === 'Item_Of_Category')
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${(activeTab === 'Category' || activeTab === 'Item_Of_Category')?'serving-food-white.svg':'serving-food-black.svg'}`} className="w-5 h-5" />
          </span>
          <span 
            className={` text-xl font-normal   
            ${(activeTab === 'Category' || activeTab === 'Item_Of_Category')?'text-white':'text-[#364152]'}`}
          >
            {t('Classification')}
          </span>
        </button>

        <button 
          onClick={() => setActiveTab('items')}
          className={`flex justify-center gap-1  p-4 cursor-pointer 
            ${activeTab === 'items'
              ? 'bg-[var(--color-primary)] text-white rounded-[3px]'
              : ''
            }`}
        >
          <span className='flex items-center'>
            <img src={`/images/icons/${activeTab === 'items'?'dish-white.svg':'dish-black.svg'}`} className="w-5 h-5" />
          </span>
          <span 
            className={` text-xl font-normal   
            ${activeTab === 'items'?'text-white':'text-[#364152]'}`}
          >
            {t('Category')}
          </span>
        </button>

      </div>

      <div className='mt-10'>
        {/* Content */}
        {activeTab === 'Category' && (
          <CategoryPage 
            onViewCategoryItems={(category) => {
              setSelectedCategory(category)
              setActiveTab('Item_Of_Category')
            }} 
            setOpenAdd ={setOpenAdd}
          />
        )}
        {activeTab === 'items' && (
          <ItemsPage 
            setOpenAddItem ={setOpenAddItem}
          />
        )}
        {activeTab === 'Item_Of_Category' && (
          <Item_Of_CategoryPage 
            selectedCategory={selectedCategory} 
            onClickBack={() => setActiveTab('Category')} 
          />
        )}
      </div>


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