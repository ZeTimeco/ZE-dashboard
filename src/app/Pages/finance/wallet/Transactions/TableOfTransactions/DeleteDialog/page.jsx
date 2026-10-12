"use client"
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function DeleteDialogPage({open , setOpen, transactionId, onDelete}) {
  const {t} = useTranslation()

  const handleDelete = () => {
    if (transactionId && onDelete) {
      onDelete(transactionId);
      setOpen(false);
    }
  }

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "ServicePage-dialog" }}
    >
    
      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={()=>{setOpen(false)}}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      
      </section>

      <section className='flex flex-col gap-5 items-center justify-center mb-4'>
          {/* icon */}
          <div className='bg-[#FEF3F2] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center '>
            <div className='bg-[#FEE4E2] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/xxx.svg" className="w-7.5 h-7.5"  />
            </div>
          </div>

          {/* title */}
          <p className='text-[#0F022E] text-xl font-semibold'>{t('Are you sure you want to delete the transaction?')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('This transaction will be permanently deleted and cannot be recovered later.')}</p>
      </section>

      <div className='border border-[#CDD5DF] my-4'></div>

      <div className='flex gap-3 my-4 px-6 font-medium text-base'>
        <button 
          onClick={handleDelete}
          className='bg-[#D92D20] text-white w-full py-2.5 px-4 rounded-3px h-14 cursor-pointer '
        >
          {t('delete')}
        </button>
        <button className=' border border-[#697586] text-[#4B5565] w-full py-2.5 px-4 rounded-3px h-14 cursor-pointer'
          onClick={()=>{setOpen(false)}}>{t('cancel')}</button>
      </div>
    </Dialog>
    
    </>
  )
}

export default DeleteDialogPage