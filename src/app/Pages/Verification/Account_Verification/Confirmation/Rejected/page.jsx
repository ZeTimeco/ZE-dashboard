

'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'next/navigation'
import HiddenItemsLayout from '@/app/Components/MainLayout/HiddenItemsLayout'

function RejectedContent() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const [copied, setCopied] = useState(false)
  const [formattedDate, setFormattedDate] = useState('12 سبتمبر 2025 - 10:24 ص')

  const orderNumber = searchParams?.get('order_id') || '#10258'

  useEffect(() => {
    try {
      const now = new Date()
      const months = [
        'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
        'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
      ]
      const day = now.getDate()
      const month = months[now.getMonth()]
      const year = now.getFullYear()
      let hours = now.getHours()
      const minutes = String(now.getMinutes()).padStart(2, '0')
      const ampm = hours >= 12 ? 'م' : 'ص'
      hours = hours % 12 || 12
      setFormattedDate(`${day} ${month} ${year} - ${hours}:${minutes} ${ampm}`)
    } catch {
      // fallback
    }
  }, [])

  const handleCopy = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(orderNumber.replace('#', ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <HiddenItemsLayout>
      <div className="w-full mx-auto py-4">
        {/* Figma Node 14048:189442: Card Container */}
        <div className="bg-[#FDF7E8] border border-primary rounded-3px p-4 md:p-6 flex flex-col gap-6 w-full shadow-xs">
          
          {/* Top Section */}
          <div className="flex flex-col gap-6 w-full">
            {/* Header Row: Title & Status Badge */}
            <div className="flex items-center justify-between w-full">
              {/* Title */}
              <h1 className="text-[#171202] text-xl md:text-2xl font-bold text-right whitespace-nowrap">
                {t('Account verification request')}
              </h1>
              {/* Status Badge (State: Under review) */}
              <div className="bg-[#FEE4E2] border border-[#F97066] rounded-full h-[30px] px-3 flex items-center gap-1.5 shrink-0">
                <span className="text-[#D92D20] text-sm md:text-base font-medium whitespace-nowrap">
                  {t('rejected')}
                </span>
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <img src="/images/icons/cancel-circle-redd.svg" alt="" />
                </div>
              </div>
            </div>

            {/* Visual Graphic & Description */}
            <div className="flex flex-col items-center justify-center gap-3 w-full py-4">
              {/* Document & Clock Badge Visual Graphic */}
              <div className="relative bg-white border border-[#F7EED3] rounded-2xl w-[90px] h-[90px] flex items-center justify-center shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
                {/* File Sync Graphic */}
                <img src="/images/icons/file-sync.svg" alt="" />

                {/* Clock Badge Overlay */}
                <div className="absolute -bottom-2 -left-1 bg-[#e11d48] border-2 border-white rounded-full w-6 h-6 flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                  <img src="/images/icons/x_white.svg" alt="" />
                </div>
              </div>

              {/* Description Text */}
              <p className="text-[#1F2937] text-base text-center font-bold">
                {t("We regret that the authentication request could not be accepted due to comments on the documents.")}
              </p>
              <p className="text-[#6B7280] text-base text-center font-normal">{t('Please review the reason for rejection and update the data for re-examination.')}</p>
            </div>


            {/* resson */}
            <div className='border border-[#FECDD3E5] bg-[#FFF1F2CC] p-3 rounded-3px'>
              <p className='flex gap-2'>
                <img src="/images/icons/!_red.svg" alt="" />
                <span className='text-[#DA5305] text-base font-semibold'>{t('Reason for rejection')} : </span>
              </p>
              <p className='text-[#F25C05] text-base font-normal mt-1'>عدم وضوح صورة السجل التجاري وانقضاء تاريخ صلاحية بطاقة الهوية الوطنية المرفقة.</p>
            </div>
          </div>

          {/* Footer: Order Number & Timestamp */}
          <div className="border-t border-[#DDDDDD] pt-4 flex flex-col gap-3  w-full">
            {/* Request Number Capsule */}
            <div className="flex items-center gap-2">
              
              {/* Label */}
              <span className="text-[#78716C] text-base font-medium ">
                {t('order number')}:
              </span>

              {/* Copy Order Number Button */}
              <button
                type="button"
                onClick={handleCopy}
                title={t('Copy order number')}
                className="bg-white border border-[#E7E5E4E5] rounded-lg px-3.5 py-1.5 flex items-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-primary/50 transition-colors"
              >
                <span className="text-[#1C1917] text-base font-medium tracking-[0.35px]">
                  {orderNumber}
                </span>
                <img
                  src="/images/icons/copy.svg"
                  alt="copy"
                  className="w-4 h-4 text-[#4B5565] shrink-0"
                />
              </button> 

              {/* Copied Feedback Message */}
              <span
                className={`text-[#A67C27] text-xs font-medium transition-opacity duration-20 ${
                  copied ? 'opacity-50' : 'opacity-0'
                }`}
              >
                {t('Copy')}
              </span>
            </div>

            {/* Timestamp Indicator */}
            <div className="flex items-center gap-1.5">
              <img src="/images/icons/timer.svg" alt="" />
              <span className="text-[#78716C] text-base font-medium">
                {t('Sent in')} {formattedDate}
              </span>
            
            </div>

            {/* Timestamp Indicator */}
            <div className="flex items-center gap-1.5">
              <img src="/images/icons/clock_red.svg" alt="" />
              <span className="text-[#F25C05] text-base font-medium">
                {t('Date of observation')} {formattedDate}
              </span>
            
            </div>
          </div>
        </div>
      </div>
    </HiddenItemsLayout>
  )
}

function RejectedPage() {
  return (
    <Suspense fallback={null}>
      <RejectedContent />
    </Suspense>
  )
}

export default RejectedPage