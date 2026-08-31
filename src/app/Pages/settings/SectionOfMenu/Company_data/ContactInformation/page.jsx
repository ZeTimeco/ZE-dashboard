
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";
import { toast } from "react-toastify";

function ContactInformationPage({userData}) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const [contactData, setContactData] = useState({
    company_phone: userData?.company_phone || "",
    wts_number: userData?.wts_number || ""
  });

  useEffect(() => {
    if (userData) {
      setContactData({
        company_phone: userData?.company_phone || "",
        wts_number: userData?.wts_number || ""
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const formData = {
        company_phone: contactData.company_phone,
        wts_number: contactData.wts_number,
      };

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
    >
      <Header />

      <section className="p-6">
        {/* Company number */}
        <div>
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('Company number')}</p>
          <input 
            type="text"
            name="company_phone"
            value={contactData?.company_phone}
            onChange={handleChange}
            placeholder='0000000000000'            
            className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>

        {/* WhatsApp number */}
        <div className="mt-4"> 
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('WhatsApp number')}</p>
          <input 
            type="text"
            name="wts_number"
            value={contactData?.wts_number}
            onChange={handleChange}
            placeholder='0000000000000'            
            className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>

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

export default ContactInformationPage;
