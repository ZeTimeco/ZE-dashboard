import React from 'react'
import { useTranslation } from 'react-i18next'

function PriceQuote({formData , setFormData}) {
  const {t} = useTranslation()

  return (
    <>

    <div className='flex gap-2'>
      <p>
        <img src="/images/icons/dollar-yellow.svg" className="w-6 h-6" />
      </p>
      <p className='flex flex-col'>
        <span className='text-[#364152] text-base font-medium'>{t('Price quote')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t('Managing the way prices are displayed to customers')}</span>
      </p>
    </div>


    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-sm font-medium'>{t('Prices are inclusive of tax.')}</span>
        <span className='text-[#697586] text-xs font-normal'>{t('All prices shown include VAT.')}</span>
      </p>

      <div className='border border-[#48A1FF] bg-[#EFF6FF] p-3 rounded-[3px] flex gap-2 mt-4'>
        <p className='flex items-center'>
          <img src="/images/icons/i_blue.svg" alt="" />
        </p>
        <p className='text-[#3473B7] text-base font-normal'>{t('According to the value-added tax in the Arab Republic of Egypt')}</p>

      </div>

    </div>


      

    </>
  )
}

export default PriceQuote