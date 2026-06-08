import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Form from './Form'

function EditPage({open , setOpen}) {
  const{t} = useTranslation()

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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Edit a look")}</p>
        <p className="text-[#4B5565] text-xl font-normal mb-5">
          {t("Configuring appearance settings")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/*  */}
      <Form/>
      <div className='px-6'>
        <button className=' bg-[var(--color-primary)] text-white w-full text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
          {t('Save changes')}
        </button>
      </div>
    
    </Dialog>
      
    </>
  )
}

export default EditPage