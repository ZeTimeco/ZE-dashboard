'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Latest_movementsPage() {
  const {t} = useTranslation()
  const value = -20.99;

  return (
    <> 
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-3 my-6'>
      <p className='text-[#161616] text-xl font-medium mb-6'>{t('Latest movements')}</p>

      <div className='flex justify-between '>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-lg font-normal'>{t('delivery')} ZT-PR-1234</p>
          <p className='text-[#4B5565] text-lg font-normal'>{t('today')}  · 3:45م </p>
        </div>
        <p
          className={`text-xl font-semibold ${
            value > 0 ? "text-[#16A34A]" : "text-red-500"
          }`}
        >
          {Math.abs(value).toFixed(2)}{value > 0 ? "+" : "-"}
        </p>     
      </div>


    </div>


    </>
  )
}

export default Latest_movementsPage