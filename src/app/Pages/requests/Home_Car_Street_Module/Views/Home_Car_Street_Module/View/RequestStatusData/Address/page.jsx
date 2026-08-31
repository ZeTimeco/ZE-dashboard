"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function AddressPage({bookingDetails}) {
  const [open, setOpen] = useState(false);

  const {t}= useTranslation();
  const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null
  const current_module_key = userData?.current_module_key
  const AddressDetails = bookingDetails?.user_address

  let contentAddress = null
  let contentMoreAddress = null

  const service_id = bookingDetails?.service_id
    switch(service_id) {
      case 35:
        contentAddress = (
          <div className="flex flex-col items-start gap-1">
            <div className="text-[#575757] text-sm font-normal flex gap-2 items-center"> 
              <img src='/images/icons/google-map-icon.svg' alt="" />
              <span className="text-[#0F022E] text-sm font-normal">{bookingDetails?.address}</span>
            </div>

            {/* Line + Arrow */}
            <div className="flex flex-col items-center w-[18px] ml-2">
              <div className="border-l-2 border-dashed border-[#8B8B8B] h-4"></div>
              <img src="/images/icons/ArrowDown_gray.svg" alt="" />
            </div>

            <div className="text-[#575757] text-sm font-normal flex gap-2 items-center"> 
              <img src='/images/icons/google-map-icon_gray.svg' alt="" />
              <span className="text-[#8B8B8B] text-sm font-normal">{bookingDetails?.desired_address}</span>
            </div>
          </div>
        )
        break;
      default:
        contentAddress = (
          <div className="text-[#575757] text-sm font-normal flex gap-2 items-center"> 
            <img src='/images/icons/google-map-icon.svg' alt="" />
            <span className="text-[#0F022E] text-sm font-normal">{bookingDetails?.address}</span>
          </div>
        )
    }

    switch(service_id) {
      case 35:
        contentMoreAddress = (
          <>
            <hr className="border border-[#E3E8EF] my-4" />
            <div className= "grid grid-cols-2 gap-3">
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/route.svg" alt="" />
                <p className='text-[#364152] text-sm font-normal'>{bookingDetails?.distanceData?.total?.distance_km} {t('How far to the destination?')} </p>
              </div>

              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/clock-gray.svg" alt="" />
                <p className='text-[#364152] text-sm font-normal'>{t('Total')} {bookingDetails?.distanceData?.total?.duration_minutes} {t('minute')}</p>
              </div>
            </div>
          </>
        )
        break;
      default:
        contentMoreAddress = null
    }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full p-3 shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] overflow-hidden bg-white select-none mt-6 border border-[#F0F2F5]"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between text-right cursor-pointer"
      >
        <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
          <img src="/images/icons/location2.svg" alt="" />
          {t('Address details')}
        </span>

        <div
          className={`transition-transform duration-300 cursor-pointer ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          <img src="/images/icons/ArrowDown.svg" alt="" />
        </div>
      </button>

      <AnimatePresence>
        {/* Content (home & car) */}
        {open && (current_module_key === 'home_services' || current_module_key === 'car_services') && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="px-3 mt-3 text-right overflow-hidden"
          >
            {AddressDetails?.address_line && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] pt-2 pb-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] text-sm font-normal flex gap-2 items-center"> 
                  <img src='/images/icons/google-map-icon.svg' alt="" />
                  <span>{t('the address')} :</span>
                </span>
                <span className="text-[#0F022E] text-sm font-medium">{AddressDetails?.address_line}</span>
              </div>
            )}

            {AddressDetails?.apt_no && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Apartment number')}:</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.apt_no}</span>
              </div>
            )}

            {AddressDetails?.floor && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('The role')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.floor}</span>
              </div>
            )}

            {AddressDetails?.building_no && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Building name')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.building_no}</span>
              </div>
            )}

            {AddressDetails?.street_name && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Street name')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.street_name}</span>
              </div>
            )}

            {AddressDetails?.po_box && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('P.O. Box number')} : </span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.po_box}</span>
              </div>
            )}

            {AddressDetails?.nearest_sign && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Nearest landmark')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.nearest_sign}</span>
              </div>
            )}

            {AddressDetails?.notes && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Additional instructions')}:</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.notes}</span>
              </div>
            )}

            {AddressDetails?.neighborhood && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Neighborhood name')}:</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.neighborhood}</span>
              </div>
            )}

            {AddressDetails?.address_class && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Title classification')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.address_class}</span>
              </div>
            )}

            {AddressDetails?.address_type && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('Title type')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.address_type}</span>
              </div>
            )}

            {AddressDetails?.city && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('City')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.city}</span>
              </div>
            )}

            {AddressDetails?.state && (
              <div className="flex gap-0.5 text-sm border-b border-[#E3E8EF] py-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('area')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.state}</span>
              </div>
            )}

            {AddressDetails?.country && (
              <div className="flex gap-0.5 text-sm pt-4 hover:bg-gray-50/50 rounded transition-colors px-1">
                <span className="text-[#575757] font-normal">{t('State')} :</span>
                <span className="text-[#0F022E] font-medium">{AddressDetails?.country}</span>
              </div>
            )}
          </motion.div>
        )}

        {/* content (street) */}
        {open && current_module_key === 'street_assistant' && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="px-3 mt-3 overflow-hidden"
          >
            {contentAddress}

            <hr className="border border-[#E3E8EF] my-4" />

            <div className="grid grid-cols-2 gap-3">
              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/route.svg" alt="" />
                <p className='text-[#364152] text-sm font-normal'>{bookingDetails?.distanceData?.provider_to_user?.distance_km} {t('How much to the customer')}</p>
              </div>

              <div className='flex gap-1.5 items-center'>
                <img src="/images/icons/clock-gray.svg" alt="" />
                <p className='text-[#364152] text-sm font-normal'>{bookingDetails?.distanceData?.provider_to_user?.duration_minutes} {t('minutes')}</p>
              </div>
            </div>

            {contentMoreAddress}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default AddressPage