"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function MediaPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  return (
    <>
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
    </>
  )
}

export default MediaPage