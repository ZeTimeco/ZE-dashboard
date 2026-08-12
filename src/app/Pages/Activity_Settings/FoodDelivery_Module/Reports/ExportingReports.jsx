import React from 'react'
import { useTranslation } from 'react-i18next'

function ExportingReports() {
  const {t} = useTranslation()
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        {/* Header */}
        <div className='flex items-center  gap-2'>
          <img src="/images/icons/document-attachment_gray.svg" className='w-5 h-5' alt="" />
          <p className='text-[#0B0E11] text-base font-medium'>{t('Orders by time')}</p>
        </div>


          <div className='border border-[#CDD5DF] rounded-[3px] p-3 mt-4 flex justify-between'>
            <p>تصدير كملف Excel</p>
            <button className='cursor-pointer'>
              <img src="/images/icons/download-yellow.svg"  />
            </button>
          </div>
      </div>


      {/* note */}
      <div className='border  border-[#EEF2F6] bg-[#F8FAFC] rounded-[3px] p-3 flex gap-2'>
        <p>
          <img src="/images/icons/calendar-yellow2.svg" alt="" />
        </p>
        <div className='flex flex-col gap-1'>
          <p className='text-[#364152] text-base font-medium'>{t('Last update')}</p>
          <p className='text-[#697586] text-sm font-normal'>اليوم في 2:30 م</p>
        </div>
      </div>
    </>
  )
}

export default ExportingReports