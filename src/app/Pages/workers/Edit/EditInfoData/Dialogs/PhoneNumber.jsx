"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function PhoneNumber({openPhoneNumber , setOpenPhoneNumber ,worker}) {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.workers);

  const [phone , setPhone] = useState();
  const [countryCode, setCountryCode] = useState("eg");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('id', worker?.id);
    formData.append('phone', phone);
    formData.append('country_code', countryCode);
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenPhoneNumber(false);
    }
  };

  useEffect(()=>{
    if(worker?.phone){
      setPhone(worker?.phone)
    }

    if(worker?.country_code){
      setCountryCode(worker?.country_code)
    }
  } , [worker , openPhoneNumber])

  return (
    <>
      <Dialog 
        open={openPhoneNumber} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button className='pt-8 px-6 pb-2 cursor-pointer flex justify-end w-full' onClick={()=>setOpenPhoneNumber(false)}>
          <span className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors'>
            <img src="/images/icons/xx.svg" alt="" className="transition-transform duration-200 hover:rotate-90" />
          </span>
        </button>
        
        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center shadow-xs'>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/call-received.svg" className="w-7.5 h-7.5" alt="" />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Change mobile number')}</p>
        </div>

        <div className='px-6'>
          {/* Mobile number */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3 block">
              {t("Mobile number")}
            </label>

            <div className="relative">
              <PhoneInput
                country={countryCode}
                value={phone}
                onChange={(value , country)=>{
                  setPhone(value);
                  setCountryCode(country?.countryCode);
                }}      
                placeholder="000000000"
                containerClass="!w-full"
                inputClass="!w-full !h-[60px] !border !border-[#9AA4B2] !rounded-[3px] !pl-24 !text-left !shadow-sm !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
                buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
                dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !border !border-[#C8C8C8] !rounded-md !shadow-sm"
              />
            </div>
          </div>

          <div className='my-6 flex gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className='w-full h-15 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[3px] flex justify-center items-center disabled:opacity-50 font-medium shadow-xs transition-all'
            >
              {loading ? t('loading...') : t('save')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpenPhoneNumber(false)} 
              className='w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center font-medium transition-colors'
            >
              {t('cancel')}
            </motion.button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default PhoneNumber