"ue client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function BoxPage({getReservationsSummary}) {
  const {t} = useTranslation()

  return (
    <>
      <section className='mb-10 grid grid-cols-3 lg1:grid-cols-3 gap-4 '>

      {/* today */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#F4EAD0] rounded-md'>
            <img src="/images/icons/calendar-true_yellow.svg" className="w-5 h-5" />
          </p>
          <p className='text-[#4B5565] text-xl font-normal'>{t('today')}</p>
        </div>
        <p className='text-[#121926] text-2xl font-medium  my-2.5'>{getReservationsSummary?.today}</p>
      </div>
    
      {/*Coming*/}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#DBCEFA] rounded-md'>
            <img src="/images/icons/date-time_blue.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-xl font-normal'>{t('Coming')}</p>
        </div>
        <p className=' my-2.5'>
          <span className='text-[#121926] text-2xl font-medium '>{getReservationsSummary?.upcoming}</span> {' '}
          <span className='text-[#4B5565] text-base font-normal'>{t('minute')}</span></p>
      
      </div>

      {/*late*/}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEE4E2] rounded-md'>
            <img src="/images/icons/calendar-remove-red2.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-xl font-normal'>{t('Late')}</p>
        </div>
        <p className='text-[#121926] text-2xl font-medium my-2.5'>{getReservationsSummary?.late}</p>
      </div>

      


    </section>

    </>
  )
}

export default BoxPage