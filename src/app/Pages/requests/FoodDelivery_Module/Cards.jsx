'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Cards({getOrders}) {
  const {t} = useTranslation()
  
  const StatusRender = (status) => {
    switch (status) {
      case "pickup"://أستلام
        return (
          <div className=' bg-[#EDE7FD] border border-[#713DEC] text-[#713DEC] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('pickup')}</span>
          </div>
        </div>
        );
      case "delivery": //توصيل
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className=' mt-1' />
              <span className=''>{t('delivery')}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {getOrders?.data?.map((order , index)=>(
        <div key={order?.id} className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>
        {/*  */}
        <div className='flex justify-between mb-3'>
          <p className='text-[#364152] text-lg font-medium'>{order?.order_number}#</p>
          {StatusRender(order?.type)}
        </div>

        {/*  */}
        <div className='flex justify-between'>
          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/package.svg" className="w-4 h-4" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.items_count} {t('products')}
            </span>
          </p>

          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/clock-gray.svg" className="w-4 h-4" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.created_at}
            </span>
          </p>

        </div>

        <div className='border border-[#E3E8EF] my-3'></div>

        {/*  */}
        <div className='flex justify-between'>
          <p className='text-[var(--color-primary)] text-lg font-semibold'> {order?.total}جنيه</p>
          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/credit-card.svg" className="w-4 h-4" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.payment_method === 'card' ? t('card') : t('cash') }
            </span>
          </p>
        </div>


        </div>
      ))}
      
      
    </>
  )
}

export default Cards