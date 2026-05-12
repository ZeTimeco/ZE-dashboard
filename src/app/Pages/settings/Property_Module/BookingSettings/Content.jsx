"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Content() {
    const {t} = useTranslation()
    const inputClassName = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
    
    const [count, setCount] = useState(1)
    const increase = () => {
      setCount((prev) => prev + 1)
    }
    const decrease = () => {
      if (count > 1) {
        setCount((prev) => prev - 1)
      }
    }

    const [count2, setCount2] = useState(1)

    const increase2 = () => {
      setCount2((prev) => prev + 1)
    }

    const decrease2 = () => {
      if (count2 > 1) {
        setCount2((prev) => prev - 1)
      }
    }

  return (
    <>
    {/* checkbox 1 */}
    <div className='border border-[#CDD5DF] py-4 px-2 flex justify-between rounded-[3px] '>
      <p className='text-[#364152] text-sm font-normal '>{t('Automatic booking approval')}</p>
      <input
        type='checkbox'
        className={inputClassName}
      />
    </div>

    {/* checkbox 2 */}
    <div className='border border-[#CDD5DF] py-4 px-2 flex justify-between rounded-[3px] mt-4 '>
      <p className='text-[#364152] text-sm font-normal '>{t('Manual approval is required')}</p>
      <input
        type='checkbox'
        className={inputClassName}
      />
    </div>

    {/* Minimum number of nights */}
    <div className='mt-4'>
      <p className='text-[#364152] text-sm font-normal'>{t('Minimum number of nights')}</p>
    
      <div className='flex items-center gap-3   py-2'>
          
          <button
            onClick={decrease}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
          >
            -
          </button>

          <span className='w-full h-11  text-[#4B5565] flex items-center justify-center font-medium  text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px]'>
            {count} {t('nights')}
          </span>

          <button
            onClick={increase}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
          >
            +
          </button>
      </div>
    </div>

    {/* Maximum number of nights */}
    <div className='mt-4'>
      <p className='text-[#364152] text-sm font-normal'>{t('Maximum number of nights')}</p>
    
      <div className='flex items-center gap-3   py-2'>
          
          <button
            onClick={decrease2}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
          >
            -
          </button>

          <span className='w-full h-11  text-[#4B5565] flex items-center justify-center font-medium  text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px]'>
            {count2} {t('nights')}
          </span>

          <button
            onClick={increase2}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer'
          >
            +
          </button>
      </div>
    </div>

    <div> 
      <p className='text-[#364152] text-sm font-normal'>{t('Minimum booking time')}</p>
    </div>
      

    </>
  )
}

export default Content