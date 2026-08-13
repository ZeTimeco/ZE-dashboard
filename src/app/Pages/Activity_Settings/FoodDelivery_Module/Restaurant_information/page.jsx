'use client'
import React from 'react'
import Header from './Header'
import BasicInformation from './BasicInformation'
import Images from './Images'
import Location from './Location'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'

function Restaurant_informationPage() {
  const loading = false
  const {t} = useTranslation()
  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <BasicInformation/>
          <Images/>
          <Location/>
          <ContactInformation/>

          <button
            disabled={loading}
            className={`w-[25%] h-14 rounded-[3px] text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-primary)] cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </button>
        </div>
  
        
        
      </div>
      
    </>
  )
}

export default Restaurant_informationPage