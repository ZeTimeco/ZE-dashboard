import React from 'react'
import { useTranslation } from 'react-i18next'

function FirstSection() {
  const {t} = useTranslation()
  
  return (
    <>
    <div className='flex justify-center items-center bg-[#EEF2F6] w-full h-34'>
      <img src="/images/burger.svg" alt="" />
    </div>

    <div className='flex justify-between mt-6'>
      <p className='text-[#364152] text-xl font-medium'>برجر كلاسيك</p>
      <p className='border border-[#067647] bg-[#DCFAE6] text-[#067647] rounded-full w-fit px-3'>{t('Visible to customers')}</p>
    </div>

    <div className='flex justify-between my-4'>
      <p className='text-[#4B5565] text-base font-normal'>المقبلات</p>
      <p className='text-[var(--color-primary)] text-base font-semibold'>225 جنية</p>
    </div>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium'>{t('description')}</p>
      <p className='text-[#4B5565] text-sm font-normal mt-2'>
        وصف تفصيلي للصنف يتضمن المكونات وطريقة التحضير والخصائص المميزة لهذا الطبق الشهي.
      </p>
    </div>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium'>{t('Additional information')}</p>

      <div className='flex justify-between mt-4 rounded-[3px]'>
        <p className='text-[#697586] text-sm font-normal'>{t('Preparation time')}</p>
        <p className='text-[#364152] text-sm font-normal'>15 {t('minute')} </p>
      </div>

      <div className='flex justify-between mt-2 rounded-[3px]'>
        <p className='text-[#697586] text-sm font-normal'>{t('Calories')}</p>
        <p className='text-[#364152] text-sm font-normal'>45 {t('minute')} </p>
      </div>

    </div>

    <div className='flex justify-between mb-4'>
      <p className='text-[#364152] text-base font-medium'>{t('Add-ons and options')}</p>
      <button className='border border-[var(--color-primary)]  flex gap-2 px-3 rounded-[3px] cursor-pointer'>
        <p className='flex items-center'><img src="/images/icons/arrowyellowOnly.svg" className="w-3 h-3" /></p>
        <p className='text-[var(--color-primary)] text-sm font-normal'>{t('administration')}</p>
      </button>
    </div>

          


    </>
  )
}

export default FirstSection