"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { UpdateBookingThunk } from '@/redux/slice/Requests/RequestsSlice';
import WorkersDataPage from '../RequestStatusData/WorkersData/page';
import CustomerPage from '../RequestStatusData/Customer/page';
import DescriptionPage from '../RequestStatusData/Description/page';
import ImagesPage from '../RequestStatusData/Images/page';
import AddressPage from '../RequestStatusData/Address/page';
import CarDetailsPage from '../RequestStatusData/CarDetails/page';
import PaymentDetailsPage from '../RequestStatusData/PaymentDetails/page';
import RejectedCompPage from '../RequestStatusData/RejectedComp/page';
import RejectedDialogPage from './RejectedDialog/page';
import Activity_logPage from './Activity_log/page';
import RequestDataPage from '../RequestStatusData/RequestData/page';

// Force dynamic rendering - this page should not be statically generated
export const dynamic = 'force-dynamic';

function MainRequestViewPage({ StatusRender, status, assigned_handymen, setActiveSection ,bookingDetails , handleCloseViewHome_Car}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApprove = () => {
    dispatch(UpdateBookingThunk({ 
      id: bookingDetails?.id, 
      formData: { status: 'accepted' } 
    }));
  };

  const handleCancelled = () => {
    dispatch(UpdateBookingThunk({ 
      id: bookingDetails?.id, 
      formData: { status: 'cancelled' } 
    }));
  };

  const [activeSubSection, setActiveSubSection] = useState(1);

  return (
    <>
      <AnimatePresence mode="wait">
        {activeSubSection === 1 && (
          <motion.div
            key="main-view"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {/* Title-->  btn  سجل النشاط + title*/}
            <section className="my-4 px-6 flex justify-between items-center">
              <div>
                <p className="text-[#364152] text-xl font-medium mb-1">
                  {t("Order details")}
                </p>
                <p className="text-[#4B5565] text-sm font-normal">
                  {t("Full details explaining the status and contents of the order")}
                </p>
              </div>

              {bookingDetails?.logs?.length > 0 ? (
                <div className='flex items-center'>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(var(--color-primary-rgb, 148, 109, 241), 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    className='flex gap-2 border border-[var(--color-primary)] rounded-[3px] px-4 py-2.5 cursor-pointer transition-colors duration-150 items-center'
                    onClick={() => setActiveSubSection(2)}
                  >
                    <img src="/images/icons/Activity log.svg" className="w-6 h-6" alt="" />
                    <p className='text-[var(--color-primary)] text-base font-normal'>{t('Activity log')}</p>
                  </motion.button>
                </div>
              ) : (
                <div className='flex items-center'>
                  <button 
                    className='flex gap-2 border border-[#4B5565] rounded-[3px] px-4 py-2.5 cursor-not-allowed opacity-80 items-center'
                    disabled 
                  >
                    <img src="/images/icons/No record log.svg" className="w-6 h-6" alt="" />
                    <p className='text-[#4B5565] text-base font-normal'>{t('No record')}</p>
                  </button>
                </div>
              )}
            </section>
            <span className="border-[0.5px] border-[#E3E8EF] mb-6 block" />

            <section className='px-6 mb-6 space-y-4'>
              <RequestDataPage bookingDetails={bookingDetails} StatusRender={StatusRender} status={status}/> {/* request Data card (card1) */}
              <WorkersDataPage status={status} assigned_handymen={assigned_handymen} bookingDetails={bookingDetails}/>  {/* Workers data */}
              {status === 'rejected' && (<RejectedCompPage bookingDetails={bookingDetails} />)}      {/* Rejected Component */}
              <CustomerPage bookingDetails={bookingDetails} />  {/* Customer Info */}
              <DescriptionPage bookingDetails={bookingDetails} />  {/* Description message and voice */}
              <ImagesPage bookingDetails={bookingDetails}/>  {/* Images */}
              <AddressPage bookingDetails={bookingDetails} />     {/* Address */}
              <CarDetailsPage bookingDetails={bookingDetails} />  {/* Car Details */}
              <PaymentDetailsPage bookingDetails={bookingDetails}/> {/* Payment Details */}
            </section>

            {/* //Btns */}
            {status === 'pending_approval' && (
              <>
                <span className="border-[0.5px] border-[#E3E8EF] mb-6 block" />
                <div className='px-6 pb-6 flex gap-3'>
                  <motion.button 
                    whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className='w-50 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer shadow-sm transition-all duration-150'
                    onClick={handleApprove}
                  >
                    {t('approval')}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(180, 35, 24, 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    className='w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer transition-all duration-150'
                    onClick={() => (handleClickOpen())}
                  >
                    {t('reject')}
                  </motion.button>
                </div>
              </>
            )}

            {status === 'accepted' && (assigned_handymen.length === 0 ? (
              <>
                <span className="border-[0.5px] border-[#E3E8EF] mb-6 block" />
                <div className='px-6 pb-6 flex gap-3'>
                  <motion.button 
                    whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                    whileTap={{ scale: 0.98 }}
                    className='w-43.5 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer shadow-sm transition-all duration-150'
                    onClick={() => setActiveSection(2)}
                  >
                    {t('Appoint a specialist')}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(180, 35, 24, 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelled()}
                    className='w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer transition-all duration-150'
                  >
                    {t('cancellation of reservation')}
                  </motion.button>
                </div>
              </>
            ) : (
              <>
                <span className="border-[0.5px] border-[#E3E8EF] mb-6 block" />
                <div className='px-6 pb-6 flex gap-3'>
                  <motion.button 
                    whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveSection(2)}
                    className='w-43.5 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer shadow-sm transition-all duration-150'
                  >
                    {t('Reset')}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(180, 35, 24, 0.04)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelled()}
                    className='w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer transition-all duration-150'
                  >
                    {t('cancellation of reservation')}
                  </motion.button>
                </div>
              </>
            ))}

            {/* (اعاده تعيين (مخفي */}
            {status === 'on_going' && (
              <> 
                <span className="border-[0.5px] border-[#E3E8EF] mb-6 block" />
                <div className='px-6 pb-6'>
                  <button className='w-full h-13.5 bg-[#E3E8EF] text-[#9AA4B2] text-base font-medium rounded-[3px] cursor-pointer opacity-90 transition-opacity hover:opacity-100'>
                    {t('Reset')}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* سجل النشاط */}
        {activeSubSection === 2 && (
          <motion.div
            key="activity-log"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            <Activity_logPage setActiveSubSection={setActiveSubSection} bookingDetails={bookingDetails}/>
          </motion.div>
        )}
      </AnimatePresence>

      <RejectedDialogPage open={open} handleClose={handleClose} bookingDetails={bookingDetails} />
    </>
  )
}

export default MainRequestViewPage