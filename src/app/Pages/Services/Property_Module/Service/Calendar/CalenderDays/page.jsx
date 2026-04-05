"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import DetailsOfDay from '../Modules/DetailsOfDay';

function CalenderDaysPage() {
  const {t} = useTranslation()
  const days = ["سبت", "أحد", "إثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة"];

  const BOOKED_DAYS = [5, 12, 20];
  const BLOCKED_DAYS = [8, 15];
  const AVAILABLE_DAYS = [1, 2, 3, 4, 6, 7];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayInfo, setSelectedDayInfo] = useState(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const startDay = (firstDay + 1) % 7;

  const calendarDays = [];

  for (let i = 0; i < startDay; i++) {
    calendarDays.push("");
  }

  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }


  const getStatusColor = (day) => {
    if (!day) return "";

    if (BOOKED_DAYS.includes(day)) return "bg-[#F04438] text-white";
    if (BLOCKED_DAYS.includes(day)) return "bg-[var(--color-primary)] text-white";
    if (AVAILABLE_DAYS.includes(day)) return "bg-[#17B26A] text-white";
    return "text-[#9AA4B2]"; 
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    
    let status = t('Unspecified') || "غير محدد";
    if (BOOKED_DAYS.includes(day)) status = t('Forbidden');
    else if (BLOCKED_DAYS.includes(day)) status = t('reserved');
    else if (AVAILABLE_DAYS.includes(day)) status = t('Available');
    
    setSelectedDayInfo({
      date: new Date(year, month, day).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
      status
    });
  };



  return (
    <>

    <div className="w-full  p-4 bg-white border border-[#E3E8EF] ">

      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[#F8FAFC] border border-[#E3E8EF] p-3">
        <button onClick={prevMonth}>{"<"}</button>
        <h2 className="font-medium text-base text-[#364152]">
          {currentDate.toLocaleString("ar-EG", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <button onClick={nextMonth}>{">"}</button>
      </div>

      <div className='bg-[#F8FAFC] p-6'>
        {/* Days */}
        <div className="grid grid-cols-7 text-center text-sm font-medium text-[#364152] mt-3 mb-2">
          {days.map((day, i) => (
            <div key={i}>{day}</div>
          ))}
        </div>

        {/* Calendar */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, i) => (
            <div
              key={i}
              className={`h-10 flex items-center justify-center rounded-[3px] transition-all text-sm
                ${day ? getStatusColor(day) + " cursor-pointer hover:opacity-80" : "bg-transparent"}
              `}
              onClick={() => handleDayClick(day)}
            >
              {day}
            </div>
          ))}
        </div>

      </div>


      {/* Legend */}
      <div className="flex justify-center gap-6 mt-6 text-sm">
        <button className="flex items-center justify-center rounded-[3px] gap-2 border border-[#17B26A] py-1 px-3 h-14 w-30 cursor-pointer">
          <span className="w-4 h-4 bg-[#17B26A] rounded-[3px]"></span>
          {t('Available')}
        </button>
        <button className="flex items-center justify-center rounded-[3px] gap-2 border border-[#F04438] py-1 px-3 h-14 w-30 cursor-pointer">
          <span className="w-4 h-4 bg-[#F04438] rounded-sm"></span>
          {t('Forbidden')}
        </button>
        <button className="flex items-center justify-center rounded-[3px] gap-2  border border-[var(--color-primary)] py-1 px-3 h-14 w-30 cursor-pointer ">
          <span className="w-4 h-4 bg-[var(--color-primary)] rounded-[3px]"></span>
          {t('reserved')}
        </button>
      </div>

      <DetailsOfDay 
        selectedDayInfo={selectedDayInfo} 
        onClose={() => setSelectedDayInfo(null)} 
      />
    </div>

    </>
  )
}

export default CalenderDaysPage