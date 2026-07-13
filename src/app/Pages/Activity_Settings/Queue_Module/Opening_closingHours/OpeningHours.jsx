'use client'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

const parseTimeString = (timeStr) => {
  if (!timeStr) return null;
  if (dayjs.isDayjs(timeStr)) return timeStr;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return dayjs().hour(hours).minute(minutes).second(0).millisecond(0);
};

const formatTimeDayjs = (date) => {
  if (!date) return '';
  return dayjs(date).format('HH:mm');
};

function TimeSlotRow({ slot = {}, readOnly, onChange }) {
  const fromVal = parseTimeString(slot?.from);
  const toVal = parseTimeString(slot?.to);

  return (
    <div className="flex gap-6 flex-1">
      {/* From Time */}
      <div className="flex flex-col w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
          <MobileTimePicker
            ampm
            views={["hours", "minutes"]}
            sx={{ width: "100%" }}
            value={fromVal}
            onChange={(val) => onChange('from', val)}
            readOnly={readOnly}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />
        </LocalizationProvider>
      </div>

      {/* To Time */}
      <div className="flex flex-col w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
          <MobileTimePicker
            ampm
            views={["hours", "minutes"]}
            sx={{ width: "100%" }}
            value={toVal}
            onChange={(val) => onChange('to', val)}
            readOnly={readOnly}
            slotProps={{
              textField: { fullWidth: true },
            }}
          />
        </LocalizationProvider>
      </div>
    </div>
  )
}

function DayBlock({ label, dayKey, formData, setFormData }) {
  const [editableSlot, setEditableSlot] = useState({ from: null, to: null })

  const dayData = formData?.working_times?.find((item) => item.day?.toLowerCase() === dayKey.toLowerCase()) || { day: dayKey.toLowerCase(), times: [] };
  const savedSlots = dayData.times || [];

  const handleAdd = () => {
    const fromStr = formatTimeDayjs(editableSlot.from)
    const toStr = formatTimeDayjs(editableSlot.to)

    setFormData(prev => {
      const workingTimes = prev.working_times || []
      const existingDayIdx = workingTimes.findIndex(d => d.day?.toLowerCase() === dayKey.toLowerCase())
      let newWorkingTimes = [...workingTimes]

      if (existingDayIdx > -1) {
        const dayObj = { ...newWorkingTimes[existingDayIdx] }
        dayObj.times = [...(dayObj.times || []), { from: fromStr, to: toStr }]
        newWorkingTimes[existingDayIdx] = dayObj
      } else {
        newWorkingTimes.push({
          day: dayKey.toLowerCase(),
          times: [{ from: fromStr, to: toStr }]
        })
      }

      return { ...prev, working_times: newWorkingTimes }
    })

    setEditableSlot({ from: null, to: null })
  }

  const handleDelete = (index) => {
    setFormData(prev => {
      const workingTimes = prev.working_times || []
      const existingDayIdx = workingTimes.findIndex(d => d.day?.toLowerCase() === dayKey.toLowerCase())
      if (existingDayIdx === -1) return prev

      let newWorkingTimes = [...workingTimes]
      const dayObj = { ...newWorkingTimes[existingDayIdx] }
      dayObj.times = (dayObj.times || []).filter((_, i) => i !== index)

      if (dayObj.times.length === 0) {
        newWorkingTimes = newWorkingTimes.filter(d => d.day?.toLowerCase() !== dayKey.toLowerCase())
      } else {
        newWorkingTimes[existingDayIdx] = dayObj
      }

      return { ...prev, working_times: newWorkingTimes }
    })
  }

  const handleEditableChange = (field, value) => {
    setEditableSlot(prev => ({ ...prev, [field]: value }))
  }

  const isDuplicate = savedSlots.some((s) => {
    const fromStr = formatTimeDayjs(editableSlot.from)
    const toStr = formatTimeDayjs(editableSlot.to)
    return s.from === fromStr && s.to === toStr
  })
  const canAdd = editableSlot.from?.isValid() && editableSlot.to?.isValid() && !isDuplicate

  return (
    <div className='mt-4'>
      <p className='mb-2 text-[#4B5565] text-base font-normal'>{label}</p>

      {/* Editable first row */}
      <div className="flex gap-6 items-center">
        <TimeSlotRow
          slot={editableSlot}
          readOnly={false}
          onChange={handleEditableChange}
        />
        {/* Add button */}
        <div className='w-[7%] flex justify-center'>
          <button
            onClick={handleAdd}
            disabled={!canAdd}
            className={`w-14 h-13  rounded-[3px] flex justify-center items-center transition-opacity
              ${
                canAdd
                  ? 'border border-[var(--color-primary)] hover:opacity-80 cursor-pointer'
                  : 'bg-gray-300 opacity-30 cursor-not-allowed'
              }`}
          >
            <img src={canAdd ? "/images/icons/AddYellowIcon.svg":'/images/icons/AddGrayIcon.svg'} alt="add" />
          </button>
        </div>
      </div>

      {/* Saved read-only rows below */}
      {savedSlots.map((slot, index) => (
        <div key={index} className="flex gap-6 items-center mt-3">
          <TimeSlotRow
            slot={slot}
            readOnly={true}
            onChange={() => {}}
          />
          {/* Delete button – same w-[7%] column as Add button */}
          <div className='w-[7%] flex justify-center'>
            <button
              onClick={() => handleDelete(index)}
              className="w-14 h-13 border border-red-400 rounded-[3px] flex justify-center items-center hover:bg-red-50 transition-colors"
            >
              <img src="/images/icons/delete-darkRed.svg" alt="" />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

function OpeningHours({ formData, setFormData }) {
  const { t } = useTranslation()

  const days = [
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ]

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Opening Hours')}</p>

        {days.map((day) => (
          <DayBlock 
            key={day} 
            label={t(day)} 
            dayKey={day}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
      </div>
    </>
  )
}

export default OpeningHours