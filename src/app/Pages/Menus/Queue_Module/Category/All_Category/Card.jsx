'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Edit_CategoryPage from '../Edit_Category/page'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.06,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Card({ onViewCategoryItems , getCategories }) {
  const {t} = useTranslation()
  const [openEditCategory , setOpenEditCategory] = useState(false)

  const StatusRender = (status) => {
    switch (status) {
      case 'active':
        return (
          <div className='bg-[#fff] border border-[#17B26A] text-[#067647] w-fit h-7.5 rounded-full flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex items-center gap-1'>
              <img src="/images/icons/true_green.svg" alt="" className='w-3.5 h-3.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case 'hidden':
        return null;
    }
  }

  const [selectCategoryID , setSelectCategoryID]= useState(null)
  
  return (
    <>
      {getCategories?.map((category, i)=>(
        <motion.div 
          key={category?.id} 
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{
            y: -3,
            boxShadow: '0 8px 24px 0 rgba(0,0,0,0.08)',
            transition: { duration: 0.2 },
          }}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] p-4 bg-white border border-transparent hover:border-slate-200 transition-all duration-300'
        >
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-[#364152] text-xl font-normal mb-1.5'>{category?.name}</p>
              <div className='flex items-center gap-6'>
                <p className='text-[#4B5565] text-lg font-normal'>{category?.items_count} {t('classification')}</p>
                <div>
                  {StatusRender(category?.status)}
                </div>
              </div>
            </div>
            <div className='flex items-center gap-3'>
              {/* edit */}
              <motion.button 
                whileHover={{ scale: 1.15, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
                onClick={()=>{
                  setSelectCategoryID(category?.id)
                  setOpenEditCategory(true)
                }}  
                className='cursor-pointer p-1.5 rounded-full hover:bg-gray-100 transition-colors'
              >
                <img src="/images/icons/EditBlack.svg" className="w-5 h-5" alt="edit" />
              </motion.button>
              
              {/* view items */}
              <motion.button 
                whileHover={{ scale: 1.08, backgroundColor: '#E2E8F0', transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
                onClick={() => onViewCategoryItems(category)}
                className='w-8 h-8 bg-[#EEF2F6] rounded-full flex justify-center items-center cursor-pointer transition-colors'
              >
                <img src="/images/icons/arrow-right-blackk.svg" className="w-6 h-6" alt="arrow" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
      
      <Edit_CategoryPage
        open={openEditCategory}
        setOpen={setOpenEditCategory}
        categoryID={selectCategoryID}
      />
    </>
  )
}

export default Card