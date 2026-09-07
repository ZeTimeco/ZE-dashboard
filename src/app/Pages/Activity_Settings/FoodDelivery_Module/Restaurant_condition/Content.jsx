'use client'
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

import BusyDialog from "./Dialog/BusyDialog";
import ClosedDialog from "./Dialog/ClosedDialog";
import OpenDialog from "./Dialog/OpenDialog";

function Content({ getResturantStatus }) {
  const { t } = useTranslation();

  const [selectedStatus, setSelectedStatus] = useState("");
  const [activeDialog, setActiveDialog] = useState(null);

  useEffect(() => {
    const current = getResturantStatus?.current_status;
    if (current) {
      setSelectedStatus(current);
    }
  }, [getResturantStatus]);

  const statusOptions = [
    {
      key: "open",
      title: t("open"),
      description: t("The restaurant is accepting orders normally."),
      icon: "/images/icons/checkmark-circle-true.svg",
      bg: "bg-[#F6FEF9]",
      borderColor: "border-[#ABEFC6]",
      iconBg: "bg-[#F6FEF9]",
    },
    {
      key: "busy",
      title: t("busy"),
      description: t("Preparation time is longer than usual (30-45 minutes)"),
      icon: "/images/icons/clock-yellow.svg",
      bg: "bg-[#FFFAEB]",
      borderColor: "border-[#FEDF89]",
      iconBg: "bg-[#FFFAEB]",
    },
    {
      key: "closed",
      title: t("closed"),
      description: t("The restaurant is not currently accepting new orders."),
      icon: "/images/icons/cancel-circle-redd.svg",
      bg: "bg-[#FEE4E2]",
      borderColor: "border-[#FDA29B]",
      iconBg: "bg-[#FEE4E2]",
    },
  ];

  const handleStatusClick = (key) => {
    if (key !== selectedStatus) {
      setActiveDialog(key);
    }
  };

  return (
    <>
      <div className="space-y-3">
        {statusOptions.map((item, index) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
            whileHover={{ y: -1, boxShadow: '0 4px 12px rgba(0,0,0,0.06)' }}
            whileTap={{ scale: 0.995 }}
            onClick={() => handleStatusClick(item.key)}
            className={`cursor-pointer rounded-3px border p-4 transition-all duration-200 ${
              selectedStatus === item.key
                ? `${item.borderColor} ${item.bg}`
                : "border-[#E3E8EF] hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[3px] transition-all duration-200 ${
                    selectedStatus === item.key ? "bg-white" : item.iconBg
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6 transition-transform duration-200 group-hover:scale-110"
                  />
                </div>
                <div>
                  <p className="font-medium text-[#364152]">{item.title}</p>
                  <p className="mt-1 text-base text-[#4B5565]">{item.description}</p>
                </div>
              </div>

              {/* Selection indicator */}
              <AnimatePresence>
                {selectedStatus === item.key && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="w-5 h-5 rounded-full border-2 border-primary  flex items-center justify-center "
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-primary " />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="rounded-3px border border-[#48A1FF] bg-[#EFF6FF] p-3 text-base text-[#364152]"
        >
          {t("Changing the restaurant's status will affect your app visibility and acceptance of new orders.")}
        </motion.div>
      </div>

      {/* Dialogs */}
      <OpenDialog
        open={activeDialog === "open"}
        setOpen={(open) => { if (!open) setActiveDialog(null); }}
      />
      <BusyDialog
        open={activeDialog === "busy"}
        setOpen={(open) => { if (!open) setActiveDialog(null); }}
      />
      <ClosedDialog
        open={activeDialog === "closed"}
        setOpen={(open) => { if (!open) setActiveDialog(null); }}
      />
    </>
  );
}

export default Content;

