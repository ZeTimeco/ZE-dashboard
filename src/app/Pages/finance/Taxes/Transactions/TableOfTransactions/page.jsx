"use client"
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

function TableOfTransactionsPage({TaxesTransactionsData , loading}) {
    const {t} = useTranslation()
    const [active, setActive] = useState("Collected");

    // Filter data based on active tab
    const filteredData = TaxesTransactionsData?.filter((item) => {
      if (active === "Collected") {
        return item?.status === "pending";
      } else if (active === "Non-collected") {
        return item?.status === "exported";
      }
      return true;
    }) || [];
  
    const Status = (Status) => {
      switch (Status) {
        case "pending": // محصل  
          return (
            <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
              <div className='py-1.5 px-3 flex items-center gap-1'>
                <img src="/images/icons/true_circle.svg" alt="" className='w-4 h-4 mt-0.5' />
                <span>{t('Collected')}</span>
              </div>
            </div>
          );
        case "exported": // غير محصل 
          return (
            <div className='bg-[#FEE4E2] border border-[#F97066] text-[#F97066] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
              <div className='py-1.5 px-3 flex items-center gap-1'>
                <img src="/images/icons/checkmark-circle-false.svg" alt="" className='w-4 h-4 mt-0.5' />
                <span>{t('Non-collected')}</span>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

  return (
    <>
      {/* title and filter */}
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <div className='flex items-center gap-3'>
          <p className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] rounded-[3px] shrink-0'>
            <img src="/images/icons/tax dueBlue.svg" alt="" className='w-6 h-6' />
          </p>
          <div>
            <p className='text-[#364152] text-xl font-medium'>{t('Estimated taxes on services')}</p>
          </div>
        </div>

        <div className="flex bg-[#EEF2F6] rounded-[3px] p-1.5 w-[361px]">
          {/* Collected */}
          <button
            onClick={() => setActive("Collected")}
            className={`relative px-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors w-full cursor-pointer z-10
              ${
                active === "Collected"
                  ? "text-white"
                  : "text-[#364152] hover:text-black"
              }`}
          >
            {active === "Collected" && (
              <motion.div
                layoutId="taxesActiveTabPill"
                className="absolute inset-0 bg-[#D1AD44] rounded-[3px] shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t('Collected')}
          </button>

          {/* Non-collected */}
          <button
            onClick={() => setActive("Non-collected")}
            className={`relative px-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors w-full cursor-pointer z-10
              ${
                active === "Non-collected"
                  ? "text-white"
                  : "text-[#364152] hover:text-black"
              }`}
          >
            {active === "Non-collected" && (
              <motion.div
                layoutId="taxesActiveTabPill"
                className="absolute inset-0 bg-[#D1AD44] rounded-[3px] shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t('Non-collected')}
          </button>
        </div>
      </div>

      {/* table */}
      <div className="mt-8 mb-5 rounded-[3px] border border-[#E3E8EF] overflow-x-auto shadow-xs">
        <table className="min-w-[1000px] lg1:w-full border border-[#E3E8EF] text-sm text-right ">
          {/* Table Head */}
          <thead className="bg-[#F8FAFC] border-b border-[#E3E8EF] text-[#364152] sticky top-0 z-10">
            <tr>
              <th className="p-4 font-normal">{t("Transaction number")}</th>
              <th className="p-4 font-normal">{t("Booking number")}</th>
              <th className="p-4 font-normal">{t("the date")}/{t("the time")}</th>
              <th className="p-4 font-normal">{t("tax due")} 14%</th>
              <th className="p-4 font-normal">{t("Net Profit")}</th>
              <th className="p-4 font-normal">{t("Status")}</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-10">
                  <CircularProgress size="3rem" color="warning" />
                </td>
              </tr>
            ) : filteredData?.length > 0 ? (
              filteredData.map((finance, index) => (
                <motion.tr
                  key={finance?.service_payment_id || index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
                  className="hover:bg-[#F9F5E8] border-y border-[#E3E8EF] font-normal text-sm text-[#697586] transition-colors cursor-pointer"
                >
                  <td className="p-4 font-medium text-[#364152]">{finance?.service_payment_id}</td>
                  <td className="p-4">{finance?.booking_id}#</td>
                  <td className="p-4">{finance?.created_at}</td>
                  <td className="p-4 font-medium text-[#364152]">{finance?.total_tax}</td>
                  <td className="p-4 font-medium text-[#364152]">{finance?.amount}</td>
                  <td className="p-4">
                    {Status(finance?.status)}
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-10 text-lg font-medium text-[#697586]">
                  {t("No data found")}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default TableOfTransactionsPage