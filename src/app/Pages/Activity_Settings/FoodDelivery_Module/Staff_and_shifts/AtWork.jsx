'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'

function AtWork({setOpenDetails ,getStaffManageConfig}) {
  const {t} = useTranslation()

  return (
    <>
      
        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
          <p className='text-[#364152] text-base font-medium'>{t('At work')} {t('now')}</p>

          {getStaffManageConfig?.in_shift?.map((inShift , index)=>(
            <motion.div
              key={inShift?.id}
              onClick={() => setOpenDetails(inShift?.id)}
              className='border border-[#E3E8EF] rounded-3px p-4 mt-4 flex justify-between cursor-pointer overflow-hidden relative'
              whileHover={{
                y: -2,
                boxShadow: '0 4px 12px rgba(6, 118, 71, 0.15)',
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Ripple on tap */}
              <motion.span
                className='absolute inset-0 rounded-3px pointer-events-none'
                initial={{ opacity: 0 }}
                whileTap={{ opacity: [0, 0.18, 0], scale: [0.6, 1.2] }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                style={{ background: 'radial-gradient(circle, rgba(6,118,71,0.25) 0%, transparent 70%)' }}
              />

              {/*  */}
              <div className='flex gap-2'>
                <p className='w-11 h-11 rounded-full bg-[#F9F5E8] flex justify-center items-center'>
                  <img src="/images/icons/user_yellow.svg" className="w-6 h-6" />
                </p>

                <div>
                  <p className='text-[#364152] text-base font-normal'> {inShift?.name} </p>
                  <p className='text-[#4B5565] text-sm font-normal'>{inShift?.role} </p>
                </div>
              </div>

              {/*  */}
              <div className='flex items-center'>
                {inShift?.status === 'inactive' ? (
                  <p className='border border-[#F97066] bg-[#FEE4E2] text-[#F97066] w-fit px-3 rounded-full'>
                    {t('inactive')}
                  </p>
                ):(
                  <p className='border border-[#067647] bg-[#DCFAE6] text-[#067647] w-fit px-3 rounded-full'>
                    {t('active')}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
    
      
    </>
  )
}

export default AtWork