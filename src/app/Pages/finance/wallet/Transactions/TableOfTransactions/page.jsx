"use client"
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import Pagination from './Pagination';
import DeleteDialogPage from './DeleteDialog/page';
import { CircularProgress } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTransactionThunk } from '@/redux/slice/Finance/FinanceSlice';

function TableOfTransactionsPage({WalletTransactionsData ,loading ,error, currentPage, totalPages, handlePageChange, activeTab, setActiveTab }) {
    const {t , i18n } = useTranslation()
    
    // Using passed activeTab state instead of local state active
    const active = activeTab;
    const setActive = setActiveTab;

    // Filter transactions: Using pre-filtered data from server
    const filteredTransactions = WalletTransactionsData;

    const StatusRender = (Status) => {
      switch (Status) {
        case "completed": // مقبولة 
          return (
            <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
              <div className='py-1.5 px-3 flex items-center gap-1'>
                <img src="/images/icons/Active Status.svg" alt="" className='mt-0.5' />
                <span>{t('Acceptable')}</span>
              </div>
            </div>
          );
        case "pending":// قيد المراجعة
          return (
            <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
              <div className='py-1.5 px-3 flex items-center gap-1'>
                <img src="/images/icons/Under review.svg" alt="" className='mt-0.5' />
                <span>{t('Under review')}</span>
              </div>
            </div>
          );
        case "rejected": // مرفوضة
          return (
            <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]'>
              <div className='py-1.5 px-3 flex items-center gap-1'>
                <img src="/images/icons/refused Status.svg" alt="" className='mt-0.5'/>
                <span>{t('rejected')}</span>
              </div>
            </div>
          );
        default:
          return null;
      }
    };

    const dispatch = useDispatch();
    const [open , setOpen] = useState(false)
    const [selectedTransactionId, setSelectedTransactionId] = useState(null)

    const handleDelete = (transactionId) => {
      dispatch(deleteTransactionThunk(transactionId))
    }

    const formatDateTimeByLang = (dateString, lang) => {
      if (!dateString) return "";

      const date = new Date(dateString);
      const isArabic = lang === "ar";
      const datePart = new Intl.DateTimeFormat(
        isArabic ? "ar-EG" : "en-US",
        {
          day: "numeric",
          month: isArabic ? "long" : "short",
          year: "numeric",
        }
      ).format(date);
      const timePart = new Intl.DateTimeFormat(
        isArabic ? "ar-EG" : "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }
      ).format(date);
      return isArabic
        ? `${datePart} : ${timePart}`
        : `${datePart} - ${timePart}`;
    };

  return (
    <>
      {/* title and filter */}
      <div className='flex justify-between items-center flex-wrap gap-4'>
        <div className='flex items-center gap-3'>
          <p className='w-12 h-12 flex justify-center items-center bg-[#EDE7FD] rounded-[3px] shrink-0'>
            <img src="/images/icons/Transactions.svg" alt="" className='w-6 h-6' />
          </p>
          <div>
            <p className='text-[#364152] text-xl font-medium'>{t('Withdrawal transactions')}</p>
            <p className='text-[#697586] text-base font-light'>{t('Track withdrawals and easily check their status.')}</p>
          </div>
        </div>

        <div className="flex bg-[#EEF2F6] rounded-[3px] p-1.5 w-[361px]">
          {/* مكتملة */}
          <button
            onClick={() => setActive("completed")}
            className={`relative px-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors w-full cursor-pointer z-10
              ${
                active === "completed"
                  ? "text-white"
                  : "text-[#364152] hover:text-black"
              }`}
          >
            {active === "completed" && (
              <motion.div
                layoutId="walletActiveTabPill"
                className="absolute inset-0 bg-[#D1AD44] rounded-[3px] shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t('Complete')}
          </button>

          {/* قيد المراجعة */}
          <button
            onClick={() => setActive("review")}
            className={`relative px-2 py-2.5 rounded-[3px] text-sm font-medium transition-colors w-full cursor-pointer z-10
              ${
                active === "review"
                  ? "text-white"
                  : "text-[#364152] hover:text-black"
              }`}
          >
            {active === "review" && (
              <motion.div
                layoutId="walletActiveTabPill"
                className="absolute inset-0 bg-[#D1AD44] rounded-[3px] shadow-xs -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t('Under review')}
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
              <th className="p-4 font-normal">{t("the date")}/{t("the time")}</th>
              <th className="p-4 font-normal">{t("Amount paid")}</th>
              <th className="p-4 font-normal">{t("Status")}</th>
              {active === "review" && <th className="p-4 font-normal ">{t("procedures")}</th>}
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={active === "review" ? 5 : 4} className="text-center py-10">
                  <CircularProgress size="3rem" color="warning" />
                </td>
              </tr>
            ) : filteredTransactions?.length > 0 ? (
              filteredTransactions.map((finance, index) => (
                <motion.tr
                  key={finance?.id || index}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.04, 0.3) }}
                  className="hover:bg-[#F9F5E8] border-y border-[#E3E8EF] font-normal text-sm text-[#697586] transition-colors cursor-pointer"
                >
                  <td className="p-4 font-medium text-[#364152]">{finance?.id}</td>
                  <td className="p-4">{formatDateTimeByLang(finance?.created_at, i18n.language)}</td>
                  <td className="p-4 font-medium text-[#364152]">{finance?.amount}</td>
                  <td className='p-4'>
                    {StatusRender(finance?.status)}
                  </td>
                  {active === "review" && (
                    <td className='py-4 px-4'>
                      <motion.div 
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className="cursor-pointer inline-block"
                        onClick={() => {
                          setSelectedTransactionId(finance?.id)
                          setOpen(true)
                        }}
                      >
                        <img src="/images/icons/delete-darkRed.svg" alt="delete" className="w-5 h-5" />
                      </motion.div>
                    </td>
                  )}
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan={active === "review" ? 5 : 4} className="text-center py-10 text-[#697586]">
                  {t('No transactions found for the selected status')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <DeleteDialogPage 
        open={open}
        setOpen={setOpen}
        transactionId={selectedTransactionId}
        onDelete={handleDelete}
      />
    </>
  )
}

export default TableOfTransactionsPage