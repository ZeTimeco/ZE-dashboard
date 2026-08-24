"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getReportThunk } from "@/redux/slice/Setting/SettingSlice";
import { motion } from "framer-motion";

function Filter() {
  const [activeTab, setActiveTab] = useState('day');
  const dispatch = useDispatch();
  
  const { t } = useTranslation();

  const tabs = [
    {
      id: "day",
      label: t("day"),
    },
    {
      id: "week",
      label: t("week"),
    },
    {
      id: "month",
      label: t("month"),
    },
    {
      id: "year",
      label: t("year"),
    },
  ];

  useEffect(() => {
    dispatch(getReportThunk(activeTab));
  }, [dispatch, activeTab]);

  return (
    <div className="w-full border border-[#E3E8EF] bg-[#EEF2F6] grid grid-cols-4 gap-3 p-2.5 rounded-3px shadow-inner">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab(tab.id)}
          className={`relative flex justify-center items-center h-11 px-2 py-3 cursor-pointer rounded-3px transition-all duration-300 font-medium ${
            tab.id === activeTab
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "text-[#4B5565] hover:bg-white/70 hover:text-[#0B0E11]"
          }`}
        >
          <span className="text-base font-medium transition-colors duration-200 z-10">
            {tab.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
}

export default Filter;