'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from './Details/page';
import { IMAGE_BASE_URL } from '../../../../../../config/imageUrl';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

function Product({getMenus}) {
  const {t} = useTranslation()
  const searchParams = useSearchParams()
  const search = searchParams.get('search') || ''
  
  const [open, setOpen] = useState(false);
  const [openDetails , setOpenDetails] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  return (
    <>
      {getMenus?.categories?.map((category, catIndex)=>{
        const isCategoryOpen = open === category.id || (search && category?.items?.length > 0)

        return (
          <motion.div 
            key={category?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(catIndex * 0.04, 0.2) }}
            className="shadow-[0_0_2px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px] bg-white"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <p className="bg-[#F4EAD0] text-[var(--color-primary)] text-xs w-5 h-5 rounded-full flex justify-center items-center font-medium">
                  {category?.items_count}
                </p>
                <p className="text-[#364152] text-lg font-medium">{category?.name}</p>
                {category?.unavailable_count === 0 ? null :(
                  <p className="border border-[#F97066] bg-[#FEE4E2] rounded-full px-2 py-0.5 text-[#D92D20] text-xs font-normal">
                    {category?.unavailable_count} {t("Not available")}
                  </p>            
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setOpen(isCategoryOpen ? null : category.id)}
                className="cursor-pointer p-1"
              >
                <img
                  src="/images/icons/ArrowDown_gray.svg"
                  alt=""
                  className={`transition-transform duration-300 ${
                    isCategoryOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </motion.button>
            </div>

            {/* Dropdown Items */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden p-2 mt-4"
                >            
                  {category?.items?.map((item)=>(
                    <motion.div 
                      key={item?.id}
                      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => {
                        setSelectedProductId(item.id);
                        setOpenDetails(true);
                      }}
                      className="group shadow-[0_0_2px_0_rgba(0,0,0,0.2)] bg-white border border-transparent hover:border-[#E3E8EF] p-3 rounded-[3px] mb-4 cursor-pointer transition-all duration-200"
                    >
                      <div className='flex justify-between items-center w-full'>
                        <div className='flex items-center gap-4 w-full'>
                          <p className='bg-[#F9F5E8] w-13.5 h-12 flex items-center justify-center rounded-[3px] overflow-hidden shrink-0'>
                            {item?.image === null ? (
                              <img src="/images/burger.svg" alt="" className="transition-transform duration-200 group-hover:scale-105" />
                            ):(
                              <img src={`${IMAGE_BASE_URL}${item?.image}`} className='w-10 h-10 object-cover transition-transform duration-200 group-hover:scale-105'/>
                            )}
                          </p>
                          <div>
                            <p className='text-[#364152] text-base font-normal group-hover:text-[var(--color-primary)] transition-colors duration-150'>{item?.name}</p>
                            <p className='text-[var(--color-primary)] text-base font-semibold'>{item?.base_price} {t('pound')}</p>
                          </div>
                        </div>

                        <div className='w-full flex flex-col items-end gap-2'>
                          {item?.status === 'active' ? (
                            <p className="border border-[#067647] bg-[#DCFAE6] rounded-full h-7 w-15 flex justify-center items-center text-[#067647] text-xs font-normal">  
                              {t("available")} 
                            </p>
                          ):(
                            <p className="border border-[#F97066] bg-[#FEE4E2] rounded-full h-7 w-15 flex justify-center items-center text-[#D92D20] text-xs font-normal">  
                              {t("Not available")} 
                            </p>
                          )}
                          
                          <p className='text-[#4B5565] text-xs font-normal'>
                            {item?.is_visible ? t('visible to customers') : null}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}

      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
        itemId={selectedProductId}
      />
    </>
  )
}

export default Product