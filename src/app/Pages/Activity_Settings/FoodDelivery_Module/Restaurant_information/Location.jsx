"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MapDialog from "./MapDialog";

function Location({formData , setFormData}) {
  const { t } = useTranslation();
  const [openMap, setOpenMap] = useState(false);
  const [address, setAddress] = useState("");

  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4">
      <p className="text-[#364152] text-base font-normal mb-3">
        {t("the site")}
      </p>

      <div className="w-full flex flex-col gap-1.5">
      
        <div className="relative w-full">
          <input
            type="text"
            readOnly
            value={address}
            placeholder={t("Restaurant address")}
            className="w-full h-15 pl-10 pr-4 py-3 border border-[#CDD5DF] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] text-sm text-[#364152] rounded-[3px] outline-none cursor-pointer"
          />

          
        </div>

        <button
          type="button"
          onClick={() => setOpenMap(true)}
          className="mt-3 flex justify-center items-center gap-2 w-full h-12 text-[var(--color-primary)] border border-[var(--color-primary)] rounded-[3px] cursor-pointer"
        >
          <img
            src="/images/icons/location.svg"
            className="w-5 h-5"
            alt=""
          />
          <span className="text-base font-normal">
            {t("Locate the site on the map")}
          </span>
        </button>
      </div>

      <MapDialog
        open={openMap}
        handleClose={() => setOpenMap(false)}
        onConfirm={(location) => {
          setAddress(location.address);
        }}
      />
    </div>
  );
}

export default Location;