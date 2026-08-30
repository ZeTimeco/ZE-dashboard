"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slice/Auth/AuthSlice";
import { motion, AnimatePresence } from "framer-motion";

function SidebarProperty({ isSidebarOpen, setIsSidebarOpen }) {
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const pathname = usePathname();

  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    setIsSidebarOpen(false);
    router.push("/Auth/Login");
  };

  // =========================
  // Main Navigation
  // =========================
  const mainNavItems = [
    {
      key: "dashboard",
      path: "/Pages/Home",
      icon: "/images/icons/dashboard.svg",
    },
    {
      key: "Requests",
      path: "/Pages/requests/Property_Module",
      icon: "/images/icons/Requests.svg",
    },
    {
      key: "workers",
      path: "/Pages/workers",
      icon: "/images/icons/workers.svg",
    },
    {
      key: "property rental",
      path: "/Pages/Services",
      icon: "/images/icons/Services.svg",
    },
    {
      key: "Subscription",
      path: "/Pages/Subscription",
      icon: "/images/icons/Subscription.svg",
    },
    {
      key: "conversations",
      path: "/Pages/conversations",
      icon: "/images/icons/conversations.svg",
    },
    {
      key: "Finance",
      path: "/Pages/finance",
      icon: "/images/icons/Finance.svg",
    },
    {
      key: "technical support",
      path: "/Pages/technicalSupport",
      icon: "/images/icons/dashboard.svg",
    },
  ];

  // =========================
  // Settings Navigation
  // =========================
  const settingsNavItems = [
    {
      key: "Activity settings",
      path: "/Pages/Activity_Settings",
      icon: "/images/icons/Activity_settings.svg",
    },
    {
      key: "Settings",
      path: "/Pages/settings",
      icon: "/images/icons/settings.svg",
    },
  ];

  // =========================
  // Active Item
  // =========================
  const isItemActive = (item) =>
    item.path === "/Pages/Home"
      ? pathname === "/" ||
        pathname.startsWith("/Pages/dashboard") ||
        pathname.startsWith("/Pages/Home")
      : pathname.startsWith(item.path);

  // =========================
  // Navigation Item
  // =========================
  const NavItem = ({ item }) => {
    const isActive = isItemActive(item);

    return (
      <motion.li
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.15 }}
      >
        <Link
          href={item.path}
          onClick={() => setIsSidebarOpen(false)}
          className={`flex items-center w-full h-11 px-3 rounded-3px transition-colors duration-150 ${
            isActive
              ? "bg-primary text-white shadow-sm font-semibold"
              : "hover:bg-[#F9F5E8] text-[#364152]"
          }`}
        >
          {open ? (
            <div className="flex items-center w-full">
              <img
                src={item.icon}
                alt=""
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "brightness-0 invert" : ""
                }`}
              />

              <span className="text-sm font-medium leading-none whitespace-nowrap mr-3 flex-1 text-right">
                {t(item.key)}
              </span>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full">
              <img
                src={item.icon}
                alt=""
                className={`w-5 h-5 shrink-0 ${
                  isActive ? "brightness-0 invert" : ""
                }`}
              />
            </div>
          )}
        </Link>
      </motion.li>
    );
  };

  return (
    <motion.aside
      animate={{ width: open ? 280 : 80 }}
      transition={{
        duration: 0.25,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={`
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full lg1:translate-x-0"}
        lg1:flex flex-col h-screen border-x border-[#E3E8EF] pt-4 pb-4
        bg-white fixed lg1:static z-50 top-0 right-0 shadow-lg lg1:shadow-none
        select-none overflow-hidden transition-transform duration-300 ease-in-out
      `}
    >
      {/* =========================
          Logo + Collapse Toggle
      ========================= */}
      <div className="flex items-center justify-between px-4 mb-6 relative">
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="full-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-2 items-center"
            >
              <img
                src="/images/Logo.svg"
                alt="Zetime Logo"
                className="h-7"
              />

              <img
                src="/images/LogoText.svg"
                alt="Zetime"
                className="h-5"
              />
            </motion.div>
          ) : (
            <motion.div
              key="mini-logo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex items-center mx-auto"
            >
              <img
                src="/images/Logo.svg"
                alt="Zetime Logo"
                className="h-7"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapse */}
        {open && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              if (window.innerWidth >= 1340) {
                setOpen(false);
              }
            }}
            className="w-7 h-7 flex items-center justify-center rounded-full border border-[#E3E8EF] bg-white text-[#697586] hover:bg-[#F9F5E8] transition-colors cursor-pointer focus:outline-none shrink-0"
            aria-label="Collapse sidebar"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M7.5 2L3.5 6L7.5 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}

        {/* Expand */}
        {!open && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="absolute -left-1 top-0 w-7 h-7 flex items-center justify-center rounded-full border border-[#E3E8EF] bg-white text-[#697586] hover:bg-[#F9F5E8] transition-colors cursor-pointer focus:outline-none"
            aria-label="Expand sidebar"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4.5 2L8.5 6L4.5 10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.button>
        )}
      </div>

      {/* =========================
          Navigation
      ========================= */}
      <nav className="flex-1 overflow-y-auto no-scrollbar px-3 flex flex-col gap-4">

        {/* =========================
            MAIN
        ========================= */}
        <div className="flex flex-col gap-1">
          {open && (
            <p className="text-[10px] font-semibold tracking-widest text-[#9AA4B2] uppercase px-1 mb-1 text-right">
              MAIN
            </p>
          )}

          <ul className="flex flex-col gap-1">
            {mainNavItems.map((item) => (
              <NavItem
                key={item.key}
                item={item}
              />
            ))}
          </ul>
        </div>

        {/* =========================
            SETTINGS
        ========================= */}
        <div className="flex flex-col gap-1">
          {open && (
            <p className="text-[10px] font-semibold tracking-widest text-[#9AA4B2] uppercase px-1 mb-1 text-right">
              {t("Settings")}
            </p>
          )}

          <ul className="flex flex-col gap-1">
            {settingsNavItems.map((item) => (
              <NavItem
                key={item.key}
                item={item}
              />
            ))}
          </ul>
        </div>

        {/* =========================
            Sign Out
        ========================= */}
        <div className="mt-auto pt-2 border-t border-[#E3E8EF]">
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="flex items-center w-full h-11 px-3 rounded-3px hover:bg-red-50 text-[#D92D20] transition-colors cursor-pointer focus:outline-none"
          >
            {open ? (
              <div className="flex items-center w-full">
                <img
                  src="/images/icons/signout.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />

                <span className="text-sm font-medium leading-none whitespace-nowrap mr-3 flex-1 text-right">
                  {t("Sign out")}
                </span>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full">
                <img
                  src="/images/icons/signout.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
              </div>
            )}
          </motion.button>
        </div>

      </nav>
    </motion.aside>
  );
}

export default SidebarProperty;
