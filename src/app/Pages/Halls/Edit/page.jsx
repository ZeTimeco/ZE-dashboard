"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useTranslation } from 'react-i18next'

function AddPage() {
  const {t} = useTranslation();
  return (
    <MainLayout>
      
      <div className='flex justify-between mb-10'>
        <p className='text-[#364152] text-2xl font-medium '>{t('Hall renovation')}</p>
        <button className='flex justify-center items-center bg-[var(--color-primary)] w-8 h-8 rounded-[3px] cursor-pointer'>
          <img src="/images/icons/arrow-right-go.svg" className='w-5 h-5' alt="" />
        </button>
      </div>

      <div className="flex flex-col gap-6 border border-[#CDD5DF] rounded-[3px] py-8 px-6">
        <ImageUpload/>
        <Form/>
      </div>

      <button className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Save changes')}
      </button>
      
    </MainLayout>
  )
}

export default AddPage