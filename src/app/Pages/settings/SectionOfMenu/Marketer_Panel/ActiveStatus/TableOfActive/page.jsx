"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import HeaderOfTablePage from "./HeaderOfTable/page";
import Pagination from "./Pagination";
import DeleteDialogPage from "./DeleteDialog/page";
import { withdrawsMarketerThunk } from "@/redux/slice/Setting/SettingSlice";
import { useDispatch, useSelector } from "react-redux";

function formatArabicDate(dateString) {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("ar-EG", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const arabicDate = date.toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const amPm = date.toLocaleTimeString("ar-EG", {
    hour: "numeric",
    hour12: true,
  }).includes("ص")
    ? "ص"
    : "م";

  const hour12 = date.toLocaleTimeString("ar-EG", {
    hour: "numeric",
    hour12: true,
  }).replace(/[^0-9]/g, "");

  return `${arabicDate} : ${time}${hour12}${amPm} `;
}

export default function TableOfActivePage({has_subscription , is_marketer}) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const handleClickOpen = (id) => {
    setSelectedId(id);
    setOpen(true);
  };

  const StatusRender = (Status) => {
    switch (Status) {
      case "approved": // مقبولة 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1 px-3 flex items-center gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Acceptable')}</span>
            </div>
          </div>
        );
      case "pending": // قيد المراجعة
        return (
          <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1 px-3 flex items-center gap-1'>
              <img src="/images/icons/Under review.svg" alt="" className='w-4 h-4' />
              <span className='text-xs font-medium'>{t('Under review')}</span>
            </div>
          </div>
        );
      case "rejected": // مرفوضة
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1 px-3 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='w-4 h-4'/>
              <span className='text-xs font-medium'>{t('rejected')}</span>
            </div>
          </div>
        );
      case "cancelled": // ملغيه
        return (
          <div className='bg-[#F2F4F7] border border-[#454647] text-[#475467] w-fit h-8 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1 px-3 flex items-center gap-1'>
              <img src="/images/icons/cancelled Status.svg" alt="" className='w-4 h-4'/>
              <span className='text-xs font-medium'>{t('cancelled')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const dispatch = useDispatch();
  const {withdrawsData, last_page, loading , error}= useSelector((state)=>state.setting)

  const [activeTab, setActiveTab] = useState('complete');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(()=>{
    const status = activeTab === "complete" ? "approved,rejected,cancelled" : "pending";
    dispatch(withdrawsMarketerThunk({ status, page: currentPage }));
  },[dispatch, activeTab, currentPage])

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);

  return (
    <div className="mt-8 mb-5">
      <HeaderOfTablePage activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="rounded-[3px] border border-[#E3E8EF] overflow-x-auto shadow-2xs">
        <table className="lg1:w-full border-collapse text-sm text-right">
          {/* Table Head */}
          <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#364152] sticky top-0 z-10 font-medium">
            <tr>
              <th className="p-4 font-semibold">{t("order number")}</th>
              <th className="py-4 font-semibold">{t("the date")}/{t("the time")}</th>
              <th className="py-4 font-semibold">{t("Status")}</th>
              <th className="py-4 font-semibold text-center">{t('procedures')}</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {withdrawsData
              ?.filter((row) => {
                if (activeTab === "complete") {
                  return row.status !== "pending";
                }
                return row.status === "pending";
              })
              .map((row, index) => (
              <motion.tr
                key={row.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                className="hover:bg-[#F9F5E8] hover:cursor-pointer border-b border-[#E3E8EF] font-normal text-sm text-[#697586] transition-colors"
              >
                <td className="p-4 w-[20%] font-medium text-[#364152]">{row.id}</td>
                <td className="p-4 w-[30%]">{formatArabicDate(row.created_at)}</td>
                <td className='py-4 w-[30%]'>
                  {StatusRender(row.status)}
                </td>
                <td className='py-4 w-[20%] text-center'>
                  <motion.button 
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 cursor-pointer inline-flex justify-center items-center"     
                    onClick={() => handleClickOpen(row.id)}
                  >
                    <img src="/images/icons/delete-darkRed.svg" alt="delete" className="w-5 h-5" />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination totalPages={last_page} currentPage={currentPage} onPageChange={(page) => setCurrentPage(page)} />

      <DeleteDialogPage open={open} setOpen={setOpen} id={selectedId} />
    </div>
  );
}

