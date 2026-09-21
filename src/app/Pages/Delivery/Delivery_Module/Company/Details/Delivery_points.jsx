'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'

function Delivery_points({ getActiveDeliveryID }) {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const dropoffs = getActiveDeliveryID?.dropoffs

  console.log('dropoffs:', dropoffs)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  const renderIcon = (status) => {
    switch (status) {
      case 'delivered':
        return (
          <img
            src="/images/icons/true.svg"
            alt=""
          />
        )

      case 'pending':
      default:
        return (
          <img
            src="/images/icons/map-pinpoint_yellow.svg"
            alt=""
          />
        )
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'delivered':
        return t('completed')
      case 'pending':
        return t('Ongoing')

      default:
        return status
    }
  }

  return (
    <div
      className="border border-[#E3E8EF] rounded-3px p-3 shadow-[0_0_4px_0_rgba(0,0,0,0.20)] bg-white w-full"
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="bg-[#f4ead0] flex items-center justify-center p-1.5 rounded-[5px] size-7 shrink-0">
          <img
            src="/images/icons/location2.svg"
            alt=""
          />
        </div>

        <p className="text-[#0b0e12] text-[16px] font-normal">
          {t('Delivery points')} ({dropoffs?.count ?? 0})
        </p>
      </div>

      {/* Inner Points Card */}
      <div className="border border-[#e7e7e7] rounded-3px p-3 sm:p-4 bg-white">
        <div className="flex flex-col">
          {dropoffs?.items?.map((item, index) => {
            const isLast =
              index === dropoffs.items.length - 1

            const isCompleted = item?.delivery_status === 'delivered'

            const isPending = item?.delivery_status === 'pending'

            const firstPendingIndex = dropoffs?.items?.findIndex(
              (item) => item?.delivery_status === 'pending'
            )
            const showPendingStatus =
              isPending && index === firstPendingIndex

            return (
              <div
                key={item?.id}
                variants={itemVariants}
                className="flex items-stretch gap-2 sm:gap-3"
              >
                {/* Timeline */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`size-6 rounded-3px flex items-center justify-center shrink-0 shadow-xs ${
                      isCompleted
                        ? 'bg-[#d5ffdf]'
                        : 'bg-[#f4ead0]'
                    }`}
                  >
                    {renderIcon(item?.delivery_status)}
                  </div>

                  {!isLast && (
                    <div className="w-0 flex-1 my-1 border-r border-dashed border-primary min-h-12.5" />
                  )}
                </div>

                {/* Details */}
                <div className="flex flex-1 items-center justify-between min-w-0 pb-6">
                  {/* Address & Recipient */}
                  <div className="flex flex-col">
                    {/* Recipient */}
                    {isCompleted &&(
                      <>
                        <span className="text-[#697586] text-xs font-normal">
                          {t('Receipt')}
                        </span>

                        <p className="text-[#364152] text-sm font-normal">
                          {getActiveDeliveryID?.pickup?.address}
                        </p>
                      </>
                    )}
                    
                  

                    {/* Delivery Address */}
                    <span className="text-[#697586] text-xs font-normal">
                      {t('Delivery')}
                    </span>

                    <p className="text-[#364152] text-sm font-normal">
                      {item?.address}
                    </p>

                    
                    {/* recipient name */}
                    <p className="text-[#697586] text-xs">
                      {t('recipient')} : {item?.recipient?.name}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="flex items-center gap-3 shrink-0">
                    {(isCompleted || showPendingStatus) && (
                      <div
                        className={`h-7.5 px-3 py-1 rounded-3px flex items-center justify-center text-[12px] font-normal whitespace-nowrap ${
                          isCompleted
                            ? 'bg-[#d5ffdf] text-[#2ea84d]'
                            : 'bg-[#faefd1] text-[#c69715]'
                        }`}
                      >
                        {getStatusLabel(item?.delivery_status)}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Delivery_points