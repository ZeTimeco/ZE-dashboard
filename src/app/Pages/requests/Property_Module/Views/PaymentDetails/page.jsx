"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function PaymentDetailsPage() {
  const {t} = useTranslation();

  const status = "checked_in"
  const StatusNote = (status) => {
    switch (status) {
      case "confirmed": //مقبوله
      case "completed"://مكتملة  
      case "checked_in": // تم الوصول   
      return (
          <div className='flex flex-col gap-1 border border-[#17B26A] bg-[#ECFDF3] rounded-[3px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_green.svg" alt="" />
              <span className='text-[#17B26A] text-base font-medium'>{t('Payment made')}</span>
            </p>
            <p className='text-[#17B26A] text-base font-normal'>{t('The customer paid the booking fees.')}</p>
          </div>
        );
      case "pending": //قيد الانتظار          
        return (
          <div className='flex flex-col gap-1 border border-[#FDB022] bg-[#FFFCF5] rounded-[3px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_yellow.svg" alt="" />
              <span className='text-[#DC6803] text-base font-medium'>{t('Payment pending')}</span>
            </p>
            <p className='text-[#DC6803] text-base font-normal'>{t('The guest will be charged a fee after approval.')}</p>
          </div>
        );
      case "not_attend": // لم يحضر
        return (
          <div className='flex flex-col gap-1 border border-[#F04438] bg-[#FEF3F2] rounded-[3px] p-3 mt-6'>
            <p className='flex gap-2'>
              <img src="/images/icons/credit-card_red.svg" alt="" />
              <span className='text-[#F04438] text-base font-medium'>{t('refund request')}</span>
            </p>
            <p className='text-[#F04438] text-base font-normal'>{t('The customer requested a refund of the booking fees.')}</p>
          </div>
          );
      case "cancelled": // ملغيه
        return null;
      }
  };

  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[3px] p-4 mb-4'>
      <p className='text-[#364152] text-base font-medium mb-5'>{t('Payment details')}</p>

      <div>

        {/*  */}
        <div className='flex justify-between '>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Basic price (3 nights)')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>500.00 </span>
            <span> ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Cleaning fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Service fees')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

        {/*  */}
        <div className='flex justify-between  mt-3'>
          <p className='text-[#4B5565] text-sm font-normal  flex items-center '>{t('Taxes')}</p>
          <p className='text-[#364152] text-base font-medium flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

        <div className='border border-dashed border-[#CDD5DF] my-3'></div>

        {/*  */}
        <div className='flex justify-between  '>
          <p className='text-[#364152] text-sm font-medium  flex items-center '>{t('Final price')} </p>
          <p className='text-[var(--color-primary)] text-base font-semibold flex  gap-1'>
            <span>50.00</span>
            <span>ج.م</span>
          </p>
        </div>

      </div>


      <div className=' '>
        {StatusNote(status)}
      </div>


    </div>
    </>
  )
}

export default PaymentDetailsPage