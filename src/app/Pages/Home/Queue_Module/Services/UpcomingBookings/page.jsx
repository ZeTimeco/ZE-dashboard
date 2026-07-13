"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from '@/app/Pages/requests/Queue_Module/Dialog/Details/page'

function UpcomingBookingsPage({getUpcoming}) {
  const{t}  = useTranslation()
  const getUpcomingData = getUpcoming?.data
  const router = useRouter()
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)

  return (
  <>

    <div className='flex flex-col gap-4 border border-[#CDD5DF] p-6 rounded-[3px]'>

      <div className='flex justify-between mb-2'>
        <p className='text-[#0F022E] text-xl font-medium mb-1'>
          {t('Upcoming bookingss')}
        </p>

        <button 
          onClick={()=>router.push(`/Pages/requests/Queue_Module`)}
          className='flex gap-2 mt-1 cursor-pointer text-[var(--color-primary)] text-base font-normal'>
          {t('More')}
        </button>
      </div>
    {getUpcomingData?.map((Upcoming)=>(
      <div 
        key={Upcoming?.id}
        className='border border-[#E3E8EF] p-3 '>
        <div className='flex justify-between items-center'>

          {/* Left Content */}
          <div className='flex gap-3 items-center'>

            <p className='w-10 h-10 bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] rounded-[3px] flex items-center justify-center'>
              <span className='text-[#FCFCFD] text-base font-normal'>
                {Upcoming?.guest_name.charAt(0)}
              </span>
            </p>

            <div>
              <p className='text-[#364152] text-base font-medium'>
                {Upcoming?.guest_name}
              </p>

              <div className='flex gap-10'>
                
                <div className='flex items-center gap-1'>
                  <img src="/images/icons/" alt="" />

                  <p className='text-[#697586] text-base font-normal'>
                    <span>{Upcoming?.guest_count} </span>
                    <span>{t('guests')}</span>
                  </p>
                </div>

                <p className='text-[#697586] text-base font-normal'>
                  {Upcoming?.reservation_date}
                </p>

              </div>
            </div>
          </div>

          {/* Arrow Button */}
          <button 
            onClick={()=>{
              setSelectedReservation(Upcoming);
              setOpenDetails(true);
            }}
            className='bg-[#EEF2F6] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer'>
            <img src="/images/icons/arrow-right-blackk.svg" alt="" />
          </button>

        </div>
      </div>
    ))}
    </div>

    {openDetails && (
      <DetailsPage 
        open={openDetails} 
        setOpen={setOpenDetails} 
        reservationData={selectedReservation} 
      />
    )}
  </>
  )
}

export default UpcomingBookingsPage