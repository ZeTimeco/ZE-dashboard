"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function PaymentDetailsPage({bookingDetails}) {
  const { t } = useTranslation();

  const invoice_url = bookingDetails?.invoice_url;  //link to invoice file empty or not

  const service_id = bookingDetails?.service_id;
  let content = null;

  switch (service_id) {
    case 39:
      content = (
        <>
          {/* Price */}
          <div className='flex justify-between'>
            <p className='text-[#575757] text-sm font-normal'>{t('Delivery price')}</p>
            <p className='text-[#575757] text-base font-normal'>{bookingDetails?.delivery_price} ج.م</p>
          </div>

          {/* Fuel price */}
          <div className='flex justify-between mt-4'>
            <p className='text-[#575757] text-sm font-normal'>{t('Fuel price')} ({bookingDetails?.quantity}{t('liters')})</p>
            <p className='text-[#575757] text-base font-normal'>
                {bookingDetails?.fuel_price} ج.م
            </p>
          </div>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Final Price */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Final price')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.price} ج.م</p>
          </div>
        </>
      );
      break;
    case 40:
      content = (
        <>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Final price */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Final price')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.price} ج.م</p>
          </div>
        </>
      )
      break;
    case 36:
      content = (
        <>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Price upon viewing */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Price upon viewing')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.service_setting?.price} ج.م</p>
          </div>
        </>
      )
      break;
    case 35:
      content=(
        <>
          {/* Price */}
          <div className='flex justify-between'>
            <p className='text-[#575757] text-sm font-normal'>{t('Shipping price')}</p>
            <p className='text-[#575757] text-base font-normal'>{bookingDetails?.distanceData?.total?.price} ج.م</p>
          </div>

          {/* Car towing cost */}
          {bookingDetails?.is_low_area===1 && (
          <div className='flex justify-between mt-4'>
            <p className='text-[#575757] text-sm font-normal'>{t('Car towing cost')}</p>
            <p className='text-[#575757] text-base font-normal'>
              {bookingDetails?.service_setting?.additional_price} ج.م
            </p>
          </div>
          )}
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Final Price */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Final price')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.price} ج.م</p>
          </div>
        </>
      );
      break;
    case 37:
      content = (
        <>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Price upon viewing */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Price upon viewing')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.service_setting?.price} ج.م</p>
          </div>
        </>
      )
      break;
    case 38:
      content = (
        <>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Price upon viewing */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Price upon viewing')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.service_setting?.price} ج.م</p>
          </div>
        </>
      )
      break;
    default:
      content = (
        <>
          {/* Price */}
          <div className='flex justify-between'>
            <p className='text-[#575757] text-sm font-normal'>{t('the price')}</p>
            <p className='text-[#575757] text-base font-normal'>{bookingDetails?.service?.price} ج.م</p>
          </div>

          {/* Discount */}
          <div className='flex justify-between mt-4'>
            <p className='text-[#575757] text-sm font-normal'>{t('Discount value')}</p>
            <p className='text-[#F04438] text-base font-normal'>
              {Number(bookingDetails?.service?.price || 0) - Number(bookingDetails?.price || 0)} ج.م
            </p>
          </div>
          <hr className="border-[0.5px] border-dashed border-[#E3E8EF] my-4" />

          {/* Final Price */}
          <div className='flex justify-between mt-4 items-center'>
            <p className='text-[#0F022E] text-base font-medium'>{t('Final price')}</p>
            <p className='text-[var(--color-primary)] text-lg font-semibold'>{bookingDetails?.price} ج.م</p>
          </div>
        </>
      );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className='shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] p-4 mt-6 bg-white border border-[#F0F2F5]'
    >
      <div>
        <p className='text-[#0F022E] text-base font-medium mb-4'>{t('Payment details')}</p>

        {content}
      </div>

      {/* note if cash or card */}
      {bookingDetails?.payment_status === 'paid' ? (
        <div>
          {bookingDetails?.payment_method === 'cash' ? (
          <div className='bg-[#ECFDF3] w-full flex justify-between items-center h-12.5 mt-4 p-3 rounded-[3px] border border-[#D1FADF]'> 
            <p className='text-[#079455] text-sm font-medium'>{t('Cash paid')}</p>
            <img src="/images/icons/true_circle.svg" alt="" className='w-6 h-6' />
          </div>
          ) : bookingDetails?.payment_method === 'card' ? (
          <div className='bg-[#ECFDF3] w-full flex justify-between items-center h-12.5 mt-4 p-3 rounded-[3px] border border-[#D1FADF]'> 
            <p className='text-[#079455] text-sm font-medium'>{t('Payment was made by credit card.')}</p>
            <img src="/images/icons/true_circle.svg" alt="" className='w-6 h-6' />
          </div>
          ) : null}
        </div>
      ) : null}

      {/* Invoice download */}
      {invoice_url === null ? (
        <button className='flex justify-center items-center gap-2 bg-[#E3E8EF] text-[#9AA4B2] w-full h-13.5 mt-6 px-4 py-2.5 rounded-[3px] cursor-not-allowed opacity-80'>
          <span className='text-base font-medium'>{t('invoice')}</span>
        </button>
      ) : (
        <motion.button 
          whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
          whileTap={{ scale: 0.98 }}
          className='flex justify-center items-center gap-2 bg-[var(--color-primary)] text-[#fff] w-full h-13.5 mt-4 px-4 py-2.5 rounded-[3px] cursor-pointer shadow-sm transition-all'
        >
          <span className='text-base font-medium'>{t('invoice')}</span>  
          <img src="/images/icons/download.svg" alt="" className='w-6 h-6' />
        </motion.button>
      )}
    </motion.section>
  )
}

export default PaymentDetailsPage