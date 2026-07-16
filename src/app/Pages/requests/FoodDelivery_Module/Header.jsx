'use client'
import ExtractBtn from '@/app/Components/Buttons/ExtractBtn'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

function Header() {
  const{t}= useTranslation()

  const [open, setOpen] = useState(false);
  const extractOptions = [
    { id: 1, label: t("open"), color: "bg-green-500" },
    { id: 2, label: t("busy"), color: "bg-red-500" },
    { id: 3, label: t("closed"), color: "bg-yellow-400" },
  ];
  const [selectedOption, setSelectedOption] = useState(extractOptions[0]);

  return (
    <>
      <section className=' flex justify-between mb-10'>
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Orders')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your orders')}</p>
        </div>
        
        <div className="relative inline-block ">
          {/* Button */}
          <button
            onClick={() => setOpen(!open)}
            className="relative flex items-center justify-between h-14 w-55 px-4 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${selectedOption.color}`}
              ></span>

              <span>{selectedOption.label}</span>
            </div>

            <span>
              {open ? (
                <img
                  src="/images/icons/ArrowUp.svg"
                  alt="up"
                  className="w-4 h-4 brightness-0 invert"
                />
              ) : (
                <img
                  src="/images/icons/ArrowDown.svg"
                  alt="down"
                  className="w-4 h-4 brightness-0 invert"
                />
              )}
            </span>
          </button>

          {/* Dropdown */}
          {open && (
          <ul className="absolute  w-full bg-white border border-gray-200 shadow-lg z-50">
            {extractOptions.map((item) => (
              <li
                key={item.id}
                onClick={() => {
                  setSelectedOption(item);
                  setOpen(false);
                }}
                className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-100"
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                ></span>

                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          )}
        </div>

      </section>

    </>
  )
}

export default Header