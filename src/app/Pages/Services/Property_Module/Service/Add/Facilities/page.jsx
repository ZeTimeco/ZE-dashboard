"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function FacilitiesPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 5 :</span>
            <span>{t('Facilities')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter the facility details to begin adding them.')}</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>
        
        <div className='border border-[#CDD5DF] py-4 px-6'>
          {/*  */}
          <div className='flex gap-2'>
            <img src="/images/icons/guest-house.svg" className="w-6 h-6" />
            <p className='text-[#364152] text-base font-medium'>الاساسيات</p>
          </div>
          {/*  */}
          <div className='mt-6 flex justify-between'>
            <div className='flex gap-2'>
              <img src="/images/icons/guest-house.svg" className="w-6 h-6" />
              <p className='text-[#364152] text-base font-medium'>صانع القهوة</p>
            </div>
            <div>
              <input 
                type="checkbox"
                className="w-5 h-5 appearance-none border rounded-[3px]  border-gray-300 bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  
              />
            </div>
          </div>
        </div>

      {/* btn */}
      <div className="flex justify-between mt-6">
        <div className='w-full '>
          <button
            onClick={prevStep}
            className=" w-[25%] h-15 border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('the previous')}
          </button>
        </div>
        
        <div className='flex gap-2 justify-end w-full '>
          <button
            className="h-15 w-[30%]  border border-[#697586] text-[#697586] rounded-[3px] cursor-pointer"
          >
            {t('Save draft')}
          </button>

          <button
            onClick={nextStep}
            className="h-15 w-[25%] bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            {t('the next')}
          </button>
        </div>
        
      </div>
      </div>
    </>
  )
}

export default FacilitiesPage