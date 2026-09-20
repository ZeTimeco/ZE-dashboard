'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Shipment_details({getActiveDeliveryID}) {
  const {t} = useTranslation()
  return (
    <>
    <div className='border border-[#CDD5DF] rounded-3px p-6  grid grid-cols-2 gap-6'>

      <div className='border border-[#CDD5DF] rounded-3px p-4'>
        <div className='flex justify-between'>
          <p className='text-[#161616] text-lg font-normal'>{t('Shipment details')}</p>
          <p className='w-fit bg-[#F5DFA3] text-[#5C460A] text-sm font-normal px-2 py-1 rounded-full'>
            الوجهة الاولي
          </p>
        </div>

        <div className='border border-[#E3E8EFAA] my-4'></div>

        {/* type */}
        <div className='flex justify-between'>
          <p className='text-[#697586] text-sm font-normal'>{t('Type')}</p>
          <p className='text-[#161616] text-sm font-normal'>صندوق متوسط · وثائق</p>
        </div>

        {/* the weight */}
        <div className='flex justify-between mt-4'>
          <p className='text-[#697586] text-sm font-normal'>{t('the weight')}</p>
          <p className='text-[#161616] text-sm font-normal'>  2.5 كجم </p>
        </div>

      </div>

    </div>
      
    </>
  )
}

export default Shipment_details