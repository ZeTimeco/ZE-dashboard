'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import BookingConfirmation from './BookingConfirmation'
import BookingTimeline from './BookingTimeline'
import BookingRules from './BookingRules'
import ModificationaAndCancellation from './ModificationaAndCancellation'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { editBookingSettingsThunk, getBookingSettingsThunk } from '@/redux/slice/Setting/SettingSlice'

function Booking_settingsPage() {
  const {t} = useTranslation() 

  const dispatch = useDispatch()
  const {getBookingSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getBookingSettingsThunk())
  },[dispatch])
  
  console.log('getBookingSettings' , getBookingSettings);

  const [formData , setFormData] = useState({
    reservation_confirmation_mode:'',
    reservation_duration_minutes:'',
    gap_between_reservations_minutes:'',
    booking_cutoff_minutes:'',
    allow_modify_until_minutes:'',
    free_cancel_until_minutes:'',
    min_party_size:'',
    max_party_size:'',
    reservation_policy_text:''
  })

  useEffect(() => {
    if (getBookingSettings) {
      setFormData({
        reservation_confirmation_mode:getBookingSettings.reservation_confirmation_mode || '',
        reservation_duration_minutes:getBookingSettings.reservation_duration_minutes || '',
        gap_between_reservations_minutes:getBookingSettings.gap_between_reservations_minutes || '',
        booking_cutoff_minutes:getBookingSettings.booking_cutoff_minutes || '',
        allow_modify_until_minutes:getBookingSettings.allow_modify_until_minutes || '',
        free_cancel_until_minutes:getBookingSettings.free_cancel_until_minutes || '',
        min_party_size:getBookingSettings.min_party_size || '',
        max_party_size:getBookingSettings.max_party_size || '',
        reservation_policy_text:getBookingSettings.reservation_policy_text || '',
      });
    }
  }, [getBookingSettings]);

  const handleSubmit = async ()=>{
    try{
      await dispatch(editBookingSettingsThunk(formData)).unwrap
      await dispatch(getBookingSettingsThunk())
    }catch(error){
      console.log(error);
    }
  }
  console.log('formData' , formData);

  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <BookingConfirmation formData={formData} setFormData={setFormData}/>
            <BookingTimeline formData={formData} setFormData={setFormData}/>
            <BookingRules formData={formData} setFormData={setFormData}/>
            <ModificationaAndCancellation formData={formData} setFormData={setFormData}/>
        
            <button onClick={handleSubmit} className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>
    </>
  )
}

export default Booking_settingsPage