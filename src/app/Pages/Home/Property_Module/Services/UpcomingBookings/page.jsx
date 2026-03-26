"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';

function UpcomingBookingsPage({topThreeBookings}) {
  const{t}  = useTranslation()
  
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مقبول
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center '>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
            <span className='text-xs lg1:text-sm'>{t('confirmed')}</span>
          </div>
        </div>
        );
      case "completed"://مكتمل
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl flex justify-center items-center'>
          <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' w-4 h-4 ' />
            <span className='text-xs lg1:text-sm'>{t('Complete')}</span>
          </div>
        </div>
        );
      case "checked_in": //تم الوصول
        return (
          <div className=' bg-[#E3E8EF] border  border-[#697586] text-[#4B5565] w-fit h-9 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/cargray.svg" alt=""className='w-4 h-4 mt-1' />
              <span className='text-xs lg1:text-sm'>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "pending": //قيد الانتظار
      return (
        <div className=' bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit  h-9.5 rounded-3xl flex justify-center items-center'>
        <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
          {/* <img src="/images/icons/inactive Status.svg" alt="" className=' w-4 h-4 ' /> */}
          <img src="/images/icons/pending Status.svg" alt=""className='w-4 h-4 mt-1' />
          <span className='text-xs lg1:text-sm'>{t('Pending')}</span>
        </div>
      </div>
      );
      case "not_attend": //لم يحضر 
        return (
          <div className=' bg-[#DBCEFA] border border-[#4D0CE7] text-[#4D0CE7] w-fit h-9.5 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/remove-circle_blue.svg" alt="" className=' w-4 h-4 mt-1' />
              <span className='text-xs lg1:text-sm'>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled": // ملغي
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl flex justify-center items-center'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' w-4 h-4 ' />
              <span className='text-xs lg1:text-sm'>{t('cancelled')}</span>
            </div>
          </div>
        );
    }
  };

  return (
    <>
    <div className='flex flex-col '>
      <div className='flex justify-between mb-5 '>
        <p className='text-[#0F022E] text-xl font-medium mb-1'>{t('Upcoming bookings')}</p>
        <button className='flex gap-2 mt-1 cursor-pointer text-[var(--color-primary)] text-base font-normal'>
          {t('More')}
        </button>
      </div>
  

      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-3 mb-10 rounded-[3px]'>
          {topThreeBookings?.map((booking , index)=>(
            <div key={index}>
              <div className='flex justify-between mb-4'>
                <div className='flex items-center gap-2'>
                  <p className='w-9 h-9 flex items-center justify-center bg-[#007AFF] text-white rounded-full'>
                    {booking?.guest?.name?.charAt(0)}
                  </p>
                  <p className='text-[#364152] text-sm font-normal'>{booking?.guest?.name} </p>
                </div>
                <div>{StatusRender(booking?.status)}</div>
              </div>

              <div className='flex justify-between'>
                <p className='text-[#232323] text-sm font-normal w-[65%]'>
                  {booking?.property?.title}
                </p>
                <p className='text-[#4B5565] text-sm font-normal  w-[35%]mr-5 '>
                  {booking?.check_in} : {booking?.check_out}
                </p>
              </div>

              {index !== topThreeBookings.length - 1 && (
                <div className='border border-[#CDD5DF] my-4'></div>
              )}      
              
            </div>
          ))}
          

      </div>
    </div>
    </>
  )
}

export default UpcomingBookingsPage