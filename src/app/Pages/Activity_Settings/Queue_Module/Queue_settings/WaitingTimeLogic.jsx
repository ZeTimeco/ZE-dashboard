'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { styled, Switch } from '@mui/material'

function WaitingTimeLogic({formData , setFormData}) {
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
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =['10' , '15' , '30', '60']
  

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
        <p className='text-[#364152] text-base font-medium'>{t('Waiting Time Logic')}</p>

        <div>
          {/*  */}
          <div className='flex justify-between items-center mt-4 w-full'>
            <p className='text-[#364152] text-sm font-normal w-[85%]'>{t('default waiting time for each group')}</p>
            <div className="relative w-[15%]" ref={dropdownRef1}>
              <div
                className="relative h-8 flex items-center border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-[3px] cursor-pointer"
                onClick={() => setOpen1(!open1)}
              >
                <input
                  type="text"
                  placeholder={t("minute")}
                  value={
                    searchValue1 ||
                    (formData?.default_wait_minutes ? `${formData?.default_wait_minutes} ${t("minute")}` : "")
                  }
                  onChange={(e) => {
                    setSearchValue1(e.target.value);
                    setOpen1(true);
                  }}
                  className=" p-3 w-full text-sm text-[#364152] focus:outline-none"
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
                <ul className="absolute left-0 right-0 border border-[#CDD5DF] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {option1
                    ?.filter((opt) =>
                      opt?.toLowerCase().includes(searchValue1.toLowerCase())
                    )
                    .map((opt) => (
                      <li
                        key={opt}
                        onClick={() => {
                          setSelected1(opt);
                          setSearchValue1("");
                          setOpen1(false);
                          setFormData((prev)=>({
                            ...prev,
                            default_wait_minutes:opt
                          }))
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {opt}
                      </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className='border border-[#E3E8EF] my-3'></div>

          {/*  */}
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[#364152] text-sm font-normal'>{t('Allow manual overshoot of expected time')}</p>
            <p>
              <GreenSwitch
                checked={formData?.allow_manual_eta_adjust}
                onChange={(e)=>{
                  setFormData((prev)=>({
                    ...prev,
                    allow_manual_eta_adjust : e.target.checked ? 1 : 0
                  }))
                }}
              />
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default WaitingTimeLogic