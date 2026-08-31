"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../config/imageUrl';
import ViewPage from '../../Pages/Services/Home_Car_Module/Service/View/page'

function ServiceCard({ service, index = 0 }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const StatusRender = (status) => {
    switch (status) {
      case "active":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='mt-0.5' />
              <span>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive":
        return (
          <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/inactive Status.svg" alt="" className='mt-0.5' />
              <span>{t('inactive')}</span>
            </div>
          </div>
        );
      case "pending":
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/pending Status.svg" alt="" className='mt-0.5' />
              <span>{t('pending')}</span>
            </div>
          </div>
        );
      case "stopped":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/stopped Status.svg" alt="" className='mt-0.5' />
              <span>{t('stopped')}</span>
            </div>
          </div>
        );
      case "refused":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex gap-1 items-center'>
              <img src="/images/icons/refused Status.svg" alt="" className='mt-0.5' />
              <span>{t('refused')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <motion.section 
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.99 }}
        onClick={handleClickOpen}
        className='bg-white shadow-[0_1px_4px_0_rgba(0,0,0,0.08)] hover:shadow-[0_4px_16px_0_rgba(0,0,0,0.12)] border border-transparent hover:border-[#F2DCA0] px-3 py-3.5 rounded-[4px] cursor-pointer transition-all duration-200 group'
      >
        <div className="relative mb-4 overflow-hidden rounded-[3px]">
          <img
            src={`${IMAGE_BASE_URL}${service?.image}`}
            alt=""
            className="w-full h-43.5 object-cover rounded-[3px] transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute top-2.5 left-3.5 px-1 py-1">
            {StatusRender(service?.status)}
          </div>
        </div>

        <p className='text-[#364152] text-base font-medium cursor-pointer line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors'>
          {service?.category?.title}
        </p>

        {/* price */}
        {service?.price_on_inspection === true ? (
          <div className='flex gap-1.5 w-full col-span-2 mt-4 items-center'>
            <img src="/images/icons/price.svg" alt="" />
            <p className='text-[#C69815] text-base font-medium'>{t('Price upon viewing')}</p>
          </div>
        ) : (
          <div className='grid grid-cols-2 mt-4 w-full items-center'>
            <div className='flex gap-1.5 w-full items-center'>
              <img src="/images/icons/price.svg" alt="" />
              <p className='text-[#C69815] text-lg font-medium'>{service?.sale_price}{t('Pound')}</p>
            </div>
            {/* sale price */}
            {service?.sale_price && Number(service.sale_price) !== 0 && Number(service.price) !== 0 && (
              <div className="flex items-center gap-1.5 w-full mr-1.5">
                <img src="/images/icons/sale price.svg" alt="" className="w-6 h-6" />
                <p className="text-[#D92D20] font-medium text-sm line-through">
                  {service?.price} جنية
                </p>
              </div>
            )}
          </div>
        )}

        <div className='grid grid-cols-2 gap-4 mt-4 pt-3 border-t border-[#F8FAFC]'>
          {/* Revenues */}
          <div className='flex gap-1.5 items-center'>
            <img src="/images/icons/Revenues.svg" alt="" className='w-6 h-6' />
            <p className='text-sm font-normal'>
              <span className='text-[#697586] ml-1'>{t('Revenues')}</span>
              <span className='text-[#C69815] font-medium'> {service?.bookings_sum_price == null ? '0' : service?.bookings_sum_price} {t('Pound')}</span>
            </p>
          </div>
          
          {/* Requests */}
          <div className='flex gap-1.5 items-center'>
            <img src="/images/icons/RequestsNumber.svg" alt="" className='w-6 h-6' />
            <p className='text-[#697586] text-sm font-normal'>{t('Requests')} {service?.bookings_count}</p>
          </div>
          
          {/* Available areas */}
          <div className='flex gap-1.5 w-full items-center'>
            <img src="/images/icons/Available areas.svg" alt="" className='w-6 h-6' />
            <p className='text-sm font-normal'>
              <span className='text-[#697586]'>{t('areas')}</span>
              <span className='text-[#C69815] font-medium'>
                ({service?.areas?.length || 0}+)
              </span>
            </p>
          </div>

          {/* View */}
          <div className='flex gap-1.5 w-full items-center'>
            <img src="/images/icons/view.svg" alt="" className='text-[#8B8B8B] w-6 h-6' />
            <p className='text-[#697586] text-sm font-normal'>{service?.views_count} {t('View')}</p>
          </div>
        </div>
      </motion.section>

      {/* ✅ Use the client-safe component */}
      <ViewPage open={open} handleClose={handleClose} serviceId={service?.id} />
    </>
  );
}

export default ServiceCard;
