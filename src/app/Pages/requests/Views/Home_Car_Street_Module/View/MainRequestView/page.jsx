"use client";
import React, { useState } from 'react'
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

function  MainRequestViewPage({ StatusRender, status, assigned_handymen, setActiveSection ,bookingDetails , handleCloseViewHome_Car}) {
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

  // setActiveSection  تعيين مختص
  // setActiveSubSection  سجل النشاط

    console.log("bookingDetails",bookingDetails);

  return (
    <>

      {activeSubSection === 1 && (
        <>
          {/* Title-->  btn  سجل النشاط + title*/}
          <section className="my-4 px-6 flex  justify-between  ">

            <div className='  '>
              <p className="text-[#364152] text-xl font-medium mb-5">
                {t("Order details")}
              </p>
              <p className="text-[#4B5565] text-sm font-normal ">
                {t("Full details explaining the status and contents of the order")}
              </p>
            </div>

            {bookingDetails?.logs?.length > 0 ? (
              <div className=' flex items-center '>
                <button className='flex gap-2 border border-[var(--color-primary)] rounded-[3px]  px-4 py-2.5 cursor-pointer'
                  onClick={() => setActiveSubSection(2)}>
                  <img src="/images/icons/Activity log.svg" className="w-6 h-6" />
                  <p className='text-[var(--color-primary)] text-base font-normal'>{t('Activity log')}</p>
                </button>
              </div>
            ):(
              <div className=' flex items-center '>
                <button className='flex gap-2 border border-[#4B5565] rounded-[3px]  px-4 py-2.5 cursor-not-allowed'
                  disabled >
                  <img src="/images/icons/No record log.svg" className="w-6 h-6" />
                  <p className='text-[#4B5565] text-base font-normal'>{t('No record')}</p>
                </button>
              </div>
            )}


          </section>
          <span className="border-[0.5px] border-[#E3E8EF] mb-6" />


          <section className='px-6 mb-6 '>
            
            <RequestDataPage bookingDetails={bookingDetails} StatusRender={StatusRender} status={status}/> {/* request Data card (card1) */}
            <WorkersDataPage status={status} assigned_handymen={assigned_handymen} bookingDetails={bookingDetails}/>  {/* Workers data */}
            {status === 'rejected' && (<RejectedCompPage bookingDetails={bookingDetails} />)}      {/* Rejected Component */}
            <CustomerPage bookingDetails={bookingDetails} />  {/* Customer Info */}
            <DescriptionPage bookingDetails={bookingDetails} />  {/* Description message and voice */}
            <ImagesPage bookingDetails={bookingDetails}/>  {/* Images */}
            <AddressPage  bookingDetails={bookingDetails} />     {/* Address */}
            <CarDetailsPage bookingDetails={bookingDetails} />  {/* Car Details */}
            <PaymentDetailsPage bookingDetails={bookingDetails}/> {/* Payment Details */}

          </section>




          {/* //Btns */}
          {status === 'pending_approval' && (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button className=' w-50 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer '
                  onClick={handleApprove}
                >
                  {t('approval')}
                </button>
                <button className=' w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer '
                  onClick={() => (handleClickOpen())}

                >
                  {t('reject')}
                </button>
              </div>
            </>
          )}

          {status === 'accepted' && (assigned_handymen.length === 0 ? (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button className=' w-43.5 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer '
                  onClick={() => setActiveSection(2)}
                >
                  {t('Appoint a specialist')}
                </button>
                <button
                  onClick={()=> handleCancelled()}
                  className=' w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer '>
                  {t('cancellation of reservation')}
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6 flex gap-3'>
                <button 
                  onClick={() => setActiveSection(2)}
                className=' w-43.5 h-13.5 bg-[var(--color-primary)] text-[#fff] text-base font-medium rounded-[3px] cursor-pointer '>
                  {t('Reset')}
                </button>
                <button 
                  onClick={()=> handleCancelled()}
                  className=' w-37.5 h-13.5 border border-[#B42318] text-[#B42318] text-base font-medium rounded-[3px] cursor-pointer '>
                  {t('cancellation of reservation')}
                </button>
              </div>
            </>
          )
          )}


          {/* (اعاده تعيين (مخفي     */}
          {status === 'on_going' && (
            <> 
              <span className="border-[0.5px] border-[#E3E8EF] mb-6" />
              <div className='px-6 pb-6  '>
                <button className=' w-full h-13.5 bg-[#E3E8EF] text-[#9AA4B2] text-base font-medium rounded-[3px] cursor-pointer '>
                  {t('Reset')}
                </button>
              </div>
            </>

          )}

        </>
      )}








      {/* سجل النشاط */}
      {activeSubSection === 2 && (
        <>
          <Activity_logPage setActiveSubSection={setActiveSubSection} bookingDetails={bookingDetails}/>

        </>
      )}












      <RejectedDialogPage open={open} handleClose={handleClose} bookingDetails={bookingDetails} />
    </>
  )
}

export default MainRequestViewPage