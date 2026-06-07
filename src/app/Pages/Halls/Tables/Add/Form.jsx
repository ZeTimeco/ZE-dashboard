"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { styled, Switch } from "@mui/material";

function Form() {
  const {t} = useTranslation();

  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =[
    {name:t('round'), value:'round'},
    {name:t('square'), value:'square'},
    {name:t('rectangle'), value:'rectangle'},
    {name:t('oval'), value:'oval'},
  ]

  // =========================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const option2 = ["1", "2"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      // if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //---------------------
  const [guests, setGuests] = useState(1); 

  const [selected, setSelected] = useState(false);

  //==================
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    width: 53,
    height: 24,
    padding: 0,

    "& .MuiSwitch-switchBase": {
      margin: 3,
      padding: 0,
      transitionDuration: `${theme.transitions.duration.standard}ms`,

      "&.Mui-checked": {
        transform: "translateX(29px)",
        color: "#fff",

        "& + .MuiSwitch-track": {
          backgroundColor: "#10B981",
          opacity: 1,
          border: 0,
        },

        "&.Mui-disabled + .MuiSwitch-track": {
          opacity: 0.5,
        },
      },

      "&.Mui-focusVisible .MuiSwitch-thumb": {
        border: "4px solid #fff",
      },

      "&.Mui-disabled .MuiSwitch-thumb": {
        color: theme.palette.grey[300],
      },
    },

    "& .MuiSwitch-thumb": {
      width: 18,
      height: 18,
      boxSizing: "border-box",
    },

    "& .MuiSwitch-track": {
      borderRadius: 12,
      backgroundColor: "#E9E9EA",
      opacity: 1,
      transition: theme.transitions.create("background-color", {
        duration: theme.transitions.duration.standard,
      }),
    },
  }));
    
  return (
    <>
    <div className='grid grid-cols-2 gap-6'>
      {/* ========== Table name/number  ========== */}
      <div className='w-full'>
        <p className='text-sm font-medium mb-1.5'>
          <span className='text-[#364152] '>{t('Table name/number')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>
        <input 
          type="text"
          name='title'
          placeholder={t('Write the table/number')}
          className={`w-full h-14  p-3 border border-[#C8C8C8]  text-sm text-[#364152]  rounded-[3px] outline-none `}
        />
      </div>
      
      {/* =============== Table type  ============= */}
      <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152] '>{t('Table type')} </span>
          <span className=' text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef1}>
          <div
            className="relative h-14 flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
            onClick={() => setOpen1(!open1)}
          >
            <input
              type="text"
              placeholder={t("Choose the type of table")}
              value={searchValue1 || selected1|| ""}
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
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option1
                ?.filter((opt) =>
                  opt?.name?.toLowerCase().includes(searchValue1.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt?.value}
                    onClick={() => {
                      setSelected1(opt?.name);
                      setSearchValue1("");
                      setOpen1(false);
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt?.name}
                  </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/*============ Views =============== */}
      <div className="flex flex-col gap-1.5">
        <p className='text-sm font-medium '>
          <span className='text-[#364152]'>{t('views')} </span>
          <span className='text-[#F04438]'>*</span>
        </p>

        <div className="relative w-full" ref={dropdownRef2}>
          <div
            className="relative h-14 flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
            onClick={() => setOpen2(!open2)}
          >
            <input
              type="text"
              placeholder={t("Choose the looks")}
              value={searchValue2 || selected2 || ""}
              onChange={(e) => {
                setSearchValue2(e.target.value);
                setOpen2(true);
              }}
              className="p-3 w-full text-sm text-[#364152] focus:outline-none"
            />

            <span className="absolute left-3 cursor-pointer">
              {open2 ? (
                <img src="/images/icons/ArrowUp.svg" alt="up" />
              ) : (
                <img src="/images/icons/ArrowDown.svg" alt="down" />
              )}
            </span>
          </div>

          {open2 && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {option2
                ?.filter((opt) =>
                  opt.toLowerCase().includes(searchValue2.toLowerCase())
                )
                .map((opt) => (
                  <li
                    key={opt}
                    onClick={() => {
                      setSelected2(opt);
                      setSearchValue2("");
                      setOpen2(false);
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

      {/*=========== Number of guests =============*/}
      <div className="w-full  flex flex-col gap-1.5">
        <p className='text-sm font-medium text-[#364152]'>{t('Number of guests')}</p>

        <div className=" h-14 px-3 flex items-center justify-between rounded-[3px] border border-[#EEF2F6] bg-[#F8FAFC]  ">
          <button
            onClick={() => setGuests((prev) => prev + 1)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-[white] text-lg text-[#0F022E]"
          >
            +
          </button>

          <div className="text-center">
            <p className="text-xl font-medium text-[var(--color-primary)]">{guests}</p>
            <p className="text-sm text-[#364152]">{t('Guests')}</p>
          </div>

          <button
            onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[3px] border border-[#E3E8EF] bg-[white] text-lg text-[#0F022E]"
          >
            -
          </button>
        </div>
      </div>

      {/* ========= slogans ============ */}
      <div className="w-full flex flex-col gap-1.5 col-span-2">
        <p className="text-sm font-medium text-[#364152]">الشعارات</p>

        <div className="flex gap-3">
          <button
            onClick={() => setSelected(true)}
            className={`
              h-10 px-4 flex items-center gap-2 text-sm font-normal rounded-full border transition-all 
              ${
                selected
                  ? "bg-[var(--color-primary)] text-white border-[var(--color-primary)]"
                  : "bg-[#EDE7FD] text-[#364152] border-[#E2E2E2] cursor-pointer"
              }
            `}
          >
            التدخين

            {selected && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setSelected(false);
                }}
                className="flex items-center justify-center w-5 h-5 rounded-full cursor-pointer"
              >
                <img src="/images/icons/x_white.svg" alt="" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Available for booking */}
      <div className='flex justify-between bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] py-3 px-4'>
        <div>
          <p className='text-[#364152] text-base font-medium'>
            {t('Available for booking')}
          </p>
          <p className='text-base font-normal text-[#697586]'>
            {t('Allowing customers to book this table online')}
          </p>
        </div>
        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>

      {/* Available*/}
      <div className='flex justify-between bg-[#F8FAFC] border border-[#EEF2F6] rounded-[3px] py-3 px-4'>
        <div>
          <p className='text-[#364152] text-base font-medium'>
            {t('Available')}
          </p>
          <p className='text-base font-normal text-[#697586]'>
            {t('Make this table available for use.')}
          </p>
        </div>
        <div className='flex items-center'>
          <GreenSwitch/>
        </div>
      </div>


    </div>
      

    
    
    </>
  )
}

export default Form