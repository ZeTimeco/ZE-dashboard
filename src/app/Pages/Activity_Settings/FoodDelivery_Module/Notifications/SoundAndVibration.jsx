'use client'
import { styled, Switch } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function SoundAndVibration({formData , setFormData}) {

  const {t} = useTranslation()

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


  const [selected, setSelected] = useState("custom");
  const options = [
    { id: "custom", label: t('tone') },
    { id: "default", label: t('hypothetical') },
    { id: "beep", label:t('bell') },
  ];




  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px]'>

      <p className='flex flex-col gap-1'>
        <span className='text-[#364152] text-base font-medium'>{t('Sound and vibration')}</span>
        <span className='text-[#697586] text-sm font-normal'>{t("Sound and vibration settings for alerts")}</span>
      </p>

      {/* Activate sound  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#F4EAD0] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/volume-high-yellow.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Activate sound')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Play a sound tone for alerts')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.notify_sound_enabled === 1}
            onChange={
              (e)=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_sound_enabled:e.target.checked ? 1 : 0
                }))
              }
            }
          
          />
        </div>
      </div>

      {/* Tone type */}
      <div className="w-full my-4 ">
        <label className="  text-base text-[#364152] font-normal">
          {t('Tone type')}
        </label>

        <div className="grid grid-cols-3 gap-1.5 mt-3">
          {options.map((option) => {
            const isActive = formData.notification_sound_type === option.id;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setFormData((prev) => ({
                    ...prev,
                    notification_sound_type: option.id,
                  }))
                }
                className={`h-10 rounded-[3px] border text-sm font-normal transition-colors cursor-pointer
                  ${isActive
                      ? "border-[var(--color-primary)] bg-[#FFFBEB] text-[var(--color-primary)]"
                      : "border-[#CDD5DF] bg-[#F8FAFC] text-[#4B5565] hover:bg-[#F1F5F9]"
                  }
                `}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>



      {/*Activate vibration  */}
      <div className='flex justify-between border border-[#CDD5DF] bg-[white] rounded-[3px] mt-4 p-4'>
        <div className='flex gap-2'>
          <div className='flex items-center'>
            <p className='bg-[#EEF2F6] w-8 h-8 flex justify-center items-center rounded-[3px]' >
              <img src="/images/icons/smart-phone-gray2.svg" className="w-5 h-5" />
            </p>
          </div>
          
          <p className='flex flex-col gap-1'>
            <span className='text-[#364152] text-sm font-medium'>{t('Activate vibration')}</span>
            <span className='text-[#697586] text-xs font-normal'>{t('Device vibrates when alerted')}</span>
          </p>
        </div>

        <div className='flex items-center'>
          <GreenSwitch
            checked={formData?.notify_vibration_enabled === 1}
            onChange={
              (e)=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_vibration_enabled:e.target.checked ? 1 : 0
                }))
              }
            }
          
          />
        </div>
      </div>
    </div>
      
    </>
  )
}

export default SoundAndVibration