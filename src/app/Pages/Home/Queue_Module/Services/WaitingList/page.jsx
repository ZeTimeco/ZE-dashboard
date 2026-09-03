

"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

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

function WaitingListPage({getWaitlist}) {
  const{t}  = useTranslation()
  const getWaitlistData = getWaitlist?.data
  const router = useRouter()

  return (
  <>
    <div className='flex flex-col gap-4 border border-[#CDD5DF] p-6 rounded-3px bg-white transition-shadow duration-300'>

      <div className='flex justify-between items-center mb-2'>
        <p className='text-[#0F022E] text-xl font-medium mb-1'>
          {t('waiting list')}
        </p>

        <button 
          onClick={()=>router.push(`/Pages/Pending_List`)}
          className='flex items-center gap-1.5 cursor-pointer text-[var(--color-primary)] text-base font-normal hover:opacity-80 active:scale-95 transition-all duration-200'>
          <span>{t('More')}</span>
        </button>
      </div>

      <motion.div 
        variants={listContainer}
        initial="hidden"
        animate="show"
        className='flex flex-col gap-3'
      >
        {getWaitlistData?.map((Waitlist)=>{
          const minutes = Waitlist?.avg_wait_time;

          return(
            <motion.div 
              key={Waitlist?.id} 
              variants={listItem}
              whileHover={{ y: -1 }}
              className='group border border-[#E3E8EF] hover:border-[#B0BCCB] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] p-3 rounded-3px bg-white transition-all duration-200'
            >
              <div className='flex justify-between items-center'>

                {/* Left Content */}
                <div className='flex gap-3 items-center'>

                  <p className='w-10 h-10 bg-[#F79009] rounded-full flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform duration-200'>
                    <span className='text-[#FCFCFD] text-base font-medium'>
                      {Waitlist?.guest_name?.charAt(0)}
                    </span>
                  </p>

                  <p className='text-[#364152] text-base font-medium group-hover:text-[#121926] transition-colors duration-200'>
                    {Waitlist?.guest_name}
                  </p>
                </div>

                {/* time */}
                <p className={`font-medium text-sm sm:text-base px-2 py-0.5 rounded-full ${minutes < 15 ? "text-[#17B26A] bg-[#ECFDF3]" : "text-[#F04438] bg-[#FEF3F2]"}`}>
                  {minutes} {t('minute')}
                </p>

              </div>

              <p className='text-[#697586] text-base font-normal mr-12.5 mt-1'>
                <span>{Waitlist?.guest_count}</span> {' '}
                <span>{t('People')}</span>
              </p>

            </motion.div>
          )})}
      </motion.div>
    </div>
  </>
  )
}

export default WaitingListPage