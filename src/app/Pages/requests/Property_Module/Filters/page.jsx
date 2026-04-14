"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from "react-redux";
import { getPropertiesForFilterThunk } from "@/redux/slice/Requests/RequestsSlice";

const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose, onApplyFilters }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { getPropertiesFilter } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(getPropertiesForFilterThunk());
  }, [dispatch]);

  // ── Filter State ──────────────────────────────────────────
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);
  const [checkInFrom, setCheckInFrom]           = useState(null);
  const [checkInTo, setCheckInTo]               = useState(null);
  const [checkOutFrom, setCheckOutFrom]         = useState(null);
  const [checkOutTo, setCheckOutTo]             = useState(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedPropertyTitle, setSelectedPropertyTitle] = useState("");
  const [selectedPayment, setSelectedPayment]   = useState(null);
  const [minPrice, setMinPrice]                 = useState("");
  const [maxPrice, setMaxPrice]                 = useState("");

  // ── Property dropdown ────────────────────────────────────
  const [openProp, setOpenProp] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef(null);
  const PropertyOptions = getPropertiesFilter?.data || [];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setOpenProp(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Options ───────────────────────────────────────────────
  const allStatusValues = ['confirmed', 'completed', 'pending', 'checked_in', 'not_attend', 'canceled'];
  const isAllSelected = allStatusValues.every(v => selectedStatuses.includes(v)) && selectedStatuses.length > 0;

  const statusOptions = [
    { id: 0, name: t('All'),        value: 'all' },
    { id: 1, name: t('Acceptable'), value: 'confirmed' },
    { id: 2, name: t('Complete'),   value: 'completed' },
    { id: 3, name: t('Pending'),    value: 'pending' },
    { id: 4, name: t('checked_in'), value: 'checked_in' },
    { id: 5, name: t('not_attend'), value: 'not_attend' },
    { id: 6, name: t('cancelled'),  value: 'canceled' },
  ];

  const dateRangeOptions = [
    { id: 0, name: t('Today is arrival'), value: 'today' },
    { id: 1, name: t('coming'),           value: 'coming' },
    { id: 2, name: t('this week'),        value: 'week' },
    { id: 3, name: t('This month'),       value: 'month' },
  ];

  const paymentOptions = [
    { id: 1, name: t('Paid'),            value: 'paid' },
    { id: 3, name: t('Payment Pending'), value: 'pending' },
    { id: 4, name: t('refunded'),        value: 'refunded' },
  ];

  const datePickerSx = {
    '& .MuiInputBase-input': { paddingLeft: '12px', textAlign: 'right' },
    '& .MuiOutlinedInput-root': { borderRadius: '3px' },
  };

  // ── Apply ─────────────────────────────────────────────────
  const handleApply = () => {
    const filters = {
      status: selectedStatuses,
      date_range: selectedDateRange || "",
      check_in_from:  checkInFrom  ? checkInFrom.format("YYYY-MM-DD")  : "",
      check_in_to:    checkInTo    ? checkInTo.format("YYYY-MM-DD")    : "",
      check_out_from: checkOutFrom ? checkOutFrom.format("YYYY-MM-DD") : "",
      check_out_to:   checkOutTo   ? checkOutTo.format("YYYY-MM-DD")   : "",
      min_price:      minPrice || "",
      max_price:      maxPrice || "",
      property_id:    selectedPropertyId || undefined,
      payment_status: selectedPayment || "",
    };
    onApplyFilters(filters);
  };

  // ── Reset ─────────────────────────────────────────────────
  const handleReset = () => {
    setSelectedStatuses([]);
    setSelectedDateRange(null);
    setCheckInFrom(null);
    setCheckInTo(null);
    setCheckOutFrom(null);
    setCheckOutTo(null);
    setSelectedPropertyId(null);
    setSelectedPropertyTitle("");
    setSelectedPayment(null);
    setMinPrice("");
    setMaxPrice("");
    onApplyFilters({});
  };

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* Header */}
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

      <section className="mt-8 px-6">
        <p className="text-[#364152] text-xl font-medium mb-5">{t("Filter items")}</p>
        <p className="text-[#4B5565] text-sm font-normal mb-5">{t("Filter your orders")}</p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/* Booking Status */}
      <section className="px-6 mt-4">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Booking status')}</p>
        <div className="flex gap-3 flex-wrap">
          {statusOptions.map((item) => {
            const isAll = item.value === 'all';
            const isActive = isAll ? isAllSelected : selectedStatuses.includes(item.value);
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (isAll) {
                    setSelectedStatuses(isAllSelected ? [] : [...allStatusValues]);
                  } else {
                    setSelectedStatuses(prev =>
                      prev.includes(item.value)
                        ? prev.filter(v => v !== item.value)
                        : [...prev, item.value]
                    );
                  }
                }}
                className={`p-2.5 text-sm font-normal rounded-full cursor-pointer transition ${
                  isActive
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-[#EEF2F6] text-[#4B5565]"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Date Range */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Date range')}</p>
        <div className="flex gap-3 flex-wrap">
          {dateRangeOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedDateRange(prev => prev === item.value ? null : item.value)}
              className={`p-2.5 text-sm font-normal rounded-full cursor-pointer transition ${
                selectedDateRange === item.value
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[#EEF2F6] text-[#4B5565]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Check-in date */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Check-in date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('From date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkInFrom}
                onChange={setCheckInFrom}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('To date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkInTo}
                onChange={setCheckInTo}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Check-out date */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Check-out date')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('From date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkOutFrom}
                onChange={setCheckOutFrom}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
          <div>
            <p className="text-[#697586] text-sm font-normal mb-1.5">{t('To date')}</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={checkOutTo}
                onChange={setCheckOutTo}
                format="DD/MM/YYYY"
                slotProps={{ textField: { placeholder: "00/00/0000", fullWidth: true, sx: datePickerSx } }}
              />
            </LocalizationProvider>
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Property */}
      <section className="px-6">
        <label className="text-[#364152] text-base font-normal mb-1.5 block">{t("Property")}</label>
        <div className="relative w-full" ref={dropdownRef}>
          <div
            className="relative flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer"
            onClick={() => setOpenProp(!openProp)}
          >
            <input
              type="text"
              placeholder={t("Select property")}
              value={selectedPropertyTitle || searchValue}
              onChange={(e) => { setSearchValue(e.target.value); setOpenProp(true); setSelectedPropertyId(null); setSelectedPropertyTitle(""); }}
              className="h-15 p-3 w-full text-[#364152] focus:outline-none"
            />
            <span className="absolute left-3 pointer-events-none">
              <img src={openProp ? "/images/icons/ArrowUp.svg" : "/images/icons/ArrowDown.svg"} alt="" />
            </span>
          </div>
          {openProp && (
            <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
              {PropertyOptions
                .filter((opt) => opt?.title?.toLowerCase().includes(searchValue.toLowerCase()))
                .map((opt) => (
                  <li
                    key={opt.id}
                    onClick={() => { setSelectedPropertyId(opt.id); setSelectedPropertyTitle(opt.title); setOpenProp(false); setSearchValue(""); }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {opt.title}
                  </li>
                ))}
            </ul>
          )}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Payment Status */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-3">{t('Payment status')}</p>
        <div className="flex gap-3 flex-wrap">
          {paymentOptions.map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedPayment(prev => prev === item.value ? null : item.value)}
              className={`p-2.5 text-sm font-normal rounded-full cursor-pointer transition ${
                selectedPayment === item.value
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[#EEF2F6] text-[#4B5565]"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Booking Amount */}
      <section className="px-6">
        <p className="text-[#364152] text-base font-normal mb-1.5">{t('Booking amount')}</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal">{t('minimum')}</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0 جنيه"
              className="w-full h-12.5 px-4 border border-[#C8C8C8] rounded-[3px] outline-0"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[#697586] text-sm font-normal">{t('maximum')}</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="0 جنيه"
              className="w-full h-12.5 px-4 border border-[#C8C8C8] rounded-[3px] outline-0"
            />
          </div>
        </div>
        <div className="border-[0.5px] border-[#E3E8EF] my-4" />
      </section>

      {/* Actions */}
      <section className="px-6 mb-6 flex gap-3">
        <button
          onClick={handleApply}
          className="w-[25%] h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer"
        >
          {t('apply')}
        </button>
        <button
          onClick={handleReset}
          className="w-[20%] h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer"
        >
          {t('cancel')}
        </button>
      </section>
    </Dialog>
  );
}

export default FiltersPage;
