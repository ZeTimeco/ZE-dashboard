"use client"
import { styled, Switch } from '@mui/material'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';

function Content({ formData, setFormData }) {
  const { t } = useTranslation()
  const inputClassNameDot = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-colors"
  const inputClassNameTrue = "w-5 h-5 appearance-none border border-gray-300 rounded-sm bg-white cursor-pointer relative checked:bg-[var(--color-primary)] checked:border-[var(--color-primary)] after:absolute after:hidden checked:after:block checked:after:content-['✓'] checked:after:text-white checked:after:text-xs checked:after:font-bold checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 transition-colors";

  // ── helpers ──────────────────────────────────────────────────────────────
  const set = (key, value) => setFormData(prev => ({ ...prev, [key]: value }))

  // ── Minimum booking time dropdown ─────────────────────────────────────────
  const [open1, setOpen1] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionBookingTime = [
    { name: t('3hours'), value: 3 },
    { name: t('6hours'), value: 6 },
    { name: t('12hours'), value: 12 },
    { name: t('One day'), value: 24 },
    { name: t('Two days'), value: 48 },
  ];

  // Label for currently selected option
  const selectedBookingTimeLabel = optionBookingTime.find(
    o => o.value === formData.min_hours_before_booking
  )?.name || "";

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── MUI Switch ────────────────────────────────────────────────────────────
  const GreenSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 53,
    height: 24,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 3,
      transitionDuration: '500ms',
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
      borderRadius: 24 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
    },
  }));

  // ── same_day_booking_cutoff_time as dayjs ─────────────────────────────────
  const cutoffValue = formData?.same_day_booking_cutoff_time
    ? dayjs(formData?.same_day_booking_cutoff_time, 'HH:mm:ss')
    : null;

  return (
    <>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Approval type – auto */}
        <div 
          onClick={() => set('approval_type', 'auto')}
          className={`border py-4 px-4 flex justify-between items-center rounded-[3px] cursor-pointer transition-all duration-200 ${
            formData.approval_type === 'auto' ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
          }`}
        >
          <p className='text-[#364152] text-sm font-medium'>{t('Automatic booking approval')}</p>
          <input
            type='radio'
            name='approval_type'
            className={inputClassNameDot}
            checked={formData.approval_type === 'auto'}
            onChange={() => set('approval_type', 'auto')}
          />
        </div>

        {/* Approval type – Manual */}
        <div 
          onClick={() => set('approval_type', 'manual')}
          className={`border py-4 px-4 flex justify-between items-center rounded-[3px] cursor-pointer transition-all duration-200 ${
            formData.approval_type === 'manual' ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
          }`}
        >
          <p className='text-[#364152] text-sm font-medium'>{t('Manual approval is required')}</p>
          <input
            type='radio'
            name='approval_type'
            className={inputClassNameDot}
            checked={formData.approval_type === 'manual'}
            onChange={() => set('approval_type', 'manual')}
          />
        </div>
      </div>

      {/* Minimum number of nights */}
      <div className='mt-6'>
        <p className='text-[#364152] text-sm font-medium'>{t('Minimum number of nights')}</p>
        <div className='flex items-center gap-3 py-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('min_nights', Math.max(0, (Number(formData.min_nights) || 0) - 1))}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            -
          </motion.button>
          <span className='w-full h-11 text-[#4B5565] flex items-center justify-center font-medium text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px] shadow-2xs'>
            {formData.min_nights || 0} {t('nights')}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('min_nights', (Number(formData.min_nights) || 0) + 1)}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Maximum number of nights */}
      <div className='mt-5'>
        <p className='text-[#364152] text-sm font-medium'>{t('Maximum number of nights')}</p>
        <div className='flex items-center gap-3 py-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('max_nights', Math.max(0, (Number(formData.max_nights) || 0) - 1))}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            -
          </motion.button>
          <span className='w-full h-11 text-[#4B5565] flex items-center justify-center font-medium text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px] shadow-2xs'>
            {formData.max_nights || 0} {t('nights')}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('max_nights', (Number(formData.max_nights) || 0) + 1)}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            +
          </motion.button>
        </div>
      </div>

      {/* Minimum booking time */}
      <div className='mt-5'>
        <p className='text-[#364152] text-sm font-medium'>{t('Minimum booking time')}</p>
        <div className="mt-2 w-full">
          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center cursor-pointer"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("select minimum booking time")}
                value={searchValue1 || selectedBookingTimeLabel}
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                }}
                className='w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#364152] rounded-[3px] outline-none transition-colors focus:border-[var(--color-primary)]'
              />
              <span className="absolute left-3 cursor-pointer">
                {open1 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open1 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto mt-1">
                {optionBookingTime
                  .filter((opt) =>
                    opt?.name?.toLowerCase().includes((searchValue1 || '').toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt?.value}
                      onClick={() => {
                        set('min_hours_before_booking', opt.value);
                        setSearchValue1("");
                        setOpen1(false);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer transition-colors text-sm text-[#364152]"
                    >
                      {opt?.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Same-day booking allowed */}
      <div className='flex justify-between items-center mt-6 py-2 border-t border-b border-gray-100'>
        <p className='text-[#364152] text-base font-medium'>{t('Same-day booking allowed')}</p>
        <GreenSwitch
          checked={!!formData.allow_same_day_booking}
          onChange={(e) => set('allow_same_day_booking', e.target.checked)}
        />
      </div>

      {/* Maximum booking time is on the same day */}
      <div className='mt-5'>
        <p className='text-[#364152] text-sm font-medium mb-2'>{t('Maximum booking time is on the same day')}</p>
        <div className='relative flex items-center cursor-pointer w-full'>
          <LocalizationProvider
            localeText={{ timePickerToolbarTitle: t('Select Time') }}
            dateAdapter={AdapterDayjs}
            adapterLocale="ar"
          >
            <MobileTimePicker
              ampm={true}
              views={["hours", "minutes"]}
              closeOnSelect={true}
              value={cutoffValue}
              onChange={(newValue) => {
                set('same_day_booking_cutoff_time', newValue ? newValue.format('HH:mm:ss') : '');
              }}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    sx: {
                      height: "56px",
                      direction: "rtl",
                      "& fieldset": { borderColor: "#CDD5DF", borderRadius: "3px" },
                      "&:hover fieldset": { borderColor: "#9AA4B2" },
                      "&.Mui-focused fieldset": { borderColor: "var(--color-primary)", borderWidth: "1px" },
                      "& input": { textAlign: "right", fontSize: "14px", color: "#364152", outline: "none" },
                    },
                  },
                },
                mobilePaper: { sx: { direction: "ltr" } },
              }}
            />
          </LocalizationProvider>
        </div>
      </div>

      {/* Cleaning settings */}
      <div className='mt-6'>
        <p className='text-[#364152] text-base font-medium'>{t('Cleaning settings')}</p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-3'>
          {/* On-demand cleaning */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, provide_ondemand_cleaning: true }))}
            className={`border flex items-center gap-3 py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData.provide_ondemand_cleaning === true ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <input
              type="radio"
              className={inputClassNameTrue}
              name="cleaning"
              checked={formData.provide_ondemand_cleaning === true}
              onChange={() =>
                setFormData(prev => ({
                  ...prev,
                  provide_ondemand_cleaning: true,
                }))}
            />
            <p className='text-[#364152] text-sm font-normal'>{t('Cleaning services are provided upon guest request.')}</p>
          </div>

          {/* Periodic cleaning */}
          <div 
            onClick={() => setFormData(prev => ({ ...prev, provide_ondemand_cleaning: false }))}
            className={`border flex items-center gap-3 py-4 px-4 rounded-[3px] cursor-pointer transition-all duration-200 ${
              formData.provide_ondemand_cleaning === false ? 'border-[var(--color-primary)] bg-[#FFFDF5]' : 'border-[#CDD5DF] hover:border-slate-400'
            }`}
          >
            <input
              type="radio"
              className={inputClassNameTrue}
              name="cleaning"
              checked={formData.provide_ondemand_cleaning === false}
              onChange={() =>
                setFormData(prev => ({
                  ...prev,
                  provide_ondemand_cleaning: false,
                }))}
            />
            <p className='text-[#364152] text-sm font-normal'>{t('Cleaning services are provided periodically.')}</p>
          </div>
        </div>
      </div>

      {/* The period between each cleaning operation */}
      <div className='mt-6'>
        <p className='text-[#364152] text-sm font-medium'>{t('The period between each cleaning operation')}</p>
        <div className='flex items-center gap-3 py-2'>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('days_between_cleaning', Math.max(0, (Number(formData.days_between_cleaning) || 0) - 1))}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            -
          </motion.button>
          <span className='w-full h-11 text-[#4B5565] flex items-center justify-center font-medium text-center bg-[#F8FAFC] border border-[#E3E8EF] rounded-[3px] shadow-2xs'>
            {formData.days_between_cleaning || 0} {t('day')}
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type='button'
            onClick={() => set('days_between_cleaning', (Number(formData.days_between_cleaning) || 0) + 1)}
            className='w-12.5 h-11 flex items-center justify-center text-[#4B5565] bg-[#F8FAFC] border border-[#E3E8EF] text-base font-semibold rounded-[3px] transition cursor-pointer hover:bg-slate-200/60'
          >
            +
          </motion.button>
        </div>
      </div>
    </>
  )
}

export default Content