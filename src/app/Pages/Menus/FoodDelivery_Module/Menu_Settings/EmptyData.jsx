'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function EmptyData() {
  const {t} = useTranslation()
    const router = useRouter()
  
  return (
    <>
        
        
    <div className='flex flex-col items-center justify-center  mt-15'>
      <img src="/images/requestEmpty.svg" alt="" />
      <p className='text-[#4B5565] text-2xl font-semibold mt-6 mb-4'>{t("No categories")}</p>
      <p className='text-[#697586] text-xl font-normal '>{t('Add new categories now to allow your customers to customize their products.')}</p>
      <button onClick={()=>router.push(`/Pages/Menus/FoodDelivery_Module/Menu_Settings/Add`)} className='flex justify-center gap-2 bg-[var(--color-primary)] text-white px-4 py-2.5 h-14 w-[25%] rounded-[3px] my-6 cursor-pointer'>
        <p className='text-base flex items-center'>{t("Add a new category")} </p>
        <img src="/images/icons/AddIcon.svg" alt="" />
      </button>
    </div>
    </>
  )
}

export default EmptyData