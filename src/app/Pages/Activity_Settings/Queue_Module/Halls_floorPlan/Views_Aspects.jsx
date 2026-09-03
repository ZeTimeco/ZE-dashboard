'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

function Views_Aspects({getRestaurantViews , formData , setFormData}) {
  const {t} = useTranslation() 
  const router = useRouter()
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'
      >
        <p className='text-[#364152] text-base font-medium'>{t('Views/Aspects')}</p>

        <div className='flex justify-between  w-full mt-4'>
          <div className='flex flex-wrap items-center gap-1 w-[80%]  '>
            {getRestaurantViews?.data?.slice(0, 3).map((view) => (
              <div
                key={view.id}
                className="flex gap-2 rounded-full px-3 py-2 bg-[#EDE7FD] border border-[#E2E2E2] cursor-pointer hover:shadow-sm hover:scale-[1.02] transition-all duration-150"
              >
                <span className="text-[#505050] text-sm font-normal">
                  {view.name}
                </span>
              </div>
            ))}

            {getRestaurantViews?.data?.length > 3 && (
              <div className="flex items-center justify-center rounded-full px-3 py-2 bg-[#F3F4F6] border border-[#E2E2E2]">
                <span className="text-[#505050] text-sm font-medium">
                  +{getRestaurantViews.data.length - 3}
                </span>
              </div>
            )}            
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/Pages/Halls/Views?id=${getRestaurantViews?.hall_id}`)}
            className='flex justify-end items-center gap-1 w-[20%] cursor-pointer'
          >
            <p className='text-[var(--color-primary)] text-base font-normal'>{t('Viewing Management')}</p>
            <img src="/images/icons/settings-yellow.svg" className='w-5 h-5 transition-transform duration-200 hover:rotate-12' />
          </motion.button>

        </div>
      </motion.div>

    </>
  )
}

export default Views_Aspects