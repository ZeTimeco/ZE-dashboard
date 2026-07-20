'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Appointing_Driver({open , setOpen}) {
  const {t} = useTranslation()

  const StatusRender = (status) => {
    switch (status) {
      case "available": 
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9 rounded-3xl'>
          <div className='py-1.5 px-3'>
            <span className='text-sm font-normal'>{t('available')}</span>
          </div>
        </div>
        );
      case "busy": 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 '>
              <span className='text-xs font-normal flex items-center'>{t('busy')}</span>
            </div>
          </div>
        );
      }
  };

  const [selected, setSelected] = useState(false);
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
          <button 
            onClick={()=>setOpen(false)} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </button>
        </div>

        <div className='px-6'>
          <p className='text-[#364152] text-xl font-medium'>{t('Appointing a driver')}</p>
          <div className='py-6'>

            <div  
              onClick={() => setSelected(!selected)}
              className={`border  p-3 w-full rounded-[3px] flex flex-col gap-4 cursor-pointer transition-colors ${
                selected ? "bg-[#FFFDF5] border-[var(--color-primary)]" : "bg-white border-[#CDD5DF]"
              }`}
            >
              {/* status & name */}
              <div className='flex justify-between'>
                <p className='text-[#364152] text-base font-medium flex items-center'>أحمد محمد</p>
                <div>{StatusRender('available')}</div>
              </div>

              {/*  */}
              <div className='flex gap-8 mt-3'>
                {/* rate */}
                <p className='flex gap-1'>
                  <img src="/images/icons/star.svg" className="w-5 h-5" />
                  <span className='text-[#4B5565] text-sm font-normal flex items-center'>4.3</span>
                </p>

                {/* locat */}
                <p className='flex gap-1'>
                  <img src="/images/icons/location-gray2.svg" className="w-5 h-5" />
                  <span className='text-[#4B5565] text-sm font-normal flex items-center'>0.5 كم</span>
                </p>
                {/*  */}
                <p className='text-[#4B5565] text-sm font-normal flex items-center'>12 {t("Today's deliveries")}</p>
              </div>
            </div>

            
            <button className='bg-[#E3E8EF] text-[#9AA4B2] h-14 w-full mt-4 cursor-pointer rounded-[3px]'>{t('Confirmation of appointment')}</button>


          </div>
        </div>
      </Dialog>  
    </>
  )
}

export default Appointing_Driver