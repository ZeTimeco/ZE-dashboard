"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function RequestPage({ getBookingDetails }) {
  const { t } = useTranslation()
  const getBookingDetailsData = getBookingDetails?.data
  const status = getBookingDetailsData?.status

  const StatusRender = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs sm:text-sm font-medium'>{t('Acceptable')}</span>
            </div>
          </div>
        );
      case "completed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs sm:text-sm font-medium'>{t('Complete')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/pending Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs sm:text-sm font-medium'>{t('Pending')}</span>
            </div>
          </div>
        );
      case "checked_in":
        return (
          <div className='bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/on_going Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs sm:text-sm font-medium'>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "not_attend":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs sm:text-sm font-medium'>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit rounded-3xl shadow-xs'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('cancelled')}</span>
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
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] p-4 mb-4 mt-6 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <div className='flex justify-between items-center'>
          <p className='text-[#697586] text-sm font-medium'>{t('to request')}/{getBookingDetailsData?.booking_number}</p>        
          <div>{StatusRender(status)}</div>
        </div>

        {status === 'pending' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className='flex items-center gap-2 border border-[#FDB022] bg-[#FFFCF5] p-3 mt-4 rounded-[3px] shadow-xs'
          >
            <img src="/images/icons/clock_orange_bold.svg" alt="" className='w-5 h-5' />
            <p className='text-[#DC6803] text-sm font-medium'>{t('Please review the request and respond immediately.')}</p>
          </motion.div>
        )}

        <div className='border-b border-[#E3E8EF] my-4'></div>

        <div>
          <p className='text-[#364152] text-lg font-medium'>{t('The reservation was made in')} : </p>
          <div className='mt-3 grid grid-cols-2 gap-2'>
            <div className='flex items-center gap-2'>
              <img src="/images/icons/calendar_blue.svg" alt="" className='w-5 h-5' />
              <p className='text-[#4B5565] text-base font-medium'>
                {getBookingDetailsData?.created_at &&
                  new Date(getBookingDetailsData.created_at).toLocaleDateString("ar-EG", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <img src="/images/icons/clock-blue.svg" alt="" className='w-5 h-5' />
              <p className='text-[#4B5565] text-base font-medium'>
                {getBookingDetailsData?.created_at &&
                  formatTime(getBookingDetailsData.created_at)}
              </p>
            </div>
          </div>

          {/* Stat boxes */}
          <div className='grid grid-cols-3 gap-3 mt-5'>
            {/* Adults */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className='flex flex-col items-center py-4 border border-[#EEF2F6] bg-slate-50/50 rounded-[14px] shadow-2xs transition-colors hover:bg-white'
            >
              <p className='w-10 h-10 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center rounded-full shadow-xs'>
                <img src="/images/icons/user-blue.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Adults')}</p>
              <p className='text-[#0B0E11] text-xl font-semibold mt-0.5'>{getBookingDetailsData?.adults}</p>
            </motion.div>

            {/* Children */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className='flex flex-col items-center py-4 border border-[#EEF2F6] bg-slate-50/50 rounded-[14px] shadow-2xs transition-colors hover:bg-white'
            >
              <p className='w-10 h-10 bg-gradient-to-br from-[#FCE7F3] to-[#FBCFE8] flex items-center justify-center rounded-full shadow-xs'>
                <img src="/images/icons/Baby-pink.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('children')}</p>
              <p className='text-[#0B0E11] text-xl font-semibold mt-0.5'>{getBookingDetailsData?.children}</p>
            </motion.div>

            {/* Nights */}
            <motion.div 
              whileHover={{ y: -3, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className='flex flex-col items-center py-4 border border-[#EEF2F6] bg-slate-50/50 rounded-[14px] shadow-2xs transition-colors hover:bg-white'
            >
              <p className='w-10 h-10 bg-gradient-to-br from-[#DBEAFE] to-[#BFDBFE] flex items-center justify-center rounded-full shadow-xs'>
                <img src="/images/icons/Moon-blue.svg" alt="" />
              </p>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('nights')}</p>
              <p className='text-[#0B0E11] text-xl font-semibold mt-0.5'>{getBookingDetailsData?.nights}</p>
            </motion.div>
          </div>
        </div>

        <div className='border-b border-[#E3E8EF] my-4'></div>

        <div className='grid grid-cols-2 gap-4'>
          <div className='text-base font-normal'>
            <p className='text-[#697586] text-xs mb-1'>{t('Arrival date')}:</p>
            <p className='text-[#364152] text-sm font-medium'>
              {getBookingDetailsData?.check_in &&
              new Date(getBookingDetailsData.check_in).toLocaleDateString("ar-EG", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div className='text-base font-normal'>
            <p className='text-[#697586] text-xs mb-1'>{t('Departure date')}:</p>
            <p className='text-[#364152] text-sm font-medium'>
              {getBookingDetailsData?.check_out &&
                new Date(getBookingDetailsData.check_out).toLocaleDateString("ar-EG", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className='text-base font-normal grid grid-cols-2 mt-4 pt-3 border-t border-[#EEF2F6]'>
          <p className='text-[#364152] text-sm font-medium'>{t('Expected guest arrival time')}:</p>
          <p className='text-[#697586] text-sm font-normal'>
            {getBookingDetailsData?.expected_arrival_at &&
              formatTime(getBookingDetailsData.expected_arrival_at)}
          </p>
        </div>
      </div>
    </>
  )
}

export default RequestPage