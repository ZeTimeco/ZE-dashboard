'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Details_Of_ItemsPage({open , setOpen}) {
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

        <div>
          Details_Of_ItemsPage
        </div>
      </Dialog>
      

    </>
  )
}

export default Details_Of_ItemsPage