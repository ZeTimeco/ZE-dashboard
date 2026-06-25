'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Data from './Data'
import Edit_ItemsPage from '../Edit_Items/page'

function Details_Of_ItemsPage({open , setOpen}) {
  const {t} = useTranslation()
  const [openEditItem , setOpenEditItem] = useState()

  return (
    <>
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
          <p className="text-[#364152] text-2xl font-medium mb-3">{t("Item details")}</p>
          
        </section>
        <span className="border-[0.5px] border-[#E3E8EF]" />

        <div className='p-6'>
          <Data/>
        </div>

        <span className="border-[0.5px] border-[#E3E8EF] my-5" />

      {/* btn */}
      <div className='px-6 flex gap-4 mb-6'>
        <button onClick={()=>setOpenEditItem(true)}  className=' flex justify-center gap-3 w-[40%] bg-[var(--color-primary)] text-white text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('Service modification')} <img src="/images/icons/edit.svg" className="w-5 h-5" />
        </button>
        <button  className='w-[20%] border border-[#F04438] text-[#F04438] text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('delete')}
        </button>
        
      </div>


      </Dialog>
      
      <Edit_ItemsPage
        open={openEditItem}
        setOpen={setOpenEditItem}
      />
    </>
  )
}

export default Details_Of_ItemsPage