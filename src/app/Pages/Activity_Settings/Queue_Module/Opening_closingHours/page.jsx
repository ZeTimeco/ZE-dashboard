'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import OpeningHours from './OpeningHours'
import HiddenDates from './HiddenDates'
import HiddenTables from './HiddenTables'
import { useDispatch, useSelector } from 'react-redux'
import { editWorkingTimesSettingsThunk, getWorkingTimesSettingsThunk } from '@/redux/slice/Setting/SettingSlice'


function Opening_closingHoursPage() {
  const {t} = useTranslation() 

  const dispatch = useDispatch()
  const {getWorkingTimesSettings} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getWorkingTimesSettingsThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    'working_times':[],
    'banned_dates':[],
    'staff_can_ban_tables':1
  })

  useEffect(() => {
    if (getWorkingTimesSettings) {
      setFormData({
        working_times: getWorkingTimesSettings.working_times || [],
        banned_dates: getWorkingTimesSettings.banned_dates || [],
        staff_can_ban_tables:
          getWorkingTimesSettings.staff_can_ban_tables ?? 1,
      });
    }
  }, [getWorkingTimesSettings]);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async ()=>{
      setLoading(true);
      try{
        await dispatch(editWorkingTimesSettingsThunk(formData)).unwrap()
        await dispatch(getWorkingTimesSettingsThunk())
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
            <OpeningHours/>
            <HiddenDates/>
            <HiddenTables/>



            {/* btn */}
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

export default Opening_closingHoursPage