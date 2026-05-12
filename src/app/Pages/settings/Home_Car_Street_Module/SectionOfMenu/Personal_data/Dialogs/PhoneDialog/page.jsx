"use client"
import { changePhoneThunk } from '@/redux/slice/Setting/SettingSlice';
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';


function PhoneDialogPage({openPhone, setOpenPhone ,setOpenOtpPhone ,phone ,setPhone ,countryCode , setCountryCode ,dispatch}) {
  const {t}= useTranslation();

  const handleSend =()=>{
    dispatch(changePhoneThunk({ phone, country_code: countryCode }))
    setOpenPhone(false)
    setOpenOtpPhone(true)
  }

  return (
    <>
    <Dialog
      open={openPhone}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
        <div className='pt-6 px-6 '>
          <button 
            onClick={()=>setOpenPhone(false)} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center cursor-pointer'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </button>
        </div>

        <div className="flex flex-col gap-5 items-center justify-center mb-8">
          {/* icon */}
          <div className="bg-[#EEF2F6] w-17.5 h-17.5 rounded-full flex items-center justify-center">
            <div className="bg-[#CDD5DF] w-12.5 h-12.5 rounded-full flex items-center justify-center">
              <img
                src="/images/icons/call-received.svg"
                className="w-7.5 h-7.5"
                alt="phone icon"
              />
            </div>
          </div>

          {/* title */}
          <p className="text-[var(--color-primary)] text-xl font-bold">
            {t('Change mobile number')}
          </p>

          <p className='w-[60%] text-[#656565] text-lg font-normal text-center'> 
            {t('You can change and reconfirm your email address via a one-time verification code (OTP).')}
          </p>
        </div>

        <div className="px-6">
          {/* Mobile number */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3 block">
              {t('Mobile number')} 
            </label>

            <div className="relative">
              <PhoneInput
              country={'eg'}
                value={`${countryCode}${phone}`}
                onChange={(value, country) => {
                  setCountryCode(`+${country.dialCode}`);
                  setPhone(value.replace(country.dialCode, ''));
                }}
                placeholder="000000000"
                containerClass="!w-full"
                inputClass="!w-full !h-[60px] !border !border-[#9AA4B2] !rounded-[3px] !pl-24 !text-left !shadow-sm !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
                buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
                dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !border !border-[#C8C8C8] !rounded-md !shadow-sm"
              />
            </div>
          </div>

          <div className="my-6 flex gap-3">
            <button
              onClick={handleSend}
              className="w-full h-15 bg-[var(--color-primary)] text-white cursor-pointer rounded-[3px] flex justify-center items-center"
            >
              {t('send')}
            </button>

            <button
              onClick={()=>setOpenPhone(false)}
              className="w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center"
            >
              {t('cancel')}
            </button>
          </div>
        </div>

    </Dialog>


    </>
    
  )
}

export default PhoneDialogPage