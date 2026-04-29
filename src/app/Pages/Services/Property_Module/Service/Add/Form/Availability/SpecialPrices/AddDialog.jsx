"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { ar } from 'date-fns/locale'; // Arabic locale

function AddDialog({ open, setOpen, onAdd }) {
  const {t} = useTranslation()
  const [openCalendar, setOpenCalendar] = useState(false);
  const [periodName, setPeriodName] = useState("");
  const [price, setPrice] = useState("");

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [selectedText, setSelectedText] = useState("");

  const handleApply = () => {
    const { startDate, endDate } = range[0];

    const formatted = `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    setSelectedText(formatted);

    setOpenCalendar(false);
  };

// استبدل handleSubmit بالكامل
const handleSubmit = () => {
  if (periodName && selectedText && price) {
    if (onAdd) {
      const { startDate, endDate } = range[0];
      onAdd({
        periodName,
        dateRange: selectedText,
        startDate: format(startDate, 'yyyy-MM-dd'),  // <-- مهم
        endDate: format(endDate, 'yyyy-MM-dd'),      // <-- مهم
        price
      });
    }
    // reset
    setPeriodName("");
    setPrice("");
    setSelectedText("");
    setRange([{ startDate: new Date(), endDate: new Date(), key: "selection" }]);
    setOpen(false);
  }
};

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        
        <section className="  px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>

          <p className='text-[var(--color-primary)] text-2xl font-semibold flex justify-center mb-4'>{t('Add pricing')}</p>
        </section>

        <section className='px-6'>
          {/* Period name */}
          <div className='w-full mb-4'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('Period name')} </span>
            </p>
            <input 
              type="text"
              value={periodName}
              onChange={(e) => setPeriodName(e.target.value)}
              placeholder='مثال: اجازة عيد الفطر'
              className='w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] rounded-[3px] outline-none'
            />
          </div>


          {/* Date selection */}
          <div className="flex flex-col mb-4">
            {/* label */}
            <label className="text-[#364152] text-base font-normal mb-3">
              {t("Date selection")}
            </label>

            {/* input */}
            <div
              className="relative flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
              onClick={() => setOpenCalendar(true)}
            >
              <input
                type="text"
                placeholder={t("Select date range")}
                value={selectedText}
                readOnly
                className="h-[60px] p-3 w-full text-[#364152] focus:outline-none cursor-pointer"
              />

              <span className="absolute left-4 pointer-events-none">
                <img src="/images/icons/calender.svg" alt="calendar" />
              </span>
            </div>

            {/* Dialog */}
            <Dialog
              open={openCalendar}
              onClose={() => setOpenCalendar(false)}
              PaperProps={{ className: "rerquest-dialog", dir: "rtl" }}
            >
              {/* header */}
              <section className="flex justify-between px-6 mt-6">
                <button
                  onClick={() => setOpenCalendar(false)}
                  className="border border-[#CDD5DF] w-12 h-12 rounded-full flex items-center justify-center"
                >
                  <img src="/images/icons/xx.svg" alt="close" className="w-6 h-6" />
                </button>

                <div className="w-14 h-14 bg-[#EEF2F6] rounded-full flex items-center justify-center">
                  <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
                </div>
              </section>

              <span className="border border-[#E3E8EF] my-2" />

              {/* calendar */}
              <section className="p-6 flex justify-center">
                <div dir="ltr">
                  <DateRangePicker
                    onChange={(item) => setRange([item.selection])}
                    ranges={range}
                    months={2}
                    direction="horizontal"
                    locale={ar}
                    rangeColors={["var(--color-primary)"]}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                  />
                </div>
              </section>

              {/* buttons */}
              <section className="p-6 flex gap-4">
                <button
                  onClick={handleApply}
                  className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[3px] text-base font-medium"
                >
                  {t("apply")}
                </button>

                <button
                  onClick={() => setOpenCalendar(false)}
                  className="px-6 py-3 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] text-base font-medium"
                >
                  {t("cancel")}
                </button>
              </section>
            </Dialog>

          </div>

          {/* Enter the price */}
          <div className='w-full mb-2'>
            <p className='text-sm font-medium mb-1.5'>
              <span className='text-[#364152] '>{t('the price')} </span>
            </p>
            <input 
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder={t('Enter the price')}
              className='w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] rounded-[3px] outline-none'
            />
          </div>
          <p className='text-[#F04438] text-sm font-normal'>{t('Note: This price will replace the original price of the property during the specified period.')}</p>

        </section>


        {/* btn */}
        <div className="flex gap-4 p-6 ">
          <button onClick={handleSubmit} className=" p-3 w-full h-14 bg-[var(--color-primary)] text-white font-medium rounded-[3px] cursor-pointer">{t("It was completed")}</button>
          <button onClick={()=>setOpen(false)} className=" p-3 w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] font-medium rounded-[3px] cursor-pointer">{t("cancel")}</button>
        </div>


      </Dialog>

    </>
  )
}

export default AddDialog