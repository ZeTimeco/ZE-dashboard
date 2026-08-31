
"use client";
import { CircularProgress } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function TableOfTransactionsPage({TransactionsData ,loading}) {
  const { t, i18n } = useTranslation();
  const formatDateTimeByLang = (dateString, lang) => {
    if (!dateString) return ""
    const date = new Date(dateString.replace(" ", "T"));
    const isArabic = lang === "ar";
    const formatter = new Intl.DateTimeFormat(
      isArabic ? "ar-EG" : "en-US",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }
    );
    const formatted = formatter.format(date);
    return isArabic
      ? formatted.replace("،", " :")
      : formatted.replace(",", " :");
  };

  const StatusRender = (Status) => {
    switch (Status) {
      case "paid": // محصل 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex items-center gap-1'>
              <img src="/images/icons/Active Status.svg" alt="" className='mt-0.5' />
              <span>{t('paid')}</span>
            </div>
          </div>
        );
      case "refunded":// مسترد
        return (
          <div className='bg-[#EDE7FD] border border-[#713DEC] text-[#713DEC] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex items-center gap-1'>
              <img src="/images/icons/refunded.svg" alt="" className='mt-0.5' />
              <span>{t('refunded')}</span>
            </div>
          </div>
        );
      case "pending": // مغلق
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex items-center gap-1'>
              <img src="/images/icons/refused Status.svg" alt="" className='mt-0.5'/>
              <span>{t('pending_finance')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const paymentMethod = (method) => {
    switch (method) {
      case "cash": // نقدي  
        return (
          <div className='bg-[#F9F5E8] border border-[var(--color-primary)] text-[var(--color-primary)] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex items-center gap-1'>
              <img src="/images/icons/cash_yellow.svg" alt="" className='mt-0.5' />
              <span>{t('cash_')}</span>
            </div>
          </div>
        );
      case "card": // بطاقة 
        return (
          <div className='bg-[#F8FAFC] border border-[#697586] text-[#697586] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
            <div className='py-1.5 px-3 flex items-center gap-1'>
              <img src="/images/icons/credit-card.svg" alt="" className='mt-0.5' />
              <span>{t('card')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-8 mb-5 rounded-[3px] border border-[#E3E8EF] overflow-x-auto shadow-xs">
      <table className="min-w-[1000px] lg1:w-full border border-[#E3E8EF] text-sm text-right ">
        {/* Table Head */}
        <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#364152] sticky top-0 z-10">
          <tr>
            <th className="p-4 font-normal">{t("Transaction number")}</th>
            <th className="p-4 font-normal">{t("Service name")}</th>
            <th className="p-4 font-normal">{t("Name of the worker")}</th>
            <th className="p-4 font-normal">{t("Customer name")}</th>
            <th className="p-4 font-normal">{t("the date")}/{t("the time")}</th>
            <th className="p-4 font-normal">{t("Amount paid")}</th>
            <th className="p-4 font-normal">{t("payment method")}</th>
            <th className="p-4 font-normal">{t("Status")}</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center py-10">
                <CircularProgress size="3rem" color="warning" />
              </td>
            </tr>
          ) : TransactionsData?.length > 0 ? (
            TransactionsData.map((finance, index) => (
              <motion.tr
                key={finance?.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
                className="hover:bg-[#F9F5E8] border-y border-[#E3E8EF] font-normal text-sm text-[#697586] transition-colors cursor-pointer"
              >
                <td className="p-4 font-medium text-[#364152]">{finance?.id}</td>
                <td className="p-4">{finance?.service?.title}</td>
                <td className="p-4">{finance?.handyman?.firstname} {finance?.handyman?.lastname}</td>
                <td className="p-4">{finance?.user?.firstname} {finance?.user?.lastname}</td>
                <td className="p-4">
                  {formatDateTimeByLang(finance?.created_at, i18n.language)}
                </td>
                <td className="p-4 font-medium text-[#364152]">{finance?.amount}{finance?.currency}</td>
                <td className="p-4">
                  {paymentMethod(finance?.payment_method)}
                </td>
                <td className='p-4'>
                  {StatusRender(finance?.payment_status)}
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center py-10 text-lg font-medium text-[#697586]">
                {t("No data found")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

