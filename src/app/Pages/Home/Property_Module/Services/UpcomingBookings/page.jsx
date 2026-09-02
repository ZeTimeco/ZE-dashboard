"use client"
import { useRouter } from 'next/navigation';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function UpcomingBookingsPage({ topThreeBookings }) {
  const { t } = useTranslation()
  const router = useRouter()
  
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('confirmed')}</span>
            </div>
          </div>
        );
      case "completed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('Complete')}</span>
            </div>
          </div>
        );
      case "checked_in":
        return (
          <div className='bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/cargray.svg" alt="" className='w-4 h-4 mt-0.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('checked_in')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/pending Status.svg" alt="" className='w-4 h-4 mt-0.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('Pending')}</span>
            </div>
          </div>
        );
      case "not_attend":
        return (
          <div className='bg-[#DBCEFA] border border-[#4D0CE7] text-[#4D0CE7] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/remove-circle_blue.svg" alt="" className='w-4 h-4 mt-0.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('cancelled')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex flex-col'>
        <div className='flex justify-between items-center mb-5'>
          <p className='text-[#0F022E] text-xl font-medium mb-1'>{t('Upcoming bookings')}</p>
          <motion.button 
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/Pages/requests/Property_Module')}
            className='flex gap-2 cursor-pointer text-[var(--color-primary)] text-base font-medium hover:underline transition-all'
          >
            {t('More')}
          </motion.button>
        </div>

        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.15)] bg-white border border-slate-100 p-4 mb-10 rounded-[3px] transition-shadow duration-300 hover:shadow-md'>
          {topThreeBookings?.map((booking, index) => (
            <div key={index} className='group py-2 px-1 rounded-[2px] transition-colors duration-200 hover:bg-slate-50/70'>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center gap-2.5'>
                  <p className='w-9 h-9 flex items-center justify-center bg-[#007AFF] text-white rounded-full font-medium shadow-xs'>
                    {booking?.guest?.name?.charAt(0)}
                  </p>
                  <p className='text-[#364152] text-sm font-medium group-hover:text-slate-900 transition-colors'>
                    {booking?.guest?.name}
                  </p>
                </div>
                <div>{StatusRender(booking?.status)}</div>
              </div>

              <div className='flex justify-between items-center'>
                <p className='text-[#232323] text-sm font-normal w-[65%] truncate'>
                  {booking?.property?.title}
                </p>
                <p className='flex justify-end text-[#4B5565] text-xs lg1:text-sm font-normal w-[35%]'>
                  {new Date(booking?.check_in).toLocaleDateString('ar-EG', {
                    day: 'numeric',
                    month: 'long',
                  })}
                  {' : '}
                  {new Date(booking?.check_out).toLocaleDateString('ar-EG', {
                    day: 'numeric',
                    month: 'long',
                  })}
                </p>
              </div>

              {index !== topThreeBookings.length - 1 && (
                <div className='border-b border-[#CDD5DF]/60 my-4'></div>
              )}      
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default UpcomingBookingsPage