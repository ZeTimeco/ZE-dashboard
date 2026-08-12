"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function Filter() {
    const [activeTab, setActiveTab] = useState('day');
  
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

  return (
    <div className="w-full border border-[#E3E8EF] bg-[#EEF2F6] grid grid-cols-4 gap-3 p-3 rounded-[3px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex justify-center items-center h-[45px] px-1 py-3 cursor-pointer rounded-[3px] transition-colors duration-200 ${
            tab.id === activeTab
              ? "bg-[var(--color-primary)]"
              : ""
          }`}
        >
          <span
            className={`text-base transition-colors duration-200 ${
              tab.id === activeTab
                ? "text-white font-medium"
                : "text-[#0B0E11] font-normal"
            }`}
          >
            {tab.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export default Filter;