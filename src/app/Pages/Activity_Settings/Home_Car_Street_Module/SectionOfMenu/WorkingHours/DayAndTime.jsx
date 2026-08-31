'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleThunk, updateScheduleThunk } from '@/redux/slice/Setting/SettingSlice'
import { toast } from 'react-toastify'

function DayAndTime() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { schedule, loading, error } = useSelector((state) => state.setting)

  // الأيام
  const [selectedDays, setSelectedDays] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const days = [
    { id: 7, day: 'Saturday' },
    { id: 1, day: 'Sunday' },
    { id: 2, day: 'Monday' },
    { id: 3, day: 'Tuesday' },
    { id: 4, day: 'Wednesday' },
    { id: 5, day: 'Thursday' },
    { id: 6, day: 'Friday' },
  ]

  // أوقات العمل
  const [currentPeriod, setCurrentPeriod] = useState({ from: null, to: null })
  const [allTime, setAllTime] = useState(false)

  useEffect(() => {
    dispatch(getScheduleThunk())
  }, [dispatch])

  useEffect(() => {
    if (schedule && schedule.length > 0) {
      // نحول اسم اليوم من API إلى id عندنا
      const dayMap = {
        sunday: 1,
        monday: 2,
        tuesday: 3,
        wednesday: 4,
        thursday: 5,
        friday: 6,
        saturday: 7
      }

      const selected = schedule.map(item => dayMap[item.day.toLowerCase()])
      setSelectedDays(selected)

      // set time from API (نفترض انه عندنا يوم واحد)
      const todaySchedule = schedule[0]
      if (todaySchedule) {
        setCurrentPeriod({
          from: dayjs(todaySchedule.from, 'HH:mm'),
          to: dayjs(todaySchedule.to, 'HH:mm')
        })
      }
    }
  }, [schedule])

  const toggleDay = (dayId) => {
    setSelectedDays(prev =>
      prev.includes(dayId)
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    )
  }

  const toggleAllDays = () => {
    if (selectedDays.length === days.length) {
      setSelectedDays([])
    } else {
      setSelectedDays(days.map(day => day.id))
    }
  }

  const handleAllTimeChange = (e) => {
    const checked = e.target.checked
    setAllTime(checked)
    if (checked) {
      const startTime = dayjs().hour(0).minute(0).second(0)
      const endTime = dayjs().hour(23).minute(59).second(0)
      setCurrentPeriod({ from: startTime, to: endTime })
    } else {
      setCurrentPeriod({ from: null, to: null })
    }
  }

  const handleSave = async () => {
    if (selectedDays.length === 0) {
      toast.error(t('Please select at least one day') || 'Please select at least one day')
      return
    }

    if (!currentPeriod.from || !currentPeriod.to) {
      toast.error(t('Please select start and end time') || 'Please select start and end time')
      return
    }

    const dayNameMap = {
      1: 'sunday',
      2: 'monday',
      3: 'tuesday',
      4: 'wednesday',
      5: 'thursday',
      6: 'friday',
      7: 'saturday'
    }

    const formattedData = {
      days: selectedDays.map((id) => ({
        day: dayNameMap[id],
        from: currentPeriod.from.format('HH:mm'),
        to: currentPeriod.to.format('HH:mm')
      }))
    }

    try {
      setIsSaving(true)
      await dispatch(updateScheduleThunk(formattedData)).unwrap()
      toast.success(t('Working hours updated successfully') || 'Working hours updated successfully')
    } catch (err) {
      toast.error(err?.message || err || t('Failed to update working hours') || 'Failed to update working hours')
    } finally {
      setIsSaving(false)
    }
  }

  const inputClassName ="w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  return (
    <div className='p-6'>
      {/* الأيام */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#364152] text-base font-semibold">{t("days")}</p>
          <label className="flex gap-2 items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className={inputClassName}
              checked={selectedDays.length === days.length}
              onChange={toggleAllDays}
            />
            <span className="text-[#4B5565] text-base font-normal hover:text-[#121926] transition-colors">{t("All days")}</span>
          </label>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg1:grid-cols-4 gap-3.5'>
          {days.map((item, index) => {
            const isSelected = selectedDays.includes(item.id);
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.035 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleDay(item.id)}
                className={`border rounded-md h-13 text-sm font-medium cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-[#F9F5E8] text-primary font-semibold shadow-xs'
                    : 'border-[#CDD5DF] text-[#697586] bg-white hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                {t(item.day)}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* الوقت */}
      <section className="mt-9 pt-6 border-t border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <p className="text-[#364152] text-base font-semibold">{t("the time")}</p>
          <label className="flex gap-2 items-center cursor-pointer select-none">
            <input
              type="checkbox"
              className={inputClassName}
              checked={allTime}
              onChange={handleAllTimeChange}
            />
            <span className="text-[#4B5565] text-base font-normal hover:text-[#121926] transition-colors">{t("All the time")}</span>
          </label>
        </div>
        <div className="grid grid-cols-2 lg1:grid-cols-2 gap-6 mb-6 bg-[#F8FAFC] border border-[#E3E8EF]">
          {/* From Time */}
          <div className="flex flex-col p-4 rounded-md">
            <div className="flex gap-6 items-center">
              <label className="flex items-center text-[#364152] text-base lg1:text-lg font-medium whitespace-nowrap">{t("From")}</label>
              <div className="px-2 py-1 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
                  <MobileTimePicker
                    value={currentPeriod.from}
                    onChange={(newValue) =>
                      setCurrentPeriod({ ...currentPeriod, from: newValue })
                    }
                    ampm
                    views={["hours", "minutes"]}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          width: "100%",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          {/* To Time */}
          <div className="flex flex-col p-4 rounded-md">
            <div className="flex gap-6 items-center w-full">
              <label className="flex items-center text-[#364152] text-base lg1:text-lg font-medium whitespace-nowrap">{t("To")}</label>
              <div className="px-2 py-1 w-full">
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
                  <MobileTimePicker
                    value={currentPeriod.to}
                    onChange={(newValue) =>
                      setCurrentPeriod({ ...currentPeriod, to: newValue })
                    }
                    ampm
                    views={["hours", "minutes"]}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        sx: {
                          width: "100%",
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BTN*/}
      <motion.button 
        whileHover={!isSaving ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
        whileTap={!isSaving ? { scale: 0.98 } : {}}
        onClick={handleSave}
        disabled={isSaving}
        className={`bg-[var(--color-primary)] text-white w-full sm:w-[30%] h-14 rounded-[4px] font-medium shadow-xs transition-all mt-4 flex items-center justify-center gap-2 ${
          isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {isSaving ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
            </svg>
            <span>{t('Saving...')}</span>
          </>
        ) : (
          <span>{t('save')}</span>
        )}
      </motion.button>
    </div>
  )
}

export default DayAndTime
