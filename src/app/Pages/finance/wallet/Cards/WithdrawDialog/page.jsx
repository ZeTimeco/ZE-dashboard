"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function WithdrawDialogPage({open , setOpen}) {
  const {t} = useTranslation()
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >

      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={()=>{setOpen(false)}}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      
      </section>

      <section className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/credit-card-black.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-primary text-xl font-bold'>{t('withdrawal request')}</p>

        </section>

        <form action="" className=' px-6 '>
            {/* Email */}
            <div className="flex flex-col">
              <label className="text-[#364152] text-base font-normal">{t('Enter the amount')}</label>
              <input 
                type="text" 
                placeholder={t('Enter the amount')}
                className="h-15 p-3 rounded-3px border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal" />
            </div>

            {/* note */}
            <div className='bg-[#EEF2F6] p-3 mt-6'>
              <ul className='list-disc pr-5 text-[#775B0D] text-sm font-normal'>
                <li className=' mb-2'>{t('The maximum amount that can be withdrawn is (225 Egyptian pounds).')}</li>
                <li>{t('Upon acceptance of the withdrawal, the transfer will be made on the 1st and 15th of the month.')}</li>
              </ul>
            </div>

            <div className='my-6 '>
              <button className='w-full h-15 bg-primary text-white cursor-pointer rounded-3px flex justify-center items-center '>
                {t('confirmation')}
              </button>
            </div>
        </form>

        

    </Dialog>
  )
}

export default WithdrawDialogPage