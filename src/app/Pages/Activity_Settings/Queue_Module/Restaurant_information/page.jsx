'use client'
import React, { useEffect } from 'react'
import BasicInformation from './BasicInformation'
import Header from './Header'
import RestaurantPhotos from './RestaurantPhotos'
import Location from './Location'
import BookingStatus from './BookingStatus'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantTypesThunk } from '@/redux/slice/Setting/SettingSlice'

function Restaurant_informationPage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {getRestaurantTypes} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getRestaurantTypesThunk())
  },[dispatch])

  return (
    <>
    <div className='border border-[#E3E8EF] mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <BasicInformation getRestaurantTypes={getRestaurantTypes}/>
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