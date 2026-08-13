'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function DeliverySystem({formData , setFormData}) {
  const { t } = useTranslation();
  

  const inputClassName = "w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2";

  const getCardStyle = (cardStatus) => {
    return formData?.delivery_type === cardStatus
      ? "border-[var(--color-primary)] bg-[#FFFDF5]"
      : "border-[#E3E8EF] bg-white";
  };
  return (
    <>

  <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4 rounded-[3px] flex flex-col gap-4">
      {/* Header */}
      <div className="flex gap-2">
        <p>
          <img
            src="/images/icons/delivery-truck-yellow.svg"
            alt=""
          />
        </p>

        <div className="flex flex-col gap-1">
          <span className="text-[#364152] text-base font-medium">
            {t("Delivery system")}
          </span>

          <span className="text-[#697586] text-sm font-normal">
            {t("Choose a delivery management method")}
          </span>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-2 gap-4">
        {/* Platform delivery */}
        <div
          onClick={() => setFormData((prev)=>({
                ...prev,
                delivery_type:'platform'
              }))}
          className={`flex gap-4 border rounded-[3px] py-2 px-3 w-full cursor-pointer transition-all duration-200 ${getCardStyle("platform")}`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="bookingStatus"
              checked={formData?.delivery_type === "platform"}
              onChange={() => setFormData((prev)=>({
                ...prev,
                delivery_type:'platform'
              }))}
              className={inputClassName}
            />
          </div>

          <div>
            <p className="text-[#364152] text-base font-normal">
              {t("Platform delivery")}
            </p>

            <p className="text-[#4B5565] text-sm font-normal">
              {t("Using external delivery platform drivers")}
            </p>
          </div>
        </div>

        {/* Self-connection */}
        <div
          onClick={() => setFormData((prev)=>({
                ...prev,
                delivery_type:'self'
              }))}
          className={`flex gap-4 border rounded-[3px] py-2 px-3 w-full cursor-pointer transition-all duration-200 ${getCardStyle("self")}`}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="bookingStatus"
              checked={formData?.delivery_type === "self"}
              onChange={() => setFormData((prev)=>({
                ...prev,
                delivery_type:'self'
              }))}
              className={inputClassName}
            />
          </div>

          <div>
            <p className="text-[#364152] text-base font-normal">
              {t("Self-connection")}
            </p>

            <p className="text-[#4B5565] text-sm font-normal">
              {t("Managing the restaurant delivery team")}
            </p>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default DeliverySystem