'use client'
import HiddenItemsLayout from '@/app/Components/MainLayout/HiddenItemsLayout'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Module_Of_VerificationPage() {
  const {t} = useTranslation('')
  const router = useRouter()
  return (
    <HiddenItemsLayout>
      
      <div className='flex flex-col justify-center items-center '>
        {/* note */}
        <div className='flex  gap-4 bg-[#D1AD44] w-[70%] p-6 rounded-full'>
          <div className='w-15 h-15  '>
            <img src="/images/icons/true_purple.svg" alt="" />
          </div>
          <div className='flex flex-col gap-1 text-white text-xl font-normal'>
            <p>{t('Your account has been successfully created')}</p>
            <p>{t('Please verify your account and complete your information.')}</p>

          </div>
        </div>

        {/* images */}
        <div className='mt-15 mb-8'>
          <img src="/images/verification.svg" alt=""/>
        </div>

        {/* info and btn */}
        <div className='flex flex-col gap-2 justify-center items-center  mb-10'>
          <h1 className='text-2xl font-semibold text-[#171202]'>{t('Service selection')}</h1>
          <p className='text-[#575757] text-xl font-normal'>{t('Please specify the service you require first, so we can help you complete your information and verify your account.')}</p>

          <button onClick={()=>router.push(`/Pages/Verification/Module_Of_Verification/Modules`)} className='bg-primary text-white font-base text-medium rounded-3px mt-4 w-[40%] h-14 cursor-pointer'>
            {t('Service selection')}
          </button>
        </div>
      </div>

    </HiddenItemsLayout>
  )
}

export default Module_Of_VerificationPage