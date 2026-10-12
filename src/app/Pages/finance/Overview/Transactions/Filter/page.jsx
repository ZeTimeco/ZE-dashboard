"use client"
import { Dialog } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { ar } from 'date-fns/locale'; // Arabic locale
import { useDispatch, useSelector } from 'react-redux';
import { getAllWorkersThunk } from '@/redux/slice/Workers/WorkersSlice';
import { getAllServicesThunk } from '@/redux/slice/Services/ServicesSlice';

function FilterPage({open , setOpen, onFilterApply}) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { workers, loading } = useSelector((state) => state.workers);
    const { services } = useSelector((state) => state.services);

    // ===== Payment status 1 =====
    const [open1, setOpen1] = useState(false);
    const [selected1, setSelected1] = useState(null);
    const [searchValue1, setSearchValue1] = useState("");
    const dropdownRef1 = useRef(null);
    const paymentStatusKeys = ['pending', 'paid', 'refunded'];
    const optionPaymentStatus = paymentStatusKeys.map(key => ({ key, label: t(key) }));
  
    // ===== payment method 2 =====
    const [open2, setOpen2] = useState(false);
    const [selected2, setSelected2] = useState(null);
    const [searchValue2, setSearchValue2] = useState("");
    const dropdownRef2 = useRef(null);
    const paymentMethodKeys = ['cash', 'card'];
    const optionPaymentMethod = paymentMethodKeys.map(key => ({ key, label: t(key) }));

    // ===== worker 3 =====
    const [open3, setOpen3] = useState(false);
    const [selected3, setSelected3] = useState(null);
    const [searchValue3, setSearchValue3] = useState("");
    const dropdownRef3 = useRef(null);
    const optionWorker = workers;
    const handleOpenWorkerDropdown = () => {
      setOpen3((prev) => !prev);
      dispatch(
        getAllWorkersThunk ({
          per_page: 200,
          designation_id: '1', 
        })
      );
    };
    
    // ===== Service 4 =====
    const [open4, setOpen4] = useState(false);
    const [selected4, setSelected4] = useState(null);
    const [searchValue4, setSearchValue4] = useState("");
    const dropdownRef4 = useRef(null);
    const optionService = services;
    const handleOpenServiceDropdown = () => {
      setOpen4((prev)=>!prev);
      dispatch(
        getAllServicesThunk({
        per_page:200,
      }))
    }
    const getServiceTitle = (service) => {
      if (!service?.category?.title) return null;

      if (typeof service.category.title === "string") {
        return service.category.title.trim() || null;
      }


    };



        /*  ========== calender ========== */
        const [open5, setOpen5] = useState(false);
        const dropdownRef5 = useRef(null);
      
        const [state, setState] = useState([
          {
            startDate: null,
            endDate: null,
            key: 'selection'
          }
        ]);
      

      useEffect(() => {
        const handleClickOutside = (event) => {
          if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
          if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
          if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
          if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
          if (dropdownRef5.current && !dropdownRef5.current.contains(event.target)) setOpen5(false);

        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const formatDate = (date) => {
        if (!date) return null;
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const handleResults = () => {
        const filters = {};
        if (selected1) filters.payment_status = selected1.key;
        if (selected2) filters.payment_method = selected2.key.toUpperCase(); 
        if (selected3) filters.handyman_id = selected3.id;
        // if (selected4) filters.service_id = selected4.id;
        if (selected4?.category?.id) {
          filters.service_id = selected4.category.id;
        }
        if (state[0].startDate) filters.date_from = formatDate(state[0].startDate);
        if (state[0].endDate) filters.date_to = formatDate(state[0].endDate);

        onFilterApply(filters);
        setOpen(false);
      };

      const handleReset = () => {
        setSelected1(null);
        setSelected2(null);
        setSelected3(null);
        setSelected4(null);
        setState([{
          startDate: null,
          endDate: null,
          key: 'selection'
        }]);
        onFilterApply({});
        setOpen(false);
      };

  return (
    <>
    <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          PaperProps={{
            className: "overviewPage-dialog",
          }}
        >
          <section className="flex justify-between px-6 mt-6">
            <button
              onClick={()=>setOpen(false)}
              className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center"
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
            <p className="text-[#364152] text-xl font-medium mb-5">{t("Transaction settlement")}</p>
            <p className="text-[#4B5565] text-sm font-normal mb-5">
              {t("Precise transaction filtering to quickly find what you are looking for.")}
            </p>
          </section>
          <span className="border-[0.5px] border-[#E3E8EF]" />

          <section className='p-6 '>
            <div className='grid grid-cols-2 gap-4'>
              {/* Payment status */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-base font-normal mb-3">
                  {t("Payment status")}
                </label>

                <div className="relative w-full" ref={dropdownRef1}>
                  <div
                    className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                    onClick={() => setOpen1(!open1)}
                  >
                    <input
                      type="text"
                      placeholder={t("Select payment status")}
                      value={selected1?.label || searchValue1}   
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
                    <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                      {optionPaymentStatus
                        .filter((opt) =>
                          opt.label.toLowerCase().includes(searchValue1.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt.key}
                            onClick={() => {
                              setSelected1(opt);
                              setOpen1(false);
                              setSearchValue1("");
                            }}
                            className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                          >
                            {opt.label}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* payment method */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-base font-normal mb-3">
                  {t("payment method")}
                </label>

                <div className="relative w-full" ref={dropdownRef2}>
                  <div
                    className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                    onClick={() => setOpen2(!open2)}
                  >
                    <input
                      type="text"
                      placeholder={t("Select payment status")}
                      value={selected2?.label || searchValue2}   
                      onChange={(e) => {
                        setSearchValue2(e.target.value);
                        setOpen2(true);
                        setSelected2(null);
                      }}
                      className="h-15 p-3 w-full text-[#364152] focus:outline-none"
                    />

                    <span className="absolute left-3 pointer-events-none">
                      {open2 ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>
                  </div>

                  {open2 && (
                    <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                      {optionPaymentMethod
                        .filter((opt) =>
                          opt.label.toLowerCase().includes(searchValue2.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt.key}
                            onClick={() => {
                              setSelected2(opt);
                              setOpen2(false);
                              setSearchValue2("");
                            }}
                            className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                          >
                            {opt.label}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* worker */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-base font-normal mb-3">
                  {t("worker")}
                </label>

                <div className="relative w-full" ref={dropdownRef3}>
                  <div
                    className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                    onClick={handleOpenWorkerDropdown}
                  >
                    <input
                      type="text"
                      placeholder={t("Choose a woker")}
                      value={selected3?`${selected3?.firstname} ${selected3?.lastname}`: searchValue3 } 
                      onChange={(e) => {
                        setSearchValue3(e.target.value);
                        setOpen3(true);
                        setSelected3(null);
                      }}
                      className="h-15 p-3 w-full text-[#364152] focus:outline-none"
                    />

                    <span className="absolute left-3 pointer-events-none">
                      {open3 ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>
                  </div>

                  {open3 && (
                    <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                      {optionWorker
                        ?.filter((opt) =>
                          `${opt?.firstname} ${opt?.lastname}`.toLowerCase().includes(searchValue3.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt?.id}
                            onClick={() => {
                              setSelected3(opt);
                              setOpen3(false);
                              setSearchValue3("");
                            }}
                            className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                          >
                            {opt?.firstname} {opt?.lastname}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>

              {/* Service */}
              <div className="flex flex-col">
                <label className="text-[#364152] text-base font-normal mb-3">
                  {t("Service")}
                </label>

                <div className="relative w-full" ref={dropdownRef4}>
                  <div
                    className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                    onClick={handleOpenServiceDropdown}
                  >
                    <input
                      type="text"
                      placeholder={t("Choose the service")}
                      // value={selected4 ? selected4.title : searchValue4}
                      value={selected4 ? getServiceTitle(selected4) : searchValue4}

                      onChange={(e) => {
                        setSearchValue4(e.target.value);
                        setOpen4(true);
                        setSelected4(null);
                      }}
                      className="h-15 p-3 w-full text-[#364152] focus:outline-none"
                    />

                    <span className="absolute left-3 pointer-events-none">
                      {open4 ? (
                        <img src="/images/icons/ArrowUp.svg" alt="up" />
                      ) : (
                        <img src="/images/icons/ArrowDown.svg" alt="down" />
                      )}
                    </span>
                  </div>

                  {open4 && (
                    <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                      {optionService
                        .filter((opt) => getServiceTitle(opt))
                        .filter((opt) =>
                          getServiceTitle(opt).toLowerCase().includes(searchValue4.toLowerCase())
                        )
                        .map((opt) => (
                          <li
                            key={opt?.id}
                            onClick={() => {
                              setSelected4(opt);
                              setOpen4(false);
                              setSearchValue4("");
                            }}
                            className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                          >
                            {getServiceTitle(opt)}
                          </li>
                        ))}
                    </ul>
                  )}

                </div>
              </div>
            </div>
            
            
            <div className="flex flex-col mt-6">
              <label className="text-[#364152] text-base font-normal mb-3">
                {t("Service history")}
              </label>
    
              <div className="relative w-full">
                <div
                  className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                  onClick={() => setOpen5(true)}
                >
                  <input
                    type="text"
                    placeholder={t("Select date range")}
                    value={
                      state[0].startDate && state[0].endDate
                        ? `${state[0].startDate.toLocaleDateString()} - ${state[0].endDate.toLocaleDateString()}`
                        : ""
                    }
                    readOnly
                    className="h-15 p-3 w-full text-[#364152] focus:outline-none cursor-pointer"
                  />
    
                  <span className="absolute left-4 pointer-events-none">
                    <img src="/images/icons/calender.svg" alt="calendar" />
                  </span>
                </div>
              </div>
    
    
              {/* Date Range Picker Modal */}
              <Dialog
                open={open5}
                aria-labelledby="date-picker-dialog"
                PaperProps={{ className: "rerquest-dialog", dir: "rtl" }}
              >
                {/* title of calender */}
                <section className="flex justify-between px-6 mt-6 ">
                  <button
                    onClick={() => setOpen5(false)}
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
    

    
                <span className="border-[0.5px] border-[#E3E8EF] my-2" />
    
                <section className="p-6 flex items-center justify-center ">
                  <div dir="ltr" className="inline-block ">
                    <div className="  ">
                        <DateRangePicker
                          onChange={item => setState([item.selection])}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={state}
                          direction="horizontal"
                          preventSnapRefocus={true}
                          calendarFocus="backwards"
                          locale={ar}
                          staticRanges={[]}
                          inputRanges={[]}
                          rangeColors={["var(--color-primary)"]}
                          
                        />
                    </div>
                  
                  </div>
                </section>
    
                {/* btns of calender */}
                <section className="p-6 flex gap-4 ">
                  <button 
                  onClick={() => setOpen5(false)}
                  className="w-23 h-13.5 bg-primary cursor-pointer  text-white rounded-3px text-base font-medium">
                    {t('apply')}
                  </button>
    
                  <button 
                  onClick={() => setOpen5(false)}
                  className="w-15 h-13.5 border border-primary cursor-pointer  text-primary rounded-3px text-base font-medium">
                    {t('cancel')}
                  </button>
                </section>
    
    
    
    
              </Dialog>
            </div>  
          </section>
          
          {/* btn */}
          <section className="p-6 flex gap-4 ">
            <button 
              onClick={handleResults}
              className="w-42.5 h-13.5 bg-primary cursor-pointer  text-white rounded-3px text-base font-medium"
            >
              {t('Show results')}
            </button>

            <button 
              onClick={handleReset}
              className="w-35 h-13.5 border border-primary cursor-pointer  text-primary rounded-3px text-base font-medium"
            >
              {t('Reset')}
            </button>
          </section>


        </Dialog>

    </>
  )
}

export default FilterPage