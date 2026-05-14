"use client"
import { changeEmailThunk } from '@/redux/slice/Setting/SettingSlice';
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function EmailDialogPage({openEmail , setOpenEmail , setOpenOtpEmail ,email , setEmail ,dispatch  }) {
  const {t}= useTranslation();
  
  const HandleOtpEmail =()=>{
    dispatch(changeEmailThunk({email}))
    setOpenEmail(false);
    setOpenOtpEmail(true)
  }
  return (
    <>
      <Dialog
        open={openEmail}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <div className='pt-6 px-6 '>
          <button 
            onClick={()=>setOpenEmail(false)} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center cursor-pointer'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </button>
        </div>

        <div className="flex flex-col gap-3 items-center justify-center mb-8">
          {/* icon */}
          <div className="bg-[#EEF2F6] w-17.5 h-17.5 rounded-full flex items-center justify-center mb-1.5">
            <div className="bg-[#CDD5DF] w-12.5 h-12.5 rounded-full flex items-center justify-center">
              <img
                src="/images/icons/emailotp.svg"
                className="w-7.5 h-7.5"
                alt="email icon"
              />
            </div>
          </div>

          {/* title */}
          <p className="text-[var(--color-primary)] text-xl font-bold">
            {t('Change email')}
          </p>
          <p className='w-[60%] text-[#656565] text-lg font-normal text-center'> 
            {t('You can change and reconfirm your email address via a one-time verification code (OTP).')}
          </p>
        </div>

        <div className="px-6">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal">
              {t('New email')}
            </label>
            <input
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder={t('Enter your new email address')}
              className="h-15 p-3 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal"
            />
          </div>

          <div className="my-6 flex gap-3">
            <button 
              onClick={HandleOtpEmail}
              className="w-full h-15 bg-[var(--color-primary)] text-white cursor-pointer rounded-[3px] flex justify-center items-center">
              {t('send')}
            </button>

            <button 
              onClick={()=>setOpenEmail(false)}
              className="w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center">
              {t('cancel')}
            </button>
          </div>
        </div>

      </Dialog>


    </>
  
  )
}

export default EmailDialogPage