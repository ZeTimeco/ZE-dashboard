

"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function WaitingListPage({getWaitlist}) {
  const{t}  = useTranslation()
  const getWaitlistData = getWaitlist?.data

  return (
  <>
    <div className='flex flex-col gap-4 border border-[#CDD5DF] p-6 rounded-[3px]'>

      <div className='flex justify-between mb-2'>
        <p className='text-[#0F022E] text-xl font-medium mb-1'>
          {t('waiting list')}
        </p>

        <button className='flex gap-2 mt-1 cursor-pointer text-[var(--color-primary)] text-base font-normal'>
          {t('More')}
        </button>
      </div>

      {getWaitlistData?.map((Waitlist)=>{
        const minutes = Waitlist?.avg_wait_time;

        return(
          <div key={Waitlist?.id} className='border border-[#E3E8EF] p-3 '>
            <div className='flex justify-between items-center'>

              {/* Left Content */}
              <div className='flex gap-3 items-center'>

                <p className='w-10 h-10 bg-[#F79009] rounded-full flex items-center justify-center'>
                  <span className='text-[#FCFCFD] text-base font-normal mt-1'>
                    {Waitlist?.guest_name?.charAt(0)}
                  </span>
                </p>

                <p className='text-[#364152] text-base font-medium'>
                  {Waitlist?.guest_name}
                </p>
              </div>

              {/* time */}
              <p className={`${minutes < 15 ? "text-[#17B26A]" : "text-[#F04438]"}`}>
                {minutes} {t('minute')}
              </p>

            </div>

            <p className='text-[#697586] text-base font-normal mr-12.5'>
              <span>{Waitlist?.guest_count}</span> {' '}
              <span>{t('People')}</span>
            </p>

          </div>
        )})}
    </div>
  </>
  )
}

export default WaitingListPage