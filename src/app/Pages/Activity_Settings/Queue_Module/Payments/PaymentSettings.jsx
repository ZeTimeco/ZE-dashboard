'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function PaymentSettings() {
  const {t} = useTranslation() 

  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"
  
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Payment settings')}</p>

        <div className='mt-4 grid grid-cols-3 gap-4'>
          <button className={`border border-[#E3E8EF] rounded-[3px] flex gap-3 py-2 px-3`}>
            <div className='flex items-center'>
              <input type="radio" name='selectRadio' className={inputClassName} />
            </div>
            
            <div className='font-normal'>
              <p className='text-[#364152] text-base flex justify-start'>{t('Prepayment')}</p>
              <p className='text-[#4B5565] text-sm '>{t('Full payment required')}</p>
            </div>

          </button>

          <button className={`border border-[#E3E8EF] rounded-[3px] flex gap-3 py-2 px-3`}>
            <div className='flex items-center'>
              <input type="radio" name='selectRadio' className={inputClassName} />
            </div>
            
            <div className='font-normal'>
              <p className='text-[#364152] text-base flex justify-start'>{t('deposit')}</p>
              <p className='text-[#4B5565] text-sm '>{t('Partial payment in advance')}</p>
            </div>

          </button>

          <button className={`border border-[#E3E8EF] rounded-[3px] flex gap-3 py-2 px-3`}>
            <div className='flex items-center'>
              <input type="radio" name='selectRadio' className={inputClassName} />
            </div>
            
            <div className='font-normal'>
              <p className='text-[#364152] text-base flex justify-start'>{t('Free booking')}</p>
              <p className='text-[#4B5565] text-sm '>{t('No payment required')}</p>
            </div>

          </button>

        </div>
      </div>
    </>
  )
}

export default PaymentSettings