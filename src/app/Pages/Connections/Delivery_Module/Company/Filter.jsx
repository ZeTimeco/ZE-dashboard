"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import { motion, useReducedMotion } from "framer-motion";

function Filter({ activeTab, setActiveTab }) {
  const { t } = useTranslation();
  const shouldReduceMotion = useReducedMotion();

  const tabs = [
    {
      id: "All",
      label: t("All"),
      active: ["All"],
    },
    {
      id: "active",
      label: t("active"),
      active: ["active"],
    },
    {
      id: "Complete",
      label: t("Complete"),
      active: ["Complete"],
    },
  ];

  return (
    <div className="lg1:w-[50%] w-full border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-3 gap-2 sm:gap-6 p-2 rounded-[3px] shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <motion.button
            key={tab.id}
            type="button"
            whileHover={!isActive && !shouldReduceMotion ? { scale: 1.01 } : {}}
            whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`relative flex justify-center items-center gap-1 p-3.5 sm:p-4 cursor-pointer rounded-3px transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
              !isActive ? "hover:bg-white/80 hover:text-[#364152]" : ""
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="foodDeliveryFilterTab"
                className="absolute inset-0 bg-primary rounded-3px shadow-xs"
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { type: "spring", stiffness: 450, damping: 35 }
                }
              />
            )}
            <span
              className={`relative z-10 text-base select-none transition-colors duration-200 ${
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