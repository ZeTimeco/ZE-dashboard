"use client"
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SendNotificationPage from '../SendNotification/page';
import DelayPage from '../Delay/page';
import SendOtpPage from '../SendOtp/page';
import { useDispatch } from 'react-redux';
import { arrivedWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1], delay: i * 0.07 },
  }),
}

function Cards({ activeTab , getWaitingList, refresh }) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [loadingId, setLoadingId] = useState(null)
  const [openNotification , setOpenNotification] = useState(false)
  const [openDelay , setOpenDelay] = useState(false)
  const [openOtp , setOpenOtp] = useState(false)

  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetails, setSelectedDetails] = useState(null);

  const handleArrived = async (id) => {
    try {
      setLoadingId(id)
      await dispatch(arrivedWaitlistThunk({ reservation_id: id })).unwrap()
      toast.success(t('Guest marked as arrived'))
      if (refresh) refresh()
    } catch (error) {
      console.error(error)
      toast.error(error?.message || t('Failed to mark guest as arrived'))
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <>
      <div className='grid grid-cols-1 lg1:grid-cols-2 gap-6 my-6'>
        {getWaitingList?.data?.map((items, i) => (
          <motion.div
            key={items?.id}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover={{
              y: -4,
              boxShadow: '0 8px 28px 0 rgba(0,0,0,0.12)',
              transition: { duration: 0.2 },
            }}
            className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-6 rounded-3px transition-shadow duration-200 bg-white'
          >
            {/* name & status */}
            <div className='flex justify-between'>
              <div className='flex items-center gap-2'>
                <motion.p
                  whileHover={{ scale: 1.06, transition: { duration: 0.18 } }}
                  className='bg-[linear-gradient(180deg,_#1183FF_50.96%,_#0064D2_100%)] text-white w-15 h-14 rounded-3px flex justify-center items-center flex-shrink-0'
                >
                  {items?.table?.code ? items?.table?.code : '###'}
                </motion.p>
                <p className='text-[#364152] text-lg font-medium'>{items?.guest_name}</p>
              </div>
              <div className='flex items-center'>
                <p className='border border-[#4D0CE7] text-[#4D0CE7] bg-[#EDE7FD] h-8 w-fit px-2 rounded-full flex items-center text-sm'>
                  {items?.status}
                </p>
              </div>
            </div>

            {/* guests & view */}
            <div className='flex w-full my-3'>
              <p className='flex gap-2 w-[40%]'>
                <img src="/images/icons/user-group_grey.svg" alt="" />
                <span className='text-[#697586] text-base font-normal'>{items?.guest_count} {t('guests')}</span>
              </p>
              <p className='text-[#697586] text-base font-normal w-full'>{items?.selected_view?.name}</p>
            </div>

            {/* notes */}
            {items?.notes && (
              <div className='flex gap-2 items-start'>
                <img src="/images/icons/comment-gray.svg" alt="" />
                <p className='min-w-0 text-[#364152] text-base font-normal break-words'>{items?.notes}</p>
              </div>
            )}

            {/* times */}
            <div className='mt-3 mb-5 flex justify-between'>
              <p className='text-base font-normal'>
                <span className='text-[#697586]'>{t('Log in')} : </span>{' '}
                <span className='text-[#364152]'>
                  {items?.checked_in_at === null
                    ? t('Not yet determined')
                    : new Date(items.checked_in_at).toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", hour12: true })}
                </span>
              </p>
              <p className='text-base font-normal'>
                <span className='text-[#697586]'>{t('Expected arrival')} : </span>{' '}
                <span className='text-[#364152]'>
                  {items?.start_time
                    ? new Date(`2000-01-01T${items.start_time}`).toLocaleTimeString("ar-EG", { hour: "numeric", minute: "2-digit", hour12: true })
                    : "-"}
                </span>
              </p>
            </div>

            {/* action buttons */}
            <div className='grid grid-cols-3 gap-4 w-full'>
              <motion.button
                onClick={() => {
                  setOpenNotification(true)
                  setSelectedId(items?.id)
                  setSelectedDetails(items)
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)', transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                className='flex items-center justify-center gap-1 rounded-3px border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300'
              >
                <p className='text-[#364152] text-sm font-normal'>{t('notice')}</p>
              </motion.button>

              {items?.status === 'arrived' ? (
                <motion.button
                  onClick={() => {
                    setSelectedId(items?.id)
                    setSelectedDetails(items)
                    setOpenOtp(true)
                  }}
                  whileHover={{ scale: 1.03, boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)', transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                  className='flex items-center justify-center gap-1 rounded-3px border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300'
                >
                  <p className='text-[#364152] text-sm font-normal'>{t('Seating')}</p>
                </motion.button>
              ) : (
                <motion.button
                  onClick={() => handleArrived(items?.id)}
                  disabled={loadingId === items?.id}
                  whileHover={{ scale: 1.03, boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)', transition: { duration: 0.18 } }}
                  whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                  className='flex items-center justify-center gap-1 rounded-3px border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300 disabled:opacity-50'
                >
                  <p className='text-[#364152] text-sm font-normal'>
                    {loadingId === items?.id ? t('loading...') : t('arrived')}
                  </p>
                </motion.button>
              )}

              <motion.button
                onClick={() => {
                  setOpenDelay(true)
                  setSelectedId(items?.id)
                  setSelectedDetails(items)
                }}
                whileHover={{ scale: 1.03, boxShadow: '0 3px 10px 0 rgba(0,0,0,0.10)', transition: { duration: 0.18 } }}
                whileTap={{ scale: 0.96, transition: { duration: 0.1 } }}
                className='flex items-center justify-center gap-1 rounded-3px border border-[#E3E8EF] px-2 h-10 w-full cursor-pointer transition-colors duration-200 hover:bg-gray-50 hover:border-gray-300'
              >
                <p className='text-[#364152] text-sm font-normal'>{t('delay')}</p>
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      <SendNotificationPage
        open={openNotification}
        setOpen={setOpenNotification}
        guestID={selectedId}
        guestDetails={selectedDetails}
      />

      <DelayPage
        open={openDelay}
        setOpen={setOpenDelay}
        guestID={selectedId}
        guestDetails={selectedDetails}
      />

      <SendOtpPage
        open={openOtp}
        setOpen={setOpenOtp}
        guestID={selectedId}
        guestDetails={selectedDetails}
        refresh={refresh}
      />
    </>
  );
}

export default Cards;