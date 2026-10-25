'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter, useSearchParams } from 'next/navigation'
import HiddenItemsLayout from '@/app/Components/MainLayout/HiddenItemsLayout'
import { routerServerGlobal } from 'next/dist/server/lib/router-utils/router-server-context'

function WaitingContent() {
  const { t } = useTranslation()
  const searchParams = useSearchParams()
  const router = useRouter()
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
              <div className="bg-[#FFFAEB] border border-[#F79009] rounded-full h-[30px] px-3 flex items-center gap-1.5 shrink-0">
                <span className="text-[#DC6803] text-sm md:text-base font-medium whitespace-nowrap">
                  {t('Under review')}
                </span>
                <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                  <svg
                    className="w-3.5 h-3.5 text-[#DC6803] animate-spin"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="6"
                      stroke="#F79009"
                      strokeWidth="2"
                      strokeDasharray="14 10"
                      strokeLinecap="round"
                    />
                  </svg>
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
                <div className="absolute -bottom-2 -left-1 bg-primary border-2 border-white rounded-full w-6 h-6 flex items-center justify-center shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]">
                  <img src="/images/icons/clock_yellow.svg" alt="" />
                </div>
              </div>

              {/* Description Text */}
              <p className="text-[#57534E] text-base text-center w-[50%] leading-[23px] font-normal">
                {t("Your request has been successfully received and is currently being reviewed by our team. We will notify you as soon as the review is complete.")}
              </p>
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
          </div>
        </div>
      </div>


      {/* btn rejected */}
      <button onClick={()=>{router.push('/Pages/Verification/Account_Verification/Confirmation/Rejected')}} className='border'>reject</button>
    </HiddenItemsLayout>
  )
}

function WaitingPage() {
  return (
    <Suspense fallback={null}>
      <WaitingContent />
    </Suspense>
  )
}

export default WaitingPage