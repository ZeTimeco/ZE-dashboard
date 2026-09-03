"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import AddPage from '@/app/Pages/Pending_List/Add/page'

function QuickProceduresPage({getcounters}) {
  const {t} = useTranslation()
  const router = useRouter()
  const [openAdd, setOpenAdd] = useState(false)

  return (
    <>
    <div className='border border-[#CDD5DF] rounded-3px p-4 mb-10 mt-10 bg-white transition-shadow duration-300'>
      <p className='text-[#364152] text-xl font-medium mb-4'>{t('Quick procedures')}</p>

      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        <motion.button   
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={()=>router.push(`/Pages/Menus`)} 
          className='group flex flex-col gap-2 border border-[#E4E7EC] hover:border-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-3px p-4 items-center transition-all duration-200 active:border-[var(--color-primary)] cursor-pointer bg-white'
        >
          <img src="/images/icons/menu-square.svg" alt="" className='w-6 h-8 transition-transform duration-200 group-hover:scale-110' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-primary group-active:text-primary transition-colors duration-200'>{t('Menu and Prices')}</p>
        </motion.button>

        <motion.button   
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={()=>router.push(`/Pages/Halls/Views/Layout?id=${getcounters?.main_hall_id}`)} 
          className='group flex flex-col gap-2 border border-[#E4E7EC] hover:border-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-3px p-4 items-center transition-all duration-200 active:border-[var(--color-primary)] cursor-pointer bg-white'
        >         
          <img src="/images/icons/restaurant-yellow.svg" alt="" className='w-8 h-8 transition-transform duration-200 group-hover:scale-110' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-primary group-active:text-primary transition-colors duration-200'>{t('Hall layout')}</p>
        </motion.button>

        <motion.button   
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={()=>setOpenAdd(true)} 
          className='group flex flex-col gap-2 border border-[#E4E7EC] hover:border-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-3px p-4 items-center transition-all duration-200 active:border-[var(--color-primary)] cursor-pointer bg-white'
        >
          <img src="/images/icons/add-circle.svg" alt="" className='w-6 h-8 transition-transform duration-200 group-hover:scale-110' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-primary group-active:text-primary transition-colors duration-200'>{t('Add booking')}</p>
        </motion.button>

        <motion.button   
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.2 }}
          onClick={()=>router.push(`/Pages/Halls/Hall`)} 
          className='group flex flex-col gap-2 border border-[#E4E7EC] hover:border-primary hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] rounded-3px p-4 items-center transition-all duration-200 active:border-[var(--color-primary)] cursor-pointer bg-white'
        >
          <img src="/images/icons/dish-yellow.svg" alt="" className='w-8 h-8 transition-transform duration-200 group-hover:scale-110' />
          <p className='text-[#2C2C2C] text-base font-normal group-hover:text-primary group-active:text-primary transition-colors duration-200'>{t('Halls')}</p>
        </motion.button>
      </div>
    </div>

    <AddPage open={openAdd} setOpen={setOpenAdd} />
    </>
  )
}

export default QuickProceduresPage
