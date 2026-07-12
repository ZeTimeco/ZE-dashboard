'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import { useTranslation } from 'react-i18next'
import QueueManagement from './QueueManagement'
import BookingRules from './BookingRules'
import WaitingTimeLogic from './WaitingTimeLogic'
import NoShowRules from './NoShowRules'
import CloseQueue from './CloseQueue'
import { useDispatch, useSelector } from 'react-redux'
import { editWaitlistSettingsThunk, getWaitlistSettingsThunk } from '@/redux/slice/Setting/SettingSlice'

function Queue_settingsPage() {
  const {t} = useTranslation() 

  const dispatch = useDispatch()
  const {getWaitlistSettings} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getWaitlistSettingsThunk())
  },[dispatch])
  

  const [formData , setFormData] = useState({
    waitlist_enabled:1,
    allow_walk_in:1,
    waitlist_max_party_size:'',
    default_wait_minutes:'',
    allow_manual_eta_adjust:1,
    mark_no_show_after_minutes:'',
    auto_remove_no_show:1,
    auto_close_waitlist_end_of_day:1,
  })

  useEffect(() => {
    if (getWaitlistSettings) {
      setFormData({
        waitlist_enabled: getWaitlistSettings.waitlist_enabled ? 1 : 0,
        allow_walk_in: getWaitlistSettings.allow_walk_in ? 1 : 0,
        waitlist_max_party_size: getWaitlistSettings.waitlist_max_party_size ?? "",
        default_wait_minutes: getWaitlistSettings.default_wait_minutes ?? "",
        allow_manual_eta_adjust: getWaitlistSettings.allow_manual_eta_adjust ? 1 : 0,
        mark_no_show_after_minutes: getWaitlistSettings.mark_no_show_after_minutes ?? "",
        auto_remove_no_show: getWaitlistSettings.auto_remove_no_show ? 1 : 0,
        auto_close_waitlist_end_of_day:
          getWaitlistSettings.auto_close_waitlist_end_of_day ? 1 : 0,
      });
    }
  }, [getWaitlistSettings]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async ()=>{
    setLoading(true);
    try{
      await dispatch(editWaitlistSettingsThunk(formData)).unwrap()
      await dispatch(getWaitlistSettingsThunk())
      alert(t('Restaurant information updated successfully.'));
    }catch(error){
      console.log(error);
      alert(error?.message || "Something went wrong.");
    } finally {
        setLoading(false);
    }
  }


  
  return (
    <>

    <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <QueueManagement formData={formData} setFormData={setFormData}/>
            <BookingRules formData={formData} setFormData={setFormData}/>
            <WaitingTimeLogic formData={formData} setFormData={setFormData}/>
            <NoShowRules formData={formData} setFormData={setFormData}/>
            <CloseQueue formData={formData} setFormData={setFormData}/>
        
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-[30%] h-14 rounded-[3px] text-white transition
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

export default Queue_settingsPage