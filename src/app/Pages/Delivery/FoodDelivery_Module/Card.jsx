'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import MapDialog from './Dialog/MapDialog/page'

// ─── Static location data for this card ──────────────────────────────────────
// In a real app this would come from props / API
const CARD_LOCATION = {
  lat: 24.7380,
  lng: 46.6890,
  title: '#ORD-NZACC-91170',
  address: 'شارع الملك فهد',
  city: 'الرياض',
  country: 'المملكة العربية السعودية',
  postalCode: '11321',
}

function Card({ getOrders }) {
  const { t } = useTranslation()
  const [mapOpen, setMapOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState(null)

  return (
    <>
      {getOrders?.data?.data?.map((order, index) => (
        <motion.div
          key={order.id}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.05, ease: 'easeOut' }}
          whileHover={{ y: -3, transition: { duration: 0.2 } }}
          className='bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.18)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] border border-transparent hover:border-gray-200/70 rounded-[4px] p-4 transition-all duration-200'
        >
          {/* Top header row */}
          <div className='flex justify-between w-full'>
            <div className='w-full'>
              <p className='border border-[#4D0CE7] bg-[#EDE7FD] rounded-full text-[#4D0CE7] text-sm font-normal w-fit px-2 py-1 flex items-center gap-1 transition-transform duration-200 hover:scale-[1.02]'>
                <img src="/images/icons/delivery-truck-blue.svg" alt="" />
                <span>{t('in the way')}</span>
              </p>
            </div>

            <div className='flex flex-col gap-1 items-end w-full'>
              <p className='text-[#364152] text-base font-medium'>{order?.order_number}</p>
              <p className='text-[#697586] text-sm font-normal'>
                {/* {t('since')}3{t('minutes')} */}
                {order?.created_at}
              </p>
            </div>
          </div>

          {/* Captain row */}
          <div className='flex justify-between items-center mt-3'>
            <p className='text-base font-medium'>
              <span className='text-[#697586]'>{t('Captain')} : </span>
              <span className='text-[#364152]'>{order?.driver?.name} </span>
            </p>
            <motion.button
              whileHover={{ scale: 1.12, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => {
                if (order?.driver?.phone) {
                  window.location.href = `tel:${order.driver.phone}`;
                }
              }}
              className="w-7 h-7 bg-[var(--color-primary)] rounded-full flex justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              aria-label="Call captain"
            >   
              <img src="/images/icons/call white.svg" className='w-4 h-4' />
            </motion.button>
          </div>

          <div className='border-t border-[#E3E8EF] my-3'></div>

          {/* Customer row */}
          <div className='flex justify-between items-center mb-3'>
            <p className='text-[#364152] text-base font-medium flex items-center gap-1.5'>
              <span className='flex items-center'>
                <img src="/images/icons/user_gray.svg" className='w-4 h-4' />
              </span>
              <span>{t('Customer')} : </span>
              <span>{order?.customer?.name}</span>
            </p>
            <motion.button
              whileHover={{ scale: 1.12, filter: 'brightness(1.08)' }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              onClick={() => {
                if (order?.customer?.phone) {
                  window.location.href = `tel:${order.customer.phone}`;
                }
              }}
              className="w-7 h-7 bg-[var(--color-primary)] rounded-full flex justify-center items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              aria-label="Call customer"
            >           
              <img src="/images/icons/call white.svg" className='w-4 h-4' />
            </motion.button>
          </div>

          {/* ── Location button — opens MapDialog ── */}
          <motion.button
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.15 }}
            className='flex items-center gap-1.5 cursor-pointer group text-left'
            onClick={() => {
              setSelectedOrder(order)
              setMapOpen(true)
            }}
          >
            <p className='flex items-center'>
              <img
                src="/images/icons/location-gray2.svg"
                className='w-4 h-4 transition-transform duration-200 group-hover:scale-110'
              />
            </p>
            <p className='text-[var(--color-primary)] text-base font-normal underline group-hover:opacity-85 transition-opacity'>
              {order?.delivery_address}
            </p>
          </motion.button>

        </motion.div>
      ))}

      {/* ── Map Dialog ── */}
      <MapDialog
        open={mapOpen}
        onClose={() => {
          setMapOpen(false)
          setSelectedOrder(null)
        }}
        location={selectedOrder}
      />
    </>
  )
}

export default Card