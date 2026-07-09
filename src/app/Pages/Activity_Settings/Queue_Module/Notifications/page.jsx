'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import BookingNotifications from './BookingNotifications'
import QueueingListNotifications from './QueueingListNotifications'
import ProviderAlerts from './ProviderAlerts'
import DeliveryChannels from './DeliveryChannels'
import { useDispatch, useSelector } from 'react-redux'
import { editNotificationSettingsThunk, getNotificationSettingsThunk } from '@/redux/slice/Setting/SettingSlice'

function NotificationsPage() {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getNotificationSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getNotificationSettingsThunk())
  },[dispatch])

  const[formData , setFormData] = useState({
    'notify_reservation_confirmed_enabled':1,
    'notify_reminder_24h_enabled':1,
    'notify_reminder_1h_enabled':1,
    'notify_waitlist_table_ready_enabled':1,
    'notify_long_waiting_enabled':1,
    'notify_refresh_waiting_time_enabled':1,
    'notify_overload_booking_enabled':1,
    'notify_reservation_channel':'',
    'notify_waitlist_channel':'',
    'notify_reminders_channel':'',
  })
  useEffect(() => {
  if (getNotificationSettings) {
    setFormData({
      notify_reservation_confirmed_enabled: getNotificationSettings.notify_reservation_confirmed_enabled ? 1 : 0,
      notify_reminder_24h_enabled: getNotificationSettings.notify_reminder_24h_enabled ? 1 : 0,
      notify_reminder_1h_enabled: getNotificationSettings.notify_reminder_1h_enabled ? 1 : 0,
      notify_waitlist_table_ready_enabled: getNotificationSettings.notify_waitlist_table_ready_enabled ? 1 : 0,
      notify_long_waiting_enabled: getNotificationSettings.notify_long_waiting_enabled ? 1 : 0,
      notify_refresh_waiting_time_enabled: getNotificationSettings.notify_refresh_waiting_time_enabled ? 1 : 0,
      notify_overload_booking_enabled: getNotificationSettings.notify_overload_booking_enabled ? 1 : 0,
      notify_reservation_channel: getNotificationSettings.notify_reservation_channel ?? "",
      notify_waitlist_channel: getNotificationSettings.notify_waitlist_channel ?? "",
      notify_reminders_channel: getNotificationSettings.notify_reminders_channel ?? "",
    });
  }
  }, [getNotificationSettings]);

  const handleSubmit = async ()=>{
    try{
      await dispatch(editNotificationSettingsThunk(formData)).unwrap()
      await dispatch(getNotificationSettingsThunk())
    }catch(error){
      console.log(error);
    }
  }
  

  return (
    <>
      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <BookingNotifications formData={formData} setFormData={setFormData}/>
            <QueueingListNotifications formData={formData} setFormData={setFormData}/>
            <ProviderAlerts formData={formData} setFormData={setFormData}/>
            <DeliveryChannels formData={formData} setFormData={setFormData}/>
        
          <button onClick={handleSubmit} className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>
    </>
  )
}

export default NotificationsPage