import React from 'react'
import { useTranslation } from 'react-i18next'

function Price({getActiveDeliveryID}) {
  const {t} = useTranslation()
  return (
    <div  >

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <div className='flex justify-between'>
        <p className='text-[#697586] text-sm font-normal'>{t('Delivery cost')}</p>
        <p className='text-primary text-base font-bold'>  {getActiveDeliveryID?.earnings?.amount} {t('pound')} </p>
      </div>
      <div className='flex justify-between mt-4'>
        <p className='text-[#697586] text-sm font-normal'>{t('payment method')}</p>
        <p className='text-[#161616] text-sm font-normal'>  ???????  </p>
      </div>
    </div>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mt-4 flex justify-between'>
      <div className='flex flex-col gap-2'>
        <p className='text-[#3B3B3B] text-base font-normal'>{t('The driver is supported')}</p>
        <p className="text-[#3B3B3B] text-base font-medium">
          {getActiveDeliveryID?.assigned_driver?.name ?? t('No designated driver')}
        </p>     
      </div>
      <p className='text-primary text-base font-bold  flex items-center'> {getActiveDeliveryID?.earnings?.amount} {t('pound')} </p>
    </div>



    <div>
    
    </div>
      
    </div>
  )
}

export default Price