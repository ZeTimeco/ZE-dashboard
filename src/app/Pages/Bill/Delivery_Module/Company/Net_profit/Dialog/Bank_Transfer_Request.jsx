import { Dialog } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Bank_Transfer_Request({open , setOpen}) {
  const {t} = useTranslation()

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* Header */}
        <div className="flex justify-start px-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </motion.button>
        </div>

        <div className="px-6 my-6 flex flex-col gap-4">
          <div className=" flex flex-col items-center gap-2 ">
            <p className='text-[#364152] text-2xl font-semibold'>{t('bank transfer request')}</p>
            <p className='text-[#697586] text-xl font-normal'>{t("About the company's net profit")}</p>
          </div>

          <div className='border border-[#F5DFA3] bg-[#FDF7E8] p-4 mt-4 rounded-3px flex flex-col items-center gap-1'>
            <p className='text-[#3B3B3B] text-base  font-medium'>{t('Transferable balance')}</p>
            <p className='text-primary text-xl font-semibold'>1,284.50  {t('pound')}</p>
          </div>

          <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-3'>
            <div className='flex justify-between'>
              <p className='text-[#161616] text-lg font-medium flex items-center'>{t('Transfer amount')}</p>
              <p className='text-primary text-base font-medium bg-[#FAEFD1] px-4 h-10 w-fit flex items-center rounded-3px'>
                {t('bank transfer')}
              </p>
            </div>
            <div className="relative w-full mt-6">
              <input 
                type="number" 
                placeholder="0 جنية"
                className="w-full h-14 px-4 border border-[#C7C7C7] rounded-3px text-right focus:outline-none focus:border-black placeholder:text-[#9CA3AF]" 
              />
            </div>

          </div>

          <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-3'>
            <div className='flex justify-between'>
              <p className='text-[#161616] text-lg font-medium flex items-center'>{t('bank account')}</p>
              <p className='text-primary text-base font-medium flex gap-4'>
                <span className='flex items-center'>CIB ******4252</span>
                <span className='flex items-center'><img src="/images/icons/arrowyellowOnly.svg" alt="" /></span>
              </p>
            </div>
          </div>

          <div className='border border-[#F5DFA3] bg-[#FDF7E8] p-4 mt-4 rounded-3px flex  gap-1'>
            <span><img src="/images/icons/" alt="" /></span>
            <span className='text-primary text-base font-normal'>{t('The transfer takes place within 1–3 business days depending on the settlement cycle.')}</span>
          </div>


          <div className='flex w-full gap-6'>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='flex justify-center items-center h-14 w-full  gap-2  bg-primary rounded-3px px-4 py-2.5 cursor-pointer  transition-colors duration-150'
            >
              <p className='text-white text-base font-normal'>{t('Confirm transfer')}</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='flex justify-center items-center h-14 w-full  gap-2 border border-[#CDD5DF] rounded-3px px-4 py-2.5 cursor-pointer  transition-colors duration-150'
              onClick={()=>setOpen(false)}
            >
              <p className='text-[#4B5565] text-base font-normal'>{t('cancel')}</p>
            </motion.button>
            
          </div>

          <div>

          </div>
        </div>
      </Dialog>
    

    </>
  )
}

export default Bank_Transfer_Request