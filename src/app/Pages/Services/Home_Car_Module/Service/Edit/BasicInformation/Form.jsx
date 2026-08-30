import { getAllAreasThunk, getCategoriesThunk, getmodulesThunk } from '@/redux/slice/Services/ServicesSlice';
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import TimeDialog from './Dialog/TimeDialog';

function Form({ service, formData, handleChange }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { getmodules, getCategories, getAreas } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getmodulesThunk());
    dispatch(getAllAreasThunk());
  }, [dispatch]);

  console.log('service', service);

  // Helper functions for localized names
  const getModuleName = (mod) => {
    if (!mod) return "";
    if (typeof mod === "string") return mod;
    const isAr = i18n.language === "ar";
    return isAr
      ? mod.name_ar || mod.title_ar || mod.name || mod.title || ""
      : mod.name_en || mod.title_en || mod.name || mod.title || mod.name_ar || mod.title_ar || "";
  };

  const getCategoryName = (cat) => {
    if (!cat) return "";
    if (typeof cat === "string") return cat;
    const isAr = i18n.language === "ar";
    return isAr
      ? cat.title_ar || cat.name_ar || cat.title || cat.name || (typeof cat.title === "object" ? cat.title?.ar : "") || (typeof cat.name === "object" ? cat.name?.ar : "") || ""
      : cat.title_en || cat.name_en || cat.title || cat.name || (typeof cat.title === "object" ? cat.title?.en : "") || (typeof cat.name === "object" ? cat.name?.en : "") || cat.title_ar || cat.name_ar || "";
  };

  // ======================
  // Main Classification 1
  // ======================
  const [open1, setOpen1] = useState(false);
  const [selected1, setSelected1] = useState(null);
  const [hasManuallyChanged, setHasManuallyChanged] = useState(false);
  const [searchValue1, setSearchValue1] = useState("");
  const dropdownRef1 = useRef(null);
  const optionMainClassification = getmodules || [];

  // ======================
  // Subcategory 2
  // ======================
  const [open2, setOpen2] = useState(false);
  const [selected2, setSelected2] = useState(null);
  const [searchValue2, setSearchValue2] = useState("");
  const dropdownRef2 = useRef(null);
  const optionSubcategory = getCategories || [];

  // ======================
  // Sub-service 3
  // ======================
  const [open3, setOpen3] = useState(false);
  const [selected3, setSelected3] = useState(null);
  const [searchValue3, setSearchValue3] = useState("");
  const dropdownRef3 = useRef(null);
  const optionSubService = selected2?.children || [];

  // Step 1: Initialize module_id from localStorage user data or service & fetch categories
  useEffect(() => {
    const userData = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || '{}') : {};
    const activeModuleKey = userData?.current_module_key;

    let targetModule = null;
    if (getmodules?.length > 0 && activeModuleKey) {
      targetModule = getmodules.find(m => m.module_key === activeModuleKey);
    }

    const targetModuleId = targetModule?.id || service?.module_id || service?.module?.id;

    if (service?.category_id) {
      handleChange("category_id", service.category_id);
    }

    if (targetModuleId) {
      handleChange("module_id", targetModuleId);
      if (service?.module) {
        setSelected1(service.module);
      } else if (targetModule) {
        setSelected1(targetModule);
      }
      dispatch(getCategoriesThunk(targetModuleId));
    }
  }, [service, getmodules, dispatch]);

  // Sync selected1 with getmodules when getmodules loads if not set
  useEffect(() => {
    if (selected1 || !service?.module_id || !getmodules || getmodules.length === 0) return;
    const foundModule = getmodules.find(m => m.id === service.module_id);
    if (foundModule) {
      setSelected1(foundModule);
    }
  }, [getmodules, service, selected1]);

  // Step 2: Prefill Subcategory and Sub-service ONLY after getCategories loaded
  useEffect(() => {
    if (!service) return;
    if (!selected1 && !service?.module_id) return;
    if (!getCategories || getCategories.length === 0) return;
    if (hasManuallyChanged) return;

    const targetSubId = service?.category_id || service?.category?.id;
    const targetMainCatId = service?.main_category?.id;

    if (targetSubId || targetMainCatId) {
      let foundSub = getCategories.find(cat => Number(cat.id) === Number(targetMainCatId || targetSubId));

      if (!foundSub && targetSubId) {
        foundSub = getCategories.find(cat => Number(cat.id) === Number(targetSubId));
      }

      if (!foundSub && targetSubId) {
        for (const cat of getCategories) {
          if (cat.children && Array.isArray(cat.children)) {
            const foundChild = cat.children.find(ch => Number(ch.id) === Number(targetSubId));
            if (foundChild) {
              foundSub = cat;
              setSelected3(foundChild);
              break;
            }
          }
        }
      } else if (foundSub && service?.category && targetSubId && Number(service.category.id) !== Number(foundSub.id)) {
        const foundChild = foundSub.children?.find(ch => Number(ch.id) === Number(targetSubId));
        if (foundChild) {
          setSelected3(foundChild);
        }
      }

      if (foundSub) {
        setSelected2(foundSub);
      } else if (service?.category) {
        setSelected2(service.category);
      }
    }
  }, [getCategories, service, selected1, hasManuallyChanged]);

  // Handlers for manual user interactions
  const handleSelectModule = (option) => {
    setSelected1(option);
    setSearchValue1("");
    setOpen1(false);
    setHasManuallyChanged(true);

    setSelected2(null);
    setSearchValue2("");
    setSelected3(null);
    setSearchValue3("");

    handleChange("module_id", option.id);
    handleChange("category_id", "");

    dispatch(getCategoriesThunk(option.id));
  };

  const handleSelectSubcategory = (option) => {
    setSelected2(option);
    setSearchValue2("");
    setOpen2(false);

    setSelected3(null);
    setSearchValue3("");

    handleChange("category_id", option.id);
  };

  const handleSelectSubService = (option) => {
    setSelected3(option);
    setSearchValue3("");
    setOpen3(false);

    handleChange("category_id", option.id);
  };

  // ServiceActivityLocation 4
  const [open4, setOpen4] = useState(false);
  const [selected4, setSelected4] = useState([]);
  const dropdownRef4 = useRef(null);
  const optionServiceActivityLocation = getAreas?.areas || [];
  useEffect(() => {
    if (service?.areas) {
      const areasId = service.areas.map(area => area.id);
      setSelected4(areasId);
      handleChange("provider_areas_id", selected4);
    }
  }, [service]);

  // Time 5
  const [open5, setOpen5] = useState(false);
  const [tempTime, setTempTime] = useState(null);

  const parseDuration = (str) => {
    if (!str) return null;
    const match = str.match(/(\d+):(\d+)/);
    if (!match) return null;
    return dayjs().hour(match[1]).minute(match[2]).second(0);
  };

  const [confirmedTime, setConfirmedTime] = useState(parseDuration(service?.duration));
  const formattedTime = confirmedTime ? dayjs(confirmedTime).format("HH:mm") : "";

  const handleOkClick = () => {
    setConfirmedTime(tempTime);
    setOpen5(false);
    handleChange("duration", tempTime ? dayjs(tempTime).format("HH:mm") : "");
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef1.current && !dropdownRef1.current.contains(event.target)) setOpen1(false);
      if (dropdownRef2.current && !dropdownRef2.current.contains(event.target)) setOpen2(false);
      if (dropdownRef3.current && !dropdownRef3.current.contains(event.target)) setOpen3(false);
      if (dropdownRef4.current && !dropdownRef4.current.contains(event.target)) setOpen4(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
    const [text, setText] = useState("");
  
  return (
    <>
        <form className="mt-8">
        <section className="grid lg768:grid-cols-2 lg1:grid-cols-2 gap-6">



          {/* Subcategory 2 */}
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
                  value={searchValue2 || selected2?.title || ""}
                  onChange={(e) => {
                    setSearchValue2(e.target.value);
                    setOpen2(true);
                    setSelected2(null);
                  }}
                  className="h-15 p-3  w-full text-[#364152] focus:outline-none"
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
                      option.title
                        ?.toLowerCase()
                        .includes(searchValue2.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelected2(option);
                          setSearchValue2("");
                          setOpen2(false);

                          // Reset service title when subcategory changes
                          setSelected3(null);
                          setSearchValue3("");

                          handleChange("main_category_id", option.id);
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {option.title}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Sub-service name 3 */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3">
              {t("Sub-service name")}
            </label>

            <div className="relative w-full" ref={dropdownRef3}>
              <div
                className="relative flex items-center border border-[#C8C8C8] rounded-3px cursor-pointer"
                onClick={() => setOpen3(!open3)}
              >
                <input
                  type="text"
                  placeholder={t("Select the sub-service")}
                  value={searchValue3 || selected3?.title || ""}
                  onChange={(e) => {
                    setSearchValue3(e.target.value);
                    setOpen3(true);
                  }}
                  className="h-15 p-3  w-full text-[#364152] focus:outline-none"
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
                <ul className="absolute left-0 right-0 border bg-white border-[#C8C8C8] rounded-3px shadow-md z-10 max-h-48 overflow-y-auto">
                  {optionSubService
                    .filter((option) =>
                      option?.title
                        ?.toLowerCase()
                        .includes(searchValue3.toLowerCase())
                    )
                    .map((option, index) => (
                      <li
                        key={index}
                        onClick={() => {
                          setSelected3(option);
                          setSearchValue3("");
                          setOpen3(false);

                          handleChange("category_id", option.id);
                        }}
                        className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                      >
                        {option?.title}

                      </li>

                    ))}
                </ul>
              )}

            </div>
          </div>

          {/* Service Activity Location 4 */}
          <div className="flex flex-col">
            <label className="text-[#364152] text-base font-normal mb-3">
              {t("Service Activity Location")}
            </label>

            <div className="relative w-full" ref={dropdownRef4}>
              <div
                onClick={() => setOpen4(!open4)}
                className="p-2 min-h-15 border border-[#C8C8C8] rounded-3px cursor-pointer flex items-center flex-wrap gap-2"
              >
                {/* Selected tags / placeholder */}
                {optionServiceActivityLocation.map((option, index) => (
                  selected4.includes(option.id) ?
                    <span
                      key={index}
                      className="flex items-center gap-1.5 h-10 w-fit bg-[#EDE7FD] border border-[#E2E2E2] text-[#505050] text-sm px-3 py-1 rounded-full"
                    >
                      {option.city}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const updatedAreas = selected4.filter(item => item !== option.id);
                          console.log("selected areas", updatedAreas);
                          setSelected4(updatedAreas);
                          handleChange("provider_areas_id", updatedAreas);
                        }}
                        className="text-[#364152]"
                      >
                        <img src="/images/icons/x.svg" alt="" className="w-3 h-3" />
                      </button>
                    </span>
                    : ""
                ))}
                

                {/* Arrow icon on the right */}
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
                      key={option.id}
                      onClick={() => {
                        if (!selected4.includes(option.id)) {
                          const updated = [...selected4, option.id];
                          setSelected4(updated);
                          handleChange("provider_areas_id", updated); 
                        }
                        setOpen4(false);
                      }}
                      className="p-3 hover:bg-[#F5F5F5] cursor-pointer"
                    >
                      {option.city}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Average length of service 5 */}
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
            <TimeDialog
              open={open5}
              setOpen={setOpen5}
              tempTime={tempTime}
              setTempTime={setTempTime}
              confirmedTime={confirmedTime}
              handleOkClick={handleOkClick}
            />
          </div>


        </section>

        {/* Service Description */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">
            {t("Service Description")}
          </label>
          <div className="relative w-full">
            <textarea
              value={formData?.long_description}
              onChange={(e) => handleChange("long_description", e.target.value)}
              placeholder={t("Write a description of the service.")}
              maxLength={5000}
              className="w-full h-41.5 border border-[#C8C8C8] rounded-3px p-3 text-[#364152] placeholder-[#9A9A9A] resize-none focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <span className="absolute bottom-3 left-3 text-[#9A9A9A] text-sm">
              5000/{formData?.long_description.length}
            </span>
          </div>
        </div>

      </form>
    </>
  )
}

export default Form