"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import Guest_InformationPage from './Guest_Information/page'
import Seating_detailsPage from './Seating_details/page'
import PaymentPage from './Payment/page'

function DetailsPage({open , setOpen , reservationData}) {
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

      <section className='p-6 flex flex-col gap-6'>
        <Guest_InformationPage/>
        <Seating_detailsPage/>
        <PaymentPage/>
      </section>


    </Dialog>

    </>
  )
}

export default DetailsPage