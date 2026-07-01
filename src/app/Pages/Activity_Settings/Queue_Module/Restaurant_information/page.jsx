'use client'
import React from 'react'
import BasicInformation from './BasicInformation'
import Header from './Header'
import RestaurantPhotos from './RestaurantPhotos'
import Location from './Location'
import BookingStatus from './BookingStatus'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'

function Restaurant_informationPage() {
  const {t} = useTranslation()
  return (
    <>
    <div className='border border-[#E3E8EF] mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <BasicInformation/>
        <RestaurantPhotos/>
        <Location/>
        <BookingStatus/>
        <ContactInformation/>



        <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
        {t('Save changes')}
      </button>
      </div>

      
      
    </div>

      

    </>
  )
}

export default Restaurant_informationPage