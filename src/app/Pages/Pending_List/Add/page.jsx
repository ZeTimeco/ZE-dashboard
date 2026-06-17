'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'

function AddPage({open , setOpen}) {
    const{t} = useTranslation()
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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add a new guest")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">
          {t("Enter guest details")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/*  */}
      <Form/>

      {/* btn */}
      <div className='px-6 grid grid-cols-2 gap-6 mb-6'>
        <button onClick={()=>setOpen(false)} className='border border-[var(--color-primary)] text-[var(--color-primary)] w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('cancel')}
        </button>
        <button className=' bg-[#E3E8EF] text-[#9AA4B2] w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('Add to the queue')}
        </button>
      </div>

    </Dialog>
  )
}

export default AddPage