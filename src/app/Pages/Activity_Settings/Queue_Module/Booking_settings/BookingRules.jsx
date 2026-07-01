'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function BookingRules() {
  const {t} = useTranslation() 
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =[ '3', '6' , '12' , '24']

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


const [minGuests, setMinGuests] = useState(0);
const [maxGuests, setMaxGuests] = useState(0);

const increaseMinGuests = () => setMinGuests((prev) => prev + 1);
const decreaseMinGuests = () => setMinGuests((prev) => Math.max(0, prev - 1));

const increaseMaxGuests = () => setMaxGuests((prev) => prev + 1);
const decreaseMaxGuests = () => setMaxGuests((prev) => Math.max(0, prev - 1));

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] pt-4 px-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Booking Rules')}</p>

        {/* an hour before */}
        <div className='flex justify-between items-center mt-4 w-full'>
          <p className='text-[#364152] text-sm font-normal w-[85%]'>{t('earliest time allowed for booking')}</p>
          <div className="relative w-[15%]" ref={dropdownRef1}>
            <div
              className="relative h-8 flex items-center border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-[3px] cursor-pointer"
              onClick={() => setOpen1(!open1)}
            >
              <input
                type="text"
                placeholder={t("an hour before")}
                value={
                  searchValue1 ||
                  (selected1 ? `${selected1} ${t("an hour before")}` : "")
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

        {/* Minimum number of guests */}
        <div className='flex justify-between items-center '>
          <p className='text-[#364152] text-sm font-normal'>{t('Minimum number of guests')}</p>

          <div className="h-14 px-3 flex items-center justify-between rounded-[3px] ">
            <button
              type="button"
              onClick={increaseMinGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              +
            </button>

            <div className=" mx-5">
              <p className="text-sm font-normal text-[#364152]">
                {minGuests}
              </p>
            </div>

            <button
              type="button"
              onClick={decreaseMinGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              −
            </button>
          </div>

        </div>
        <div className='border border-[#E3E8EF] '></div>

        {/* Maximum number of guests */}
        <div className='flex justify-between items-center '>
          <p className='text-[#364152] text-sm font-normal'>{t('Maximum number of guests')}</p>
          
          <div className="h-14 px-3 flex items-center justify-between rounded-[3px] ">
            <button
              type="button"
              onClick={increaseMaxGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              +
            </button>

            <div className=" mx-5">
              <p className="text-sm font-normal text-[#364152]">
                {maxGuests}
              </p>
            </div>

            <button
              type="button"
              onClick={decreaseMaxGuests}
              className="flex h-7.5 w-7.5 items-center justify-center rounded-[3px] bg-[#EEF2F6] text-lg text-[#0F022E] cursor-pointer"
            >
              −
            </button>
          </div>
        </div>
        
      </div>


    </>
  )
}

export default BookingRules