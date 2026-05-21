"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotificationPage from './Dialog/Notification/page'

function CardOfRequests({getReservationsData}) {
  const {t} =useTranslation()

  // '!pending','!confirmed','!seated','!completed','!cancelled','no_show','!arrived','!rejected'

  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مؤكد
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('certain')}</span>
          </div>
        </div>
        );
      case "completed"://مكتملة
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Complete')}</span>
          </div>
        </div>
        );
      case "pending": //قيد الانتظار          
        return (
          <div className=' bg-[#FFFAEB] border  border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt=""className=' mt-1' />
              <span className=''>{t('Pending')}</span>
            </div>
          </div>
        );
      case "arrived": // وصل
        return (
          <div className=' bg-[#F9F5E8] border border-[#9E7A11] text-[#9E7A11] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-check.svg" alt="" className=' mt-1' />
              <span className=''>{t('receipt')}</span>
            </div>
          </div>
        );
      case "seated": // جالس
      return (
        <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/chair-gray.svg" alt="" className=' mt-1' />
            <span className=''>{t('sitting')}</span>
          </div>
        </div>
      );
      case "no_show": // لم يحضر
        return (
          <div className=' bg-[#EDE7FD] border border-[#713DEC] text-[#713DEC] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-x.svg" alt="" className=' mt-1'/>
              <span className=''>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled": // ملغيه
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضه
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit  rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('rejected')}</span>
            </div>
          </div>
        );
      }
  };

  const [openNotification , setOpenNotification] = useState(false)

  return (
    <>
    {getReservationsData?.data.length > 0 ?(
      <div className='grid grid-cols-2 gap-6 mt-10'>
        {getReservationsData?.data.map((reservation)=>(
          <div key={reservation?.id} className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-10'>
            {/* name & status  */}
            <div className='flex justify-between'>
              <div className='flex gap-3 items-center'>
                <p className='w-15 h-14 bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] rounded-[3px] flex items-center justify-center'>
                  <span className='text-[#FCFCFD] text-lg font-normal'>#{reservation?.table_code}</span>
                </p>
                <p className='text-[#364152] text-lg font-medium'>{reservation?.guest_name}</p>
              </div>
              <div className='flex items-center'>
                {StatusRender(reservation?.status)}
              </div>
            </div>
            
            {/*  */}
            <div className='grid grid-cols-2 gap-3 my-3 '>
              {/* guests */}
              <div className='flex gap-1'>
                <img src="/images/icons/user-group_grey.svg" alt="" />
                <p className='text-[#697586] text-base font-normal'>{reservation?.guest_count} {t('guests')}</p>
              </div>

              {/* time */}
              <div className=''>
                <p className='text-[#697586] text-base font-normal'>
                  {new Date(`1970-01-01T${reservation?.start_time}`).toLocaleTimeString('ar-EG', {
                    hour: 'numeric',
                    minute: '2-digit',
                    hour12: true,
                  })}
                </p>
              </div>

              {/* hall time */}
              <div className='flex gap-1'>
                <img src="/images/icons/restaurant-gray.svg" alt="" />
                <p className='text-[#364152] text-base font-normal'>{reservation?.hall_name}</p>
              </div>

              {/* hall view */}
              <div className='flex gap-1'>
                <img src="/images/icons/tree.svg" alt="" />
                <p className='text-[#364152] text-base font-normal'> {reservation?.views?.[0]?.name}</p>
              </div>

            </div>

            {/* btn */}
            <div className='w-full mt-4 flex gap-6 '>
              <button 
                onClick={()=>setOpenNotification(true)}
                className='w-[50%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium rounded-[3px] cursor-pointer'>
                {t('notice')}
              </button>

              <button
                onClick={() => window.location.href = `tel:${reservation?.guest_phone}`}
                className='w-[50%] h-14 border border-[#CDD5DF] text-[#697586] text-base font-medium rounded-[3px] cursor-pointer'
              >
                {t('communication')}
              </button>

            </div>

          </div>
        ))}
      </div>
    ):(
        <p className='text-center mt-10 text-[#697586]'>
          {t('No reservations')}
        </p>
    )}
    
      
    <NotificationPage
      open={openNotification}
      setOpen={setOpenNotification}
    />
      

      

    </>
  )
}

export default CardOfRequests