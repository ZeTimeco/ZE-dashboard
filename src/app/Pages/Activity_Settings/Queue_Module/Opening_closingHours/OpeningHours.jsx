'use client'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function TimeSlotRow({ slot, readOnly, onChange }) {
  return (
    <div className="flex gap-6 flex-1">
      {/* From Time */}
      <div className="flex flex-col w-full">
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ar">
          <MobileTimePicker
            ampm
            views={["hours", "minutes"]}
            sx={{ width: "100%" }}
            value={slot.from}
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
            value={slot.to}
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

function DayBlock({ label }) {
  const [editableSlot, setEditableSlot] = useState({ from: null, to: null })
  const [savedSlots, setSavedSlots] = useState([])

  const handleAdd = () => {
    setSavedSlots(prev => [...prev, { ...editableSlot }])
    setEditableSlot({ from: null, to: null })
  }

  const handleDelete = (index) => {
    setSavedSlots(prev => prev.filter((_, i) => i !== index))
  }

  const handleEditableChange = (field, value) => {
    setEditableSlot(prev => ({ ...prev, [field]: value }))
  }

  const isDuplicate = savedSlots.some(
    (s) =>
      s.from?.isSame(editableSlot.from) &&
      s.to?.isSame(editableSlot.to)
  )
  const canAdd = editableSlot.from && editableSlot.to && !isDuplicate

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

function OpeningHours() {
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
          <DayBlock key={day} label={t(day)} />
        ))}
      </div>
    </>
  )
}

export default OpeningHours