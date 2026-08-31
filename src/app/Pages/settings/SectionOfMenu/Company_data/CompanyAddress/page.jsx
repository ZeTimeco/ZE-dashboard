"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import MapDialog from "./MapDialog";
import { useDispatch } from "react-redux";
import { UpdateInSignupThunk } from "@/redux/slice/Auth/AuthSlice";
import { getProfileThunk } from "@/redux/slice/Setting/SettingSlice";
import { toast } from "react-toastify";

function CompanyAddressPage({userData }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [address, setAddress] = useState(userData?.address);
  const [street, setStreet] = useState(userData?.street || "");
  const [famousSign, setFamousSign] = useState(userData?.famous_sign || "");
  const [blockNo, setBlockNo] = useState(userData?.block_no || "");
  const [aptNo, setAptNo] = useState(userData?.apt_no || "");
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleConfirm = (newAddress) => {
    setAddress(newAddress);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      setIsSaving(true);
      const formData = {
        address,
        street,
        famous_sign: famousSign,
        block_no: blockNo,
        apt_no: aptNo,
      };

      // 1️⃣
      await dispatch(UpdateInSignupThunk(formData)).unwrap();

      // 2️⃣
      const data = await dispatch(getProfileThunk()).unwrap();
      const userData = data.provider || data;

      if (userData) {
        // 3️⃣
        localStorage.setItem("user", JSON.stringify(userData));
        window.dispatchEvent(new Event("storage"));
      }

      setAddress(userData?.address || "");
      setStreet(userData?.street || "");
      setFamousSign(userData?.famous_sign || "");
      setBlockNo(userData?.block_no || "");
      setAptNo(userData?.apt_no || "");

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
        {/* Location */}
        <div className="flex flex-col mb-4">
          <label className="text-[#4B5565] text-base font-normal mb-1.5">
            {t("Location")}
          </label>
          <div className="relative">
            <motion.div
              whileHover={{ borderColor: "#B2BAC6" }}
              onClick={handleClickOpen}
              className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none cursor-pointer flex items-center transition-colors bg-white" 
            >
              <span
                className={`text-sm ${
                  address ? "text-[#364152] font-medium" : "text-[#9A9A9A]"
                }`}
              >
                {address || t("Enter the address")}
              </span>
            </motion.div>
            <img
              src="/images/icons/locationDarkBlack.svg"
              alt="location"
              className="absolute left-3 top-4 pointer-events-none w-5 h-5"
            />
          </div>
        </div>

        {/* street */}
        <div>
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('street')}</p>
          <input 
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>
        
        {/* famous sign */}
        <div className="mt-4">
          <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('famous sign')}</p>
          <input 
            type="text"
            value={famousSign}
            onChange={(e) => setFamousSign(e.target.value)}
            className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
          />
        </div>

        <div className="flex gap-4 mt-4 w-full">
          {/* Property number */}
          <div className="w-full">
            <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('Property number')}</p>
            <input 
              type="text"
              value={blockNo}
              onChange={(e) => setBlockNo(e.target.value)}
              className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
            />
          </div>

          {/* Apartment number */}
          <div className="w-full">
            <p className="text-[#4B5565] text-base font-normal mb-1.5">{t('Apartment number')}</p>
            <input 
              type="text"
              value={aptNo}
              onChange={(e) => setAptNo(e.target.value)}
              className="h-14 p-3 w-full rounded-[3px] border border-[#E3E8EF] shadow-xs outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[var(--color-primary)] transition-colors" 
            />
          </div>
        </div>

        {/* btn */}
        <motion.button 
          whileHover={!isSaving ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
          whileTap={!isSaving ? { scale: 0.98 } : {}}
          disabled={isSaving}
          onClick={handleSaveChanges}
          className={`bg-[var(--color-primary)] h-15 w-full sm:w-62.5 mt-6 text-white text-base font-medium rounded-[3px] flex items-center justify-center gap-2 shadow-xs transition-all ${
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

      {/* 🗺️ Map Dialog Component */}
      <MapDialog
        open={open}
        handleClose={handleClose}
        onConfirm={handleConfirm}
      />
    </motion.div>
  );
}

export default CompanyAddressPage;
