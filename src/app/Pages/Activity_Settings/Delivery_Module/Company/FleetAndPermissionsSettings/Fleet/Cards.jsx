'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from './Details/page'
import { useDispatch, useSelector } from 'react-redux'

function Cards({  getDriverSetting ,openDetails , setOpenDetails }) {
  const {t} = useTranslation()



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
      
      case 'available':
        return (
          <div className="group/badge bg-[#ECFDF3] border border-[#ABEFC6] text-[#067647] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(6,118,71,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <span className="font-normal text-xs md:text-sm">
                {t('available')}
              </span>
            </div>
          </div>
        )

      case 'offline':
        return (
          <div className="group/badge bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(217,45,32,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <span className="font-normal text-xs md:text-sm">
                {t('offline')}
              </span>
            </div>
          </div>
        )

      case 'in_delivery':
        return (
          <div className="group/badge bg-[#EFF8FF] border border-[#B2DDFF] text-[#175CD3] h-7 rounded-3xl transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_2px_6px_rgba(23,92,211,0.12)] cursor-default select-none">
            <div className="px-3 flex gap-1.5 items-center h-full">
              <span className="font-normal text-xs md:text-sm">
                {t('In delivery')}
              </span>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const [selectedDriverId, setSelectedDriverId] = useState(null)


  return (
    <>
      {getDriverSetting?.drivers?.map((driver , index)=>(
        <div
          key={driver?.id}
          className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-3px flex flex-col gap-3'
        >

          {/*  */}
          <div className='flex justify-between'>
            <div className='flex gap-2'>
              <p className='w-8 h-8 bg-[#EAEAEA] rounded-full flex justify-center items-center'>
                <img src="/images/icons/user_black.svg" alt="" />
              </p>
              <p
                className='text-[#364152] text-base font-normal flex items-center cursor-pointer hover:underline hover:text-primary transition-colors duration-150'
                onClick={() => {
                        setSelectedDriverId(driver?.id)
                        setOpenDetails(true)
                      }}
              >
                {driver?.name}
              </p>
            </div>
            <>{StatusRender(driver?.curren_status)}</>
          </div>

          <div className='flex gap-4'>
            <p className='text-[#364152] text-base font-light'>{driver?.vehicle}</p>
            <p className='flex items-center gap-1'>
              <span ><img src="/images/icons/star.svg" alt="" /></span>
              <span className='text-[#0B0E12] text-xs font-normal'>{driver?.rating}</span>
            </p>
          </div>

        </div>
      ))}

      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
        driverId={selectedDriverId}
      />
      
    </>
  )
}

export default Cards