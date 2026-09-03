"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import DetailsPage from '@/app/Pages/requests/Queue_Module/Dialog/Details/page'

const listContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
}

function UpcomingBookingsPage({getUpcoming}) {
  const{t}  = useTranslation()
  const getUpcomingData = getUpcoming?.data
  const router = useRouter()
  const [openDetails, setOpenDetails] = useState(false)
  const [selectedReservation, setSelectedReservation] = useState(null)

  return (
  <>
    <div className='flex flex-col gap-4 border border-[#CDD5DF] p-6 rounded-3px bg-white transition-shadow duration-300'>

      <div className='flex justify-between items-center mb-2'>
        <p className='text-[#0F022E] text-xl font-medium mb-1'>
          {t('Upcoming bookingss')}
        </p>

        <button 
          onClick={()=>router.push(`/Pages/requests/Queue_Module`)}
          className='flex items-center gap-1.5 cursor-pointer text-primary text-base font-normal hover:opacity-80 active:scale-95 transition-all duration-200'>
          <span>{t('More')}</span>
        </button>
      </div>

      <motion.div 
        variants={listContainer}
        initial="hidden"
        animate="show"
        className='flex flex-col gap-3'
      >
        {getUpcomingData?.map((Upcoming)=>(
          <motion.div 
            key={Upcoming?.id}
            variants={listItem}
            whileHover={{ y: -1 }}
            className='group border border-[#E3E8EF] hover:border-[#B0BCCB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-3 rounded-3px bg-white transition-all duration-200'
          >
            <div className='flex justify-between items-center'>

              {/* Left Content */}
              <div className='flex gap-3 items-center'>

                <p className='w-10 h-10 bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] rounded-3px flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200'>
                  <span className='text-[#FCFCFD] text-base font-medium'>
                    {Upcoming?.guest_name?.charAt(0)}
                  </span>
                </p>

                <div>
                  <p className='text-[#364152] text-base font-medium group-hover:text-[#121926] transition-colors duration-200'>
                    {Upcoming?.guest_name}
                  </p>

                  <div className='flex gap-6 sm:gap-10 flex-wrap'>
                    
                    <div className='flex items-center gap-1'>
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
              <motion.button 
                whileHover={{ scale: 1.08, x: 2 }}
                whileTap={{ scale: 0.92 }}
                onClick={()=>{
                  setSelectedReservation(Upcoming);
                  setOpenDetails(true);
                }}
                className='bg-[#EEF2F6] hover:bg-[#E3E8EF] active:bg-[#CDD5DF] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200 shrink-0'
              >
                <img src="/images/icons/arrow-right-blackk.svg" alt="" className='w-4 h-4' />
              </motion.button>

            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>

    <AnimatePresence>
      {openDetails && (
        <DetailsPage 
          open={openDetails} 
          setOpen={setOpenDetails} 
          reservationData={selectedReservation} 
        />
      )}
    </AnimatePresence>
  </>
  )
}

export default UpcomingBookingsPage