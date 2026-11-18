'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { useDispatch, useSelector } from 'react-redux'
import { getScheduleThunk, updateScheduleThunk } from '@/redux/slice/Setting/SettingSlice'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

function DayAndTime() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { schedule } = useSelector((state) => state.setting)

  // ── الأيام ───────────────────────────────────────────────────
  const days = [
    { id: 1, name: 'Sunday'    },
    { id: 2, name: 'Monday'    },
    { id: 3, name: 'Tuesday'   },
    { id: 4, name: 'Wednesday' },
    { id: 5, name: 'Thursday'  },
    { id: 6, name: 'Friday'    },
    { id: 7, name: 'Saturday'  },
  ]
  const dayNameMap = { 1:'sunday', 2:'monday', 3:'tuesday', 4:'wednesday', 5:'thursday', 6:'friday', 7:'saturday' }
  const dayMap     = { sunday:1, monday:2, tuesday:3, wednesday:4, thursday:5, friday:6, saturday:7 }

  const [selectedDays,  setSelectedDays]  = useState([])
  const [allDays,       setAllDays]       = useState(false)
  const [currentPeriod, setCurrentPeriod] = useState({ from: null, to: null })
  const [savedPeriods,  setSavedPeriods]  = useState({})   // { dayId: [{id,from,to}] }
  const [allTime,       setAllTime]       = useState(false)
  const [isSaving,      setIsSaving]      = useState(false)

  // ── Load من API ───────────────────────────────────────────────
  useEffect(() => { dispatch(getScheduleThunk()) }, [dispatch])

  useEffect(() => {
    if (!schedule) return
    // Normalize: GET returns array, POST update may return { data: [...] }
    const scheduleArray = Array.isArray(schedule)
      ? schedule
      : Array.isArray(schedule?.data)
        ? schedule.data
        : null
    if (!scheduleArray || scheduleArray.length === 0) return
    const newPeriods = {}
    scheduleArray.forEach((item, i) => {
      const dayId = dayMap[item.day?.toLowerCase()]
      if (!dayId) return
      if (!newPeriods[dayId]) newPeriods[dayId] = []
      newPeriods[dayId].push({
        id:   Date.now() + i,
        from: dayjs(item.from, 'HH:mm'),
        to:   dayjs(item.to,   'HH:mm'),
      })
    })
    setSavedPeriods(newPeriods)
  }, [schedule])

  // ── الأيام ───────────────────────────────────────────────────
  const handleAllDaysChange = (e) => {
    const checked = e.target.checked
    setAllDays(checked)
    setSelectedDays(checked ? days.map(d => d.id) : [])
  }

  const handleDayToggle = (dayId) => {
    setSelectedDays(prev => {
      const updated = prev.includes(dayId) ? prev.filter(id => id !== dayId) : [...prev, dayId]
      setAllDays(updated.length === days.length)
      return updated
    })
  }

  // ── الوقت ────────────────────────────────────────────────────
  const handleAllTimeChange = (e) => {
    const checked = e.target.checked
    setAllTime(checked)
    setCurrentPeriod(checked
      ? { from: dayjs().hour(0).minute(0).second(0), to: dayjs().hour(23).minute(59).second(0) }
      : { from: null, to: null }
    )
  }

  // ── إضافة period ─────────────────────────────────────────────
  const addPeriod = () => {
    if (!currentPeriod.from || !currentPeriod.to || selectedDays.length === 0) {
      if (selectedDays.length === 0) toast.error(t('Please select at least one day') || 'اختر يوم على الأقل')
      else toast.error(t('Please select start and end time') || 'اختر وقت البداية والنهاية')
      return
    }
    const newSavedPeriods = { ...savedPeriods }
    selectedDays.forEach(dayId => {
      if (!newSavedPeriods[dayId]) newSavedPeriods[dayId] = []
      const isDuplicate = newSavedPeriods[dayId].some(p =>
        p.from.isSame(currentPeriod.from, 'minute') && p.to.isSame(currentPeriod.to, 'minute')
      )
      if (!isDuplicate) {
        newSavedPeriods[dayId].push({ id: Date.now() + Math.random(), ...currentPeriod })
      }
    })
    setSavedPeriods(newSavedPeriods)
  }

  // ── حذف period ───────────────────────────────────────────────
  const removeSavedPeriod = (dayId, periodId) => {
    const updated = { ...savedPeriods }
    updated[dayId] = updated[dayId].filter(p => p.id !== periodId)
    if (updated[dayId].length === 0) delete updated[dayId]
    setSavedPeriods(updated)
  }

  // ── حفظ ───────────────────────────────────────────────────────
  const handleSave = async () => {
    if (Object.keys(savedPeriods).length === 0) {
      toast.error(t('Please add at least one time period') || 'أضف فترة وقت واحدة على الأقل')
      return
    }
    const formattedData = {
      days: Object.entries(savedPeriods).flatMap(([dayId, periods]) =>
        periods.map(p => ({
          day:  dayNameMap[Number(dayId)],
          from: p.from.format('HH:mm'),
          to:   p.to.format('HH:mm'),
        }))
      )
    }
    try {
      setIsSaving(true)
      await dispatch(updateScheduleThunk(formattedData)).unwrap()
      toast.success(t('Working hours updated successfully') || 'تم تحديث أوقات العمل بنجاح')
    } catch (err) {
      toast.error(err?.message || err || t('Failed to update working hours') || 'فشل تحديث أوقات العمل')
    } finally {
      setIsSaving(false)
    }
  }

  const inputClassName =  "w-5 h-5 appearance-none border border-gray-300 rounded-md bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";
  return (
    <motion.div
      className='p-6'
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >

      {/* ── الأيام ───────────────────────────────────────────────── */}
      <section className="mb-12">
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t('days')}</p>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className={inputClassName}
              checked={allDays}
              onChange={handleAllDaysChange}
            />
            <p className="text-[#4B5565] text-base font-normal">{t('All days')}</p>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-5 w-full">
          {days.map((day, i) => (
            <motion.button
              key={day.id}
              type="button"
              onClick={() => handleDayToggle(day.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: i * 0.03 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`w-full h-15 border rounded-3px shadow-xs transition-colors duration-200 text-base font-normal cursor-pointer ${
                selectedDays.includes(day.id)
                  ? 'border-primary bg-[#F9F5E8] text-primary font-medium'
                  : 'border-[#CDD5DF] text-[#9AA4B2] hover:border-[#b0bac8] hover:bg-[#fafafa]'
              }`}
            >
              {t(day.name)}
            </motion.button>
          ))}
        </div>
      </section>

      {/* ── الوقت ────────────────────────────────────────────────── */}
      <section>
        <div className="flex justify-between mb-6">
          <p className="text-[#4B5565] text-base font-medium">{t('the time')}</p>
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              className={inputClassName}
              checked={allTime}
              onChange={handleAllTimeChange}
            />
            <p className="text-[#4B5565] text-base font-normal">{t('All the time')}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* From */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">
                {t('From')}
              </label>
              <div className="p-4 w-full">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                  localeText={{ timePickerToolbarTitle: t('Select Time') }}
                >
                  <MobileTimePicker
                    value={currentPeriod.from}
                    onChange={(v) => setCurrentPeriod({ ...currentPeriod, from: v })}
                    ampm views={['hours', 'minutes']} closeOnSelect
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            direction: 'rtl', justifyContent: 'space-between',
                            '& input': { textAlign: 'left', paddingRight: '8px' },
                            '& .MuiPickersSectionList-root': { direction: 'ltr !important' },
                            '& .MuiInputAdornment-root': { order: -1, marginLeft: '12px' },
                          },
                        },
                      },
                      mobilePaper: { sx: { direction: 'ltr' } },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>

          {/* To */}
          <div className="flex flex-col">
            <div className="flex gap-6">
              <label className="flex items-center text-[#4B5565] text-xl font-normal whitespace-nowrap">
                {t('To')}
              </label>
              <div className="p-4 w-full">
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="ar"
                  localeText={{ timePickerToolbarTitle: t('Select Time') }}
                >
                  <MobileTimePicker
                    value={currentPeriod.to}
                    onChange={(v) => setCurrentPeriod({ ...currentPeriod, to: v })}
                    ampm views={['hours', 'minutes']} closeOnSelect
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        InputProps: {
                          sx: {
                            direction: 'rtl', justifyContent: 'space-between',
                            '& input': { textAlign: 'left', paddingRight: '8px' },
                            '& .MuiPickersSectionList-root': { direction: 'ltr !important' },
                            '& .MuiInputAdornment-root': { order: -1, marginLeft: '12px' },
                          },
                        },
                      },
                      mobilePaper: { sx: { direction: 'ltr' } },
                    }}
                  />
                </LocalizationProvider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── زر Add period ────────────────────────────────────────── */}
      <div className="flex justify-end mt-6">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={addPeriod}
          className="flex items-center justify-center gap-2 border border-primary rounded-3px w-[197px] h-14 cursor-pointer hover:bg-[#FFF9EA] transition-colors duration-200 shadow-xs"
        >
          <img src="/images/icons/AddYellowIcon.svg" alt="" className="w-6 h-6" />
          <p className="text-primary text-base font-medium">{t('Add period')}</p>
        </motion.button>
      </div>

      {/* ── قائمة الـ periods المضافة ─────────────────────────────── */}
      <section className="mt-12 bg-white rounded-3px">
        <p className="text-[#364152] text-base font-semibold mb-6">{t('Added periods')}</p>

        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {Object.keys(savedPeriods).length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col py-3 border border-[#FEC84B] rounded-3px bg-[#FEF0C7]"
              >
                <p className="text-[#4E4E4E] text-sm font-medium px-4">
                  {t('No period has been added yet. Click "Add period" to begin.')}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="list"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-6"
              >
                {days.map(day => {
                  const dayPeriods = savedPeriods[day.id]
                  if (!dayPeriods || dayPeriods.length === 0) return null
                  return (
                    <motion.div
                      key={day.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.25 }}
                      className="border border-[#CDD5DF] shadow-sm rounded-3px p-4"
                    >
                      <div className="flex justify-start mb-4">
                        <p className="text-[#4E4E4E] text-base font-medium">{t(day.name)}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-start">
                        <AnimatePresence>
                          {dayPeriods.map(p => (
                            <motion.div
                              key={p.id}
                              layout
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.7 }}
                              transition={{ duration: 0.2 }}
                              className="flex items-center gap-3 px-3 py-2 bg-[#EEF2F6] border border-[#CDD5DF] rounded-full"
                            >
                              <span dir="ltr" className="text-[#4B5565] text-sm font-normal inline-block">
                                {p.from?.format('hh:mm A')} - {p.to?.format('hh:mm A')}
                              </span>
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.25 }}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => removeSavedPeriod(day.id, p.id)}
                                className="flex items-center justify-center p-1 cursor-pointer"
                              >
                                <img src="/images/icons/delete-darkRed.svg" alt="delete" className="w-4 h-4" />
                              </motion.button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── زر الحفظ ─────────────────────────────────────────────── */}
      <motion.button
        type="button"
        whileHover={!isSaving ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
        whileTap={!isSaving ? { scale: 0.98 } : {}}
        onClick={handleSave}
        disabled={isSaving}
        className={`bg-primary text-white w-full sm:w-[30%] h-14 rounded-3px font-medium shadow-xs transition-all mt-8 flex items-center justify-center gap-2 ${
          isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {isSaving ? (
          <>
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>{t('Saving...')}</span>
          </>
        ) : (
          <span>{t('save')}</span>
        )}
      </motion.button>

    </motion.div>
  )
}

export default DayAndTime
