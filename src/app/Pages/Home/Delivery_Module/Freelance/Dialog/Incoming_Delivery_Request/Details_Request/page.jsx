"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'

function Details_RequestPage({open, setOpen}) { 
  const { t } = useTranslation()

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      <div className='pt-6 px-6 flex justify-end'>
        <button onClick={() => setOpen(false)} className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-full flex justify-center items-center'>
          <img src="/images/icons/xx.svg" alt="" />
        </button>
      </div>

      <div className='px-6 fllex flex-col gap-1'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Incoming delivery request')}</p>
        <p className='text-[#666B6D] text-base font-normal'>{t('Review the details and submit your offer.')}</p>
      </div>
      <div className="w-full h-px bg-[#CDD5DF] my-6"></div>

      <div className='flex flex-col gap-3 px-6 pb-6'>
        <FirstSection/>
        <SecondSection/>
        <ThirdSection/>
      </div>
      
    </Dialog>
    
    </>
  )
}

export default Details_RequestPage