"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ActionPage({analysisProperties}) {
  const {t} = useTranslation()

  const analysisPropertiesPending = analysisProperties?.pending

  return (
    <>
      {analysisPropertiesPending?.show_section &&(
        <div className='border border-[#FEC84B] bg-[#FFFCF5] rounded-[3px]  p-4 mb-8'>
          {/*  */}
          <div className='flex gap-2'>
            <img src="/images/icons/alert-yellow.svg" className="w-5 h-5 mt-1" />
            <p className='text-[#364152] text-lg text-normal'>{t('Action required')}</p>
          </div>

          {/*  */}
          <p className='text-[#697586] text-base font-normal'>{analysisPropertiesPending?.message}</p>
            
          {/*  */}
          <button className='  bg-[var(--color-primary)] mt-1.5 flex items-center justify-center gap-2 w-full h-14 rounded-[3px] cursor-pointer'>
            <span className='text-white text-sm font-medium '>{t('Review now')}</span>  
            <img src="/images/icons/arrow-left-white.svg" className="w-6 h-6" />
          </button>

        </div>
      )}
    </>
  )
}

export default ActionPage