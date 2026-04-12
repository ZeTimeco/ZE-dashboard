"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';


// Dynamically import Dialog to avoid SSR
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose}) {
  const { t } = useTranslation();
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statusOptions =[
    {id:0 , name:t('All') ,  value:'all'},
    {id:1 , name:t('Acceptable') ,  value:'confirmed'},
    {id:2 , name:t('Complete') ,  value:'completed'},
    {id:3 , name:t('Pending') ,  value:'pending'},
    {id:4 , name:t('checked_in') ,  value:'checked_in'},
    {id:5 , name:t('not_attend') ,  value:'not_attend'},
    {id:6 , name:t('cancelled') ,  value:'cancelled'},
  ]

  const dateRangeOptions =[
    {id:0 , name:t('Today is arrival') ,  value:'Today is arrival'},
    {id:1 , name:t('coming') ,  value:'coming'},
    {id:2 , name:t('this week') ,  value:'this week'},
    {id:3 , name:t('This month') ,  value:'This month'},
  ]




  //1-Property =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const PropertyOptions = ['1', '2', '3', '4', '5'];


  

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const paymentOptions =[
    {id:0 , name:t('All') ,  value:'All'},
    {id:1 , name:t('Paid') ,  value:'Paid'},
    {id:2 , name:t('Partially paid') ,  value:'Partially paid'},
    {id:3 , name:t('Payment Pending') ,  value:'Payment Pending'},
    {id:4 , name:t('refunded') ,  value:'refunded'},
  ]

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/*  */}
      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={handleClose}
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

      {/*  */}
      <section className="mt-8 px-6">
        <p className="text-[#364152] text-xl font-medium mb-5">{t("Filter items")}</p>
        <p className="text-[#4B5565] text-sm font-normal mb-5">
          {t("Filter your orders")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/* status */}
      <section className="px-6 mt-4">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Booking status')}</p>
        <div className="  flex gap-3 flex-wrap">
          {statusOptions?.map((item, index) => (
            <div key={item?.id} className="">
              <button
                onClick={() => setSelectedStatus(prev => prev === item?.value ? null : item?.value)}
                className={`p-2.5 text-sm font-normal rounded-full cursor-pointer transition ${
                  selectedStatus === item?.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[#EEF2F6] text-[#4B5565]"
                }`}
              >
                <p>{item?.name}</p>
              </button>
            </div>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Date range */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Date range')}</p>
        <div className="  flex gap-3 flex-wrap">
          {dateRangeOptions?.map((item, index) => (
            <div key={item?.id} className="">
              <button
                onClick={() => setSelectedStatus(prev => prev === item?.value ? null : item?.value)}
                className={`p-2.5 text-sm font-normal rounded-full cursor-pointer transition ${
                  selectedStatus === item?.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[#EEF2F6] text-[#4B5565]"
                }`}
              >
                <p>{item?.name}</p>
              </button>
            </div>
          ))}
        </div> 
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Check-in date */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Check-in date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div >
            <p className="text-[#697586] text-sm font-normal mb-1.5 ">{t('From date')}</p>
              <div className=''>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    format="DD/MM/YYYY"
                    fieldDirection="rtl"
                    slotProps={{
                      textField: {
                        placeholder: "00/00/0000",
                        fullWidth: true,
                        sx: {
                          '& .MuiInputBase-input': {
                            paddingLeft: '12px', 
                            textAlign: 'right', 
                            fieldDirection: 'rtl',
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '3px',
                          }
                        }
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            
          </div>

          <div >
            <p className="text-[#697586] text-sm font-normal mb-1.5 ">{t('From date')}</p>
              <div className=''>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    format="DD/MM/YYYY"
                    fieldDirection="rtl"
                    slotProps={{
                      textField: {
                        placeholder: "00/00/0000",
                        fullWidth: true,
                        sx: {
                          '& .MuiInputBase-input': {
                            paddingLeft: '12px', 
                            textAlign: 'right', 
                            fieldDirection: 'rtl',
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '3px',
                          }
                        }
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            
          </div>
        </div>
        
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />


      </section>

      {/* Check-out date */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Check-out date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div >
            <p className="text-[#697586] text-sm font-normal mb-1.5 ">{t('From date')}</p>
              <div className=''>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    format="DD/MM/YYYY"
                    fieldDirection="rtl"
                    slotProps={{
                      textField: {
                        placeholder: "00/00/0000",
                        fullWidth: true,
                        sx: {
                          '& .MuiInputBase-input': {
                            paddingLeft: '12px', 
                            textAlign: 'right', 
                            fieldDirection: 'rtl',
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '3px',
                          }
                        }
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            
          </div>

          <div >
            <p className="text-[#697586] text-sm font-normal mb-1.5 ">{t('From date')}</p>
              <div className=''>
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                  <DatePicker
                    format="DD/MM/YYYY"
                    fieldDirection="rtl"
                    slotProps={{
                      textField: {
                        placeholder: "00/00/0000",
                        fullWidth: true,
                        sx: {
                          '& .MuiInputBase-input': {
                            paddingLeft: '12px', 
                            textAlign: 'right', 
                            fieldDirection: 'rtl',
                          },
                          '& .MuiOutlinedInput-root': {
                            borderRadius: '3px',
                          }
                        }
                      },
                    }}
                  />
                </LocalizationProvider>
              </div>
            
          </div>
        </div>
        
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />

      </section>

      {/* Property */}
      <section className="px-6">
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-1.5">
            {t("Property")}
          </label>

          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("Select property")}
                value={selected1 || searchValue1}   
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                  setSelected1(null);
                }}
                className="h-15 p-3 w-full text-[#364152] focus:outline-none"
              />

              <span className="absolute left-3 pointer-events-none">
                {open1 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>

            {open1 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                {PropertyOptions
                  .filter((opt) =>
                    opt.toLowerCase().includes(searchValue1.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSelected1(opt);
                        setOpen1(false);
                        setSearchValue1("");
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
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />

      </section>

      {/* Payment status */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Booking status')}</p>
        <div className="  flex gap-3 flex-wrap">
          {paymentOptions?.map((item, index) => (
            <div key={item?.id} className="">
              <button
                onClick={() => setSelectedStatus(prev => prev === item?.value ? null : item?.value)}
                className={`p-2.5 text-sm  font-normal rounded-full cursor-pointer transition ${
                  selectedStatus === item?.value
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[#EEF2F6] text-[#4B5565]"
                }`}
              >
                <p>{item?.name}</p>
              </button>
            </div>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Booking amount */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-1.5">{t('Booking amount')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal">{t('minimum')}</label>
            <input 
              type="number"
              placeholder="0جنيه" 
              className="w-full h-12.5 px-4 border border-[#C8C8C8] rounded-[3px] outline-0" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal ">{t('maximum')}</label>
            <input 
              type="number" 
              placeholder="0جنيه" 
              className="w-full h-12.5 px-4  border border-[#C8C8C8] rounded-[3px] outline-0" />
          </div>
        </div>

        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>
        

      {/*  */}
      <section className="px-6 mb-6 flex gap-3">
        <button className="w-[25%] h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer">
          {t('apply')}
        </button>

        <button
          onClick={handleClose}
          className="w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer">
          {t('cancel')}
        </button>

      </section>
    
    </Dialog>
  );
}

export default FiltersPage;
