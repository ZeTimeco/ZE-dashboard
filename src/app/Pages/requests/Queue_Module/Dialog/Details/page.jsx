"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import Guest_InformationPage from './Guest_Information/page'
import Seating_detailsPage from './Seating_details/page'
import PaymentPage from './Payment/page'
import { useTranslation } from 'react-i18next'

function DetailsPage({open , setOpen , reservationData}) {
  const {t} = useTranslation()


  return (
    <>
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
      <section className='px-6 mb-4'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Booking details')}</p>
      </section>

      <span className="border-[0.5px] border-[#E3E8EF]" />


      <section className='p-6 flex flex-col gap-6'>
        <Guest_InformationPage/>
        <Seating_detailsPage/>
        <PaymentPage/>
      </section>

        <div className='px-6 pb-6 flex gap-3'>
          <button 
            className=' w-[40%] h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer '
          >
            {t('Booking confirmation')}
          </button>

          <button 
            className=' w-[20%] h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer '
          >
            {t('reject')}
          </button>
          
        </div>

    </Dialog>

    </>
  )
}

export default DetailsPage