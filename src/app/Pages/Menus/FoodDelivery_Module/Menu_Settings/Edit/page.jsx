'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'
import { useRouter } from 'next/navigation'

function EditPage() {
  const {t} = useTranslation()
  const router = useRouter()

  return (
    <MainLayout>
      
      <p className='text-[#364152] text-2xl font-medium mb-8'>{t('Edit category')}</p>
      <div className='border border-[#E6E6E6] rounded-[3px] p-8'>
        <Form/>
        <ImageUpload/>
      </div>


    <div className='flex justify-between'>
      <button 
        onClick={()=>router.back()}
        className='border border-[#697586] text-[#697586] w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Return')}
      </button>
      <button  className='bg-[var(--color-primary)] text-white w-[20%] text-base font-medium py-3 px-6 rounded-[3px] my-6 cursor-pointer'>
        {t('Save changes')}
      </button>
    </div>

    </MainLayout>
  )
}

export default EditPage