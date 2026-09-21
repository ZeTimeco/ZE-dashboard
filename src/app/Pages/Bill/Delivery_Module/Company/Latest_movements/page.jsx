'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Latest_movementsPage({getEarnings}) {
  const {t} = useTranslation()
  const formatDateTime = (date) => {
    if (!date) return ''

    const parsedDate = new Date(date.replace(' ', 'T'))

    return parsedDate.toLocaleTimeString('ar-EG', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }
  return (
    <> 
    {getEarnings?.recent_transactions?.map((item , index)=>(
      <div key={index} className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-3 my-6'>
        <p className='text-[#161616] text-xl font-medium mb-6'>{t('Latest movements')}</p>

        <div className='flex justify-between '>
          <div className='flex flex-col gap-1'>
            <p className='text-[#364152] text-lg font-normal'>{t('delivery')} {item?.booking_number}</p>
            <p className='text-[#4B5565] text-lg font-normal'>{t('today')} : {formatDateTime(item?.date)}</p>
          </div>
          <p
            className={`text-xl font-semibold ${
            item?.amount > 0 ? "text-[#16A34A]" : "text-red-500"
            }`}
          >
            {Math.abs(item?.amount).toFixed(2)}{item?.amount > 0 ? "+" : "-"}
          </p>     
        </div>


      </div>
    ))}
    


    </>
  )
}

export default Latest_movementsPage