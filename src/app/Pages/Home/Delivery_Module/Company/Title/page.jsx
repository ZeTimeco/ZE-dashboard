'use client';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';



function TitlePage({getCompanyDashboard}) {
  const {t} = useTranslation();
  const getCompanyDashboardProvider = getCompanyDashboard?.provider
    
  const isActive = getCompanyDashboardProvider?.is_active ;




  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10'>
        <div>
          <div className='flex items-center gap-2 mb-1.5'>
            <h1 className='text-[#364152] text-2xl font-medium '>
              {getCompanyDashboardProvider?.company_name || "Company Name "}
            </h1>
          </div>
          <p className="text-[#686868] text-lg font-normal flex items-center gap-2">
            <span
              className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            />

            {isActive ? "نشطة" : "غير نشطة"}
          </p>
        </div>

      </div>
    </>
  )
}

export default TitlePage
