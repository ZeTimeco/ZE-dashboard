'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'

function Delivery_points() {
  const { t } = useTranslation()
  const shouldReduceMotion = useReducedMotion()

  const deliveryPoints = [
    {
      id: 1,
      status: 'completed',
      statusLabel: t('Completed', 'مكتمل'),
      iconType: 'check',
      pickupAddress: '321 شارع باين، جناح 200',
      deliveryAddress: '321 شارع باين، جناح 200',
      recipient: `أمير هارون`,
      hasAction: false,
    },
    {
      id: 2,
      status: 'in_progress',
      statusLabel: t('In progress', 'جاري'),
      iconType: 'loading',
      pickupAddress: '321 شارع باين، جناح 200',
      deliveryAddress: '321 شارع باين، جناح 200',
      recipient: `أمير هارون`,
      hasAction: true,
    },
    {
      id: 3,
      status: 'pending',
      statusLabel: null,
      iconType: 'pin',
      pickupAddress: '321 شارع باين، جناح 200',
      deliveryAddress: '321 شارع باين، جناح 200',
      recipient: `أمير هارون`,
      hasAction: true,
    },
  ]

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
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  const renderIcon = (type) => {
    switch (type) {
      case 'check':
        return (
          <img src="/images/icons/true.svg" alt="" />
        )
      case 'loading':
        return (
          <img src="/images/icons/loading-yellow.svg" alt="" />
        )
      case 'pin':
      default:
        return (
            <img src="/images/icons/map-pinpoint_yellow.svg" alt="" />
        )
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="border border-[#E3E8EF] rounded-3px p-3 shadow-[0_0_4px_0_rgba(0,0,0,0.20)] bg-white w-full"
    >
      {/* Header */}
      <div className="flex items-center  gap-2 mb-3">
        <div className="bg-[#f4ead0] flex items-center justify-center p-1.5 rounded-[5px] size-7 shrink-0">
          <img src="/images/icons/location2.svg" alt="" />
        </div>
        <p className="text-[#0b0e12] text-[16px] font-normal">
          {t('Delivery points')} (3) 
        </p>
        
      </div>
      

      {/* Inner Points Card */}
      <div className="border border-[#e7e7e7] rounded-3px p-3 sm:p-4 bg-white">
        <div className="flex flex-col ">
          {deliveryPoints.map((item, index) => {
            const isLast = index === deliveryPoints.length - 1

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="flex items-stretch  gap-2 sm:gap-3"
              >
                {/* Vertical Timeline Column with Indicator & Connecting Line */}
                <div className="flex flex-col items-center shrink-0">
                  <div
                    className={`size-6 rounded-3px flex items-center justify-center shrink-0 shadow-xs transition-transform duration-150 hover:scale-110 cursor-default ${
                      item.iconType === 'check' ? 'bg-[#d5ffdf]' : 'bg-[#f4ead0]'
                    }`}
                  >
                    {renderIcon(item.iconType)}
                  </div>

                  {!isLast && (
                    <div className="w-0 flex-1 my-1 border-r border-dashed border-primary min-h-12.5" />
                  )}
                </div>

                {/* Details & Status / Actions Content */}
                <div className="flex flex-1 items-center justify-between min-w-0 pb-6">
                  {/* Right Side: Address & Recipient Info */}
                  <div className="flex flex-col  gap-1">
                    <span className="text-[#697586] text-sm font-normal " >
                      {t('Receipt')}
                    </span>
                    <p className="text-[#364152] text-sm font-normal" >
                      {item.pickupAddress}
                    </p>
                    <span className="text-[#697586] text-sm font-normal">
                      {t('Deliveryy')}
                    </span>
                    <p className="text-[#364152] text-sm font-normal" >
                      {item.deliveryAddress}
                    </p>
                    <span className="text-[#697586] text-sm font-light" >
                      {t('recipient')} : {item.recipient}
                    </span>
                  </div>

                  {/* Left Side: Actions and Status */}
                  <div className="flex items-center gap-3 shrink-0">
                    {item.statusLabel && (
                      <div
                        className={`h-7.5 px-3 py-1 rounded-3px flex items-center justify-center text-[12px] font-normal whitespace-nowrap transition-transform duration-150 hover:scale-[1.02] cursor-default select-none ${
                          item.status === 'completed'
                            ? 'bg-[#d5ffdf] text-[#2ea84d]'
                            : 'bg-[#faefd1] text-[#c69715]'
                        }`}
                      >
                        {item.statusLabel}
                      </div>
                    )}
                    {item.hasAction && (
                      <button
                        type="button"
                        className="p-1 text-[#697586] hover:text-[#364152] cursor-pointer hover:-translate-x-0.5 transition-transform"
                        aria-label="View details"
                      >
                        <img src="/images/icons/arrow-right-blackk.svg" alt="" />
                      </button>
                    )}

                    
                  </div>

                </div>

              
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default Delivery_points