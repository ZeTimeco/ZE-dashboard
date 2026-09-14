'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function TitleOfDetails({getActiveDelivery}) {
  const { t } = useTranslation()
  const getActiveDeliveryData = getActiveDelivery?.data

  const status = getActiveDeliveryData?.status ;
  const statusConfig = {
    offer_accepted: {
      label: t("Confirmedd"),
      className: "bg-[#ECFDF3] text-[#16A34A]",
    },
    delivered: {
      label: t("Expired"),
      className: "bg-[#F3F4F6] text-[#6B7280]",
    },
    cancelled: {
      label: t("cancelled"),
      className: "bg-[#FEF2F2] text-[#DC2626]",
    },
    default: {
      label: t("active"),
      className: "bg-[#EFF6FF] text-[#2563EB]",
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.default;

  return (
    <motion.div
      className='flex gap-15 items-start'
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className='flex flex-col gap-1'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Active connection')}</p>
        <p className='text-[#697586] text-xl font-normal'>
          <span> {getActiveDeliveryData?.delivery_type === 'now' ? t('Breaking news now') : t('tabular')}</span>
            - 
          <span>{getActiveDeliveryData?.booking_number} </span>
        </p>
      </div>

      <motion.p
        className={`
          w-fit min-w-[90px] h-9 px-3
          inline-flex items-center justify-center
          rounded-md
          text-sm font-medium
          whitespace-nowrap
          select-none
          ${currentStatus.className}
        `}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        {currentStatus.label}
      </motion.p>
    </motion.div>
  )
}

export default TitleOfDetails