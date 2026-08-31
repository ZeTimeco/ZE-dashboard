"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function RequestDataPage({bookingDetails ,StatusRender ,status}) {
    const { t } = useTranslation();
    const service_id = bookingDetails?.service_id;
      let content = null;

    switch (service_id) {
      case 39:
        content = (
          <>
            <hr className="border-[0.5px] border-[#E3E8EF] my-4" />
            <div className='flex justify-between w-full'>
              <div className='flex gap-1.5 w-full items-center'>
                <img src="/images/icons/fuel_gray.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex items-center'>{t('Fuel type')}: {bookingDetails?.fuel_type?.name}</p>
              </div>
              <div className='flex justify-end gap-1.5 w-full items-center'>
                <p className='text-[#575757] text-sm font-normal flex items-center'>{t('Fuel quantity')}: {bookingDetails?.quantity}</p>
              </div>
            </div>
          </>
        );
        break;
      case 40:
      case 36:
      case 35:
      case 37:
      case 38:
        content = null;
        break;
      default:
        content = (
          <>
            <hr className="border-[0.5px] border-[#E3E8EF] my-4" />
            <div className='flex justify-between w-full'>
              <div className='flex gap-1.5 w-full items-center'>
                <img src="/images/icons/date.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex items-center'>{bookingDetails?.visit_date}</p>
              </div>
              <div className='flex justify-end gap-1.5 w-full items-center'>
                <img src="/images/icons/time.svg" alt="" className='w-6 h-6' />
                <p className='text-[#575757] text-sm font-normal flex items-center'>{bookingDetails?.visit_time}</p>
              </div>
            </div>
          </>
        );
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] p-4 bg-white border border-[#F0F2F5]'
    >
      {/* request id & status */}
      <div className='flex justify-between items-center'>
        <p className='text-[#697586] text-sm font-normal flex items-center gap-0.5'>
          <span>{t('request')}/</span>
          <span className='font-medium text-[#364152]'>{bookingDetails?.id}</span>
        </p>

        <div>
          {StatusRender && typeof StatusRender === 'function' ? StatusRender(status) : null}
        </div>
      </div>
      <hr className="border-[0.5px] border-[#E3E8EF] my-4" />

      {/* service title */}
      <div>
        <p className='text-[#121926] text-base font-medium'>{bookingDetails?.service?.category?.title}</p>
      </div>

      {/* service id */ }
      {content}
    </motion.div>
  )
}

export default RequestDataPage