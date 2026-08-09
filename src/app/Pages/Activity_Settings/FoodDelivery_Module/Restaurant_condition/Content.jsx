import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import BusyDialog from "./Dialog/BusyDialog";
import ClosedDialog from "./Dialog/ClosedDialog";
import OpenDialog from "./Dialog/OpenDialog";

function Content() {
  const { t } = useTranslation();

  const [selectedStatus, setSelectedStatus] = useState("open");
  const [activeDialog, setActiveDialog] = useState(null);

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
    setSelectedStatus(key);
    setActiveDialog(key);
  };

  return (
    <>
      <div className="space-y-3">
        {statusOptions.map((item) => (
          <div
            key={item.key}
            onClick={() => handleStatusClick(item.key)}
            className={`cursor-pointer rounded-[3px] border p-4 transition-all duration-200 ${
              selectedStatus === item.key
                ? `${item.borderColor} ${item.bg}`
                : "border-[#E3E8EF]"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-[3px] transition-all duration-200 ${
                    selectedStatus === item.key
                      ? "bg-white"
                      : item.iconBg
                  }`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="h-6 w-6"
                  />
                </div>

                <div>
                  <p className="font-medium text-[#364152]">
                    {item.title}
                  </p>

                  <p className="mt-1 text-base text-[#4B5565]">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="rounded-[3px] border border-[#48A1FF] bg-[#EFF6FF] p-3 text-base text-[#364152]">
          {t(
            "Changing the restaurant's status will affect your app visibility and acceptance of new orders."
          )}
        </div>
      </div>

      {/* Dialogs */}
      <OpenDialog
        open={activeDialog === "open"}
        setOpen={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />

      <BusyDialog
        open={activeDialog === "busy"}
        setOpen={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />

      <ClosedDialog
        open={activeDialog === "closed"}
        setOpen={(open) => {
          if (!open) setActiveDialog(null);
        }}
      />
    </>
  );
}

export default Content;