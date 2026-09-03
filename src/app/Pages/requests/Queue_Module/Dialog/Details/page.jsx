"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Guest_InformationPage from './Guest_Information/page'
import Seating_detailsPage from './Seating_details/page'
import PaymentPage from './Payment/page'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationsByIdThunk, confirmReservationThunk } from '@/redux/slice/Requests/RequestsSlice'
import DeletePage from '../Delete/page'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: 'easeOut', delay: i * 0.07 },
  }),
}

function DetailsPage({open , setOpen , reservationData}) {
  const {t} = useTranslation()
  const [openDelete , setOpenDelete] = useState(false)

  const dispatch = useDispatch()
  const {getReservationsById} = useSelector((state)=>state.requests)

  useEffect(() => {
    if (reservationData?.id) {
      dispatch(getReservationsByIdThunk(reservationData?.id));
    }
  }, [dispatch, reservationData?.id]);

  console.log('reservationData.id', reservationData?.id);

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* Header */}
        <motion.section
          className="flex justify-end px-6 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={() => setOpen(false)}
            whileHover={{ scale: 1.08, rotate: 5, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
            className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center transition-colors duration-200 hover:bg-[#f3f4f6]"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </motion.button>
        </motion.section>

        {/* title */}
        <motion.section
          className='px-6 mb-4'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32, ease: 'easeOut', delay: 0.05 }}
        >
          <p className='text-[#364152] text-2xl font-medium'>{t('Booking details')}</p>
        </motion.section>

        <span className="border-[0.5px] border-[#E3E8EF]" />

        <section className='p-6 flex flex-col gap-6'>
          {[
            <Guest_InformationPage key="guest" getReservationsById={getReservationsById} />,
            <Seating_detailsPage key="seating" getReservationsById={getReservationsById} />,
            <PaymentPage key="payment" getReservationsById={getReservationsById} />,
          ].map((child, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={sectionVariants}
              initial="hidden"
              animate="visible"
            >
              {child}
            </motion.div>
          ))}
        </section>

        {getReservationsById?.status === 'confirmed' ? null : (
          <motion.div
            className='px-6 pb-6 flex gap-3'
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.28 }}
          >
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
                transition: { duration: 0.18 },
              }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              onClick={() => {
                if (reservationData?.id) {
                  dispatch(confirmReservationThunk(reservationData?.id)).then((res) => {
                    if (!res.error) {
                      setOpen(false)
                      window.location.reload()
                    }
                  })
                }
              }}
              className='w-[40%] h-13.5 bg-primary text-white text-base font-medium rounded-3px cursor-pointer transition-opacity duration-200 hover:opacity-90'
            >
              {t('Booking confirmation')}
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: '0 4px 14px 0 rgba(180,35,24,0.15)',
                transition: { duration: 0.18 },
              }}
              whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
              onClick={() => setOpenDelete(true)}
              className='w-[20%] h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-3px cursor-pointer transition-colors duration-200 hover:bg-[#fff5f5]'
            >
              {t('reject')}
            </motion.button>
          </motion.div>
        )}
      </Dialog>

      <DeletePage
        open={openDelete}
        setOpen={setOpenDelete}
        reservationData={reservationData}
      />
    </>
  )
}

export default DetailsPage