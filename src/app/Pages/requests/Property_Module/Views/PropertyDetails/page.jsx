"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

function PropertyDetailsPage({ getBookingDetails }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  
  const getBookingDetailsData = getBookingDetails?.data

  const formatTime = (time) => {
    if (!time) return "--";

    const [hoursStr, minutesStr] = time.split(":");
    let hours = parseInt(hoursStr);
    let minutes = parseInt(minutesStr);

    if (isNaN(hours) || isNaN(minutes)) return "--";

    const period = hours >= 12 ? "م" : "ص";
    hours = hours % 12 || 12;

    return `${hours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <>
      <div className="w-full p-4 border border-[#E3E8EF] rounded-[3px] overflow-hidden bg-white select-none mb-4 shadow-xs transition-shadow duration-200 hover:shadow-sm">
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-right cursor-pointer py-1"
        >
          <span className="text-[#0F022E] text-base font-medium flex items-center gap-2">
            <img src="/images/icons/city_yellow.svg" alt="" className='w-5 h-5' />
            {t('Property details')}
          </span>

          <motion.div
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <img src="/images/icons/ArrowDown.svg" alt="" className='w-5 h-5' />
          </motion.div>
        </button>

        {/* Content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="property-details-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              style={{ overflow: 'hidden' }}
              className="mt-4 pt-3 border-t border-[#EEF2F6]"
            >
              <div className='flex gap-2.5 mb-4'>
                <p className='mt-0.5'>
                  <img src="/images/icons/locationblue.svg" alt="" className='w-5 h-5' />
                </p>
                <div className='flex flex-col'>
                  <p className='text-[#364152] text-base font-semibold'>{getBookingDetailsData?.property_title}</p>
                  <p className='text-[#697586] text-sm font-normal mt-0.5'>{getBookingDetailsData?.city} {getBookingDetailsData?.area}</p>
                </div>
              </div>

              <div className='bg-[#EEF2F6]/70 rounded-[3px] p-3 border border-[#E3E8EF]/60'>
                <p className='text-[#364152] text-sm font-semibold mb-2.5'>{t('Login and logout instructions')}</p>

                <div className='grid grid-cols-2 gap-2 text-[#4B5565] text-xs sm:text-sm font-normal'>
                  <p>
                    ( {t('Login')}: {getBookingDetailsData?.property_check_in &&
                        formatTime(getBookingDetailsData.property_check_in)} )
                  </p> 

                  <p>
                    ( {t('Exit')} : {getBookingDetailsData?.property_check_out &&
                        formatTime(getBookingDetailsData.property_check_out)} )
                  </p>
                  <p>{t('The service provider is available from')} :</p>
                  <p>
                    <span className='font-medium text-[#364152]'>
                      {getBookingDetailsData?.provider_availablity?.available_from &&
                        formatTime(getBookingDetailsData.provider_availablity.available_from)}
                    </span> {' '}
                    {t('to')} {' '}
                    <span className='font-medium text-[#364152]'>
                      {getBookingDetailsData?.provider_availablity?.available_to &&
                        formatTime(getBookingDetailsData.provider_availablity.available_to)}
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}

export default PropertyDetailsPage