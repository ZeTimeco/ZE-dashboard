"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PaymentDetailsPage({ getBookingDetails }) {
  const { t } = useTranslation();
  const getBookingDetailsData = getBookingDetails?.data

  const status = getBookingDetailsData?.payment_status
  const StatusNote = (status) => {
    switch (status) {
      case "paid":   
        return (
          <div className='flex flex-col gap-1 border border-[#17B26A] bg-[#ECFDF3] rounded-[3px] p-3.5 mt-5 shadow-xs'>
            <p className='flex items-center gap-2'>
              <img src="/images/icons/credit-card_green.svg" alt="" className='w-5 h-5' />
              <span className='text-[#17B26A] text-sm font-semibold'>{t('Payment made')}</span>
            </p>
            <p className='text-[#17B26A] text-xs sm:text-sm font-normal'>{t('The customer paid the booking fees.')}</p>
          </div>
        );
      case "pending":         
        return (
          <div className='flex flex-col gap-1 border border-[#FDB022] bg-[#FFFCF5] rounded-[3px] p-3.5 mt-5 shadow-xs'>
            <p className='flex items-center gap-2'>
              <img src="/images/icons/credit-card_yellow.svg" alt="" className='w-5 h-5' />
              <span className='text-[#DC6803] text-sm font-semibold'>{t('Payment pending')}</span>
            </p>
            <p className='text-[#DC6803] text-xs sm:text-sm font-normal'>{t('The guest will be charged a fee after approval.')}</p>
          </div>
        );
      case "failed": 
        return (
          <div className='flex flex-col gap-1 border border-[#F04438] bg-[#FEF3F2] rounded-[3px] p-3.5 mt-5 shadow-xs'>
            <p className='flex items-center gap-2'>
              <img src="/images/icons/credit-card_red.svg" alt="" className='w-5 h-5' />
              <span className='text-[#F04438] text-sm font-semibold'>{t('refund request')}</span>
            </p>
            <p className='text-[#F04438] text-xs sm:text-sm font-normal'>{t('The customer requested a refund of the booking fees.')}</p>
          </div>
        );
      case "refunded": 
        return (
          <div className='flex flex-col gap-1 border border-[#48A1FF] bg-[#EFF6FF] rounded-[3px] p-3.5 mt-5 shadow-xs'>
            <p className='flex items-center gap-2'>
              <img src="/images/icons/credit-card_blue.svg" alt="" className='w-5 h-5' />
              <span className='text-[#0F022E] text-sm font-semibold'>{t('refund request')}</span>
            </p>
            <p className='text-[#0F022E] text-xs sm:text-sm font-normal'>{t('The customer requested a refund of the booking fees.')}</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='border border-[#E3E8EF] bg-white rounded-[3px] p-4 mb-4 shadow-xs transition-shadow duration-200 hover:shadow-sm'>
        <p className='text-[#364152] text-base font-medium mb-5'>{t('Payment details')}</p>

        <div className='space-y-3'>
          {/* Basic price */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>
              {t('Basic price')} ({getBookingDetailsData?.nights} {t('nights')})
            </p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{(Number(getBookingDetailsData?.price) || 0) * (Number(getBookingDetailsData?.nights) || 0)}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>

          {/* Cleaning fees */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>{t('Cleaning fees')}</p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{getBookingDetailsData?.cleaning_fee}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p> 
          </div>

          {/* Service fees */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>
              {t('Service fees')} ({getBookingDetailsData?.service_fee_percentage}%)
            </p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{getBookingDetailsData?.service_fee}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>

          {/* Taxes */}
          <div className='flex justify-between items-center py-0.5'>
            <p className='text-[#4B5565] text-sm font-normal flex items-center'>
              {t('Taxes')} ({getBookingDetailsData?.tax_percentage}%)
            </p>
            <p className='text-[#364152] text-sm sm:text-base font-medium flex gap-1'>
              <span>{getBookingDetailsData?.tax}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>

          <div className='border-b border-dashed border-[#CDD5DF] my-2'></div>

          {/* Final price */}
          <div className='flex justify-between items-center pt-1'>
            <p className='text-[#364152] text-sm font-semibold flex items-center'>{t('Final price')}</p>
            <p className='text-[var(--color-primary)] text-base font-bold flex gap-1'>
              <span>{getBookingDetailsData?.total_amount}</span>
              <span>{getBookingDetailsData?.currency}</span>
            </p>
          </div>
        </div>

        <div>
          {StatusNote(status)}
        </div>
      </div>
    </>
  )
}

export default PaymentDetailsPage