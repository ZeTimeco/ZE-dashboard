'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Edit_option from './Dialog/Edit_option'
import Edit_group from './Dialog/Edit_group'

function OptionsPage() {
  const {t} = useTranslation()
  const inputClassName ="w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  const[openGroup , setOpenGroup] = useState(false)
  const[openOption , setOpenOption] = useState(false)

  return (
    <>
    <SearchForm placeholderKey={t('Searching for a group')} />

    <div className='grid grid-cols-2 gap-4 mt-8'>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-3'>

        {/*  */}
        <div className='flex justify-between'>
          {/*  */}
          <div>
            <div className='flex gap-2 '>
              <p className='bg-[#F4EAD0] w-4 h-4 rounded-full flex justify-center items-center mt-1  '>
                <span className='text-[var(--color-primary)] text-xs font-normal'>5</span>
              </p>
              
              <p className='text-[#364152] text-base font-normal'>الحجم</p>
            </div>

            <p className=' w-fit px-3 py-1 rounded-full bg-[var(--color-primary)] mt-1 '>
              <span className='text-[white] text-sm font-normal'>{t('mandatory')}</span>
            </p>

          </div>

          {/*  */}
          <button 
            onClick={()=>setOpenGroup(true)}
            className='bg-[#F9F5E8] flex justify-center items-center w-8.5 h-8.5 rounded-[3px] cursor-pointer '>
            <img src="/images/icons/EditYellow.svg" alt="" />
          </button>
        </div>
        <div className='border-[0.5px] border-[#E3E8EF] my-4'></div>

        {/*  */}
        <div className='border border-[#CDD5DF] bg-[#F8FAFC] p-3 rounded-[3px] flex justify-between'>
          <div className='flex gap-2'>
            <input type="checkbox" 
              className={inputClassName}
            />
            <p className='flex text-base  font-normal'>
              <span className='text-[#364152]'>وسط + </span>{' '}
              <span className='text-[var(--color-primary)]'> 150.00 ج.م</span>
            </p>
          </div>
          <button onClick={()=>setOpenOption(true)} className='cursor-pointer'>
            <img src="/images/icons/EditYellow.svg" alt="" />
          </button>
          

        </div>

      </div>
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