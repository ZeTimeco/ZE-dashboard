import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Under_ReviewPage({open, setOpen}) { 
  const { t } = useTranslation()
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
      <div className='pt-6 px-6'>
        <button onClick={() => setOpen(false)} className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'>
          <img src="/images/icons/xx.svg" alt="" />
        </button>
      </div>

      

      <div className="w-full h-px bg-[#CDD5DF] mt-6"></div>
    </Dialog>
    
    </>
  )
}

export default Under_ReviewPage