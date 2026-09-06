'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function EmptyData() {
  const {t} = useTranslation()
  const router = useRouter()
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='flex flex-col items-center justify-center mt-15'
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        src="/images/requestEmpty.svg"
        alt=""
        className="select-none"
      />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No products")}</p>
      <p className='text-[#697586] text-xl font-normal text-center'>{t('Create add-ons that allow customers to add them to their products.')}</p>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Products/Add`)}
        className='flex justify-center items-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[3px] my-6 cursor-pointer hover:opacity-95 hover:shadow-md transition-all duration-200'
      >
        <p className='text-base flex items-center'>{t("Add a new product")}</p>
        <img src="/images/icons/AddIcon.svg" alt="" />
      </motion.button>
    </motion.div>
  )
}

export default EmptyData