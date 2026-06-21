"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function DelayPage({open , setOpen }) {
  const{t} = useTranslation()
  const [ message , setMessage] = useState('')


  return (
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
      <section className="mt-4 px-6">
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Guest delay")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


      {/*  */}

        <div className='p-6'>
        
        <section className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[3px] mb-4 flex gap-1'>
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>احمد سعيد</p>
        </section>

      
        {/*Delay period  */}
        <div className='mt-4'>
          <p className=' font-normal'>
            <span className='text-[#364152] text-base'>{t('Delay period')}</span> 
          </p>
          
          <div className='grid grid-cols-2 gap-4 my-1.5'>
            <div className=' border border-[#E3E8EF] py-2.5 px-2 flex gap-2 justify-center items-center rounded-[3px]'>
              <img src="/images/icons/clock-gray.svg" alt="" />
              <p className='text-[#364152] text-base font-normal'>5 دقائق</p>
            </div>
            
          </div>

        </div>

        {/*the reason */}
        <div className='mt-4'>
          <p className=' font-normal'>
            <span className='text-[#364152] text-base'>{t('the reason')}</span> 
          </p>
          
          <div className='grid grid-cols-1 gap-4 my-1.5'>
            <div className=' border border-[#E3E8EF] py-2.5 px-2 flex  items-center rounded-[3px]'>
              <p className='text-[#364152] text-base font-normal'>الاطلالة علي الحديقة</p>
            </div>
          </div>

        </div>




        {/* btn */}
        <section className="w-full flex gap-3 mt-6">
          
          <button
            onClick={()=>setOpen(false)}
            className="w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer"
          >
            {t('cancel')}
          </button>

          <button
          
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('Delay confirmed')}
          </button>
        </section>


      </div>


    </Dialog>
  )
}

export default DelayPage