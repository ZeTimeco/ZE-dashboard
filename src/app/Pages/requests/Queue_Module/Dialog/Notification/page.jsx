"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function NotificationPage({open , setOpen , reservationData}) {
  const {t} = useTranslation()
  const [count, setCount] = useState("");
  return (
    <>  
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
        <div className="w-14 h-14 bg-[#EEF2F6] rounded-[100px] flex justify-center items-center">
          <p className="bg-[#E3E8EF] flex items-center justify-center w-10 h-10 rounded-[100px]">
            <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
          </p>
        </div>
      </section>

      <div className='p-6'>
        
        <section className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[3px] mb-4 flex gap-1'>
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>{reservationData?.guest_name}</p>
        </section>

        <section className="flex flex-col mb-3">
          <p className='text-sm font-medium mb-1.5'>
            <span className='text-[#364152] '>{t('message')} </span>
          </p>
          <div className="relative w-full">
            <textarea
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder={t("Write a brief description of the property.")}
              maxLength={500}
              className={`w-full h-50 border rounded-[3px] p-3 text-sm text-[#7d8d84] outline-none border-[#CDD5DF]`}
            />

            {/* counter */}
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              {count.length}/500
            </span>
          </div>
        </section>

        {/* btn */}
        <section className="w-full flex gap-3">
          
          <button
            onClick={()=>setOpen(false)}
            className="w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer"
          >
            {t('cancel')}
          </button>

          <button
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('send')}
          </button>
        </section>


      </div>
    </Dialog>
    
    
    </>
  )
}

export default NotificationPage