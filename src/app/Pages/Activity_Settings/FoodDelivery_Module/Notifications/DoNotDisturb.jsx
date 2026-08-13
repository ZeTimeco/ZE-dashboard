'use client'
import { styled, Switch } from '@mui/material';
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

function DoNotDisturb({formData , setFormData}) {
  const {t} = useTranslation()
  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  
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
        borderRadius: 12,
        backgroundColor: '#E9E9EA',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
          duration: 500,
        }),
      },
    }));
  
  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>

      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Do not disturb')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t("Disable notifications at specific times")}</span>
      </p>

      {/* Activate Do Not Disturb  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#EFF6FF] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/Moon-babyBlue.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Activate Do Not Disturb')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Turn off notifications during a specific time period.')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.notify_dnd_enabled === 1}
            onChange={
              (e)=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_dnd_enabled:e.target.checked ? 1 : 0
                }))
              }
            }
          
          />
        </div>
      </div>

      {/* time */}
      <div>
        <div className="grid grid-cols-2 gap-6 mt-4">
          {/* From Time */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-normal mb-1.5">
              {t("From the hour")}
            </label>

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ar"
            >
              <MobileTimePicker
                value={
                  formData.notify_dnd_start
                    ? dayjs(formData.notify_dnd_start, "HH:mm")
                    : null
                }
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    notify_dnd_start: newValue
                      ? newValue.format("HH:mm")
                      : "",
                  }))
                }
                ampm
                views={["hours", "minutes"]}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>

          {/* To Time */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-sm font-normal mb-1.5">
              {t("Until the hour")}
            </label>

            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="ar"
            >
              <MobileTimePicker
                value={
                  formData.notify_dnd_end
                    ? dayjs(formData.notify_dnd_end, "HH:mm")
                    : null
                }
                onChange={(newValue) =>
                  setFormData((prev) => ({
                    ...prev,
                    notify_dnd_end: newValue
                      ? newValue.format("HH:mm")
                      : "",
                  }))
                }
                ampm
                views={["hours", "minutes"]}
                sx={{ width: "100%" }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                  },
                }}
              />
            </LocalizationProvider>
          </div>
        </div>
      </div>




      {/* note */}
      <div className='border border-[#FEC84B] bg-[#FFFAEB] rounded-[3px] p-2 mt-4'>
        <p className='text-[#F79009] text-base font-normal'>
          {t('Critical (new) orders will still reach you even in Do Not Disturb mode')}
        </p>
      </div>


    </div>



    </>
  )
}

export default DoNotDisturb