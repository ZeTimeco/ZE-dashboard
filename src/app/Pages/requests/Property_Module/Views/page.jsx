"use client"
import { Dialog } from '@mui/material'
import { t } from 'i18next';
import React, { useEffect, useState } from 'react'
import RequestPage from './Request/page';
import GuestInformationPage from './GuestInformation/page';
import PropertyDetailsPage from './PropertyDetails/page';
import PaymentDetailsPage from './PaymentDetails/page';
import ProfitsPage from './profits/page';
import Activity_LogPage from './Activity_Log/page';
import { useDispatch, useSelector } from 'react-redux';
import { changeBookingActionThunk, getBookingByIdPropertyThunk } from '@/redux/slice/Requests/RequestsSlice';
import { motion, AnimatePresence } from 'framer-motion';

function ViewsPage({ open, setOpen, id }) {
  const [showActivityLog, setShowActivityLog] = useState(false);
  //api
  const dispatch = useDispatch()
  const { getBookingDetails } = useSelector((state) => state.requests)

  useEffect(() => {
    if (id && id !== "undefined" && open) {
      dispatch(getBookingByIdPropertyThunk(id))
    }
  }, [dispatch, id, open])

  const status = getBookingDetails?.data?.status

  const handleChangeStatus = (action) => {
    dispatch(changeBookingActionThunk({ booking_id: id, action }))
      .unwrap()
      .then(() => dispatch(getBookingByIdPropertyThunk(id)))
      .catch((err) => console.error('Action failed:', err));
  };

  const StatusBtn = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <div className='flex gap-4 sm:gap-6'>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChangeStatus('checked_in')} 
              className='bg-[var(--color-primary)] text-white font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Accessed')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChangeStatus('not_attend')} 
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('The client did not attend')}
            </motion.button>
          </div>
        );
      case "completed":
        return (
          <div className='flex gap-4 sm:gap-6'>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              className='bg-[var(--color-primary)] text-white font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Download the invoice')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Report a problem')}
            </motion.button>
          </div>
        );
      case "pending":
        return (
          <div className='flex gap-4 sm:gap-6'>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChangeStatus("confirmed")} 
              className='bg-[var(--color-primary)] text-white font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Accept Booking')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChangeStatus("canceled")} 
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Reservation refused')}
            </motion.button>
          </div>
        );
      case "checked_in":
        return (
          <div className='flex gap-4 sm:gap-6'>
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(147, 51, 234, 0.2)' }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleChangeStatus('completed')} 
              className='bg-[#9333EA] text-white font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Departure')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Report a problem')}
            </motion.button>
          </div>
        );
      case "not_attend":
      case "canceled":
        return (
          <div>
            <motion.button 
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200'
            >
              {t('Report a problem')}
            </motion.button>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* Close Button */}
        <section className="px-6 mt-6 flex justify-end">
          <motion.button
            whileHover={{ rotate: 90, scale: 1.08, borderColor: '#9AA4B2' }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 350, damping: 20 }}
            onClick={() => { setOpen(false) }}
            className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer transition-colors duration-200"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </motion.button>
        </section>

        {/* content */}
        <div className='px-6'>
          <AnimatePresence mode="wait">
            {showActivityLog ? (
              <motion.div
                key="activity_log"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <Activity_LogPage onBack={() => setShowActivityLog(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="order_details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <section className="my-4 flex justify-between items-center">
                  <div>
                    <p className="text-[#364152] text-xl font-medium mb-1">
                      {t("Order details")}
                    </p>
                    <p className="text-[#4B5565] text-sm font-normal">
                      {t("Full details explaining the status and contents of the order")}
                    </p>
                  </div>

                  <div className='flex items-center'>
                    <motion.button
                      whileHover={{ scale: 1.03, backgroundColor: 'rgba(var(--color-primary-rgb, 245, 158, 11), 0.05)' }}
                      whileTap={{ scale: 0.97 }}
                      className='flex items-center gap-2 border border-[var(--color-primary)] rounded-[3px] px-4 py-2.5 cursor-pointer transition-colors duration-200'
                      onClick={() => setShowActivityLog(prev => !prev)}
                    >
                      <img src="/images/icons/Activity log.svg" className="w-6 h-6" alt="" />
                      <p className='text-[var(--color-primary)] text-base font-medium'>{t('Activity log')}</p>
                    </motion.button>
                  </div>
                </section>
                <div className="border border-[#E3E8EF] mb-6" />

                <RequestPage getBookingDetails={getBookingDetails}/>
                <GuestInformationPage getBookingDetails={getBookingDetails}/>
                <PropertyDetailsPage getBookingDetails={getBookingDetails}/>
                <PaymentDetailsPage getBookingDetails={getBookingDetails}/>
                <ProfitsPage getBookingDetails={getBookingDetails}/>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* btns */}
        <div className='px-6 my-6'>
          {StatusBtn(status)}
        </div>
      </Dialog>
    </>
  )
}

export default ViewsPage