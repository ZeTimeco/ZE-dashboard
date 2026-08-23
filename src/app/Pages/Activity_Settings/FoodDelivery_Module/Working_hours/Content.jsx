'use client'
import React, { useState } from 'react'
import { styled, Switch } from '@mui/material';
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';

const GreenSwitch = styled((props) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
  />
))(({ theme }) => ({
  width: 53,
  height: 24,
  padding: 0,

  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 3,
    transitionDuration: '300ms',

    '&.Mui-checked': {
      transform: 'translateX(31px)',
      color: '#fff',

      '& + .MuiSwitch-track': {
        backgroundColor: '#10B981',
        opacity: 1,
        border: 0,
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },

    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },

    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
    },
  },

  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },

  '& .MuiSwitch-track': {
    borderRadius: 12,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 300,
    }),
  },
}));

const DAYS_OF_WEEK = [
  { id: 'saturday', key: 'Saturday' },
  { id: 'sunday', key: 'Sunday' },
  { id: 'monday', key: 'Monday' },
  { id: 'tuesday', key: 'Tuesday' },
  { id: 'wednesday', key: 'Wednesday' },
  { id: 'thursday', key: 'Thursday' },
  { id: 'friday', key: 'Friday' },
];

const getTimeString = (d) => {
  if (!d) return null;
  if (typeof d === 'string') return d;
  if (typeof d.format === 'function') return d.format('HH:mm');
  return null;
};

