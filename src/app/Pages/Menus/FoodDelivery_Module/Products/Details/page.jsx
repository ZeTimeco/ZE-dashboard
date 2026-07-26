'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import { useRouter } from 'next/navigation'

function DetailsPage({open , setOpen}) {
  const {t} = useTranslation()
  const router = useRouter()
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      
      <p className='text-[#364152] text-xl font-medium px-6'>{t('Product details')}</p>
      <div className='border border-[#CDD5DF] my-5'></div>

      <div className='px-6'>
        <FirstSection/>
        <SecondSection/>
      </div>

        {/* btn */}
      <div className='px-6 grid grid-cols-2 gap-6 mb-6'>

        <button onClick={()=>setOpen(false)} className='border border-[var(--color-primary)] text-[var(--color-primary)] w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('cancel')}
        </button>

        <button 
          onClick={()=>{router.push(`/Pages/Menus/FoodDelivery_Module/Products/Edit`)}}
          className='bg-[var(--color-primary)] text-white w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('modification')}
        </button>

      </div>
      

    </Dialog>
      

    </>
  )
}

export default DetailsPage