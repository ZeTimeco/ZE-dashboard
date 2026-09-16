'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation';

function Cards({ activeTab = 'All' }) {
  const { t } = useTranslation()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const StatusRender = (status) => {
    switch (status) {
      case 'offer_accepted':
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Your offer has been accepted')}
              </span>
            </div>
          </div>
        )

      case 'on_way_to_pickup':
        return (
          <div className="group/badge bg-[#E3E8EF] border border-[#697586] text-[#697586] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(105,117,134,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/cargray.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('On the way to pick it up')}
              </span>
            </div>
          </div>
        )

      case 'arrived_at_pickup':
        return (
          <div className="group/badge bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(23,92,211,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Arrived at the pickup point')}
              </span>
            </div>
          </div>
        )

      case 'picked_up':
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('On the way for delivery')}
              </span>
            </div>
          </div>
        )

      case 'arrived_at_dropoff':
        return (
          <div className="group/badge bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(23,92,211,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Arrived at the delivery point')}
              </span>
            </div>
          </div>
        )

      case 'delivered':
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('Delivered')}
              </span>
            </div>
          </div>
        )

      case 'cancelled':
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5 transition-transform duration-200 group-hover/badge:scale-110"
                />
              </p>
              <span className="font-normal text-xs md:text-sm">
                {t('cancelled')}
              </span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  }

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className='border border-[#CDD5DF] rounded-3px p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/40'
      >
        <motion.div
          variants={cardVariants}
          whileHover={shouldReduceMotion ? {} : { y: -2 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className='group relative bg-white border border-[#E3E8EF] hover:border-[#CDD5DF] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.10)] rounded-3px p-3 transition-all duration-200'
        >
          <div className='flex justify-between items-center gap-2'>
            <button
              type="button"
              onClick={() => router.push('/Pages/Connections/Delivery_Module/Company/Details')}
              className='text-[#364152] text-lg font-medium transition-colors duration-200 group-hover:text-primary cursor-pointer hover:underline underline-offset-2'
            >
              ZT-PR-1234
            </button>
            <div>
              {StatusRender('offer_accepted')}
            </div>
          </div>
          <p className='text-[#4B5565] text-base font-normal mt-2 transition-colors duration-200'>
            وسط المدينة - شارع باين
          </p>

          <div className='border-t border-[#E3E8EF] my-4'></div>

          <div className='flex justify-between items-center'>
            <p className='flex gap-1 text-[#4B5565] text-base font-normal'>
              <span>اليوم</span> : 
              <span>4:00 ص </span>
            </p>

            <p className='text-primary text-lg font-semibold transition-transform duration-200 group-hover:scale-[1.03]'>
              50 {t('pound')}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Cards
