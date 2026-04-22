"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import BookingTypePage from './BookingType/page';
import SpecialPricesPage from './SpecialPrices/page';

function AvailabilityPage({prevStep , nextStep }) {
  const {t} = useTranslation();
  return (
    <>
      <div className='border border-[#E6E6E6] p-8 rounded-[3px]'>
        <div>
          <p className='text-[#364152] text-xl font-medium mb-3'>
            <span>{t('Step')} 7 :</span>
            <span>{t('Availability')}</span>
          </p>
          <p className='text-[#697586] text-base font-normal'>{t('Enter availability details to begin adding them')}</p>
          <div className='border border-[#CDD5DF] my-4'></div>
        </div>




        <BookingTypePage/>
        <SpecialPricesPage/>


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

export default AvailabilityPage