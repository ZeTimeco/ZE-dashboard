'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

function AdditionsPage() {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);

  return (
    <>
      <SearchForm placeholderKey={t('Searching for a group')} />

      {/* ****** */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] my-8 p-4 rounded-[3px] bg-white'>
        <p className='text-[#364152] text-sm font-medium mb-1.5'>{t('Maximum additions')}</p>

        <input 
          type="number"
          name='title'
          placeholder='0.00'
          className="w-full h-12 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none hover:border-[#9AA4B2] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]/20 transition-colors duration-150"
        />

        <p className='text-[#697586] text-xs font-normal mt-2'>
          {t('The number of add-ons that the customer can choose (0 = unlimited)')}
        </p>
      </div>

      {/* ***** */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <div className="shadow-[0_0_2px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px] mb-6 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="bg-[#F4EAD0] text-[var(--color-primary)] text-xs w-5 h-5 rounded-full flex justify-center items-center font-medium">3</p>
              <p className="text-[#364152] text-lg font-medium">برجر</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setOpen(!open)}
              className="cursor-pointer p-1"
            >
              <img
                src="/images/icons/ArrowDown_gray.svg"
                alt=""
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </motion.button>
          </div>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden p-2 mt-4"
              >            
                {/* items */}
                <motion.div 
                  whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
                  className="shadow-[0_0_2px_0_rgba(0,0,0,0.2)] bg-white border border-transparent hover:border-[#E3E8EF] p-3 rounded-[3px] mb-4 cursor-pointer transition-all duration-200"
                >
                  <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-4 w-full'>
                      <p className='bg-[#F9F5E8] w-13.5 h-12 flex items-center justify-center rounded-[3px] shrink-0'>
                        <img src="/images/burger.svg" alt="" />
                      </p>
                      <div>
                        <p className='text-[#364152] text-base font-normal'>برجر كلاسيك</p>
                        <p className='text-[var(--color-primary)] text-base font-semibold'>350 جنية</p>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex items-center gap-1 text-[var(--color-primary)] cursor-pointer'
                    >
                      <img src="/images/icons/EditYellow.svg" className="w-6 h-6" />
                      <p className='text-sm font-normal'>{t('modification')}</p>
                    </motion.button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}

export default AdditionsPage