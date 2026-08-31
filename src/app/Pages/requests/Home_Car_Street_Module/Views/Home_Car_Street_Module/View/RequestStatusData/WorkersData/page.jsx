

"use client";
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function WorkersDataPage({status , assigned_handymen ,bookingDetails}) {
  const [open, setOpen] = useState(false);

  const {t}= useTranslation();

  return (
    <>
    {status === "accepted" && assigned_handymen.length > 0 && (
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] overflow-hidden bg-white select-none mt-6 border border-[#F0F2F5]"
      >
        {/* Header */}
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-right cursor-pointer"
        >
          <span className="text-[#0F022E] text-base font-normal flex items-center gap-2">
            <img src="/images/icons/labor.svg" alt="" />
            {t('Workers data')}
          </span>

          <div
            className={`transition-transform duration-300 cursor-pointer ${
              open ? "rotate-180" : "rotate-0"
            }`}
          >
            <img src="/images/icons/ArrowDown.svg" alt="" />
          </div>
        </button>

        {/* Content */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              {bookingDetails?.assigned_handymen?.map((item , index)=>(
                <div 
                  key={item?.id || index}
                  className="mt-5 flex justify-between items-center text-right p-1 rounded transition-colors hover:bg-gray-50/50"
                >
                  <div className='flex items-center gap-2'>
                    <p className='bg-[#007AFF] text-[#fff] w-8.5 h-8.5 flex justify-center items-center rounded-[999px] font-medium shadow-sm'>
                      {item?.firstname?.charAt(0)}
                    </p>
                    <p className='text-[#364152] text-sm font-normal'>
                      {item?.firstname} {item?.lastname}
                    </p>
                  </div>

                  {/* call */}
                  <motion.a 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href={`tel:${item?.phone}`}
                    className='bg-[var(--color-primary)] w-8.5 h-8.5 flex justify-center items-center rounded-[999px] cursor-pointer shadow-sm transition-all'
                  >
                    <img src="/images/icons/call white.svg" alt="" />
                  </motion.a>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )}
    </>
  )
}

export default WorkersDataPage