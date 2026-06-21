'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import SeatingDetails from './SeatingDetails'
import GuestInformation from './GuestInformation'

function DetailsBookingLoginPage({open , setOpen}) {
  const {t} = useTranslation()
  
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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Booking Login")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


      <div className='p-6'>
        
        <div className='border border-[#17B26A] bg-[#ECFDF3] p-4 flex gap-3 rounded-[3px] '>
          <div className='flex items-center'>
            <p className='w-10 h-10 bg-[#17B26A] rounded-full flex justify-center items-center '>
              <img src="/images/icons/checkmark-circle.svg" className="w-6 h-6" />
            </p>
          </div>
          

          <div className='flex flex-col gap-2'>
            <p className='text-[#364152] text-base font-medium'>{t('The code was successfully verified.')}</p>
              <p className='text-[#4B5565] text-sm font-normal'>{t('The booking was found')}</p>
          </div>


        


        </div>

        <GuestInformation />
        <SeatingDetails   />


        {/* btn */}
        <div className="w-full flex gap-3 mt-6">
          
          <button
            onClick={()=>setOpen(false)}
            className="w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer"
          >
            {t('cancel')}
          </button>

          <button
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('Successfully seated')}
          </button>
        </div>
      </div>

    </Dialog>
  )
}

export default DetailsBookingLoginPage