"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
    <div className="lg1:w-[70%] w-full border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-4 gap-2 sm:gap-6 p-2 rounded-[3px]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex justify-center items-center gap-1 p-4 cursor-pointer rounded-[3px] transition-colors duration-200 ${
              !isActive ? "hover:bg-white/60 hover:text-[#364152]" : ""
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="foodDeliveryFilterTab"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-[3px]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span
              className={`relative z-10 text-base font-normal transition-colors duration-200 ${
                isActive
                  ? "text-white font-medium"
                  : "text-[#4B5565]"
              }`}
            >
              {tab.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}

export default Filter;