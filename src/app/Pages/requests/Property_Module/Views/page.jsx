"use client"
import { Dialog, CircularProgress } from '@mui/material'
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react'
import RequestPage from './Request/page';
import GuestInformationPage from './GuestInformation/page';
import PropertyDetailsPage from './PropertyDetails/page';
import PaymentDetailsPage from './PaymentDetails/page';
import ProfitsPage from './profits/page';
import Activity_LogPage from './Activity_Log/page';
import { useDispatch, useSelector } from 'react-redux';
import { changeBookingActionThunk, getBookingByIdPropertyThunk, getAllBookingPropertyThunk } from '@/redux/slice/Requests/RequestsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

function ViewsPage({ open, setOpen, id }) {
  const { t } = useTranslation();
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  //api
  const dispatch = useDispatch()
  const { getBookingDetails } = useSelector((state) => state.requests)

  useEffect(() => {
    if (id && id !== "undefined" && open) {
      dispatch(getBookingByIdPropertyThunk(id))
    }
  }, [dispatch, id, open])

  const status = getBookingDetails?.data?.status

  const handleChangeStatus = async (action) => {
    if (actionLoading) return;
    setActionLoading(action);
    try {
      await dispatch(changeBookingActionThunk({ booking_id: id, action })).unwrap();

      const actionMessages = {
        confirmed: t('Booking accepted successfully') || 'تم قبول الحجز بنجاح',
        canceled: t('Booking rejected successfully') || 'تم رفض الحجز بنجاح',
        checked_in: t('Checked in successfully') || 'تم تسجيل الدخول بنجاح',
        not_attend: t('Recorded as did not attend') || 'تم تسجيل عدم حضور العميل بنجاح',
        completed: t('Booking completed successfully') || 'تم تسجيل المغادرة واكتمال الحجز بنجاح',
      };

      toast.success(actionMessages[action] || t('Status updated successfully') || 'تم تحديث الحالة بنجاح', {
        position: 'top-right',
        autoClose: 2500,
      });

      await Promise.all([
        dispatch(getBookingByIdPropertyThunk(id)),
        dispatch(getAllBookingPropertyThunk()),
      ]);
    } catch (err) {
      console.error('Action failed:', err);
      const errMsg = err?.message || (typeof err === 'string' ? err : null) || t('Failed to update status') || 'فشل تحديث الحالة';
      toast.error(errMsg, {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setActionLoading(null);
    }
  };

  const StatusBtn = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <motion.div 
            key="confirmed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className='flex gap-4 sm:gap-6'
          >
            <motion.button 
              whileHover={!actionLoading ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' } : {}}
              whileTap={!actionLoading ? { scale: 0.98 } : {}}
              disabled={Boolean(actionLoading)}
              onClick={() => handleChangeStatus('checked_in')} 
              className={`bg-[var(--color-primary)] text-white font-medium h-14 w-full rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {actionLoading === 'checked_in' ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>{t('Processing...') || 'جاري المعالجة...'}</span>
                </>
              ) : (
                t('Accessed')
              )}
            </motion.button>
            <motion.button 
              whileHover={!actionLoading ? { scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' } : {}}
              whileTap={!actionLoading ? { scale: 0.98 } : {}}
              disabled={Boolean(actionLoading)}
              onClick={() => handleChangeStatus('not_attend')} 
              className={`border border-[#F04438] text-[#F04438] font-medium h-14 w-full rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {actionLoading === 'not_attend' ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>{t('Processing...') || 'جاري المعالجة...'}</span>
                </>
              ) : (
                t('The client did not attend')
              )}
            </motion.button>
          </motion.div>
        );
      case "completed":
        return (
          <motion.div 
            key="completed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className='flex gap-4 sm:gap-6'
          >
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' }}
              whileTap={{ scale: 0.98 }}
              className='bg-[var(--color-primary)] text-white font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200 flex items-center justify-center'
            >
              {t('Download the invoice')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200 flex items-center justify-center'
            >
              {t('Report a problem')}
            </motion.button>
          </motion.div>
        );
      case "pending":
        return (
          <motion.div 
            key="pending"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className='flex gap-4 sm:gap-6'
          >
            <motion.button 
              whileHover={!actionLoading ? { scale: 1.02, boxShadow: '0 4px 14px rgba(0,0,0,0.12)' } : {}}
              whileTap={!actionLoading ? { scale: 0.98 } : {}}
              disabled={Boolean(actionLoading)}
              onClick={() => handleChangeStatus("confirmed")} 
              className={`bg-[var(--color-primary)] text-white font-medium h-14 w-full rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {actionLoading === 'confirmed' ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>{t('Processing...') || 'جاري المعالجة...'}</span>
                </>
              ) : (
                t('Accept Booking')
              )}
            </motion.button>
            <motion.button 
              whileHover={!actionLoading ? { scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' } : {}}
              whileTap={!actionLoading ? { scale: 0.98 } : {}}
              disabled={Boolean(actionLoading)}
              onClick={() => handleChangeStatus("canceled")} 
              className={`border border-[#F04438] text-[#F04438] font-medium h-14 w-full rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {actionLoading === 'canceled' ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>{t('Processing...') || 'جاري المعالجة...'}</span>
                </>
              ) : (
                t('Reservation refused')
              )}
            </motion.button>
          </motion.div>
        );
      case "checked_in":
        return (
          <motion.div 
            key="checked_in"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className='flex gap-4 sm:gap-6'
          >
            <motion.button 
              whileHover={!actionLoading ? { scale: 1.02, boxShadow: '0 4px 14px rgba(147, 51, 234, 0.2)' } : {}}
              whileTap={!actionLoading ? { scale: 0.98 } : {}}
              disabled={Boolean(actionLoading)}
              onClick={() => handleChangeStatus('completed')} 
              className={`bg-[#9333EA] text-white font-medium h-14 w-full rounded-[3px] transition-all duration-200 flex items-center justify-center gap-2 ${
                actionLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              {actionLoading === 'completed' ? (
                <>
                  <CircularProgress size={20} color="inherit" />
                  <span>{t('Processing...') || 'جاري المعالجة...'}</span>
                </>
              ) : (
                t('Departure')
              )}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200 flex items-center justify-center'
            >
              {t('Report a problem')}
            </motion.button>
          </motion.div>
        );
      case "not_attend":
      case "canceled":
        return (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <motion.button 
              whileHover={{ scale: 1.01, backgroundColor: 'rgba(240, 68, 56, 0.05)' }}
              whileTap={{ scale: 0.98 }}
              className='border border-[#F04438] text-[#F04438] font-medium h-14 w-full cursor-pointer rounded-[3px] transition-colors duration-200 flex items-center justify-center'
            >
              {t('Report a problem')}
            </motion.button>
          </motion.div>
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
          <AnimatePresence mode="wait">
            {StatusBtn(status)}
          </AnimatePresence>
        </div>
      </Dialog>
    </>
  )
}

export default ViewsPage