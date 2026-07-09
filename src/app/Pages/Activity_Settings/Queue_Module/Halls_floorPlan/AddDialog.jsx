import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddDialog({open , setOpen , handleAddTag , dataSend , setDataSend , currentLang}) {
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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Add a new Tag/logo")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />


        {/* form*/}
        <div className='px-6 py-4'>
          <div className='w-full flex flex-col gap-1'>
            <p className='text-base font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('Tag name / logo')}</span>
            </p>  
            <input 
              type="text"
              name='title'
              value={dataSend.name[currentLang]}
              onChange={(e) =>
                setDataSend((prev) => ({
                  ...prev,
                  name: {
                    ...prev.name,
                    [currentLang]: e.target.value,
                  },
                }))
              }
              placeholder={t("Tag name / logo")}
              className={`w-full h-14  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
            />
          </div>

        </div>

        {/* btn */}
        <div className='px-6 flex gap-4 mb-6'>
          
          <button onClick={()=>setOpen(false)} className='w-full border border-[#F04438] text-[#F04438] text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('cancel')}
          </button>
          <button onClick={handleAddTag}  className=' w-full bg-[var(--color-primary)] text-white text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('save')}
          </button>
          
        </div>
        
    </Dialog>

    </>
  )
}

export default AddDialog