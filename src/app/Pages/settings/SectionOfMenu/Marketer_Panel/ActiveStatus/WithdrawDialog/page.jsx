"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

function WithdrawDialogPage({ open, setOpen }) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
      
      {/* Close */}
      <section className="flex justify-between px-6 mt-8 mb-4">
        <button
          onClick={() => setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="close" className="w-6 h-6" />
        </button>
      </section>

      <div className=' flex justify-center mb-8'>
        <p className='text-[#0F022E] text-2xl font-medium'>{t('withdrawal request')}</p>
      </div>

      <section className='px-6'>
        <p className='text-[#364152] text-sm font-normal mb-1.5'>{t('Enter the amount')}</p>
        <input type="text" className='border border-[#C8C8C8] rounded-[3px] p-3 h-14 w-full outline-none'/>
      </section>

      <section className='px-6 my-6 '>
        <div className='bg-[#EEF2F6] rounded-[3px] px-6'>
          <ul className='list-disc text-[#775B0D] text-sm font-normal p-3'>
            <li className='mb-2'>{t('The maximum amount that can be withdrawn is')} ( 225 جنية )</li>
            <li>{t('Upon acceptance of the withdrawal, the transfer will be made on the 1st and 15th of the month.')}</li>
          </ul>
        </div>
        
      </section>


      <section className='px-6'>
        <button className='bg-[var(--color-primary)] text-white rounded-[3px] py-3 px-4 w-full h-14  mb-8 cursor-pointer '>
          {t('confirmation')}
        </button>
      </section>

      
    </Dialog>
  )
}

export default WithdrawDialogPage