import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Disable({open , setOpen}) {
  const {t} = useTranslation()
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

        <div className='px-6 flex flex-col gap-2 items-center mt-6'>
          <img src="/images/error.svg" alt="" />
          <p className='text-[#4B5565] text-base font-medium'>{t("Are you sure you've disabled this employee? They won't be able to access the system.")}</p>
          <p className='text-[#364152] text-lg font-semibold'>أحمد محمد السالم</p>
        </div>

        {/* btn */}
        <div className='flex gap-2 w-full p-6'>
          <button className='w-full  bg-[#B42318] text-[white] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('Disable')}
          </button>

          <button
            onClick={() => setOpen(false)}
            className='w-full border border-[#CDD5DF] text-[#4B5565] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'
          >
            {t('cancel')}
          </button>
        </div>



      </Dialog>
    
    </>
  )
}

export default Disable