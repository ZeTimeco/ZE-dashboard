'use client'
import { Dialog } from '@mui/material'
import { LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function FilterPage({open , setOpen}) {
  const {t} = useTranslation()

  // status
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionStatus = ["1", "2"];

  // The hall
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionHall = ["1", "2"];

  // The view
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);
  const optionView = ["1", "2"];




  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  

  const [selectActive , setSelectActive] = useState(null)


  return (
    <>

      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >

        {/* Header */}
        <section className="flex justify-between px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
          <div className="w-14 h-14 bg-[#EEF2F6] rounded-[100px] flex justify-center items-center">
            <p className="bg-[#E3E8EF] flex items-center justify-center w-10 h-10 rounded-[100px]">
              <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
            </p>
          </div>
        </section>

        {/* title */}
        <section className="mt-8 px-6">
          <p className="text-[#364152] text-xl font-medium mb-5">{t("Filter items")}</p>
          <p className="text-[#4B5565] text-sm font-normal mb-5">{t("Filter your bookings")}</p>
        </section>
        <span className="border-[0.5px] border-[#E3E8EF]" />

        <section className='flex flex-col gap-4 p-6'>
          {/* time */}
          <div>
            <p className='mb-2 text-[#364152] text-sm font-normal'>{t('time period')}</p>
            <div className='grid grid-cols-2 gap-3'>
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-sm font-normal'>{t('Start time')}</p>
                <div className="relative flex items-center w-full cursor-pointer">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ar"
                    localeText={{
                      timePickerToolbarTitle: t("Select Time"),
                    }}
                  >
                    <MobileTimePicker
                      ampm
                      views={["hours", "minutes"]}
                      closeOnSelect
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          InputProps: {
                            sx: {
                              height: "56px",
                              direction: "rtl",

                              "& fieldset": {
                                borderColor: "#CDD5DF",
                                borderRadius: "3px",
                              },

                              "&:hover fieldset": {
                                borderColor: "#CDD5DF",
                              },

                              "&.Mui-focused fieldset": {
                                borderColor: "#CDD5DF",
                                borderWidth: "1px",
                              },

                              "& input": {
                                textAlign: "right",
                                fontSize: "14px",
                                color: "#7D8D84",
                                outline: "none",
                              },
                            },
                          },
                        },

                        mobilePaper: {
                          sx: {
                            direction: "ltr",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>
              
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-sm font-normal'>{t('End time')}</p>
                <div className="relative flex items-center w-full cursor-pointer">
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ar"
                    localeText={{
                      timePickerToolbarTitle: t("Select Time"),
                    }}
                  >
                    <MobileTimePicker
                      ampm
                      views={["hours", "minutes"]}
                      closeOnSelect
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          InputProps: {
                            sx: {
                              height: "56px",
                              direction: "rtl",

                              "& fieldset": {
                                borderColor: "#CDD5DF",
                                borderRadius: "3px",
                              },

                              "&:hover fieldset": {
                                borderColor: "#CDD5DF",
                              },

                              "&.Mui-focused fieldset": {
                                borderColor: "#CDD5DF",
                                borderWidth: "1px",
                              },

                              "& input": {
                                textAlign: "right",
                                fontSize: "14px",
                                color: "#7D8D84",
                                outline: "none",
                              },
                            },
                          },
                        },

                        mobilePaper: {
                          sx: {
                            direction: "ltr",
                          },
                        },
                      }}
                    />
                  </LocalizationProvider>
                </div>
              </div>

            </div>
          </div>

          {/* status */}
          <div className="">
            <p className="text-[#364152] text-sm font-normal">
              {t("Status")}
            </p>

            <div className="mt-2 w-full">
              <div className="relative w-full" ref={dropdownRef1}>
                {/* Input */}
                <div
                  className="relative flex items-center"
                  onClick={() => setOpen1(!open1)}
                >
                  <input
                    type="text"
                    placeholder={t("Select status")}
                    value={searchValue1 || selected1 || ""}
                    onChange={(e) => {
                      setSearchValue1(e.target.value);
                      setSelected1(null);
                      setOpen1(true);
                    }}
                    className="w-full h-14 rounded-[3px] border border-[#CDD5DF] p-3 text-sm text-[#7D8D84] outline-none"
                  />
                  <span className="absolute left-3 cursor-pointer">
                    <img
                      src={
                        open1
                          ? "/images/icons/ArrowUp.svg"
                          : "/images/icons/ArrowDown.svg"
                      }
                      alt="arrow"
                    />
                  </span>
                </div>

                {/* Dropdown */}
                {open1 && (
                  <ul className="absolute left-0 right-0 z-10 max-h-48 overflow-y-auto rounded-[3px] border border-[#C8C8C8] bg-white shadow-md">
                    {optionStatus
                      .filter((opt) =>
                        opt.toLowerCase().includes(searchValue1.toLowerCase())
                      )
                      .map((opt) => (
                        <li
                          key={opt}
                          onClick={() => {
                            setSelected1(opt);
                            setSearchValue1("");
                            setOpen1(false);
                          }}
                          className="cursor-pointer p-3 hover:bg-[#F5F5F5]"
                        >
                          {opt}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* The hall */}
          <div className="">
            <p className="text-[#364152] text-sm font-normal">
              {t("The hall")}
            </p>

            <div className="mt-2 w-full">
              <div className="relative w-full" ref={dropdownRef2}>
                {/* Input */}
                <div
                  className="relative flex items-center"
                  onClick={() => setOpen2(!open2)}
                >
                  <input
                    type="text"
                    placeholder={t("Choose the type of hall")}
                    value={searchValue2 || selected2 || ""}
                    onChange={(e) => {
                      setSearchValue2(e.target.value);
                      setSelected2(null);
                      setOpen2(true);
                    }}
                    className="w-full h-14 rounded-[3px] border border-[#CDD5DF] p-3 text-sm text-[#7D8D84] outline-none"
                  />
                  <span className="absolute left-3 cursor-pointer">
                    <img
                      src={
                        open2
                          ? "/images/icons/ArrowUp.svg"
                          : "/images/icons/ArrowDown.svg"
                      }
                      alt="arrow"
                    />
                  </span>
                </div>

                {/* Dropdown */}
                {open2 && (
                  <ul className="absolute left-0 right-0 z-10 max-h-48 overflow-y-auto rounded-[3px] border border-[#C8C8C8] bg-white shadow-md">
                    {optionHall
                      .filter((opt) =>
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
                          className="cursor-pointer p-3 hover:bg-[#F5F5F5]"
                        >
                          {opt}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* The view */}
          <div className="">
            <p className="text-[#364152] text-sm font-normal">
              {t("The view")}
            </p>

            <div className="mt-2 w-full">
              <div className="relative w-full" ref={dropdownRef3}>
                {/* Input */}
                <div
                  className="relative flex items-center"
                  onClick={() => setOpen3(!open3)}
                >
                  <input
                    type="text"
                    placeholder={t("Choose the type of look")}
                    value={searchValue3 || selected3 || ""}
                    onChange={(e) => {
                      setSearchValue3(e.target.value);
                      setSelected31(null);
                      setOpen3(true);
                    }}
                    className="w-full h-14 rounded-[3px] border border-[#CDD5DF] p-3 text-sm text-[#7D8D84] outline-none"
                  />
                  <span className="absolute left-3 cursor-pointer">
                    <img
                      src={
                        open3
                          ? "/images/icons/ArrowUp.svg"
                          : "/images/icons/ArrowDown.svg"
                      }
                      alt="arrow"
                    />
                  </span>
                </div>

                {/* Dropdown */}
                {open3 && (
                  <ul className="absolute left-0 right-0 z-10 max-h-48 overflow-y-auto rounded-[3px] border border-[#C8C8C8] bg-white shadow-md">
                    {optionView
                      .filter((opt) =>
                        opt.toLowerCase().includes(searchValue3.toLowerCase())
                      )
                      .map((opt) => (
                        <li
                          key={opt}
                          onClick={() => {
                            setSelected3(opt);
                            setSearchValue3("");
                            setOpen3(false);
                          }}
                          className="cursor-pointer p-3 hover:bg-[#F5F5F5]"
                        >
                          {opt}
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div>
            <p className="text-[#364152] text-sm font-normal mb-2">{t('Payment')}</p>
            <div className='flex gap-4'>
              <button onClick={()=>setSelectActive('1')}
                className={`border  text-sm font-normal h-12 p-3  rounded-full cursor-pointer
                  ${selectActive==='1' ? 'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[#E3E8EF] text-[#697586]'}
                `}
              >
                {t('Deposit paid')}
              </button>

              <button onClick={()=>setSelectActive('2')}
                className={`border  text-sm font-normal h-12 p-3  rounded-full cursor-pointer
                  ${selectActive==='2' ? 'border-[var(--color-primary)] text-[var(--color-primary)]':'border-[#E3E8EF] text-[#697586]'}
                `}
              >
                {t('Deposit not paid')}
              </button>

            </div>
          </div>

          {/* Actions */}
          <section className="mt-6 mb-6 flex gap-3">
            <button
              className="w-[30%] h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
            >
              {t('apply')}
            </button>
            <button
              className="w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer"
            >
              {t('cancel')}
            </button>
          </section>
          


        </section>

      
      </Dialog>

    </>
  )
}

export default FilterPage