'use client'
import { styled, Switch } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function EditLayout({formData , setFormData}) {
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

  //=======================================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState([]);

  const dropdownRef1 = useRef(null);
  const option1 =[
    {name:t('manager') , value:'manager'},
    {name:t('staff') , value:'staff'},
    {name:t('receptionist') , value:'receptionist'},
  ]
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Edit Layout')}</p>
        
        {/* */}
        <div className='flex justify-between items-center mt-4'>
          <div>
            <p className='text-[#364152] text-sm font-normal'>{t('Draft versus published plan')}</p>
            <p className='text-[#4B5565] text-xs font-normal mt-1'>{t('Save the plans as a draft before publishing')}</p>

          </div>
          <p>
            <GreenSwitch
              checked={formData?.floor_plan_edit_enabled}
              onChange={(e)=>{
                setFormData(((prev)=>({
                  ...prev,
                  floor_plan_edit_enabled: e.target.checked ? 1 : 0
                })))
              }}
            />
          </p>
        </div>

        <div className='border border-[#E3E8EF] my-3'></div>

        {/*  */}
    {/* Who can modify the plan? */}
<div className="flex justify-between items-center mt-4 w-full">
  <p className="text-[#364152] text-sm font-normal w-[50%]">
    {t("Who can modify the plan?")}
  </p>

  <div className="relative w-[35%]" ref={dropdownRef1}>
    {/* Trigger */}
    <div
      className="relative min-h-8 flex flex-wrap items-center gap-1 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-[3px] cursor-pointer px-2 py-1"
      onClick={() => setOpen1(!open1)}
    >
      {formData.who_can_edit_floor_plan.length > 0 ? (
        formData.who_can_edit_floor_plan.map((val) => {
          const item = option1.find((o) => o.value === val);

          return (
            <span
              key={val}
              className="flex items-center gap-1 bg-[#EEF2FF] text-[#364152] text-xs rounded px-1.5 py-0.5"
              onClick={(e) => e.stopPropagation()}
            >
              {item?.name || val}

              <button
                type="button"
                className="text-[#364152] hover:text-red-500 leading-none"
                onClick={(e) => {
                  e.stopPropagation();

                  setFormData((prev) => ({
                    ...prev,
                    who_can_edit_floor_plan:
                      prev.who_can_edit_floor_plan.filter(
                        (v) => v !== val
                      ),
                  }));
                }}
              >
                ×
              </button>
            </span>
          );
        })
      ) : (
        <span className="text-sm text-[#9AA4B2] w-full">
          {t("Who can modify the plan?")}
        </span>
      )}

      <span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none">
        {open1 ? (
          <img src="/images/icons/ArrowUp.svg" alt="up" />
        ) : (
          <img src="/images/icons/ArrowDown.svg" alt="down" />
        )}
      </span>
    </div>

    {/* Dropdown */}
    {open1 && (
      <ul className="absolute left-0 right-0 border border-[#CDD5DF] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
        {option1.map((opt) => {
          const isChecked =
            formData.who_can_edit_floor_plan.includes(opt.value);

          return (
            <li
              key={opt.value}
              onClick={(e) => {
                e.stopPropagation();

                setFormData((prev) => ({
                  ...prev,
                  who_can_edit_floor_plan: isChecked
                    ? prev.who_can_edit_floor_plan.filter(
                        (v) => v !== opt.value
                      )
                    : [
                        ...prev.who_can_edit_floor_plan,
                        opt.value,
                      ],
                }));
              }}
              className={`flex items-center justify-between p-3 hover:bg-[#F5F5F5] cursor-pointer ${
                isChecked ? "bg-[#F0F4FF]" : ""
              }`}
            >
              <span className="text-sm text-[#364152]">
                {opt.name}
              </span>

              {isChecked && (
                <img src="/images/icons/xx.svg" alt="selected" />
              )}
            </li>
          );
        })}
      </ul>
    )}
  </div>
</div>
      
      
      </div>

    </>
  )
}

export default EditLayout