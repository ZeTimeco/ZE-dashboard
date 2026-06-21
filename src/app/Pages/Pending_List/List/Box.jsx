import React from 'react'
import { useTranslation } from 'react-i18next'

function Box({getwaitlistAnalysis}) {
  const {t} = useTranslation()
  const getwaitlistAnalysisData = getwaitlistAnalysis?.data
  return (
    <>

    <div className='my-12 grid grid-cols-3 gap-6'>
      {/* Expected guests */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex justify-between'>
          <div className='flex items-center gap-2 w-[60%]'>
            <p className=' w-10 h-10 flex justify-center items-center bg-[#F4EAD0] rounded-md'>
              <img src="/images/icons/user-group_yellow.svg" alt="" />
            </p>
            <p className='text-[#4B5565] text-base font-normal'>{t('Expected guests')}</p>
          </div>
          <div className='w-[40%]  flex justify-end'>
            <p className='bg-[#F9F5E8] text-[var(--color-primary)] w-fit flex items-center py-1.5 px-2 rounded-full'>
              <img src="/images/icons/tick-yellow.svg" className="w-6 h-6" />
              <span className='text-sm'>{t('Active list')}</span>
            </p>
          </div>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>
          <span>{getwaitlistAnalysisData?.waitinglist_count}</span> <span>{t('during')}</span>  {' '}
          <span>3</span>  <span>{t('past hours')}</span>
        </p>
      </div>

      {/* Average wait time */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#FEF0C7] rounded-md'>
            <img src="/images/icons/clock_orange.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Average wait time')}</p>
        </div>
        <p className=' text-lg  my-2.5'>
          <span className='text-[#202939] font-medium'>{getwaitlistAnalysisData?.avg_wait_time}</span> 
          <span className='text-[#4B5565] font-normal '>{t('minute')}</span>
        </p>
      </div>

      {/* Ready for the seat */}
      <div className=' border border-[#CDD5DF] rounded-[3px] p-4'>
        <div className='flex items-center gap-3'>
          <p className=' w-10 h-10 flex justify-center items-center bg-[#EDE7FD] rounded-md'>
            <img src="/images/icons/checkmark-circle-blue.svg" alt="" />
          </p>
          <p className='text-[#4B5565] text-base font-normal'>{t('Ready for the seat')}</p>
        </div>
        <p className='text-[#202939] text-lg font-medium my-2.5'>{getwaitlistAnalysisData?.available_tables}</p>
      </div>

    </div>

    </>
  )
}

export default Box