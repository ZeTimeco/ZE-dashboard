"use client";
import React, { useState, useRef, useEffect } from "react";
import i18n from "../../../language/i18n";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentLoginThunk } from "@/redux/slice/Auth/AuthSlice";
import ServiceToggle from "../DaialogsOfNavbar/ServiceToggle";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ onMenuClick }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef(null);

  // Change language 
  const handleLangChange = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    setOpen(false); 
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentLoginThunk());
  }, [dispatch]);

  const [openServiceToggle, setOpenServiceToggle] = useState(false);

  return (
    <>
      <motion.header 
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="h-20 bg-white border-b border-[#E3E8EF] flex items-center justify-between px-6 py-4 z-30 sticky top-0 shadow-2xs"
      >
        {/* Left side */}
        <div className="lg1:block hidden">
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-[#364152] text-lg font-semibold tracking-tight leading-tight"
          >
            {t("Welcome back!")}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2, delay: 0.15 }}
            className="text-[#697586] text-xs font-normal"
          >
            {t("Lets check your update today")}
          </motion.p>
        </div>

        {/* Mobile menu trigger */}
        <div className="lg1:hidden block">
          <motion.button 
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.15 }}
            onClick={onMenuClick}
            className="p-2.5 rounded-lg hover:bg-slate-100/80 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            <img src="/images/icons/menu.svg" alt="Menu" className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Right side actions & User Info */}
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-3">
            {/* Switch activity button */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              onClick={() => setOpenServiceToggle(true)}
              className="px-3.5 gap-2 h-10 bg-[var(--color-primary)] hover:bg-[#b08612] flex justify-center items-center rounded-[4px] cursor-pointer shadow-xs transition-colors"
            >
              <motion.img 
                animate={{ rotate: openServiceToggle ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                src="/images/icons/toggleArrow_white.svg" 
                alt="" 
                className="w-4 h-4" 
              />
              <span className="text-white text-sm font-medium whitespace-nowrap">{t('Switch activity')}</span>
            </motion.div>

            {/* Language Dropdown */}
            <div ref={dropdownRef} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="w-10 h-10 border border-[#CDD5DF] hover:border-[#94A3B8] hover:bg-slate-50 rounded-[4px] flex items-center justify-center cursor-pointer transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Language selector"
              >
                <img src="/images/icons/Language.svg" alt="Language" className="w-5 h-5" />
              </motion.button>

              <AnimatePresence>
                {open && (
                  <motion.ul
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute right-0 mt-2 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50 overflow-hidden"
                  >
                    <motion.li
                      whileHover={{ x: 3 }}
                      onClick={() => handleLangChange("en")}
                      className="px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-[var(--color-primary)] cursor-pointer flex items-center gap-2 transition-colors font-medium"
                    >
                      <span>🇬🇧</span> English
                    </motion.li>
                    <motion.li
                      whileHover={{ x: 3 }}
                      onClick={() => handleLangChange("ar")}
                      className="px-4 py-2 text-sm text-slate-700 hover:bg-amber-50 hover:text-[var(--color-primary)] cursor-pointer flex items-center gap-2 transition-colors font-medium"
                    >
                      <span>🇸🇦</span> العربية
                    </motion.li>
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Notification Icon */}
            <motion.button 
              whileHover={{ scale: 1.05, rotate: 8 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="w-10 h-10 border border-[#CDD5DF] hover:border-[#94A3B8] hover:bg-slate-50 rounded-[4px] flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Notifications"
            >
              <img src="/images/icons/notification.svg" alt="Notification" className="w-5 h-5" />
            </motion.button>
          </div>

          {/* Vertical Divider */}
          <div className="flex items-center">
            <hr className="w-[1.2px] h-8 bg-[#E2E8EF] border-0" />
          </div>

          {/* User Info with Loading Skeleton */}
          <div className="flex items-center gap-3">
            {loading ? (
              <div className="flex items-center gap-3 animate-pulse">
                <div className="w-10 h-10 rounded-full bg-slate-200 animate-shimmer shrink-0" />
                <div className="hidden lg1:block space-y-1.5">
                  <div className="w-24 h-3.5 bg-slate-200 rounded-md animate-shimmer" />
                  <div className="w-16 h-3 bg-slate-100 rounded-md animate-shimmer" />
                </div>
              </div>
            ) : (
              <>
                {user?.image ? (
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.15 }}
                    src={`https://api.zetime.co/storage/${user?.image}`}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-2xs cursor-pointer"
                  />
                ) : (
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="w-10 h-10 rounded-full bg-amber-100 text-[var(--color-primary)] flex items-center justify-center font-bold text-sm border border-amber-200 cursor-pointer shadow-2xs"
                  >
                    {user?.firstname ? user.firstname.charAt(0).toUpperCase() : 'Z'}
                  </motion.div>
                )}
                <div className="hidden lg1:block">
                  <p className="text-[#364152] text-sm font-semibold leading-tight">{user?.firstname || 'Zetime User'}</p>
                  <p className="text-[#697586] text-xs font-normal">{user?.designation?.name || 'Administrator'}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.header>

      <ServiceToggle openServiceToggle={openServiceToggle} setOpenServiceToggle={setOpenServiceToggle}/>
    </>
  );
}

export default Navbar;
