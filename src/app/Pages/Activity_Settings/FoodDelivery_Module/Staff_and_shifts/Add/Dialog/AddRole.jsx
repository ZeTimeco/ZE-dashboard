import { Dialog } from '@mui/material'
import { motion } from 'framer-motion';
import React from 'react'
import { useTranslation } from 'react-i18next'

function AddRole({open , setOpen}) {
  const {t} = useTranslation()
  const inputClassName =  "w-5 h-5 appearance-none border border-gray-300 rounded-full bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";  return (
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
            <p className='text-[#364152] text-xl font-semibold'>{t('Employee Role Selection')}</p>
          </div>

          <div className='border border-[#CDD5DF] my-4 '></div>


          <div className='flex flex-col gap-3 px-6 mb-6'>
            {/*  */}
            <div className='border border-[#E3E8EF] rounded-[3px] p-2 flex gap-3'>
              <p className='flex items-center'>
                <input type="checkbox" className={inputClassName} />
              </p>

              <p className='text-[#364152] text-base font-normal'>مدير مطعم</p>

            </div>
          </div>

          {/* btn */}
          <div className='px-6 mb-4'>
            <motion.button
              className="bg-[var(--color-primary)] h-15 w-full rounded-[3px] text-white text-base font-normal cursor-pointer"
              whileHover={{ y: -1  }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {t('save')}
            </motion.button>
          </div>

        </Dialog>
    
    </>
  )
}

export default AddRole