'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Details_Of_ItemsPage from '../Details_Of_Items/page'
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

function Card({ item, selectedCategoryId, index = 0 }) {
  const {t} = useTranslation()
  const [openDetailsItem , setOpenDetailsItem] = useState(false)
  const [selectItemID , setSelectItemID] = useState(null)

  return (
    <>
      <motion.div 
        custom={index}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={{
          y: -3,
          boxShadow: '0 8px 24px 0 rgba(0,0,0,0.08)',
          transition: { duration: 0.2 },
        }}
        className='group shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-[3px] pt-4 px-4 pb-3 bg-white border border-transparent hover:border-slate-200 transition-all duration-300'
      >
        <div className='flex justify-between items-center'>
          <div className='flex gap-3 items-center'>
            <div className='pb-1 overflow-hidden rounded-[3px]'>
              <img 
                src={item?.image ? `${IMAGE_BASE_URL}${item.image}` : "/images/P.p.svg"} 
                className="w-25 h-20 object-cover transition-transform duration-300 group-hover:scale-105" 
                alt={item?.name} 
              />
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-[#364152] text-xl font-normal group-hover:text-slate-900 transition-colors'>{item?.name}</p>
              <p className='text-[var(--color-primary)] text-lg font-medium'>{item?.base_price} {t('EGP')}</p>
            </div>
          </div>
          <div className='flex items-center'>
            {/* details */}
            <motion.button 
              type="button"
              whileHover={{ scale: 1.1, backgroundColor: '#E2E8F0', transition: { duration: 0.15 } }}
              whileTap={{ scale: 0.92, transition: { duration: 0.1 } }}
              onClick={()=>{
                setOpenDetailsItem(true)
                setSelectItemID(item.id)
              }}  
              className='w-8 h-8 bg-[#EEF2F6] rounded-full flex justify-center items-center cursor-pointer transition-colors'
            >
              <img src="/images/icons/arrow-right-blackk.svg" className="w-6 h-6" alt="arrow" />
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      <Details_Of_ItemsPage
        open={openDetailsItem}
        setOpen={setOpenDetailsItem}
        itemID={selectItemID}
        selectedCategoryId={selectedCategoryId}
      />
    </>
  )
}

export default Card