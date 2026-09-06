'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Edit_option from './Dialog/Edit_option'
import Edit_group from './Dialog/Edit_group'
import { motion } from 'framer-motion'

function OptionsPage() {
  const {t} = useTranslation()
  const inputClassName ="w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-colors duration-150";

  const[openGroup , setOpenGroup] = useState(false)
  const[openOption , setOpenOption] = useState(false)

  return (
    <>
      <SearchForm placeholderKey={t('Searching for a group')} />

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-8'>
        <motion.div 
          whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px] bg-white transition-all duration-200'
        >
          {/* Header */}
          <div className='flex justify-between items-start'>
            <div>
              <div className='flex items-center gap-2'>
                <p className='bg-[#F4EAD0] w-5 h-5 rounded-full flex justify-center items-center'>
                  <span className='text-[var(--color-primary)] text-xs font-medium'>5</span>
                </p>
                <p className='text-[#364152] text-base font-medium'>الحجم</p>
              </div>

              <p className='w-fit px-3 py-1 rounded-full bg-[var(--color-primary)] mt-2'>
                <span className='text-white text-xs font-normal'>{t('mandatory')}</span>
              </p>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>setOpenGroup(true)}
              className='bg-[#F9F5E8] hover:bg-[#F2E8D0] flex justify-center items-center w-8.5 h-8.5 rounded-[3px] cursor-pointer transition-colors duration-150'
            >
              <img src="/images/icons/EditYellow.svg" alt="" className="w-4 h-4" />
            </motion.button>
          </div>

          <div className='border-[0.5px] border-[#E3E8EF] my-4'></div>

          {/* Option Item */}
          <div className='border border-[#CDD5DF] hover:border-[#9AA4B2] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between items-center transition-colors duration-150'>
            <div className='flex items-center gap-2'>
              <input 
                type="checkbox" 
                className={inputClassName}
              />
              <p className='flex items-center text-base font-normal'>
                <span className='text-[#364152]'>وسط + </span>{' '}
                <span className='text-[var(--color-primary)] font-medium'> 150.00 ج.م</span>
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>setOpenOption(true)} 
              className='cursor-pointer p-1'
            >
              <img src="/images/icons/EditYellow.svg" alt="" className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      <Edit_group
        open={openGroup}
        setOpen={setOpenGroup}
      />

      <Edit_option
        open={openOption}
        setOpen={setOpenOption}
      />
    </>
  )
}

export default OptionsPage