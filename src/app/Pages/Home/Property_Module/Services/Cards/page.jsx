"use client"
import React from 'react'
import { useTranslation } from 'react-i18next';
import { IMAGE_BASE_URL } from '../../../../../../../config/imageUrl';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

function Cardspage({ topProperties }) {
  const { t } = useTranslation();
  const router = useRouter();

  const StatusRender = (status) => {
    switch (status) {
      case "active":
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs lg1:text-sm font-medium'>{t('active')}</span>
            </div>
          </div>
        );
      case "inactive":
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl flex justify-center items-center shadow-xs'>
            <div className='lg1:py-1.5 lg1:px-3 py-1 px-2 flex gap-1 items-center'>
              <img src="/images/icons/remove-circle-red.svg" alt="" className='w-4 h-4 mt-0.5' />
              <span className='text-xs lg1:text-sm font-medium'>{t('inactive')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className='flex justify-between items-center mb-5'>
        <p className='text-[#0F022E] text-2xl font-medium mb-1'>{t('My properties')}</p>
        <motion.button
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => router.push('/Pages/Services/Property_Module/Service')} 
          className='flex gap-2 cursor-pointer text-[var(--color-primary)] text-base font-medium hover:underline transition-all'
        >
          {t('More')}
        </motion.button>
      </div>

      <div className='mb-10 flex gap-4 overflow-x-auto p-1 scrollbar-thin'>
        {topProperties?.map((property, index) => (
          <motion.div 
            key={index}  
            whileHover={{ y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className='group w-[350px] shadow-[0_0_4px_0_rgba(0,0,0,0.15)] bg-white rounded-[3px] p-3 flex-shrink-0 border border-slate-100 transition-all duration-300'
          >
            <div className='relative w-full overflow-hidden rounded-[2px]'>
              <img 
                src={`${IMAGE_BASE_URL}${property?.primary_image}`} 
                alt="" 
                className='w-full h-50 object-cover group-hover:scale-105 transition-transform duration-500 ease-out' 
              />
              <div className='absolute top-2 left-2'>{StatusRender(property?.status)}</div>
            </div>
            <div className='mt-4'>
              <p className='text-[#364152] text-base font-medium w-[300px] truncate group-hover:text-black transition-colors'>
                {property?.name}
              </p>
              <div className='flex gap-2 mt-1 items-center'>
                <img src="/images/icons/location-gray.svg" alt="" className='w-4 h-4' />
                <p className='text-[#697586] text-sm font-normal truncate'>{property?.address}</p>
              </div>

              {/* btn */}
              {property?.status === 'active' && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/Pages/Services/Property_Module/Service/Calendar?id=${property?.id}`)}
                  className='flex items-center gap-2 mt-3 cursor-pointer py-1.5 px-2 rounded-[3px] hover:bg-amber-50/50 transition-colors'
                >
                  <img src="/images/icons/calendar-yellow.svg" alt="" />
                  <p className='text-[var(--color-primary)] text-sm font-medium'>{t('Calendar view')}</p>
                </motion.button>
              )}

              {property?.status === 'inactive' && (
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(`/Pages/Services/Property_Module/Service/Edit?id=${property?.id}`)}
                  className='flex items-center gap-2 mt-3 cursor-pointer py-1.5 px-2 rounded-[3px] hover:bg-amber-50/50 transition-colors'
                >
                  <img src="/images/icons/EditYellow.svg" className="w-4 h-4" alt="" />
                  <p className='text-[var(--color-primary)] text-sm font-medium'>{t('modification')}</p>
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  )
}

export default Cardspage