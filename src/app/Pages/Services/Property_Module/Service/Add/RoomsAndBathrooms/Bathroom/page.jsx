"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function BathroomPage() {
  const {t} = useTranslation()
  const [showContent, setShowContent] = useState(false)
  
  return (
    <>
    <div className='mt-10'>
      <p className='flex gap-1'>
        <img src="/images/icons/bathtub-blue.svg" alt="" />
        <span className='text-[#364152] text-base font-medium'>{t('Bathroom information')}</span>
      </p>
      <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Add details of each bathroom and its type.')}</p>

      {!showContent?(
        <button onClick={()=>setShowContent(true)} className='flex justify-center items-center gap-1 w-full h-14 py-2.5 px-4 border border-dashed border-[#CDD5DF] mt-6 cursor-pointer'>
          <p className='text-[#697586] text-base font-medium '>{t('Add bathroom')}</p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-5 h-5" />
        </button>  
      ):(
        <p>dd</p>
      )}
      
    </div>
      
    </>
  )
}

export default BathroomPage