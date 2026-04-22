"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function CancellationPolicyPage() {
  const { t } = useTranslation()
  const [selectedPolicy, setSelectedPolicy] = useState('')

  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"

  return (
    <>
      <div className='mt-6'>
        <p className='text-[#364152] text-lg font-medium'>{t('Cancellation Policy')}</p>
        <div className='border border-[#E3E8EF] p-3 mt-6'>
          <div className='grid grid-cols-2 gap-4'>
            {/*flexible  */}
            <div 
              className={`border p-3 cursor-pointer rounded-[3px] ${selectedPolicy === 'flexible' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
              onClick={() => setSelectedPolicy('flexible')}
            >
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    name="cancellation_policy"
                    value="flexible"
                    checked={selectedPolicy === 'flexible'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className={inputClassName}  
                  />
                  <p className='text-[#364152] text-base font-medium'>{t('flexible')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Full refund one day before arrival, excluding fees')}</p>
            </div>

            {/*moderate  */}
            <div 
              className={`border p-3 cursor-pointer rounded-[3px] ${selectedPolicy === 'moderate' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
              onClick={() => setSelectedPolicy('moderate')}
            >
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    name="cancellation_policy"
                    value="moderate"
                    checked={selectedPolicy === 'moderate'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className={inputClassName}  
                  />
                  <p className='text-[#364152] text-base font-medium'>{t('moderate')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Full refund 5 days before arrival, excluding fees')}</p>
            </div>

            {/*firm  */}
            <div 
              className={`border p-3 col-span-2 cursor-pointer rounded-[3px] ${selectedPolicy === 'firm' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
              onClick={() => setSelectedPolicy('firm')}
            >
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    name="cancellation_policy"
                    value="firm"
                    checked={selectedPolicy === 'firm'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className={inputClassName}  
                  />
                  <p className='text-[#364152] text-base font-medium'>{t('firm')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1 '>{t('50% refund up to one week before, 0% refund after')}</p>
            </div>
          </div>
        </div>
        
      </div>

    </>
  )
}

export default CancellationPolicyPage