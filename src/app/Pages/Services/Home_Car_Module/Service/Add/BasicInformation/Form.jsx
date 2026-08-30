"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock';
import dayjs from 'dayjs';
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllAreasThunk, getCategoriesThunk, getmodulesThunk } from "@/redux/slice/Services/ServicesSlice";

function Form({ formData, handleChange }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { getmodules, getCategories, getAreas } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getmodulesThunk());
    dispatch(getAllAreasThunk());
  }, [dispatch]);

  // Helper function for localized category names
  const getCategoryName = (cat) => {
    if (!cat) return "";
    if (typeof cat === "string") return cat;
    const isAr = i18n.language === "ar";
    return isAr
      ? cat.title_ar || cat.name_ar || cat.title || cat.name || (typeof cat.title === "object" ? cat.title?.ar : "") || ""
      : cat.title_en || cat.name_en || cat.title || cat.name || (typeof cat.title === "object" ? cat.title?.en : "") || cat.title_ar || cat.name_ar || "";
  };

  // Automatically fetch categories for module selected in localStorage
  useEffect(() => {
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    const activeModuleKey = userData?.current_module_key;

    let targetModuleId = null;
    if (getmodules?.length > 0 && activeModuleKey) {
      const matchedModule = getmodules.find(m => m.module_key === activeModuleKey);
      if (matchedModule) {
        targetModuleId = matchedModule.id;
      }
    }

    if (targetModuleId) {
      handleChange("module_id", targetModuleId);
      dispatch(getCategoriesThunk(targetModuleId));
    }
  }, [getmodules, dispatch]);

  // =========================
  // Subcategory (2)
  // =========================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionSubcategory = getCategories || [];

  // =========================
  // Sub-service (3)
  // =========================
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);

  // ⭐ ONLY children of selected category
  const optionSubService = selected2?.children || [];

  // ServiceActivityLocation 4
  const [open4, setOpen4] = useState(false);
  const dropdownRef4 = useRef(null);
  const optionServiceActivityLocation =
    getAreas?.areas?.map((area) => ({
      id: area.id, 
      city: area.city,
    })) || [];

  const handleSelectArea = (option) => {
    if (!formData?.provider_areas_id?.some((a) => a.id === option.id)) {
      const updated = [...(formData?.provider_areas_id || []), option];
      handleChange("provider_areas_id", updated);
    }
    setOpen4(false);
  };

  const handleRemoveArea = (index) => {
    const updated = (formData?.provider_areas_id || []).filter((_, i) => i !== index);
    handleChange("provider_areas_id", updated);
  };

  // Time 5
  const [open5, setOpen5] = useState(false);
  const [tempTime, setTempTime] = useState(null); 
  const [confirmedTime, setConfirmedTime] = useState(
    formData?.duration ? dayjs(formData.duration, "HH:mm") : null
  );

  const formattedTime = confirmedTime ? dayjs(confirmedTime).format("HH:mm") : "";

  const handleOkClick = () => {
    setConfirmedTime(tempTime);
    setOpen5(false);
    const formatted = dayjs(tempTime).format("HH:mm");
    handleChange("duration", formatted);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form className="mt-8">
      <section className="grid lg768:grid-cols-2 lg1:grid-cols-2 gap-6">
        
        {/* ========== Subcategory 2 ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Subcategory")}
          </label>

          <div className="relative w-full" ref={dropdownRef2}>
            <div
              className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
              onClick={() => setOpen2(!open2)}
            >
              <input
                type="text"
                placeholder={t("Select a subcategory")}
                value={searchValue2 || getCategoryName(selected2)}
                onChange={(e) => {
                  setSearchValue2(e.target.value);
                  setOpen2(true);
                  setSelected2(null);
                  handleChange("category_id", "");
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
                {optionSubcategory
                  .filter((option) =>
                    getCategoryName(option)
                      .toLowerCase()
                      .includes(searchValue2.toLowerCase())
                  )
                  .map((option) => (
                    <li
                      key={option.id}
                      onClick={() => {
                        setSelected2(option);
                        setSearchValue2("");
                        setOpen2(false);
                        setSelected3(null);
                        setSearchValue3("");
                        handleChange("category_id", option.id);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {getCategoryName(option)}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* ========== Sub-Service 3 ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Sub-service name")}
          </label>

          <div className="relative w-full" ref={dropdownRef3}>
            <div
              className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
              onClick={() => {
                if (!selected2) return;
                setOpen3(!open3);
              }}
            >
              <input
                type="text"
                placeholder={
                  selected2
                    ? t("Select the sub-service")
                    : t("Select subcategory first")
                }
                disabled={!selected2}
                value={searchValue3 || getCategoryName(selected3)}
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

            {open3 && selected2 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                {optionSubService
                  .filter((opt) =>
                    getCategoryName(opt)
                      .toLowerCase()
                      .includes(searchValue3.toLowerCase())
                  )
                  .map((opt) => (
                    <li
                      key={opt.id}
                      onClick={() => {
                        setSelected3(opt);
                        setOpen3(false);
                        setSearchValue3("");
                        handleChange("category_id", opt.id);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {getCategoryName(opt)}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>

        {/* ========== Service Activity Location 4 ========== */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Service Activity Location")}
          </label>

          <div className="relative w-full" ref={dropdownRef4}>
            <div
              onClick={() => setOpen4(!open4)}
              className="p-2 min-h-15 border border-[#C8C8C8] rounded-3px cursor-pointer flex items-center flex-wrap gap-2"
            >
              {/* Selected tags */}
              {formData?.provider_areas_id?.length > 0 ? (
                formData?.provider_areas_id.map((item, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1.5 h-10 w-fit bg-[#EDE7FD] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full"
                  >
                    {item.city}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveArea(index);
                      }}
                      className="text-[#364152]"
                    >
                      <img src="/images/icons/x.svg" alt="" className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-[#9A9A9A]">{t("Select City")}</span>
              )}

              {/* Arrow icon */}
              <span className="absolute left-3">
                {open4 ? (
                  <img src="/images/icons/ArrowUp.svg" alt="" />
                ) : (
                  <img src="/images/icons/ArrowDown.svg" alt="" />
                )}
              </span>
            </div>

            {/* Dropdown options */}
            {open4 && (
              <ul className="absolute left-0 right-0 border border-[#C8C8C8] bg-white rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                {optionServiceActivityLocation.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => handleSelectArea(option)}
                    className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {option.city}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ========== Average length of service 5 ========== */}
        <div className="flex flex-col mb-6">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Average length of service")}
          </label>

          {/* Clickable box */}
          <div
            onClick={() => setOpen5(true)}
            className="h-15 p-3 border border-[#C8C8C8] rounded-3px cursor-pointer flex items-center justify-between"
          >
            <span className={formattedTime ? "text-[#364152]" : "text-[#9A9A9A]"}>
              {formattedTime || t("Average length of service")}
            </span>
            <span className="ml-2">
              <img src="/images/icons/timepicker.svg" alt="" />
            </span>
          </div>

          {/* Calendar Popup (Dialog) */}
          <Dialog open={open5} onClose={() => setOpen5(false)}>
            <div className="bg-[#eef2f6] p-4 w-[320px]">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MultiSectionDigitalClock
                  value={tempTime}
                  onChange={(newValue) => setTempTime(newValue)}
                  ampm={false}
                  timeSteps={{ minutes: 15 }}
                  sx={{
                    width: "100%",
                    "& .MuiMultiSectionDigitalClock-root": { width: "100%" },
                    "& .MuiMultiSectionDigitalClockSection-root": { flex: 1 },
                  }}
                />
              </LocalizationProvider>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleOkClick}
                  className="bg-primary text-white px-4 py-1 rounded-3px cursor-pointer"
                >
                  {t("Add")}
                </button>
              </div>
            </div>
          </Dialog>
        </div>

      </section>

      {/* ========== Service Description ========== */}
      <div className="flex flex-col">
        <label className="text-[#364152] text-base font-normal mb-3">
          {t("Service Description")}
        </label>
        <div className="relative w-full">
          <textarea
            value={formData?.long_description || ""}
            onChange={(e) => handleChange("long_description", e.target.value)} 
            placeholder={t("Write a description of the service.")}
            maxLength={5000}
            className="w-full h-41.5 border border-[#C8C8C8] rounded-3px p-3 text-[#364152] placeholder-[#9A9A9A] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
            5000/{formData?.long_description?.length || 0}
          </span>
        </div>
      </div>
    </form>
  );
}

export default Form;