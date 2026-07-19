'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import OrderPage from './Order/page'
import Products_RequestedPage from './Products_Requested/page'
import Delivery_DetailsPage from './Delivery_Details/page'
import Price_SummaryPage from './Price_Summary/page'

function DetailsPage({open , setOpen ,id}) {
  const {t} = useTranslation()
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>

      {/* title */}
      <section className="my-4 flex px-6 justify-between  ">
        <div className='flex flex-col gap-3  '>
          <p className="text-[#364152] text-xl font-medium ">
            {t("Order details")}
          </p>
          <p className="text-[#4B5565] text-sm font-normal ">
            {t("Full details explaining the status and contents of the order")}
          </p>
        </div>

        <div className=' flex items-center '>
          <button
            className='flex gap-2 border border-[var(--color-primary)] rounded-[3px]  px-4 py-2.5 cursor-pointer'
          >
            <img src="/images/icons/Activity log.svg" className="w-6 h-6" />
            <p className='text-[var(--color-primary)] text-base font-normal'>{t('Activity log')}</p>
          </button>

        </div>
      </section>

      <span className="border-[0.5px] border-[#E3E8EF]" />

      <section className='p-6 flex flex-col gap-4'>
        <OrderPage/>
        <Products_RequestedPage/>
        <Delivery_DetailsPage/>
        <Price_SummaryPage/>

      </section>
    </Dialog>
  )
}

export default DetailsPage