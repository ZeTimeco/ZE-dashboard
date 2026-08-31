

"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import TimeRangePicker from './TimeRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function WorkingHours({openWorkingHours , setOpenWorkingHours ,worker}) {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.workers);

  // Working hours
  const [workingHours, setWorkingHours] = useState({
    start: '00:00',
    end: '00:00',
  });

  const convertArabicTimeTo24 = (timeStr) => {
    const [time, period] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (period === "م") {
      if (hours < 12) hours += 12;
    } else if (period === "ص" && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2,"0")}:${minutes.toString().padStart(2,"0")}`;
  };

  useEffect(() => {
    if(worker?.working_time){
      const [startRaw, endRaw] = worker.working_time.split(" - ");
      setWorkingHours({
        start: convertArabicTimeTo24(startRaw),
        end: convertArabicTimeTo24(endRaw),
      });
    }
  }, [worker, openWorkingHours]);

  // Convert 24-hour time to Arabic format
  const formatTimeToArabic = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'م' : 'ص';
    const adjustedHours = hours % 12 || 12;
    return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedWorkingTime = `${formatTimeToArabic(workingHours.start)} - ${formatTimeToArabic(workingHours.end)}`;
    
    const formData = new FormData();
    formData.append('id', worker?.id);
    formData.append('working_time', formattedWorkingTime);
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenWorkingHours(false);
    }
  };

  return (
    <>
      <Dialog 
        open={openWorkingHours} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button className='pt-8 px-6 pb-2 cursor-pointer flex justify-end w-full' onClick={()=>setOpenWorkingHours(false)}>
          <span className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors'>
            <img src="/images/icons/xx.svg" alt="" className="transition-transform duration-200 hover:rotate-90" />
          </span>
        </button>

        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center shadow-xs'>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/clock.svg" className="w-7.5 h-7.5" alt="" />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Working hours')}</p>
        </div>
        
        <div className='px-6'>
          {/* Working hours */}
          <div className="flex flex-col">
            <TimeRangePicker
              value={workingHours}
              onChange={setWorkingHours}
              label={t('Working hours')}
              language="ar"
            />
          </div>

          <div className='my-6 flex gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading}
              className='w-full h-15 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[3px] flex justify-center items-center disabled:opacity-50 font-medium shadow-xs transition-all'
            >
              {loading ? t('loading...') : t('save')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpenWorkingHours(false)} 
              className='w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center font-medium transition-colors'
            >
              {t('cancel')}
            </motion.button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default WorkingHours
