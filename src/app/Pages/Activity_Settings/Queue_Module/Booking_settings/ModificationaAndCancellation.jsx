'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

function ModificationaAndCancellation() {
  const {t} = useTranslation() 
  // =========================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const option1 =['2' , '6' , '12' , '24']
  

  // =========================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const option2 =['6' , '12' , '24']

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
        <p className='text-[#364152] text-base font-medium'>{t('Modification and Cancellation')}</p>

        <div>
          {/* Allow modification up to */}
          <div className='flex justify-between items-center mt-4 w-full'>
            <p className='text-[#364152] text-sm font-normal w-[85%]'>{t('Allow modification up to')}</p>
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

          {/* Free cancellation period  */}
          <div className='flex justify-between items-center mt-4'>
            <p className='text-[#364152] text-sm font-normal w-[85%]'>{t('Free cancellation period')}</p>
            <div className="relative w-[15%]" ref={dropdownRef2}>
              <div
                className="relative h-8 flex items-center border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-[3px] cursor-pointer"
                onClick={() => setOpen2(!open2)}
              >
                <input
                  type="text"
                  placeholder={t("an hour before")}
                  value={
                    searchValue2 ||
                    (selected2 ? `${selected2} ${t("an hour before")}` : "")
                  }
                  onChange={(e) => {
                    setSearchValue2(e.target.value);
                    setOpen2(true);
                  }}
                  className=" p-3 w-full text-sm text-[#364152] focus:outline-none"
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
                <ul className="absolute left-0 right-0 border border-[#CDD5DF] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                  {option2
                    ?.filter((opt) =>
                      opt?.toLowerCase().includes(searchValue2.toLowerCase())
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

          <div className='border border-[#E3E8EF] my-3'></div>

          {/* Policy text */}
          <div className='w-full'>
            <p className='text-sm font-normal mb-1.5'>
              <span className='text-[#364152] '>{t('Policy text')} </span>
            </p>
            <textarea
              placeholder={t("Free cancellation up to 24 hours before the booking date.")}
              className="w-full h-20 p-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none resize-none"
            />
          </div>

        </div>

      </div>
    </>
  )
}

export default ModificationaAndCancellation