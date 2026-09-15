'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function ActiveConnectionPage({
  id = 'ZT-PR-1234',
  driver = 'أحمد محمد',
  status = 'arrived_at_pickup',
}) {
  const { t } = useTranslation()

  const getProgressPercentage = (status) => {
    switch (status) {
      case 'offer_accepted':
        return 18
      case 'on_way_to_pickup':
        return 38
      case 'arrived_at_pickup':
        return 58
      case 'picked_up':
        return 75
      case 'arrived_at_dropoff':
        return 90
      case 'delivered':
        return 100
      case 'cancelled':
        return 14
      default:
        return 18
    }
  }

  const StatusRender = (status) => {
    switch (status) {
      case 'offer_accepted':
        return (
          <div className="bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5"
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
          <div className="bg-[#E3E8EF] border border-[#697586] text-[#697586] h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/cargray.svg"
                  alt=""
                  className="w-3.5 h-3.5"
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
          <div className="bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5"
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
          <div className="bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5"
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
          <div className="bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/location-babybluee.svg"
                  alt=""
                  className="w-3.5 h-3.5"
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
          <div className="bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/Active Status.svg"
                  alt=""
                  className="mt-0.5"
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
          <div className="bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="px-3 flex gap-1 items-center h-full">
              <p className="flex items-center">
                <img
                  src="/images/icons/stopped Status.svg"
                  alt=""
                  className="mt-0.5"
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
      <div className="border border-[#CDD5DF] mt-10  mb-6 p-6 rounded-3px">
        <p className="text-[#364152] text-lg font-medium">
          {t('Active connections')}
        </p>

        <div className="border border-[#DFDFDF] p-3.5 mt-4 rounded-3px bg-white">
          <div className="flex justify-between items-center">
            <h3 className="text-[#364152] text-base font-medium">{id}</h3>
            <div>{StatusRender(status)}</div>
          </div>

          <div>
            <p className="flex gap-1 items-center mt-2">
              <span className="flex items-center">
                <img
                  src="/images/icons/user-full-view-black.svg"
                  alt=""
                  className="w-4 h-4"
                />
              </span>
              <span className="text-[#6E6E6E] text-base font-normal">
                {driver}
              </span>
            </p>

            {/* progress bar */}
            <div className="w-full bg-[#EAECF0] h-[5px] rounded-full overflow-hidden mt-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${getProgressPercentage(status)}%` }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="bg-[#1570EF] h-full rounded-full ms-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActiveConnectionPage