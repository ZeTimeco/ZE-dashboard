'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function DeleteItems({deleteId , setDeleteId ,handleDelete }) {
  const {t} = useTranslation()
  return (
    <>
      <Dialog
        open={Boolean(deleteId)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "ServiceDeletePage-dialog",
        }}
      >
        <div className='pt-6 px-6'>
          <motion.button 
            whileHover={{ scale: 1.08, rotate: 5, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
            onClick={() => setDeleteId(false)} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-[58.182px] flex justify-center items-center cursor-pointer transition-colors hover:bg-[#f3f4f6]'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </motion.button>
        </div>
  
        <div className='flex justify-center mb-4'>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='bg-[#FEF3F2] w-12 h-12 p-3 rounded-full flex items-center justify-center'
          >
            <div className='bg-[#FEE4E2] w-6 h-6 rounded-full flex items-center justify-center'>
              <img src="/images/icons/xxx.svg" alt="" />
            </div>
          </motion.div>
        </div>
  
        <div className='flex flex-col items-center mb-6 px-4'>
          <p className='text-[#0F022E] text-xl font-semibold mb-4 text-center'>
            {t('Are you sure you want to delete this item?')}
          </p>
          <p className='text-[#697586] text-base font-normal max-w-md text-center'>
            {t('This item will be removed from your list and will no longer be available to customers.')}
          </p>
        </div>
  
        <div className="w-full h-px bg-[#CDD5DF] mt-6"></div>
  
        <section className='w-full flex p-6 gap-3'>
          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: '0 4px 14px 0 rgba(217,45,32,0.25)',
              transition: { duration: 0.18 },
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={() => { handleDelete(deleteId); setDeleteId(null); }}
            className='w-full bg-[#D92D20] text-[#fff] h-13.5 rounded-[3px] cursor-pointer transition-opacity hover:opacity-90'
          >
            <span className='text-base font-medium'>{t('delete')}</span>
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            onClick={() => setDeleteId(false)} 
            className='w-full border border-[#697586] text-[#4B5565] h-13.5 rounded-[3px] cursor-pointer transition-colors hover:bg-gray-50'
          >
            <span className='text-base font-normal'>{t('cancel')}</span>
          </motion.button>
        </section>
      </Dialog>
    </>
  )
}

export default DeleteItems