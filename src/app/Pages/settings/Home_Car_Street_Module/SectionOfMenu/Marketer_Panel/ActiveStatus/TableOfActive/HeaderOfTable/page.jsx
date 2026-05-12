"use client"
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function HeaderOfTablePage({ activeTab, setActiveTab }) {
  const { t } = useTranslation();

  return (
    <>
  {/* title and filter */}
<div className="flex justify-between mb-6">
  <div className="flex   gap-1">
    <p className="w-12 h-12 flex justify-center items-center bg-[#EDE7FD] rounded-[3px]">
      <img
        src="/images/icons/Transactions.svg"
        alt="transactions"
        className="w-6 h-6"
      />
    </p>

    <div>
      <p className="text-[#364152] text-xl font-medium">
      {t('Withdrawal transactions')}
      </p>
      <p className="text-[#697586] text-base font-light">
        {t('Track withdrawals and easily check their status.')}
      </p>
    </div>
  </div>

  {/* filter buttons (controlled) */}
  <div className="flex bg-[#EEF2F6] rounded-[3px] p-1.5 w-[299px] h-14">
    <button
      onClick={() => setActiveTab('complete')}
      className={`px-2 py-3 rounded-[3px] text-sm font-medium w-full transition-all duration-200 ${
        activeTab === 'complete'
          ? 'bg-[#D1AD44] text-white shadow'
          : 'text-[#364152] cursor-pointer'
      }`}
    >
      {t('Complete')}
    </button>

    <button
      onClick={() => setActiveTab('under_review')}
      className={`px-2 py-3 rounded-[3px] text-sm font-medium w-full transition-all duration-200 ${
        activeTab === 'under_review'
          ? 'bg-[#D1AD44] text-white shadow'
          : 'text-[#364152] cursor-pointer'
      }`}
    >
      {t('Under review')}
    </button>
  </div>
</div>


    </>
  )
}

export default HeaderOfTablePage