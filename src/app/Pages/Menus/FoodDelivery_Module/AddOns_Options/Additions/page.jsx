'use client'
import SearchForm from '@/app/Components/Forms/SearchForm'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function AdditionsPage() {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  

  return (
    <>
      <SearchForm placeholderKey={t('Searching for a group')} />

      {/* ****** */}
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] my-8 p-4'>
        <p className='text-[#364152] text-sm font-medium mb-1'>{t('Maximum additions')}</p>

        <input 
          type="number"
          name='title'
          placeholder='0.00'
          className={`w-full h-12  p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152]  rounded-[3px] outline-none `}
        />

        <p className='text-[#697586] text-xs font-normal my-1'>
          {t('The number of add-ons that the customer can choose (0 = unlimited)')}
        </p>


      </div>


      {/* ***** */}
      <div className='grid grid-cols-2 gap-6'>

        <div className="shadow-[0_0_2px_0_rgba(0,0,0,0.20)] p-3 rounded-[3px] mb-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex gap-4 items-center">
              <p className="bg-[#F4EAD0] text-[var(--color-primary)] text-xs w-5 h-5 rounded-full flex justify-center items-center">3</p>
              <p className="text-[#364152] text-lg font-medium">برجر</p>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer transition-transform duration-300"
            >
              <img
                src="/images/icons/ArrowDown_gray.svg"
                alt=""
                className={`transition-transform duration-300 ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>

          {/* Dropdown */}
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-96 opacity-100 p-2 mt-4" : "max-h-0 opacity-0" }`}>            
            {/* items */}
            <div 
              className="shadow-[0_0_2px_0_rgba(0,0,0,0.2)]  bg-white p-3 rounded-[3px] mb-4 cursor-pointer"
            >
              <div className='flex justify-between w-full'>
                <div className='flex gap-4  w-full'>
                  <p className='bg-[#F9F5E8] w-13.5 h-12 flex items-center justify-center rounded-[3px]'>
                    <img src="/images/burger.svg" alt="" />
                  </p>
                  <div>
                    <p className='text-[#364152] text-base font-normal'>برجر كلاسيك</p>
                    <p className='text-[var(--color-primary)] text-base font-semibold'>350 جنية</p>
                  </div>
                </div>

                <button className='flex gap-1 text-[var(--color-primary)] cursor-pointer '>
                  <p className='flex justify-center '>
                    <img src="/images/icons/EditYellow.svg" className="w-6 h-6" />
                  </p>
                  <p className='text-sm font-normal'>{t('modification')}</p>
                </button>

              </div>
            </div>

            

          </div>
        </div>
        
      </div>
      

    </>
  )
}

export default AdditionsPage