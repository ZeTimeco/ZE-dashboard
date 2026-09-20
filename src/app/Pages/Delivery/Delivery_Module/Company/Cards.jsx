'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { useRouter } from 'next/navigation';

function Cards({ activeTab = 'all', getMyDeliveries, loading }) {
  const { t } = useTranslation()
  const router = useRouter()
  const shouldReduceMotion = useReducedMotion()

  const deliveries = getMyDeliveries?.deliveries || []

  const ACTIVE_STATUSES = [
    'offer_accepted',
    'on_way_to_pickup',
    'arrived_at_pickup',
    'picked_up',
    'arrived_at_dropoff',
  ]

  const COMPLETED_STATUSES = [
    'delivered',
    'cancelled',
  ]

  const filteredDeliveries = React.useMemo(() => {
    const tab = (activeTab || 'all').toLowerCase()

    if (tab === 'all') {
      return deliveries
    }

    if (tab === 'active') {
      return deliveries.filter((delivery) =>
        ACTIVE_STATUSES.includes(delivery?.status?.toLowerCase()?.trim())
      )
    }

    if (tab === 'completed' || tab === 'complete') {
      return deliveries.filter((delivery) =>
        COMPLETED_STATUSES.includes(delivery?.status?.toLowerCase()?.trim())
      )
    }

    return deliveries
  }, [deliveries, activeTab])

  const StatusRender = (status) => {
    switch (status) {
      case 'pending': 
      case 'broadcasting':
        return null

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


  const getDisplayDate = (date) => {
    if (!date) return '-----'

    const [year, month, day] = date.split('-').map(Number)

    const targetDate = new Date(year, month - 1, day)

    const today = new Date()
    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    )

    const diffInDays = Math.round(
      (targetDate - todayStart) / (1000 * 60 * 60 * 24)
    )

    if (diffInDays === 0) return 'اليوم'
    if (diffInDays === 1) return 'غدًا'
    if (diffInDays === -1) return 'أمس'

    return date
  }
  
  return (
    <>
      <div
        className='border border-[#CDD5DF] rounded-3px p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/40 min-h-[140px]'
      >
        {filteredDeliveries?.length === 0 ? (
          <div className='col-span-full py-12 flex flex-col items-center justify-center text-center'>
            <p className='text-[#697586] text-lg font-medium'>
              {t('No active delivery flights')}
            </p>
          </div>
        ) : (
          filteredDeliveries?.map((delivery)=>(
            <div
              key={delivery?.id}
              className='group relative bg-white border border-[#E3E8EF] hover:border-[#CDD5DF] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] hover:shadow-[0_6px_16px_0_rgba(0,0,0,0.10)] rounded-3px p-3 transition-all duration-200'
            >
              <div className='flex justify-between items-center gap-2'>
                <button
                  type="button"
                  onClick={() => router.push(`/Pages/Delivery/Delivery_Module/Company/Details?id=${delivery?.id}`)}
                  className='text-[#364152] text-lg font-medium transition-colors duration-200 group-hover:text-primary cursor-pointer hover:underline underline-offset-2'
                >
                  {delivery?.booking_number}
                </button>
                <div>
                  {StatusRender(delivery?.status)}
                </div>
              </div>
              <p className='text-[#4B5565] text-base font-normal mt-2 transition-colors duration-200'>
                {delivery?.pickup_address}
              </p>

              <div className='border-t border-[#E3E8EF] my-4'></div>

              <div className='flex justify-between items-center'>
                <p className="flex gap-1 text-[#4B5565] text-base font-normal">
                <span>{getDisplayDate(delivery?.display_date)}</span>
                :
                <span>{delivery?.display_time ?? '-----'}</span>
              </p>

                <p className='text-primary text-lg font-semibold transition-transform duration-200 group-hover:scale-[1.03]'>
                  {delivery?.total_amount} {t('pound')}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}

export default Cards
