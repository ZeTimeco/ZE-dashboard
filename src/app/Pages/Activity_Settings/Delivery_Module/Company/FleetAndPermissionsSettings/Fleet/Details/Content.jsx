'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Content({getShowDriver}) {
  const {t} = useTranslation()
  
  const StatusRender = (status) => {
    switch (status) {
      case true:
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <span className="font-normal text-xs md:text-sm">
                {t('available')}
              </span>
            </div>
          </div>
        )

      case false:
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <span className="font-normal text-xs md:text-sm">
                {t('offline')}
              </span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const StatusBookingRender = (status) => {
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
  
  return (
    <>
      <div className="px-6 pt-10">
        {/* Driver Profile */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className='border border-[#CDD5DF] rounded-3px p-4 flex justify-between items-center bg-white shadow-xs'
        >
          <div className='flex gap-3 items-center'>
            <motion.p 
              whileHover={{ scale: 1.05 }}
              className='bg-black w-12 h-12 rounded-full flex justify-center items-center flex-shrink-0'
            >
              <img src="/images/icons/user-white.svg" alt="" />
            </motion.p>
            <p className='flex flex-col gap-1'>
              <span className='text-[#364152] text-lg font-medium'> {getShowDriver?.driver?.name}</span>
              <span className='text-[#697586] text-sm font-light'>
                {t('join')} {getShowDriver?.driver?.joined_at} {getShowDriver?.driver?.vehicle?.name ? ` . ${getShowDriver?.driver?.vehicle?.name}` : ''}
              </span>
            </p>
          </div>
          <div>
            {StatusRender(getShowDriver?.driver?.status)}
          </div>
        </motion.div>

        {/* 3 Metric Cards */}
        <div className='grid grid-cols-3 gap-6 my-4'>
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.05 }}
            whileHover={{ y: -2, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.06)' }}
            className='border border-[#CDD5DF] p-3 flex flex-col items-center gap-2 rounded-3px bg-white transition-shadow'
          >
            <p className='text-[#0B0E12] text-base font-semibold'>{getShowDriver?.performance?.completed_deliveries || 0}%</p>
            <p className='text-[#6C6C6C] text-sm font-normal'>{t('Completion')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.1 }}
            whileHover={{ y: -2, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.06)' }}
            className='border border-[#CDD5DF] p-3 flex flex-col items-center gap-2 rounded-3px bg-white transition-shadow'
          >
            <p className='text-[#0B0E12] text-base font-semibold'>{getShowDriver?.performance?.total_deliveries || 0}</p>
            <p className='text-[#6C6C6C] text-sm font-normal'>{t('Delivery')}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0.15 }}
            whileHover={{ y: -2, boxShadow: '0 4px 12px 0 rgba(0,0,0,0.06)' }}
            className='border border-[#CDD5DF] p-3 flex flex-col items-center gap-2 rounded-3px bg-white transition-shadow'
          >
            <p className='flex gap-1 items-center'>
              <span>
                <img src="/images/icons/star.svg" className="w-5 h-5" />
              </span>
              <span className='text-[#0B0E12] text-base font-semibold'>{getShowDriver?.performance?.rating || 0}</span>
            </p>
            <p className='text-[#6C6C6C] text-sm font-normal'>{t('Evaluation')}</p>
          </motion.div>
        </div>

        {/* Current connection */}
        {getShowDriver?.current_delivery === null ? null : (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.18 }}
            className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] py-4 px-3 rounded-3px bg-white'
          >
            <p className='text-[#161616] text-lg font-normal'>{t('Current connection')}</p>

            <div className='border border-[#E3E8EFAA] h-[0.5px] my-2'></div>
            <div className='flex justify-between items-center'>
              <p className='flex flex-col gap-1'>
                <span className='text-[#364152] text-base font-normal'>{getShowDriver?.current_delivery?.booking_number}</span>
                <span className='text-[#4F4F4F] text-sm font-normal'>{getShowDriver?.current_delivery?.total_amount}</span>
              </p>
              <div>
                {StatusBookingRender(getShowDriver?.current_delivery?.status)}
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Weekly profits */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.22 }}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] py-4 px-3 my-4 rounded-3px bg-white'
        >
          <div className='flex justify-between items-center'>
            <p className='text-[#161616] text-sm font-normal'>{t("This week's profits")}</p>
            <p className='text-primary text-sm font-semibold'>{getShowDriver?.weekly_earnings || 0} {t('pound')}</p>
          </div>

          <div className='border border-[#E3E8EFAA] h-[0.5px] my-4'></div>

          <div className='flex justify-between items-center'>
            <p className='text-[#161616] text-sm font-normal'>{t("Driver's powers")}</p>
            <p className='text-[#697586] text-sm font-normal'>استلام تلقائي </p>
          </div>
        </motion.div>

      </div>
    </>
  )
}

export default Content