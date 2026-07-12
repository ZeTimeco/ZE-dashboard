'use client'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function HiddenDates() {
  const {t}= useTranslation()
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [hiddenDates, setHiddenDates] = useState([]);
  const [open , setOpen] = useState(false)

  const handleAdd = () => {
    if (!selectedDate) return;
    setHiddenDates(prev => [...prev, { date: selectedDate, reason }]);
    setSelectedDate(null);
    setReason('');
    setOpen(false);
  };
  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Hidden Dates')}</p>


        <div className='flex flex-col gap-2 mt-4'>
          {hiddenDates.map((item, index) => (
            <div key={index} className='flex items-center justify-between  border border-[#E3E8EF] rounded-[3px] px-4 py-3'>
              <div className='flex flex-col'>
                <span className='text-[#364152] text-sm font-normal'>{item.date.format('DD/MM/YYYY')}</span>
                {item.reason && <span className='text-[#4B5565] text-xs font-normal mt-0.5'>{item.reason}</span>}
              </div>
              <button
                onClick={() => setHiddenDates(prev => prev.filter((_, i) => i !== index))}
                className='text-red-400 hover:text-red-600 text-base cursor-pointer'
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        
        <button onClick={()=>setOpen(true)} className='h-14 w-full mt-4 border border-dashed border-[#CDD5DF] flex  justify-center items-center cursor-pointer'>
          <p className='text-[#697586] text-base font-medium'>{t('Add hidden date')}</p>
          <img src="/images/icons/AddGrayIcon.svg" className="w-6 h-6" />
        </button>
        
        {open && (
          <div className='bg-[#F8FAFC] rounded-[3px] p-4 mt-4'>
            <div className="w-full ">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  format="DD/MM/YYYY"
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: {
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "#fff",
                        },
                        "& .MuiOutlinedInput-root input": {
                          backgroundColor: "#fff",
                        },
                        "& .MuiInputBase-input": {
                          backgroundColor: "#fff",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </div>

            <div className='mt-4'>
              <input 
                type="text" 
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder='السبب (مثل: عطلة . حدث خاص)'
                className='w-full h-14 border border-[#CDD5DF] bg-white rounded-[3px] outline-0 px-3' 
              />
            </div>

            <div className="mt-4 flex gap-3">
              <button
                onClick={()=>setOpen(false)}
                className="border w-full h-13 py-2.5 px-4 rounded-[3px] border-[var(--color-primary)] text-[var(--color-primary)] text-base font-medium cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleAdd}
                className="border w-full h-13 py-2.5 px-4 rounded-[3px] bg-[var(--color-primary)] text-[#fff] text-base font-medium cursor-pointer"
              >
                  {t('Add')}
              </button>
      

            </div>

          </div>
        )}
        
      </div>

    </>
  )
}

export default HiddenDates