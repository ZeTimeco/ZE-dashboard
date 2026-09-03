'use client'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { changeStatusThunk, getRestaurantStatusThunk } from '@/redux/slice/Requests/RequestsSlice'
import { motion, AnimatePresence } from 'framer-motion'

function Header({getRestaurantStatus}) {
  const{t}= useTranslation()
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const extractOptions = [
    { key: "open", label: t("open"), color: "bg-green-500" },
    { key: "busy", label: t("busy"), color: "bg-red-500" },
    { key: "closed", label: t("closed"), color: "bg-yellow-400" },
  ];
  const [selectedOption, setSelectedOption] = useState(extractOptions[0]);

  useEffect(() => {
    const currentStatus = getRestaurantStatus?.data?.current_status;
    if (!currentStatus) return;

    const option = extractOptions.find(
      (item) => item.key === currentStatus
    );

    if (option) {
      setSelectedOption(option);
    }
  }, [getRestaurantStatus]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <section className='flex justify-between items-start mb-10'>
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Orders')}</p>
          <p className='text-[#697586] text-base font-normal'>{t('A comprehensive overview of all your orders')}</p>
        </div>
        
        <div className="relative inline-block" ref={dropdownRef}>
          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setOpen(!open)}
            className="relative flex items-center justify-between h-14 w-55 px-4 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer shadow-xs hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${selectedOption.color} transition-colors duration-200`}
              ></span>

              <span className="font-medium">{selectedOption.label}</span>
            </div>

            <span className="transition-transform duration-200">
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
          </motion.button>

          {/* Dropdown */}
          <AnimatePresence>
            {open && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute w-full bg-white border border-gray-200 rounded-[3px] shadow-lg z-50 overflow-hidden mt-1"
              >
                {extractOptions.map((item) => (
                  <li
                    key={item.key}
                    onClick={() => {
                      setSelectedOption(item);
                      setOpen(false);
                      dispatch(changeStatusThunk({ status: item.key })).then(() => {
                        dispatch(getRestaurantStatusThunk());
                      });
                    }}
                    className="flex items-center gap-2 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${item.color}`}
                    ></span>

                    <span className="text-[#364152] text-sm">{item.label}</span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

      </section>

    </>
  )
}

export default Header