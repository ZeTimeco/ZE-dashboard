"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import MapDialog from './MapDialog';
import TimeRangePicker from './TimeRangePicker';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAreasThunk } from '@/redux/slice/Services/ServicesSlice';

function JobDataPage({handlePrev , getDesignations ,formData ,setFormData,handleChange ,handleSubmit  }) {
  const {t}= useTranslation();
  
  //api
  const dispatch = useDispatch()
  const {getAreas } = useSelector(state=>state.services)
  useEffect(() => {
    dispatch(getAllAreasThunk()); 
  }, [dispatch])

  //job
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState("");
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionJob = getDesignations || []

  // workplace 
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState([]);
  const dropdownRef2 = useRef(null);
  const optionWorkplace = getAreas?.areas || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  //map
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Front national ID card photo
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);

      setFormData((prev)=>({
        ...prev, 
        id_front: selectedFile,
      }))
      let uploaded = 0;
      const interval = setInterval(() => {
        uploaded += 20;
        if (uploaded >= 100) {
          uploaded = 100;
          clearInterval(interval);
        }
        setProgress(uploaded);
      }, 500);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setProgress(0);

    setFormData((prev)=>({
      ...prev, 
      id_front: null,
    }))
  };
  
  //back national ID card photo
  const [BackFile, setBackFile] = useState(null);
  const [BackProgress, setBackProgress] = useState(0);
  
  const handleBackFileChange = (e)=>{
    const selectBackFile = e.target.files[0];
    if(selectBackFile && selectBackFile.type === "application/pdf" ){
      setBackFile(selectBackFile);
      let uploaded = 0;

      setFormData((prev)=>({
        ...prev, 
        id_back: selectBackFile,
      }))

      const interval = setInterval(() => {
        uploaded += 20;
        if (uploaded >= 100) {
          uploaded = 100;
          clearInterval(interval);
        }
        setBackProgress(uploaded);
      }, 500);
    }
  }
  const handleBackRemove = () => {
    setBackFile(null);
    setBackProgress(0);

    setFormData((prev)=>({
      ...prev, 
      id_back: null,
    }))
  };

  // Working hours
  const [workingHours, setWorkingHours] = useState({
    start: '00:00',
    end: '00:00',
  });

  return (
    <>
      <form className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
        {/* job */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("job")}
          </label>
    
          <div className="relative w-full" ref={dropdownRef1}>
            <div
              className="relative flex items-center border border-[#C8C8C8] rounded-[3px] cursor-pointer focus-within:border-[#C69815] transition-colors"
              onClick={() => setOpen1(!open1)}
            >
              {/* Input */}
              <input
                type="text"
                placeholder={t("Choose the job")}
                value={searchValue1 || selected1}
                onChange={(e) => {
                  setSearchValue1(e.target.value);
                  setOpen1(true);
                  setSelected1(null);
                }}
                className="h-15 p-3 w-full text-[#364152] focus:outline-none"
              />
    
              {/* 🔽 Dropdown arrow */}
              <span className="absolute left-3 cursor-pointer">
                {open1 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="up" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="down" />
                )}
              </span>
            </div>
    
            {/* 🔽 Dropdown options */}
            {open1 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                {optionJob
                  .filter((option) =>
                    option?.name
                      ?.toLowerCase()
                      .includes(searchValue1.toLowerCase())
                  )
                  .map((option, index) => (
                    <li
                      key={option.id || index}
                      onClick={() => {
                        setSelected1(option?.name);
                        setSearchValue1("");
                        setOpen1(false);

                        setFormData((prev)=>({
                          ...prev,
                          designation_id: option?.id,
                        }))
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer transition-colors"
                    >
                      {option.name}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      
        {/* Employee address */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Employee address")}
          </label>
          <textarea
            readOnly
            placeholder={t("Enter the address")}
            value={formData?.address || ""}
            onClick={handleClickOpen}
            className="h-15 p-3 border border-[#C8C8C8] outline-[#C69815] rounded-[3px] placeholder:text-[#9A9A9A] focus:border-[#C69815] cursor-pointer transition-colors resize-none"
          />
        </div>

        {/* workplace */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Workplaces")}
          </label>

          <div className="relative w-full" ref={dropdownRef2}>
            <div
              onClick={() => setOpen2(!open2)}
              className="p-2 min-h-15 border border-[#C8C8C8] rounded-[3px] cursor-pointer flex items-center flex-wrap gap-2 focus-within:border-[#C69815] transition-colors"
            >
              {/* Selected tags / placeholder */}
              {selected2.length > 0 ? (
                selected2.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 h-10 w-fit bg-[#EDE7FD] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full shadow-xs"
                  >
                    {item?.city}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelected2(selected2.filter((_, i) => i !== index));
                      }}
                      className="text-[#364152] hover:opacity-75"
                    >
                      <img src="/images/icons/x.svg" alt="" className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-[#9A9A9A]">{t("Identify the workplaces")}</span>
              )}

              {/* Arrow icon on the right */}
              <span className="absolute left-3">
                {open2 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="" />
                )}
              </span>
            </div>

            {/* Dropdown options */}
            {open2 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-[3px] shadow-md z-10 max-h-48 overflow-y-auto">
                {optionWorkplace.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      if (!selected2.some(item => item.id === option.id)) {
                        const updatedSelected = [...selected2, option];
                        setSelected2(updatedSelected);

                        setFormData(prev => ({
                          ...prev,
                          provider_areas: updatedSelected.map(item => item.id), // IDs فقط
                        }));
                      }

                      setOpen2(false);
                    }}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer transition-colors"
                  >
                    {option.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Working hours */}
        <div className='flex flex-col'>
          <TimeRangePicker
            value={workingHours}
            onChange={(timeRange)=>{
              setWorkingHours(timeRange)

              function formatTime12(time24) {
                const [hour, minute] = time24.split(':').map(Number);
                const period = hour >= 12 ? 'م' : 'ص';
                const hour12 = hour % 12 === 0 ? 12 : hour % 12;
                return `${hour12}:${minute.toString().padStart(2, '0')} ${period}`;
              }

              setFormData((prev)=>({
                ...prev,
                working_time: `${formatTime12(timeRange.start)} - ${formatTime12(timeRange.end)}` // خليهم جنب بعض
              }))
            }}
            label={t('Working hours')}
            language="ar"
          />
        </div>
      </form>

      <div className='w-full flex flex-col gap-3 lg1:flex-row'>
        {/* Front national ID card photo */}
        <div className="flex flex-col w-full">
          <label className="text-[#364152] text-base font-normal mb-3">{t("Front national ID card photo")}</label>
          {!file ? (
            <label className="flex items-center relative gap-2 h-15 p-3 border border-[#C8C8C8] rounded-[3px] text-[#9A9A9A] cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              <img
                src="/images/icons/upload.svg"
                alt="upload"
                className="w-5 h-5 absolute left-3"
              />
              <span className="flex-1">
                {t("Upload a photo of the front of your national ID card")}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          ) : progress < 100? (
            // === Upload in progress UI ===
            <div className="border border-[#C8C8C8] rounded-[3px] p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                  <span className="text-sm text-[#364152] font-medium">
                    {file.name}
                  </span>
                </div>
                <button onClick={handleRemove} className="text-[#C69815] cursor-pointer">
                  <img src="/images/icons/cancel-circle.svg" alt="" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-[#364152] p-3">
                <p className='flex gap-2 items-center'>
                  <span className='text-[#9D919F] text-sm font-normal'> • 60 ك ب من 120 م ب</span>
                  <img src="/images/icons/loading.svg" alt="" />
                  <span>{t("Loading...")}</span>
                </p>
              </div>

              <div className="w-full bg-gray-200 h-1 mt-1 rounded">
                <div
                  className="bg-[#C69815] h-1 rounded transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            // Final UI after upload complete
            <div className="border border-[#C8C8C8] h-15 rounded-[3px] p-3 flex items-center justify-between shadow-xs">
              {/* file name + icon */}
              <div className="flex items-center gap-2">
                <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                <span className="text-sm text-[#656565] font-medium">{file.name}</span>
              </div>
              {/* delete button */}
              <button onClick={handleRemove} className="cursor-pointer">
                <img src="/images/icons/delete.svg" alt="delete" className="w-5 h-5 text-[#C69815]" />
              </button>
            </div>
          )}
        </div>

        {/* Back national ID card photo */}
        <div className="flex flex-col w-full">
          <label className="text-[#364152] text-base font-normal mb-3">{t("Back national ID card photo")}</label>

          {!BackFile ? (
            <label className="flex items-center relative gap-2 h-15 p-3 border border-[#C8C8C8] rounded-[3px] text-[#9A9A9A] cursor-pointer hover:border-[var(--color-primary)] transition-colors">
              <img
                src="/images/icons/upload.svg"
                alt="upload"
                className="w-5 h-5 absolute left-3"
              />
              <span className="flex-1">
                {t("Upload a photo of the back of your national ID card")}
              </span>
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleBackFileChange}
              />
            </label>
          ) : BackProgress < 100? (
            // === Upload in progress UI ===
            <div className="border border-[#C8C8C8] rounded-[3px] p-3 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                  <span className="text-sm text-[#364152] font-medium">
                    {BackFile.name}
                  </span>
                </div>
                <button onClick={handleBackRemove} className="text-[#C69815] cursor-pointer">
                  <img src="/images/icons/cancel-circle.svg" alt="" />
                </button>
              </div>

              <div className="flex items-center justify-between mt-2 text-xs text-[#364152] p-3">
                <p className='flex gap-2 items-center'>
                  <span className='text-[#9D919F] text-sm font-normal'> • 60 ك ب من 120 م ب</span>
                  <img src="/images/icons/loading.svg" alt="" />
                  <span>{t("Loading...")}</span>
                </p>
              </div>

              <div className="w-full bg-gray-200 h-1 mt-1 rounded">
                <div
                  className="bg-[#C69815] h-1 rounded transition-all duration-300"
                  style={{ width: `${BackProgress}%` }}
                ></div>
              </div>
            </div>
          ) : (
            // Final UI after upload complete
            <div className="border border-[#C8C8C8] h-15 rounded-[3px] p-3 flex items-center justify-between shadow-xs">
              {/* file name + icon */}
              <div className="flex items-center gap-2">
                <img src="/images/icons/imageicon.svg" alt="pdf" className="w-5 h-5" />
                <span className="text-sm text-[#656565] font-medium">{BackFile.name}</span>
              </div>
              {/* delete button */}
              <button onClick={handleBackRemove} className="cursor-pointer">
                <img src="/images/icons/delete.svg" alt="delete" className="w-5 h-5 text-[#C69815]" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="my-12 flex gap-3">
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePrev} 
          className="border w-48 h-13.5 py-2.5 px-4 rounded-[3px] border-[#C69815] text-[#C69815] text-base font-medium cursor-pointer transition-colors"
        >
          {t('the previous')}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleSubmit}
          className="border border-[#C69815] w-58 h-13.5 py-2.5 px-4 rounded-[3px] bg-[#C69815] text-[#fff] text-base font-medium cursor-pointer shadow-xs transition-all"
        >
          {t('save')}
        </motion.button>
      </div>

      {/* 🗺️ Map Dialog Component */}
      <MapDialog
        open={open}
        handleClose={handleClose}
        formData={formData} 
        setFormData={setFormData} 
      />
    </>
  )
}

export default JobDataPage