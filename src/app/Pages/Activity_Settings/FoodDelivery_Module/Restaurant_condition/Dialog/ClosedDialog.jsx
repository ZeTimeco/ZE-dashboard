'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function ClosedDialog({open , setOpen}) {
  const {t} = useTranslation()
  return (
    <>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          className: "!rounded-xl !p-6 !max-w-[360px] !w-full",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#FEE4E2]">
            <img
              src="/images/icons/cancel-circle-redd.svg"
              alt=""
              className="h-7 w-7"
            />
          </div>

          {/* Title */}
          <h2 className="mt-4 text-lg font-medium text-[#364152]">
            {t("Do you want to change the restaurant's status to closed?")}
          </h2>

          {/* Description */}
          <p className="mt-2 text-sm text-[#4B5565]">
          {t("The restaurant is not currently accepting new orders.")}
          </p>

          {/* Buttons */}
          <div className="mt-6 grid w-full grid-cols-2 gap-3">
            <button
              className="h-11 rounded-[3px] cursor-pointer bg-[var(--color-primary)] text-white font-medium transition hover:bg-[#b58d00]"
            >
              {t("confirmation")}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="h-11 rounded-[3px] cursor-pointer border border-[#D0D5DD] bg-white text-[#344054] font-medium transition hover:bg-gray-50"
            >
              {t("cancel")}
            </button>

          
          </div>
        </div>
      </Dialog>
      

    </>
  )
}

export default ClosedDialog