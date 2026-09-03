'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DetailsPage from './Dialog/Details/page';
import { motion } from 'framer-motion';

function Cards({getOrders}) {
  const {t} = useTranslation()
  
  const StatusRender = (status) => {
    switch (status) {
      case "pickup"://أستلام
        return (
          <div className='bg-[#EDE7FD] border border-[#713DEC] text-[#713DEC] w-fit h-9.5 rounded-3xl transition-transform duration-150 group-hover:scale-105'>
            <div className='py-1.5 px-3'>
              <span>{t('pickup')}</span>
            </div>
          </div>
        );
      case "delivery": //توصيل
        return (
          <div className='bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] w-fit h-9.5 rounded-3xl transition-transform duration-150 group-hover:scale-105'>
            <div className='py-1.5 px-3'>
              <span>{t('delivery')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const[openDetails , setOpenDetails] = useState(false)
  const [selectedId, setSelectedId] = useState(null);

  return (
    <>
      {getOrders?.data?.map((order , index)=>(
        <motion.div 
          key={order?.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
          whileHover={{ y: -3, boxShadow: "0 8px 20px -3px rgba(0,0,0,0.12)" }}
          whileTap={{ scale: 0.99 }}
          onClick={() => {
            setSelectedId(order.id);
            setOpenDetails(true);
          }} 
          className='group bg-white shadow-[0_0_4px_0_rgba(0,0,0,0.20)] border border-transparent hover:border-[#E3E8EF] p-4 rounded-[3px] cursor-pointer transition-all duration-200'
        >
        {/* Header */}
        <div className='flex justify-between items-center mb-3'>
          <p className='text-[#364152] text-lg font-medium group-hover:text-[var(--color-primary)] transition-colors duration-150'>{order?.order_number}#</p>
          {StatusRender(order?.type)}
        </div>

        {/* Info */}
        <div className='flex justify-between'>
          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/package.svg" className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.items_count} {t('products')}
            </span>
          </p>

          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/clock-gray.svg" className="w-4 h-4 transition-transform duration-150 group-hover:scale-110" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.created_at}
            </span>
          </p>

        </div>

        <div className='border border-[#E3E8EF] my-3'></div>

        {/* Footer */}
        <div className='flex justify-between items-center'>
          <p className='text-[var(--color-primary)] text-lg font-semibold'> {order?.total}جنيه</p>
          <p className='flex gap-1.5'>
            <span className='flex items-center'>
              <img src="/images/icons/credit-card.svg" className="w-4 h-4" />
            </span>
            <span className='text-[#4B5565] text-base font-normal'>
              {order?.payment_method === 'card' ? t('card') : t('cash') }
            </span>
          </p>
        </div>

        </motion.div>
      ))}
      
      <DetailsPage
        open={openDetails}
        setOpen={setOpenDetails}
        id={selectedId}
      />
    </>
  )
}

export default Cards