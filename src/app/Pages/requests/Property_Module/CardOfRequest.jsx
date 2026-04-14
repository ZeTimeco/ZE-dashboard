"use client"
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ViewsPage from './Views/page';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

function CardOfRequest({getBooking, hasActiveFilters}) {
  const {t} = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlId = searchParams.get('id')

  //api

  const getBookingData = getBooking?.data

  const [openView , setOpenView] = useState(false)

  useEffect(() => {
    if (urlId) {
      setOpenView(true)
    } else {
      setOpenView(false)
    }
  }, [urlId])

  const StatusRender = (status) => {
    switch (status) {
      case "confirmed": //مقبوله
        return (
          <div className=' bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit  h-9.5 rounded-3xl'>
          <div className='py-1.5 px-3 flex gap-1'>
            <img src="/images/icons/Active Status.svg" alt="" className=' mt-1' />
            <span className=''>{t('Acceptable')}</span>
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
      case "checked_in": // تم الوصول 
        return (
          <div className=' bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/on_going Status.svg" alt="" className=' mt-1' />
              <span className=''>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "not_attend": // لم يحضر
        return (
          <div className=' bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className=' mt-1'/>
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
      }
  };


  return (
    <>
      {getBookingData && getBookingData.length === 0 && (
        <div className='col-span-2 lg1:col-span-3 flex flex-col items-center justify-center py-20 text-center'>
          <img src="/images/icons/empty.svg" alt="empty" className='w-24 h-24 mb-4 opacity-40' onError={(e) => e.target.style.display='none'} />
          {hasActiveFilters &&(
            <>
              <p className='text-[#697586] text-lg font-medium'>{t('لا توجد نتائج')}</p>
              <p className='text-[#9AA4B2] text-sm mt-1'>{t('لا توجد حجوزات تطابق الفلتر المحدد')}</p>
            </>
          ) }
        </div>
      )}

      {getBookingData?.map((booking , index)=>{
        const formatTime = (time) => {
          if (!time) return "--";

          const [hoursStr, minutesStr] = time.split(":");
          let hours = parseInt(hoursStr);
          let minutes = parseInt(minutesStr);

          if (isNaN(hours) || isNaN(minutes)) return "--";

          const period = hours >= 12 ? t('evening') : t('morning');
          hours = hours % 12 || 12;

          return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
        };
      
      return(
        <div
          key={booking?.id}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] mt-6 p-4'
        >
          {/*  */}
          <div className='flex justify-between '>
            {/* name */}
            <div className='flex gap-3'>
              <p className='bg-[#007AFF] text-white text-sm w-11 h-11 flex justify-center items-center rounded-full'>s</p>
              <p className='text-[#364152] text-sm font-medium flex items-center'>{booking?.guest?.name}</p>
            </div>
            {/* status */}
            <div className='flex items-center'>{StatusRender(booking?.status)}</div>
          </div>

        
            {booking?.guest_is_repeated && (
            <>
              <p className='border border-[#4D0CE7] bg-[#EDE7FD] text-[#4D0CE7] h-7.5 px-2  w-fit mt-2 rounded-[3px]'>
                {t('Frequent guest')}
              </p>
            </>
          )}

          {/*  */}
          <div className='flex justify-between mt-6'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#364152] text-base font-normal'>{booking?.property?.title} </p>
              <p className='text-[#697586] text-sm font-normal'>{booking?.property?.city} , {booking?.property?.area}</p>
            </div>
            <p className='text-[#4B5565] text-base font-normal'>{booking?.booking_number}</p>
          </div>

          {/*  */}
          <div className='grid grid-cols-2 gap-4 my-4'>
            <div className='flex flex-col font-normal'>
              <p className='text-[#364152] text-base '>{t('Arrival date')}:</p>
              <p className='text-[#697586] text-sm '>
                {booking?.check_in &&
                new Date(booking.check_in).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className='flex flex-col font-normal'>
              <p className='text-[#364152] text-base '>{t('Departure date')}:</p>
              <p className='text-[#697586] text-sm '>
                {booking?.check_out &&
                  new Date(booking.check_out).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
              </p>

            </div>

            <div className='flex flex-col font-normal'>
              <p className='text-[#364152] text-base '>{t('Guests')}:</p>
              <p className='text-[#697586] text-sm '>{booking?.guest_count_text}</p>
            </div>

            <div className='flex flex-col font-normal '>
              <p className='text-[#364152] text-base '>{t('amount')}:</p>
              <p className='text-[var(--color-primary)] text-sm '>{booking?.total_amount}جنية</p>
            </div>
          </div>

          <div className='flex gap-8 text-base font-normal'>
            <p className='text-[#364152] '>{t('Expected customer arrival time')}:</p>
              <p className='text-[#697586]'>
                {booking?.expected_arrival_at &&
                formatTime(booking.expected_arrival_at)}
              </p>
          </div>
          <div className='bg-[#E3E8EF] h-0.5 my-6'></div>

          <div className='flex justify-between'>
            <button 
              onClick={()=>{
                router.push(`${pathname}?id=${booking?.id}`, { scroll: false })
                setOpenView(true)
              }}
              className='bg-[var(--color-primary)] text-white h-14 w-[70%] rounded-[3px] cursor-pointer'
            >
              {t('Details')}
            </button>
            <div className='flex items-center'>
              <p className='border border-[var(--color-primary)] w-10 h-10 flex items-center justify-center rounded-full cursor-pointer'>
                <img src="/images/icons/chat_yellow.svg" alt="" />
              </p>
            </div>
            
          </div>
          
        </div>

      )})}
      

      <ViewsPage 
        open={openView} 
        setOpen={(val) => {
          setOpenView(val)
          if (!val) {
            router.push(pathname, { scroll: false })
          }
        }} 
        id={urlId} 
      />
    </>
  )
}

export default CardOfRequest