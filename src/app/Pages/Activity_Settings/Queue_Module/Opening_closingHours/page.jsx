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
      const normalizedWorkingTimes = (getWorkingTimesSettings.working_times || []).map(item => ({
        day: item.day ? item.day.toLowerCase() : '',
        times: (item.times || []).map(t => {
          const normalize = (timeStr) => {
            if (!timeStr) return '';
            const parts = timeStr.split(':');
            return parts.slice(0, 2).join(':'); // converts "08:00:00" to "08:00"
          };
          return {
            from: normalize(t.from),
            to: normalize(t.to)
          };
        })
      }));

      setFormData({
        working_times: normalizedWorkingTimes,
        banned_dates: getWorkingTimesSettings.banned_dates || [],
        staff_can_ban_tables:
          getWorkingTimesSettings.staff_can_ban_tables ?? 1,
      });
    }
  }, [getWorkingTimesSettings]);

    const [loading, setLoading] = useState(false);

  const toHHmm = (timeStr) => {
    if (!timeStr) return '';
    const parts = timeStr.split(':');
    const h = (parts[0] || '00').padStart(2, '0');
    const m = (parts[1] || '00').padStart(2, '0');
    return `${h}:${m}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        working_times: formData.working_times.map(d => ({
          day: d.day.toLowerCase(),
          times: (d.times || []).map(t => ({
            from: toHHmm(t.from),
            to: toHHmm(t.to)
          }))
        })),
        banned_dates: formData.banned_dates.map(({ date, reason }) => ({ date, reason })),
        staff_can_ban_tables: !!formData.staff_can_ban_tables,
      };
      await dispatch(editWorkingTimesSettingsThunk(payload)).unwrap();
      await dispatch(getWorkingTimesSettingsThunk());
      alert(t('Restaurant information updated successfully.'));
    } catch (error) {
      console.log(error);
      alert(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
    




  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <OpeningHours formData={formData} setFormData={setFormData}/>
            <HiddenDates  formData={formData} setFormData={setFormData}/>
            <HiddenTables formData={formData} setFormData={setFormData}/>



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