"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import NotificationPage from './Dialog/Notification/page'
import DetailsPage from './Dialog/Details/page'
import { motion, AnimatePresence } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: 'easeOut', delay: i * 0.07 },
  }),
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
}

function CardOfRequests({getReservationsData}) {
  const {t} = useTranslation()

  // '!pending','!confirmed','!seated','!completed','!cancelled','no_show','!arrived','!rejected'
  const StatusRender = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='mt-1' />
              <span className='text-xs flex items-center'>{t('certain')}</span>
            </div>
          </div>
        );
      case "completed":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='mt-1' />
              <span className='text-xs flex items-center'>{t('Complete')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/pending Status.svg" alt="" className='mt-1' />
              <span className='text-xs flex items-center'>{t('Pending')}</span>
            </div>
          </div>
        );
      case "arrived":
        return (
          <div className='bg-[#F9F5E8] border border-[#9E7A11] text-[#9E7A11] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-check.svg" alt="" className='mt-1' />
              <span className=''>{t('receipt')}</span>
            </div>
          </div>
        );
      case "seated":
        return (
          <div className='bg-[#E3E8EF] border border-[#697586] text-[#4B5565] w-fit h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/chair-gray.svg" alt="" className='mt-1' />
              <span className=''>{t('sitting')}</span>
            </div>
          </div>
        );
      case "no_show":
        return (
          <div className='bg-[#EDE7FD] border border-[#713DEC] text-[#713DEC] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/tabler_map-pin-x.svg" alt="" className='mt-1' />
              <span className='text-xs flex items-center'>{t('not_attend')}</span>
            </div>
          </div>
        );
      case "canceled":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('cancelled')}</span>
            </div>
          </div>
        );
      case "rejected":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9 lg1:h-9.5 rounded-3xl'>
            <div className='py-1.5 px-3 flex gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='mt-1' />
              <span className='text-xs font-normal flex items-center'>{t('rejected')}</span>
            </div>
          </div>
        );
    }
  };

  const [openNotification , setOpenNotification] = useState(false)
  const [selectedReservation , setSelectedReservation] = useState({ id: null, guest_name: '' })
  const [openDetails , setOpenDetails] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {getReservationsData?.data.length > 0 ? (
          <motion.div
            key="cards-grid"
            className='grid grid-cols-2 gap-6 mt-10'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {getReservationsData?.data.map((reservation, i) => (
              <motion.div
                key={reservation?.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{
                  y: -4,
                  boxShadow: '0 8px 28px 0 rgba(0,0,0,0.13)',
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setSelectedReservation({ id: reservation?.id })
                  setOpenDetails(true)
                }}
                className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 mb-10 cursor-pointer rounded-3px transition-shadow duration-200'
              >
                {/* name & status */}
                <div className='flex justify-between'>
                  <div className='flex gap-3 items-center'>
                    <motion.p
                      whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
                      className='lg1:w-15 lg1:h-14 w-12.5 h-11.5 bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] rounded-3px flex items-center justify-center flex-shrink-0'
                    >
                      <span className='text-[#FCFCFD] text-lg font-normal'>#{reservation?.table_code}</span>
                    </motion.p>
                    <p className='text-[#364152] text-base font-medium'>{reservation?.guest_name}</p>
                  </div>
                  <div className='flex items-center'>
                    {StatusRender(reservation?.status)}
                  </div>
                </div>

                {/* guests & time */}
                <div className='flex justify-between my-3'>
                  <div className='flex gap-1'>
                    <img src="/images/icons/user-group_grey.svg" alt="" />
                    <p className='text-[#697586] text-base font-normal flex gap-1'>
                      <span>{reservation?.guest_count}</span>
                      <span>{t('guests')}</span>
                    </p>
                  </div>
                  <div>
                    <p className='text-[#697586] text-base font-normal'>
                      {new Date(`1970-01-01T${reservation?.start_time}`).toLocaleTimeString('ar-EG', {
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </p>
                  </div>
                </div>

                {/* hall & view */}
                <div className='flex justify-between my-3'>
                  <div className='flex gap-1'>
                    <img src="/images/icons/restaurant-gray.svg" className="w-6 h-6" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{reservation?.hall_name}</p>
                  </div>
                  <div className='flex gap-1'>
                    <img src="/images/icons/tree.svg" className="w-6 h-6" alt="" />
                    <p className='text-[#364152] text-base font-normal'>{reservation?.views?.[0]?.name}</p>
                  </div>
                </div>

                {/* buttons */}
                <div className='w-full mt-4 flex gap-6'>
                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 4px 14px 0 rgba(var(--color-primary-rgb,158,122,17),0.22)',
                      transition: { duration: 0.18 },
                    }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedReservation({ id: reservation?.id, guest_name: reservation?.guest_name })
                      setOpenNotification(true)
                    }}
                    className='w-[50%] h-14 border border-primary text-primary text-base font-medium rounded-3px cursor-pointer transition-colors duration-200'
                  >
                    {t('notice')}
                  </motion.button>

                  <motion.button
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 4px 14px 0 rgba(0,0,0,0.10)',
                      transition: { duration: 0.18 },
                    }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `tel:${reservation?.guest_phone}`
                    }}
                    className='w-[50%] h-14 border border-[#CDD5DF] text-[#697586] text-base font-medium rounded-3px cursor-pointer transition-colors duration-200 hover:border-[#b0bac8] hover:text-[#364152]'
                  >
                    {t('communication')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            key="empty-state"
            className='text-center mt-10 text-[#697586]'
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {t('No reservations')}
          </motion.p>
        )}
      </AnimatePresence>

      <NotificationPage
        open={openNotification}
        setOpen={setOpenNotification}
        reservationData={selectedReservation}
      />

      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
        reservationData={selectedReservation}
      />
    </>
  )
}

export default CardOfRequests