"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingTypePage({getAvailabilitySeasons}) {
  const {t} = useTranslation()
  const getAvailabilitySeasonsData = getAvailabilitySeasons?.data
  console.log(getAvailabilitySeasonsData);
  useEffect(() => {
    if (getAvailabilitySeasonsData?.all_avalable === true) {
      setSelectedPolicy('2');
    } else if (getAvailabilitySeasonsData?.all_avalable === false) {
      setSelectedPolicy('1');
    }
  }, [getAvailabilitySeasonsData]);

  
  const [selectedPolicy, setSelectedPolicy] = useState('')

  const inputClassName = "w-5 h-5 appearance-none border rounded-full  border-gray-300 bg-white  checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-['✔'] checked:after:text-white checked:after:absolute checked:after:inset-0 checked:after:flex  checked:after:items-center checked:after:justify-center checked:after:text-xs"  

  const days = [
    t("Saturday"),
    t("Sunday"),
    t("Monday"),
    t("Tuesday"),
    t("Wednesday"),
    t("Thursday"),
    t("Friday"),
  ];

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState([]);
  const [bannedDates, setBannedDates] = useState([]);
  const [reservedDates, setReservedDates] = useState([]);
  const [selectAllActive, setSelectAllActive] = useState(false);
  const [banAllActive, setBanAllActive] = useState(false);
  const [activeMode, setActiveMode] = useState('available'); // 'available', 'forbidden', 'reserved'
  
  // Process API data and distribute dates based on status
  useEffect(() => {
    // Helper function to generate all dates between a start and end date
    const getDatesInRange = (startDate, endDate) => {
      const dates = [];
      let current = new Date(startDate);
      const end = new Date(endDate);
      
      // Normalize to midnight to avoid timezone issues when adding days
      current.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);

      while (current <= end) {
        const yyyy = current.getFullYear();
        const mm = String(current.getMonth() + 1).padStart(2, '0');
        const dd = String(current.getDate()).padStart(2, '0');
        
        dates.push(`${yyyy}-${mm}-${dd}`);
        current.setDate(current.getDate() + 1); // increment by 1 day
      }
      return dates;
    };

    // Determine the array from API data (could be directly the data or inside an 'availability' property)
    const availabilityArray = Array.isArray(getAvailabilitySeasonsData) 
      ? getAvailabilitySeasonsData 
      : getAvailabilitySeasonsData?.availability || [];

    if (availabilityArray && availabilityArray.length > 0) {
      const initialSelected = new Set();
      const initialBanned = new Set();
      const initialReserved = new Set();

      availabilityArray.forEach(item => {
        if (!item.start_date || !item.end_date) return;
        
        // Generate all dates for the current block
        const datesInRange = getDatesInRange(item.start_date, item.end_date);
        
        // Assign dates to the correct Set based on status
        datesInRange.forEach(date => {
          if (item.status === 'available') {
            initialSelected.add(date);
          } else if (item.status === 'blocked') {
            initialBanned.add(date);
          } else if (item.status === 'reserved') {
            initialReserved.add(date);
          }
        });
      });

      // Update states with the newly populated arrays
      setSelectedDates(Array.from(initialSelected));
      setBannedDates(Array.from(initialBanned));
      setReservedDates(Array.from(initialReserved));
    }
  }, [getAvailabilitySeasonsData]);

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

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const toggleDateSelection = (day) => {
    if (!day) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    
    if (activeMode === 'available') {
      if (selectedDates.includes(dateStr)) {
        setSelectedDates(selectedDates.filter(d => d !== dateStr));
      } else {
        setSelectedDates([...selectedDates, dateStr]);
        setBannedDates(bannedDates.filter(d => d !== dateStr));
        setReservedDates(reservedDates.filter(d => d !== dateStr));
      }
    } else if (activeMode === 'blocked') {
      if (bannedDates.includes(dateStr)) {
        setBannedDates(bannedDates.filter(d => d !== dateStr));
      } else {
        setBannedDates([...bannedDates, dateStr]);
        setSelectedDates(selectedDates.filter(d => d !== dateStr));
        setReservedDates(reservedDates.filter(d => d !== dateStr));
      }
    } else if (activeMode === 'reserved') {
      if (reservedDates.includes(dateStr)) {
        setReservedDates(reservedDates.filter(d => d !== dateStr));
      } else {
        setReservedDates([...reservedDates, dateStr]);
        setSelectedDates(selectedDates.filter(d => d !== dateStr));
        setBannedDates(bannedDates.filter(d => d !== dateStr));
      }
    }
  };

  const handleSelectAll = () => {
    const allDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      allDaysInMonth.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);
    }
    const newSelected = new Set([...selectedDates, ...allDaysInMonth]);
    setSelectedDates(Array.from(newSelected));
    setBannedDates(bannedDates.filter(d => !allDaysInMonth.includes(d)));
    setReservedDates(reservedDates.filter(d => !allDaysInMonth.includes(d)));
    setSelectAllActive(true);
    setBanAllActive(false);
  };
  const handleBanAll = () => {
    const allDaysInMonth = [];
    for (let i = 1; i <= daysInMonth; i++) {
      allDaysInMonth.push(`${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`);
    }
    const newBanned = new Set([...bannedDates, ...allDaysInMonth]);
    setBannedDates(Array.from(newBanned));
    setSelectedDates(selectedDates.filter(d => !allDaysInMonth.includes(d)));
    setReservedDates(reservedDates.filter(d => !allDaysInMonth.includes(d)));
    setBanAllActive(true);
    setSelectAllActive(false);
  };
  function Legend({ color, label, onClick, isActive }) {
  return (
    <div 
      className={`flex items-center gap-2 border px-3 py-2 rounded cursor-pointer transition-all ${isActive ? 'border-[var(--color-primary)] bg-[#F8FAFC] shadow-sm' : 'border-[#E3E8EF]'}`}
      onClick={onClick}
    >
      <span className={`w-4 h-4 ${color} rounded`}></span>
      {label}
    </div>
  );
  }

  return (
    <>
      {/* booking type  */}
      <div className='border border-[#E3E8EF] p-3  rounded-[3px]'>

        {/* tittle */}
        <div className='flex gap-2'>
          <img src="/images/icons/web-validation_blue.svg" alt="" />
          <p className='text-[#364152] text-lg font-medium'>{t('Booking type')}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 mt-4'>

          {/*Available on specified dates  */}
          <div 
            className={`border flex justify-between  p-3 cursor-pointer rounded-[3px] ${selectedPolicy === '1' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
            onClick={() => setSelectedPolicy('1')}
          >
            <div>
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    value="1"
                    checked={selectedPolicy === '1'}                   
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className={inputClassName}  
                  />
                  <p className='text-[#364152] text-base font-medium'>{t('Available on specified dates')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Choose specific dates when the property is available.')}</p>              
            </div>
            <button className='flex items-start'>
              <img src="/images/icons/calendar-yellow.svg" className="w-6 h-6" />
            </button>
          </div>

          {/*Always available  */}
          <div 
            className={`border flex justify-between p-3 cursor-pointer rounded-[3px] ${selectedPolicy === '2' ? 'border-[var(--color-primary)]' : 'border-[#E3E8EF]'}`}
            onClick={() => setSelectedPolicy('2')}
          >
            <div>
              <div className='flex gap-2'>
                  <input 
                    type="radio"
                    value="2"
                    checked={selectedPolicy === '2'}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className={inputClassName}  
                  />
                  <p className='text-[#364152] text-base font-medium'>{t('Always available')}</p>
              </div>
              <p className='text-[#4B5565] text-sm font-normal mt-1'>{t('Your property is available for booking this year - tour')}</p>                
            </div>

            <button className='flex items-start'>
              <img src="/images/icons/web-validation_blue.svg" className="w-6 h-6" />
            </button>
          </div>
          
        </div>
      </div>

      {/* calendar */}
      <div className='flex gap-6 w-full border border-[#E3E8EF] mt-4 p-4 rounded-[3px]'> 
        {/* right section */}
        <div className=' w-[70%]  mt-4 bg-white rounded-[3px]'>
        {/* Header */}
        <div className='flex justify-between mb-4 w-full'>
          {/* tittle */}
          <div className='flex items-center gap-2 w-[70%]'>
            <img src="/images/icons/appointment-blue.svg" className="w-6 h-6" />
            <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
          </div>

          <div className="flex justify-between items-center w-[30%]  rounded">
            <button onClick={prevMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-gray-200 rounded">{"<"}</button>

            <h2 className="font-medium text-base text-[#364152]">
              {currentDate.toLocaleString("ar-EG", {
                month: "long",
                year: "numeric",
              })}
            </h2>

            <button onClick={nextMonth} className="text-[#364152] font-bold px-2 py-1 hover:bg-gray-200 rounded">{">"}</button>
          </div>
        </div>
        

        {/* Calendar Grid */}
        <div className="bg-[#F8FAFC] p-6 border border-[#E3E8EF] rounded">
          {/* Days */}
          <div className="grid grid-cols-7 text-center text-sm font-medium text-[#364152] mb-2">
            {days.map((day, i) => (
              <div key={i}>{day}</div>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((day, i) => {
              const dateStr = day ? `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}` : null;
              const isSelected = dateStr && selectedDates.includes(dateStr);
              const isBanned = dateStr && bannedDates.includes(dateStr);
              const isReserved = dateStr && reservedDates.includes(dateStr);
              
              return (
                <div
                  key={i}
                  className={`h-10 flex items-center justify-center rounded text-sm transition-colors
                  ${day ? "cursor-pointer hover:bg-gray-100  text-[#364152]" : ""}
                  ${isSelected ? "!bg-[#17B26A] !text-white !border-[#17B26A]" : ""}
                  ${isBanned ? "!bg-[#F04438] !text-white !border-[#F04438]" : ""}
                  ${isReserved ? "!bg-[var(--color-primary)] !text-white !border-[var(--color-primary)]" : ""}`}
                  onClick={() => toggleDateSelection(day)}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 text-sm">
          <Legend 
            color="bg-[#17B26A]" 
            label={t("Available")} 
            onClick={() => setActiveMode('available')} 
            isActive={activeMode === 'available'} 
          />
          <Legend 
            color="bg-[#F04438]" 
            label={t("Forbidden")} 
            onClick={() => setActiveMode('blocked')} 
            isActive={activeMode === 'blocked'} 
          />
          <Legend
            color="bg-[var(--color-primary)]"
            label={t("reserved")}
            onClick={() => setActiveMode('reserved')} 
            isActive={activeMode === 'reserved'} 
          />
        </div>
        
        </div>


        {/* left section */}
        <div className='w-[30%]'>
          <div className='border border-[#E3E8EF]  p-4 mt-4 bg-white rounded-[3px]'>
          {/* tittle */}
          <div className='flex gap-2'>
            <img src="/images/icons/save-money-dollar_blue.svg" alt="" />
            <p className='text-[#364152] text-base font-medium'>{t('Quick procedures')}</p>
          </div>  

          {/* select all  */}
          <button onClick={handleSelectAll} className={`border rounded-[3px] ${selectAllActive ? 'border-[#17B26A]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-5 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-add-green.svg" className="w-7 h-7 mb-2 " />
              <p className='text-[#364152] text-base font-normal'>{t('Select all')}</p>
              <p className='text-[#697586] text-sm font-normal'>{t('This month')}</p>
            </button>

            {/* Ban all  */}
            <button onClick={handleBanAll} className={`border rounded-[3px] ${banAllActive ? 'border-[#F04438]' : 'border-[#E3E8EF]'} flex flex-col items-center gap-2 mt-4 w-full p-4 cursor-pointer`}
            >
              <img src="/images/icons/calendar-remove-red.svg" className="w-7 h-7 mb-2 " />
              <p className='text-[#364152] text-base font-normal'>{t('Ban all')}</p>
              <p className='text-[#697586] text-sm font-normal'>{t('This month')}</p>
            </button>

          </div>
        </div>
        
        

        
        
      </div>
      
      

    </>
  )
}

export default BookingTypePage