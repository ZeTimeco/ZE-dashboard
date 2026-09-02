"use client"
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import ViewsPage from './Views/page';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function CardOfRequest({ getBooking, hasActiveFilters }) {
  const { t } = useTranslation()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlId = searchParams.get('id')

  const getBookingData = Array.isArray(getBooking) ? getBooking : getBooking?.data

  const [openView, setOpenView] = useState(false)

  useEffect(() => {
    if (urlId) {
      setOpenView(true)
    } else {
      setOpenView(false)
    }
  }, [urlId])

  const StatusRender = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('Acceptable')}</span>
            </div>
          </div>
        );
      case "completed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('Complete')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/pending Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('Pending')}</span>
            </div>
          </div>
        );
      case "checked_in":
        return (
          <div className='bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/on_going Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "not_attend":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('cancelled')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

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

  return (
    <>
      {getBookingData && getBookingData.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className='col-span-2 lg1:col-span-3 flex flex-col items-center justify-center py-20 px-4 text-center bg-white  rounded-[4px] shadow-xs'
        >
          <div className='w-20 h-20 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-4 shadow-inner'>
            <img 
              src="/images/icons/Invoice_Orange.svg" 
              alt="empty" 
              className='w-10 h-10 opacity-50' 
              onError={(e) => { e.target.style.display = 'none' }} 
            />
          </div>
          {hasActiveFilters ? (
            <>
              <p className='text-[#364152] text-lg font-semibold'>لا توجد نتائج</p>
              <p className='text-[#697586] text-sm mt-1 max-w-md'>لا توجد حجوزات تطابق الفلتر المحدد</p>
            </>
          ) : (
            <>
              <p className='text-[#364152] text-lg font-semibold'>لا توجد طلبات</p>
              <p className='text-[#697586] text-sm mt-1 max-w-md'>لا توجد أي طلبات أو حجوزات حالياً</p>
            </>
          )}
        </motion.div>
      )}

      {getBookingData?.map((booking, index) => (
        <motion.div
          key={booking?.id || index}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05, ease: 'easeOut' }}
          whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
          className='group bg-white border border-slate-100 shadow-[0_0_4px_0_rgba(0,0,0,0.15)] rounded-[3px] p-5 transition-all duration-300'
        >
          {/* Header */}
          <div className='flex justify-between items-center'>
            {/* name */}
            <div className='flex items-center gap-3'>
              <p className='bg-[#007AFF] text-white text-sm font-semibold w-11 h-11 flex justify-center items-center rounded-full shadow-xs'>
                {booking?.guest?.name ? booking.guest.name.charAt(0) : 'U'}
              </p>
              <p className='text-[#364152] text-sm font-medium group-hover:text-black transition-colors'>
                {booking?.guest?.name}
              </p>
            </div>
            {/* status */}
            <div className='flex items-center'>{StatusRender(booking?.status)}</div>
          </div>

          {booking?.guest_is_repeated && (
            <p className='border border-[#4D0CE7] bg-[#EDE7FD] text-[#4D0CE7] text-xs font-medium h-7.5 px-2.5 flex items-center w-fit mt-3 rounded-[3px] shadow-xs'>
              {t('Frequent guest')}
            </p>
          )}

          {/* Property Info */}
          <div className='flex justify-between items-start mt-5'>
            <div className='flex flex-col gap-1'>
              <p className='text-[#364152] text-base font-semibold group-hover:text-black transition-colors'>
                {booking?.property?.title}
              </p>
              <p className='text-[#697586] text-sm font-normal'>
                {booking?.property?.city} , {booking?.property?.area}
              </p>
            </div>
            <p className='text-[#4B5565] text-sm font-medium bg-slate-50 px-2 py-1 rounded-[2px] border border-slate-200/60'>
              {booking?.booking_number}
            </p>
          </div>

          {/* Details Grid */}
          <div className='grid grid-cols-2 gap-4 my-4 p-3 bg-slate-50/50 rounded-[3px] border border-slate-100'>
            <div className='flex flex-col font-normal'>
              <p className='text-[#697586] text-xs mb-0.5'>{t('Arrival date')}:</p>
              <p className='text-[#364152] text-sm font-medium'>
                {booking?.check_in &&
                new Date(booking.check_in).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className='flex flex-col font-normal'>
              <p className='text-[#697586] text-xs mb-0.5'>{t('Departure date')}:</p>
              <p className='text-[#364152] text-sm font-medium'>
                {booking?.check_out &&
                  new Date(booking.check_out).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
              </p>
            </div>

            <div className='flex flex-col font-normal'>
              <p className='text-[#697586] text-xs mb-0.5'>{t('Guests')}:</p>
              <p className='text-[#364152] text-sm font-medium'>{booking?.guest_count_text}</p>
            </div>

            <div className='flex flex-col font-normal'>
              <p className='text-[#697586] text-xs mb-0.5'>{t('amount')}:</p>
              <p className='text-[var(--color-primary)] text-sm font-semibold'>{booking?.total_amount} جنية</p>
            </div>
          </div>

          <div className='flex items-center justify-between text-sm font-normal my-3 px-1'>
            <p className='text-[#364152] font-medium'>{t('Expected customer arrival time')}:</p>
            <p className='text-[#697586] font-normal'>
              {booking?.expected_arrival_at ? formatTime(booking.expected_arrival_at) : '--'}
            </p>
          </div>

          <div className='bg-[#E3E8EF]/70 h-[1px] my-4'></div>

          <div className='flex justify-between items-center gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              onClick={() => {
                router.push(`${pathname}?id=${booking?.id}`, { scroll: false })
                setOpenView(true)
              }}
              className='bg-[var(--color-primary)] text-white text-base font-medium h-12 flex-1 rounded-[3px] cursor-pointer transition-colors duration-200'
            >
              {t('Details')}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.08, borderColor: 'var(--color-primary)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className='border border-[var(--color-primary)] w-12 h-12 flex items-center justify-center rounded-[3px] cursor-pointer hover:bg-amber-50/40 transition-colors'
            >
              <img src="/images/icons/chat_yellow.svg" alt="" className='w-5 h-5' />
            </motion.button>
          </div>
        </motion.div>
      ))}

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