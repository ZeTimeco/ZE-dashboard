'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Card() {
  const {t} = useTranslation()

  const status = 'scheduled'  // instant , scheduled
  
  const handleStatus = ( )=>{
    if(status === 'instant'){
      return (
        <p className='w-fit px-2 py-1 bg-[#FAEFD1] text-primary rounded-full text-xs font-normal'>
          {t('Breaking news now')}
        </p>
      )
    }else if(status === 'scheduled'){
      return (
        <p className='w-fit px-2 py-1 bg-[#E4E4E4] text-[#666] rounded-full text-xs font-normal'>
          {t('tabular')}
        </p>
      )
    }
  }

  return (
    <div className='border border-[#CDD5DF] my-10 p-6 rounded-3px'>
      <div className='grid grid-cols-2 gap-6  '>
        {/* card */} 
        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] p-3 rounded-3px flex flex-col gap-3'>
          {/* ---- */}
          <div className='flex justify-between'>
            <>
              {handleStatus(status)}
            </>
            <p className='text-[#A5A5A5] text-sm font-normal'>الان</p>

          </div>

          {/* ---- */}
          <div  className="w-full text-sm text-gray-700">
            <div className="relative">
              {/* line */}
              <div className="absolute right-1 top-5 h-4.5 w-px bg-gray-300" />

              {/* first step*/}
              <div className="flex items-center gap-1.5  w-full">
                <span className="h-2 w-2 shrink-0 rounded-full border-2 border-emerald-500 bg-white" />
                <span>وسط المدينة، شارع 123، شارع فاين</span>
              </div>

              {/* second step */}
              <div className="mt-4 flex items-center gap-1.5">
                <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                <span>321 شارع بابن، جناح 200</span>
              </div>

            </div>
          </div>


          <div className='border border-[#E3E8EF]'></div>

          {/* ---- */}
          <div className='flex justify-between'>
            {/*  */}
            <div className='flex items-center gap-6'>
              <div className='flex gap-1'>
                <p className=''><img src="/images/icons/pin-location-yellow.svg" alt="" /></p>
                <p className='text-sm text-[#5E5E5E] font-normal'>5.7 كم</p>
              </div>

              <div className='flex gap-1'>
                <p className=''><img src="/images/icons/clock-yellow.svg" alt="" /></p>
                <p className='text-sm text-[#5E5E5E] font-normal'>23 دقيقة</p>
              </div>


            </div>
            {/*  */}
            <div>
              <p className='text-[#3B3B3B] text-sm font-normal'>{t('Wage estimate')}</p>
              <p className='text-primary text-base font-medium'>20.99 ج</p>

            </div>

          </div>


        </div>
      </div>
    </div>
    
  )
}

export default Card