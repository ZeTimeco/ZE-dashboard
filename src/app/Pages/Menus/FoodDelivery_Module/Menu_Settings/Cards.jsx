'use client'
import { getCategoriesListThunk, toggleVisibilityThunk } from '@/redux/slice/Menus/MenusSlice'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

function Cards({ getCategoriesList, currentPage = 1 }) {
  const {t} = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()

  const handleToggleVisibility = async (categoryId) => {
    try {
      await dispatch(toggleVisibilityThunk(categoryId)).unwrap();
      dispatch(getCategoriesListThunk(currentPage));
    } catch (error) {
      console.error(error);
    }
  };

  const StatusRender = (status) => {
    switch (status) {
      case 1: 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-7.5 rounded-full flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2'>
              <span className='text-xs lg1:text-sm font-normal'>{t('Visible to customers')}</span>
            </div>
          </div>
        );

      case 0: 
        return (
          <div className='bg-[#EEF2F6] border border-[#697586] text-[#697586] w-fit h-7.5 rounded-full flex items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2'>
              <span className='text-xs lg1:text-sm font-normal'>{t('Hidden')}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  }

  return (
    <>
      {getCategoriesList?.data?.map((category, index)=>(
        <motion.div 
          key={category.id} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.2) }}
          whileHover={{ y: -2, boxShadow: "0 6px 16px -2px rgba(0,0,0,0.08)" }}
          className='group border border-[#CDD5DF] hover:border-[#9AA4B2] bg-white rounded-[3px] p-4 transition-all duration-200'
        >
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-[#364152] text-base font-medium group-hover:text-[var(--color-primary)] transition-colors duration-150'>{category?.name}</p>
              <p className='text-[#4B5565] text-sm font-normal mt-0.5'>{category?.items_count} {t('Product')}</p>
            </div>
            <div className='flex gap-3'>
              {category?.is_visible === 1 ? (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggleVisibility(category.id)}
                  className="w-8 h-8 bg-[#DCFAE6] hover:bg-[#C8F5D6] rounded-[3px] flex justify-center items-center cursor-pointer transition-colors duration-150"
                >
                  <img src="/images/icons/eye_Green.svg" className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleToggleVisibility(category.id)}
                  className="w-8 h-8 bg-[#EEF2F6] hover:bg-[#E2E8F0] rounded-[3px] flex justify-center items-center cursor-pointer transition-colors duration-150"
                >
                  <img src="/images/icons/eye_Close_gray.svg" className="w-5 h-5" />
                </motion.button>
              )}

              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Menu_Settings/Edit?id=${category?.id}`)}
                className="w-8 h-8 bg-[#F4EAD0] hover:bg-[#EBDEBE] rounded-[3px] flex justify-center items-center cursor-pointer transition-colors duration-150"
              >
                <img src="/images/icons/EditYellow.svg" className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          <div className='border border-[#E3E8EF] my-3'></div>

          <div>
            {StatusRender(category?.is_visible)}
          </div>
        </motion.div>
      ))}
    </>
  )
}

export default Cards