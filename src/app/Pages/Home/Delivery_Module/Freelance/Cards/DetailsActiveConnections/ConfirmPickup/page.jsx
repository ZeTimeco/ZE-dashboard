'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import ImageUpload from './ImageUpload'

function ConfirmPickupPage() {
  const {t} = useTranslation()
  const router = useRouter()
  const textChecklist = [
    t('The package matches the description (documents, medium box)') ,
    t('Weight is the same (2.5 kg)'),
    t('The packaging is intact and undamaged.')
  ]
  return (
    <MainLayout>
      
      <div className='flex flex-col gap-1'>
        <p className='text-[#364152] text-2xl font-medium'>{t('Confirmation of receipt')}</p>
        <p className='text-[#697586] text-xl font-normal'>{t('Check the package before setting off')}</p>
      </div>
      <div className='border border-[#CDD5DF] p-6 rounded-3px my-6'>
        <p className='text-[#364152] text-xl font-medium mb-3'>{t('Checklist')}</p>
          
        {textChecklist?.map((text , index)=>(
          <div key={index} className='flex  gap-1 mb-2 '>
            <p><img src="/images/icons/true_green_box.svg" alt="" /></p>
            <p className='text-[#364152] text-lg font-normal'>{text}</p>
          </div>
        ))}
          
      </div>

      <ImageUpload/>
      
      <motion.div
        className="flex justify-between w-full mt-6 mb-6"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <motion.button
          type="button"
          className="border border-[#697586] w-[20%] h-14 cursor-pointer text-[#697586] text-base font-semibold rounded-3px"
          whileHover={{
            scale: 1.02,
            boxShadow: '0 4px 14px rgba(105,117,134,0.15)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          onClick={() => router.push('/Pages/Home/Delivery_Module/Freelance')}
        >
          {t('Return')}
        </motion.button>

        <motion.button
          type="button"
          className="bg-primary w-[20%] h-14 cursor-pointer text-white text-base font-semibold rounded-3px disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            filter: 'brightness(1.06)',
          }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
        >
          {t('Confirmation of receipt and departure')}
        </motion.button>
      </motion.div>
    </MainLayout>
  )
}

export default ConfirmPickupPage