"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function AcceptingApplications({formData , setFormData}) {
  const { t } = useTranslation();


  const inputClassName ="w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  const getCardStyle = (cardStatus) => {
    return formData?.order_acceptance_mode === cardStatus
      ? "border-[var(--color-primary)] bg-[#FFFDF5]"
      : "border-[#E3E8EF] bg-white";
  };

  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px] flex flex-col gap-4">
      {/* Header */}
      <div className="">

        <div className="flex flex-col">
          <span className="text-[#364152] text-base font-medium">
            {t("Accepting applications")}
          </span>

          <span className="text-[#697586] text-sm font-normal">
            {t("How to accept incoming applications")}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {/* Automatic acceptance */}
        <div
          onClick={() =>setFormData((prev)=>({
                ...prev,
                order_acceptance_mode:'auto'
              }))}
          className={`flex gap-4 border rounded-[3px] py-2 px-3 w-full cursor-pointer transition-all duration-200 ${getCardStyle("auto")}`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="bookingStatus"
              checked={formData?.order_acceptance_mode ==='auto'}
              onChange={() =>
                setFormData((prev)=>({
                ...prev,
                order_acceptance_mode:'auto'
              }))}
              className={inputClassName}
            />
          </div>

          <div>
            <p className="text-[#364152] text-base font-normal">
              {t("Automatic acceptance")}
            </p>

            <p className="text-[#4B5565] text-sm font-normal">
              {t("All orders are automatically accepted upon arrival")}
            </p>
          </div>
        </div>

        {/* manual acceptance */}
        <div
          onClick={() =>setFormData((prev)=>({
                ...prev,
                order_acceptance_mode:'manual'
              }))}
          className={`flex gap-4 border rounded-[3px] py-2 px-3 w-full cursor-pointer transition-all duration-200 ${getCardStyle("manual")}`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="bookingStatus"
              checked={formData?.order_acceptance_mode === 'manual'}
              onChange={() =>setFormData((prev)=>({
                ...prev,
                order_acceptance_mode:'manual'
              }))}
              className={inputClassName}
            />
          </div>

          <div>
            <p className="text-[#364152] text-base font-normal">
              {t("manual acceptance")}
            </p>

            <p className="text-[#4B5565] text-sm font-normal">
              {t("Manual approval is required for each new application.")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcceptingApplications;

