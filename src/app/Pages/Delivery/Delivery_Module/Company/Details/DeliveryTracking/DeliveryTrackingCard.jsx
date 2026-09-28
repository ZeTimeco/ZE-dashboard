'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

export default function DeliveryTrackingCard({ className = '' }) {
  const { t } = useTranslation()

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`} dir="rtl">
      {/* ── 1. Driver Profile Card ─────────────────────────── */}
      <div className="bg-white border border-[#D6D6D6] rounded-3px p-3 flex items-center justify-between w-full">
        {/* Driver details + avatar (Right in RTL) */}
        <div className="flex items-center gap-2.5">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-full bg-[#EAEAEA] flex items-center justify-center shrink-0">
            <img src="/images/icons/user_gray.svg" alt="" />
          </div>

          <div className="flex flex-col items-start text-right">
            <span className="text-[#0B0E11] text-[15px] font-medium leading-tight">سيد علي</span>
            <div className="flex items-center gap-1.5 mt-1 text-[#0B0E11]">
              <span className="text-[13px] font-light">Honda PCX 150</span>
              <div className="flex items-center gap-0.5">
                <img src="/images/icons/star.svg" alt="" />
                <span className="text-[12px] font-medium text-[#0B0E12]">4.8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Call button (Left in RTL) */}
        <motion.button
          type="button"
          onClick={() => window.open('tel:+966500000000')}
          className="bg-[#FAEFD1] hover:bg-[#F5E5BE] text-primary h-9 px-3 py-1.5 rounded-3px flex items-center gap-1.5 text-[14px] font-normal cursor-pointer transition-colors shrink-0"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          title={t('اتصال') || 'اتصال'}
        >
          <span>{t('اتصال') || 'اتصال'}</span>
          <img src="/images/icons/call_yellow.svg" alt="" />
        </motion.button>
      </div>

      {/* ── 2. Tracking Status Card ─────────────────────── */}
      <div className="bg-white rounded-3px p-3.5 w-full shadow-[0px_0px_2px_rgba(0,0,0,0.2)]">
        {/* Header */}
        <div className="flex items-center justify-between w-full mb-4">
          <span className="text-[#0B0E11] text-[16px] font-medium">
            {t('Tracking status')}
          </span>
          <span className="text-[#364152] text-[14px] font-normal">
            {t('Destination')}  (1)
          </span>
        </div>

        {/* Timeline steps */}
        <div className="flex flex-col">
          {[
            { id: 1, title: t('The order has been confirmed') || 'تم تأكيد الطلب', time: '1:15م', status: 'done' },
            { id: 2, title: t('It was received') || 'تم الاستلام', time: '1:15م', status: 'done' },
            { id: 3, title: t('in the way') || 'في الطريق', time: t('الان') || 'الان', status: 'done' },
            { id: 4, title: t('nearby') || 'قريب', time: '-', status: 'pending' },
            { id: 5, title: t('Delivered') || 'تم التوصيل', time: '-', status: 'pending' },
          ].map((step, idx, arr) => {
            const isDone = step.status === 'done'
            const nextStep = arr[idx + 1]
            const isLast = idx === arr.length - 1
            const lineIsDone = isDone && nextStep && nextStep.status === 'done'

            return (
              <div key={step.id} className="flex items-start gap-2.5">
                {/* Indicator & Line (Right side in RTL) */}
                <div className="flex flex-col items-center shrink-0">
                  {isDone ? (
                    <div className="w-6 h-6 rounded-sm bg-primary flex items-center justify-center text-white shrink-0">
                      <img src="/images/icons/true_white.svg" className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-5.5 h-5.5 rounded-sm bg-[#9CA3AF] shrink-0" />
                  )}

                  {/* Connecting vertical line */}
                  {!isLast && (
                    <div
                      className={`w-0.5 h-6 ${
                        lineIsDone ? 'bg-primary' : 'bg-[#D0D5DD]'
                      }`}
                    />
                  )}
                </div>

                {/* Step texts (Left side of indicator in RTL) */}
                <div className="flex-1 flex flex-col text-right -mt-0.5">
                  <span
                    className={`text-[14px] font-normal leading-tight ${
                      isDone ? 'text-[#0B0E11]' : 'text-[#9F9F9F]'
                    }`}
                  >
                    {step.title}
                  </span>
                  <span className="text-[#697586] text-[12px] font-light mt-1 leading-tight">
                    {step.time}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
