"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";
import { toast } from "react-toastify";

import Header from "./Header";

function YourFilesPage({userData}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const cr_end_date = userData?.cr_end_date; 
  const tax_card_end_date = userData?.tax_card_end_date;     
  const id_end_date = userData?.id_end_date; 

  const [files, setFiles] = useState({
    commercialRecord: {
      key: "commercialRecord",
      label: 'Your business record',
      file: null, 
      endDate: cr_end_date,
    },
    taxCard: {
      key: "taxCard",
      label: "Tax Card",
      file: null,
      endDate: tax_card_end_date,
    },
    idFront: {
      key: "idFront",
      label: "Front national ID card photo",
      file: null,
      endDate: id_end_date,
    },
    idBack: {
      key: "idBack",
      label: "Back national ID card photo",
      file: null, 
      endDate: id_end_date,
    },
  });
  
  useEffect(() => {
    if (userData) {
      const getFileObj = (url) => {
        if (!url) return null;
        const name = url.split('/').pop();
        const type = name.split('.').pop().toUpperCase();
        return {
          name: name,
          size: "Existing", 
          type: type,
          url: url
        };
      };

      setFiles(prev => ({
        ...prev,
        commercialRecord: {
          ...prev.commercialRecord,
          file: getFileObj(userData.commercial_register) || prev.commercialRecord.file
        },
        taxCard: {
          ...prev.taxCard,
          file: getFileObj(userData.tax_card) || prev.taxCard.file
        },
        idFront: {
          ...prev.idFront,
          file: getFileObj(userData.id_front) || prev.idFront.file
        },
        idBack: {
          ...prev.idBack,
          file: getFileObj(userData.id_back) || prev.idBack.file
        }
      }));
    }
  }, [userData]);

  const checkEndDate = (date) => {
    const today = dayjs();
    const endDate = dayjs(date);
    const diffInDays = endDate.diff(today, "day");

    if (diffInDays <= 0 && date) {
      return {
        status: "expired",
        message: t("This file must be updated immediately to avoid account suspension."),
        color: "#F04438",
        icon: "/images/icons/red warning.svg",
      };
    } else if (diffInDays < 30 && date) { 
      return {
        status: "warning",
        message: t("This file needs to be updated before its expiry date"),
        color: "#DC6803",
        icon: "/images/icons/orange warning.svg",
        date: date,
      };
    } else if (!date) {
      return {
        status: "waiting",
        message: t("This file has not yet been reviewed."),
        color: "#697586",
        icon: "/images/icons/remove-circle.svg",
      };
    } else {
      return { status: "done", message: "" };
    }
  };

  const renderStatusAction = (status, inputRef) => {
    switch (status) {
      case "expired":
      case "warning":
        return (
          <motion.button 
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 cursor-pointer" 
            onClick={() => inputRef.current.click()}
          >
            <img src="/images/icons/EditYellow.svg" alt="edit" className="w-5 h-5" />
          </motion.button>
        );
      case "waiting":
        return <img src="/images/icons/remove-circle.svg" alt="waiting" className="w-5 h-5" />;
      case "done":
        return <img src="/images/icons/_Checkbox base.svg" alt="done" className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split(".").pop().toUpperCase();
      const sizeKB = Math.round(file.size / 1024);
      setFiles((prev) => ({
        ...prev,
        [key]: {
          ...prev[key],
          file: {
            name: file.name,
            size: `${sizeKB} KB`,
            type: extension,
            url: URL.createObjectURL(file),
          },
          rawFile: file,
        },
      }));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      let hasChanges = false;

      Object.values(files).forEach((item) => {
        if (item.rawFile) {
          hasChanges = true;
          const fieldMap = {
            commercialRecord: "commercial_register",
            taxCard: "tax_card",
            idFront: "id_front",
            idBack: "id_back",
          };
          formData.append(fieldMap[item.key], item.rawFile);
        }
      });

      if (!hasChanges) {
        toast.info(t("No changes to save") || "No changes to save");
        return;
      }

      setIsSaving(true);
      // 1️⃣ Update backend
      await dispatch(UpdateInSignupThunk(formData)).unwrap();

      // 2️⃣ Fetch updated profile
      const data = await dispatch(getProfileThunk()).unwrap();
      const updatedUserData = data.provider || data;

      if (updatedUserData) {
        // 3️⃣ Sync localStorage
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        window.dispatchEvent(new Event("storage"));
      }

      toast.success(t("Changes saved successfully!") || "Changes saved successfully!");
    } catch (err) {
      console.error("Update failed:", err);
      toast.error(err?.message || err || t("Failed to save changes") || "Failed to save changes");
    } finally {
      setIsSaving(false);
    }
  };

  const inputRefs = {
    commercialRecord: useRef(null),
    taxCard: useRef(null),
    idFront: useRef(null),
    idBack: useRef(null),
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
    >
      <Header />

      <section className="lg1:p-6 pt-4 px-4 space-y-6">
        {Object.values(files).map((item, index) => {
          const { status, message, color, icon, date } = checkEndDate(
            item.endDate
          );

          return (
            <motion.div 
              key={item.key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="flex flex-col w-full gap-2"
            >
              <label className="text-[#364152] text-base font-normal">
                {t(item.label)}
              </label>

              <motion.div 
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.04)", borderColor: "#B2BAC6" }}
                className="flex items-center p-4 border border-[#CDD5DF] rounded-[3px] lg1:gap-4 gap-2 shadow-2xs bg-white transition-all duration-200"
              >
                <div className="relative w-10 lg1:w-12 lg1:h-12 flex items-center justify-center bg-gray-50 rounded">
                  <img
                    src="/images/filephoto.svg"
                    className="w-10 h-10"
                    alt="file"
                    onError={(e) => {
                      e.target.onerror = null; 
                      e.target.src="/images/icons/imageicon.svg"
                    }} 
                  />
                  {item.file && (
                    <span className="absolute bottom-0 right-1 text-white text-[9px] px-1 py-0.2 rounded-xs bg-[var(--color-primary)] font-bold">
                      {item.file.type}
                    </span>
                  )}
                </div>

                <div className="w-full">
                  <p className="text-[#344054] font-medium text-sm truncate" title={item.file ? t(item.label) : t("No file chosen")}>
                    {item.file ? t(item.label) : t("No file chosen")}
                  </p>
                  {item.file && (
                    <p className="text-[#697586] font-normal text-xs mt-0.5">{item.file.size}</p>
                  )}
                </div>

                {renderStatusAction(status, inputRefs[item.key])}
              </motion.div>

              <input
                type="file"
                ref={inputRefs[item.key]}
                className="hidden"
                onChange={(e) => handleFileChange(e, item.key)}
              />

              {/* Status Message */}
              {(status === "warning" || status === "expired" || status === "waiting") && (
                <div style={{ color }} className="flex gap-2 items-center mt-1">
                  {icon && <img src={icon} alt="" className="w-5 h-5" />}
                  <p className="text-sm font-normal">
                    {message} {date ? `(${dayjs(date).format("YYYY-MM-DD")})` : ""}
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}

        {/* btn */}
        <motion.button 
          whileHover={!isSaving ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
          whileTap={!isSaving ? { scale: 0.98 } : {}}
          disabled={isSaving}
          onClick={handleSaveChanges}
          className={`bg-[var(--color-primary)] h-15 w-full sm:w-62.5 text-white text-base font-medium rounded-[3px] mt-6 flex items-center justify-center gap-2 shadow-xs transition-all ${
            isSaving ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{t("Saving...")}</span>
            </>
          ) : (
            <span>{t('Save changes')}</span>
          )}
        </motion.button>
      </section>
    </motion.div>
  );
}

export default YourFilesPage;
