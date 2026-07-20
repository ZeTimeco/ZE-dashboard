'use client'
import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'
import React from 'react'
import { useTranslation } from 'react-i18next'

function OrderPage({getOrderById}) {
  const {t} = useTranslation()
  const getOrderByIdData = getOrderById?.data
// 'new','preparing','ready','delivering','completed','rejected','cancelled'
  const StatusRender = (status) => {
    switch (status) {
      case "ready": //جاهز للتوصيل
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className='text-sm font-normal'>{t('Ready for delivery')}</span>
          </div>
        </div>
        );
      case "completed":
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className='text-sm font-normal'>{t('Complete')}</span>
          </div>
        </div>
        );
      case "new": //طلب جديد
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-9 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className=' mt-1' />
              <span className='text-sm font-normal'>{t('New request')}</span>
            </div>
          </div>
        );
      case "preparing": //قيد التحضير
      return (
        <div className=' bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit  h-9 rounded-3xl'>
        <div className='py-1.5 px-3 flex gap-1'>
          <img src="/images/icons/inactive Status.svg" alt="" className=' mt-1' />
          <span className='text-sm font-normal'>{t('Under preparation')}</span>
        </div>
      </div>
      );
      case "delivering": 
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' mt-1' />
              <span className='text-sm font-normal'>{t('The worker on the road')}</span>
            </div>
          </div>
        );
      case "rejected": 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1'/>
              <span className='text-sm font-normal'>{t('rejected')}</span>
            </div>
          </div>
        );
      case "cancelled": 
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
            </div>
          </div>
        );
      }
  };


  const createdAt = getOrderByIdData?.created_at;
  const date = createdAt ? new Date(createdAt.replace(/\.\d+Z$/, "Z")) : null;
  const orderDate = date && !isNaN(date.getTime()) ? date.toLocaleDateString("ar-EG") : "";
  const orderTime = date && !isNaN(date.getTime())
    ? date.toLocaleTimeString("ar-EG", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";
  const orderRelativeTime = date && !isNaN(date.getTime())
    ? formatDistanceToNow(date, {
        addSuffix: true,
        locale: ar,
      })
    : "";

  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-4 rounded-[3px]'>
      {/* request  & status  */}
      <div className='flex justify-between'>
        <p className='flex flex-col'>
          <span className='text-[#364152] text-base font-medium'>{t('to request')}/{getOrderByIdData?.order_number}</span>
          <span className='text-[#4B5565] text-sm font-normal'> {orderRelativeTime} </span>
        </p>
        <div className='flex items-center'>
          {StatusRender(getOrderByIdData?.status)}
        </div>
      </div>

      <div className='border border-[#E3E8EF] my-4'></div>

      {/* date and time  */} 
      <div className='flex justify-between'>
        <p className='flex gap-1'>
          <span className='flex items-center'>
            <img src="/images/icons/calendar-gray.svg" className="w-5 h-5" />
          </span>
          <span className='text-[#4B5565] text-base font-normal'>{orderDate}</span>
        </p>

        <p className='flex gap-1'>
          <span className='flex items-center'>
            <img src="/images/icons/clock-gray.svg" className="w-5 h-5" />
          </span>
          <span className='text-[#4B5565] text-base font-normal'>{orderTime}</span>
        </p>

      </div>

      <div className='border border-[#E3E8EF] my-4'></div>

      <div>
        <p className='text-[#364152] text-base font-normal'>{t('Customer Information')}</p>
        <div className='my-3 flex gap-2'>
          <p className='bg-[#F9F5E8] w-7 h-7  rounded-full flex items-center justify-center'>
            <img src="/images/icons/user_yellow.svg" className="w-4 h-4" />
          </p>
          <p className='text-[#364152] text-base font-normal'> {getOrderByIdData?.guest_name} </p>
        </div>

        <div className=' flex gap-2'>
          <p className='bg-[#EDE7FD] w-7 h-7  rounded-full flex items-center justify-center'>
            <img src="/images/icons/call.svg" className="w-4 h-4" />
          </p>
          <p className='text-[#364152] text-base font-normal'>{getOrderByIdData?.guest_phone}</p>
        </div>
      </div>


    </div>
    

    </>
  )
}

export default OrderPage