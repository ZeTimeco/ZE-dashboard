"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useTranslation } from "react-i18next";


// Dynamically import Dialog to avoid SSR
const Dialog = dynamic(() => import("@mui/material/Dialog"), { ssr: false });

function FiltersPage({ open, handleClose}) {
  const { t } = useTranslation();

  const statusOptions =[
    {id:0 , name:t('All') ,  value:'all'},
    {id:1 , name:t('Acceptable') ,  value:'confirmed'},
    {id:2 , name:t('Complete') ,  value:'completed'},
    {id:3 , name:t('Pending') ,  value:'pending'},
    {id:4 , name:t('checked_in') ,  value:'checked_in'},
    {id:5 , name:t('not_attend') ,  value:'not_attend'},
    {id:6 , name:t('cancelled') ,  value:'cancelled'},
  ]

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/*  */}
      <section className="flex justify-between px-6 mt-6">
        <button
          onClick={handleClose}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
        <div className="w-14 h-14 bg-[#EEF2F6] rounded-[100px] flex justify-center items-center">
          <p className="bg-[#E3E8EF] flex items-center justify-center w-10 h-10 rounded-[100px]">
            <img src="/images/icons/FilterGreyicon.svg" alt="" className="w-6 h-6" />
          </p>
        </div>
      </section>

      {/*  */}
      <section className="mt-8 px-6">
        <p className="text-[#364152] text-xl font-medium mb-5">{t("Filter items")}</p>
        <p className="text-[#4B5565] text-sm font-normal mb-5">
          {t("Filter your orders")}
        </p>
      </section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      {/*  */}

      <section className=" p-6 flex gap-3">
        {statusOptions?.map((item ,index )=>(
          <div key={item?.id} className="" >
            <button className=" bg-[#EEF2F6] text-[#4B5565] p-2.5 rounded-full  cursor-pointer">
              <p>{item?.name}</p>
            </button>
          </div>
        ))}
      </section>

      
    </Dialog>
  );
}

export default FiltersPage;