function Content() {
  const { t, i18n } = useTranslation();

  const [schedule, setSchedule] = useState(() =>
    DAYS_OF_WEEK.map((day) => ({
      id: day.id,
      dayKey: day.key,
      isEnabled: true,
      periods: [{ id: `${day.id}-0`, from: null, to: null }],
    }))
  );

  const handleToggleDay = (dayId) => {
    setSchedule((prev) =>
      prev.map((day) =>
        day.id === dayId ? { ...day, isEnabled: !day.isEnabled } : day
      )
    );
  };

  const handleAddPeriod = (dayId) => {
    const day = schedule.find((d) => d.id === dayId);
    if (!day) return;

    // Check if any existing period is missing from or to
    const hasEmptyField = day.periods.some((p) => !p.from || !p.to);
    if (hasEmptyField) {
      toast.error(t('Please complete the current working period first'));
      return;
    }

    // Check for duplicate periods in existing ones
    const periodStrings = day.periods.map(
      (p) => `${getTimeString(p.from)}-${getTimeString(p.to)}`
    );
    const hasDuplicates = new Set(periodStrings).size !== periodStrings.length;
    if (hasDuplicates) {
      toast.error(t('This working period is already added for this day'));
      return;
    }

    // Check if any period has identical start and end time
    const hasSameTime = day.periods.some(
      (p) => getTimeString(p.from) && getTimeString(p.to) && getTimeString(p.from) === getTimeString(p.to)
    );
    if (hasSameTime) {
      toast.warning(t('Start time cannot be equal to end time'));
      return;
    }

    setSchedule((prev) =>
      prev.map((d) =>
        d.id === dayId
          ? {
              ...d,
              periods: [
                ...d.periods,
                { id: `${dayId}-${Date.now()}`, from: null, to: null },
              ],
            }
          : d
      )
    );
  };

  const handleRemovePeriod = (dayId, periodIndex) => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        const newPeriods = day.periods.filter((_, idx) => idx !== periodIndex);
        return {
          ...day,
          periods:
            newPeriods.length > 0
              ? newPeriods
              : [{ id: `${dayId}-${Date.now()}`, from: null, to: null }],
        };
      })
    );
  };

  const handleTimeChange = (dayId, periodIndex, field, newValue) => {
    setSchedule((prev) =>
      prev.map((day) => {
        if (day.id !== dayId) return day;
        const newPeriods = [...day.periods];
        newPeriods[periodIndex] = {
          ...newPeriods[periodIndex],
          [field]: newValue,
        };
        return { ...day, periods: newPeriods };
      })
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={i18n.language === 'ar' ? 'ar' : 'en'}>
      <div className="flex flex-col gap-4">
        {schedule.map((day, dayIndex) => {
          const hasEmptyField = day.periods.some((p) => !p.from || !p.to);
          const periodStrings = day.periods
            .filter((p) => p.from && p.to)
            .map((p) => `${getTimeString(p.from)}-${getTimeString(p.to)}`);
          const hasDuplicates = new Set(periodStrings).size !== periodStrings.length;
          const isAddDisabled = hasEmptyField || hasDuplicates;

          return (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: dayIndex * 0.05 }}
              className={`shadow-[0_0_4px_0_rgba(0,0,0,0.15)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.12)] p-4 rounded-3px transition-shadow duration-300 ${
                !day.isEnabled ? 'opacity-75 bg-[#FAFBFD]' : 'bg-white'
              }`}
            >
              {/* Header: Icon + Day Name + Toggle */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2.5">
                  <motion.p
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#FFFAEB] w-8 h-8 rounded-full flex justify-center items-center"
                  >
                    <img src="/images/icons/clock-orange.svg" alt="" />
                  </motion.p>
                  <p className="text-[#364152] text-base font-medium flex items-center select-none">
                    {t(day.dayKey)}
                  </p>
                </div>
                <div className="flex items-center">
                  <GreenSwitch
                    checked={day.isEnabled}
                    onChange={() => handleToggleDay(day.id)}
                  />
                </div>
              </div>

              {/* Time Pickers & Working Periods with AnimatePresence */}
              <AnimatePresence initial={false}>
                {day.isEnabled ? (
                  <motion.div
                    key="content-open"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="flex flex-col gap-4 mt-4">
                      <AnimatePresence initial={false}>
                        {day.periods.map((period, periodIndex) => {
                          const fromStr = getTimeString(period.from);
                          const toStr = getTimeString(period.to);
                          const isSameTime = Boolean(fromStr && toStr && fromStr === toStr);
                          const isDuplicate = Boolean(
                            fromStr &&
                            toStr &&
                            day.periods.some(
                              (p, idx) =>
                                idx !== periodIndex &&
                                getTimeString(p.from) === fromStr &&
                                getTimeString(p.to) === toStr
                            )
                          );

                          return (
                            <motion.div
                              key={period.id || periodIndex}
                              initial={{ opacity: 0, scale: 0.97, y: -8 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, height: 0, marginBottom: 0 }}
                              transition={{ duration: 0.25 }}
                              className="flex flex-col gap-1.5 bg-gray-50/40 p-3 rounded-3px border border-gray-100/80"
                            >
                              <div className="flex items-end gap-3">
                                <div className="grid grid-cols-2 gap-4 sm:gap-6 flex-1">
                                  {/* From Time */}
                                  <div className="flex flex-col">
                                    <label className="text-sm font-medium text-[#364152] mb-2">
                                      {t('from')}
                                    </label>
                                    <MobileTimePicker
                                      ampm
                                      views={["hours", "minutes"]}
                                      value={period.from}
                                      onChange={(newValue) =>
                                        handleTimeChange(day.id, periodIndex, 'from', newValue)
                                      }
                                      sx={{ width: "100%", backgroundColor: '#fff', borderRadius: '4px' }}
                                      slotProps={{
                                        textField: {
                                          fullWidth: true,
                                          error: isDuplicate || isSameTime,
                                        },
                                      }}
                                    />
                                  </div>

                                  {/* To Time */}
                                  <div className="flex flex-col">
                                    <label className="text-sm font-medium text-[#364152] mb-2">
                                      {t('to')}
                                    </label>
                                    <MobileTimePicker
                                      ampm
                                      views={["hours", "minutes"]}
                                      value={period.to}
                                      onChange={(newValue) =>
                                        handleTimeChange(day.id, periodIndex, 'to', newValue)
                                      }
                                      sx={{ width: "100%", backgroundColor: '#fff', borderRadius: '4px' }}
                                      slotProps={{
                                        textField: {
                                          fullWidth: true,
                                          error: isDuplicate || isSameTime,
                                        },
                                      }}
                                    />
                                  </div>
                                </div>

                                {/* Delete Icon Button next to inputs */}
                                {day.periods.length > 1 && (
                                  <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    type="button"
                                    onClick={() => handleRemovePeriod(day.id, periodIndex)}
                                    title={t('delete')}
                                    className="w-10 h-10 flex justify-center   cursor-pointer  mb-0.5"
                                  >
                                    <img src="/images/icons/delete-darkRed.svg" alt={t('delete')} className="w-5 h-5" />
                                  </motion.button>
                                )}
                              </div>

                              {/* Inline warnings with animation */}
                              <AnimatePresence>
                                {isDuplicate && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-red-500 mt-0.5"
                                  >
                                    {t('This working period is already added for this day')}
                                  </motion.p>
                                )}
                                {isSameTime && (
                                  <motion.p
                                    initial={{ opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    className="text-xs text-amber-600 mt-0.5"
                                  >
                                    {t('Start time cannot be equal to end time')}
                                  </motion.p>
                                )}
                              </AnimatePresence>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>

                      {/* Add working period button with micro-interactions */}
                      <motion.button
                        whileHover={!isAddDisabled ? { scale: 1.008, backgroundColor: '#f8fafc' } : {}}
                        whileTap={!isAddDisabled ? { scale: 0.99 } : {}}
                        type="button"
                        onClick={() => handleAddPeriod(day.id)}
                        disabled={isAddDisabled}
                        className={`border border-dashed border-[#CDD5DF] rounded-3px flex justify-center gap-1 py-2.5 px-4 w-full mt-1 transition-all duration-200 ${
                          isAddDisabled
                            ? 'opacity-50 cursor-not-allowed bg-gray-50/50'
                            : 'cursor-pointer hover:border-gray-400 shadow-2xs'
                        }`}
                      >
                        <img src="/images/icons/AddGrayIcon.svg" alt="" />
                        <p className="text-[#697586] text-base font-normal flex items-center">
                          {t('Add working period')}
                        </p>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="content-closed"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className=""
                  >
                    <div className='border border-[#E3E8EF] my-3'></div>
                    <span className="text-[#F04438] text-xl font-normal flex justify-center">{t('closed')}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </LocalizationProvider>
  )
}

export default Content