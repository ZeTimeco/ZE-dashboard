'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React from 'react'
import { useTranslation } from 'react-i18next'
import ImageUpload from './ImageUpload'
import Form from './Form'

function AddPage() {
  const {t} = useTranslation()


  return (
    <MainLayout>
      <p className='text-[#364152] text-2xl font-medium mb-6'>{t('Add a new product')}</p>
      <div className='border border-[#E6E6E6] p-6 mb-5 rounded-[3px]'>

        <ImageUpload/>
        <div className='grid grid-cols-2 gap-4 mt-5'>
          <Form/>
        </div>
        
        <div className="border-[0.5px] border-[#E3E8EF] my-6" />

        {/* btn */}
        <div className=' flex justify-between gap-4 '>

          <button className=' border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('Return')}
          </button>


          <div className='flex gap-2'>
            <button className=' border border-[var(--color-primary)] text-[var(--color-primary)] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('Save the product')}
            </button>

            <button className=' bg-[var(--color-primary)] text-white text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
              {t('Save and go to options and add-ons')}
            </button>
          </div>
          
          
        </div>





      </div>

      
    </MainLayout>
  )
}

export default AddPage