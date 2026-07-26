'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Edit_price({open , setOpen}) {
  const {t} = useTranslation()
  
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* header */}
        <section className="flex justify-start px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
        </section>
        
        <p className='text-[#364152] text-xl font-medium  text-center'>{t('Adjusting the product price')}</p>

        <div className='p-6'>

          {/* */}
          <div className='w-full flex flex-col gap-1'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-sm  mb-1.5'>
                <span className='text-[#364152] font-medium'>{t('the price')}  </span>
                <span className=' text-[#697586] font-normal'>({t('pound')}) </span>
              </span>  
            </p>  
            <input 
              type="number"
              name='title'
              placeholder='0.00'
              className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
            />
          </div>

          <p className='text-sm text-[#9AA4B2] font-normal my-1'>{t('Enter 0 free add-ons')}</p>

          <div className='p-3 bg-[#F9F5E8] text-sm font-normal '> 
            <p className='text-[#B54708] mb-2'>{t('Note')} : </p> 
            <p className='text-[#DC6803]'>{t('This price will only apply if added and will not affect the original product price.')}</p>
          </div>

          {/* btn  */}
          <div className='w-full flex gap-4 my-4 '>
            <button
              className='w-full  bg-[var(--color-primary)] rounded-[3px]  px-4 py-2.5 cursor-pointer'
            >
              <p className='text-white text-base font-normal'>{t('save')}</p>
            </button>
            <button
              onClick={()=>setOpen(false)}
              className='w-full border border-[#CDD5DF] rounded-[3px]  px-4 py-2.5 cursor-pointer'
            >
              <p className='text-[#4B5565] text-base font-normal'>{t('cancel')}</p>
            </button>

          </div>

        </div>

      </Dialog>
    
    </>
  )
}

export default Edit_price