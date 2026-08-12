'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Rating() {
  const { t } = useTranslation()

  const timeSlots = [
    { label: '12:00 - 14:00', count: 15, percent: 33, progress: 33 },
    { label: '19:00 - 21:00', count: 12, percent: 27, progress: 27 },
    { label: '14:00 - 16:00', count: 15, percent: 100, progress: 100 },
    { label: t('Other'),      count: 4,  percent: 9,  progress: 9  },
  ]

  return (
    <div className='bg-white shadow-[0_0_2px_rgba(0,0,0,0.2)] rounded-[3px] p-4 flex flex-col gap-4 w-full'>

      {/* Header */}
      <div className='flex items-center  gap-2'>
        <img src="/images/icons/clock.svg" className='w-5 h-5' alt="" />
        <p className='text-[#0B0E11] text-base font-medium'>{t('Orders by time')}</p>
      </div>

      {/* Progress bars */}
      <div className='flex flex-col gap-4'>
        {timeSlots.map((slot, index) => (
          <div key={index} className='flex flex-col gap-2'>
            {/* Labels row */}
            <div className='flex items-center justify-between'>
              
              {/* Time label */}
              <p className='text-[#0B0E11] text-sm font-normal'>{slot.label}</p>
              {/* Indicator */}
              <p className='text-[#4B5565] text-sm font-normal'>
                (%{slot.percent}) {slot.count} 
              </p>
            </div>

            {/* Progress track */}
            <div className='bg-[#EBEBEF] h-2 rounded-full overflow-hidden w-full'>
              <div
                className='h-full bg-[var(--color-primary)] rounded-full'
                style={{ width: `${slot.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Rating