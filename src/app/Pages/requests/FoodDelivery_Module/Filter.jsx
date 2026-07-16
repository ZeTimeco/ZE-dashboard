"use client";
import React from "react";
import { useTranslation } from "react-i18next";

function Filter({ activeTab, setActiveTab }) {
  const {t} = useTranslation()

  const tabs = [
  {
    id: "new",
    label: t("new"),
    active: ["new"],
  },
  {
    id: "preparing",
    label: t("Under preparation"),
    active: ["Under preparation"],
  },
  {
    id: "ready",
    label: t("ready"),
    active: ["ready"],
  },
  {
    id: "delivering",
    label: t("For delivery"),
    active: ["For delivery"],
  },
];
  return (
    <div className="w-[70%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-4 gap-6 p-2 rounded-[3px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex justify-center gap-1 p-4 cursor-pointer ${
            tab.id === activeTab
              ? "bg-[var(--color-primary)] text-white rounded-[3px]"
              : ""
          }`}
        >
          <span
            className={`text-base font-normal ${
              tab.id === activeTab
                ? "text-white"
                : "text-[#4B5565]"
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