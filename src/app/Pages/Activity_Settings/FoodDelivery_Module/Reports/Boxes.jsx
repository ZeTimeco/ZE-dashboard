'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function Boxes() {
    const {t} = useTranslation()
    const { getReport } = useSelector((state) => state.setting)

    const kpiConfig = {
      total_sales: {
        label: "Total sales",
        icon: "/images/icons/dollar_blue.svg",
        bg: "bg-[#EDE7FD]",
      },

      order_count: {
        label: "Number of requests",
        icon: "/images/icons/square-green.svg",
        bg: "bg-[#DCFAE6]",
      },

      customer_count: {
        label: "Number of customers",
        icon: "/images/icons/user-group-brown.svg",
        bg: "bg-[#FFFAEB]",
      },

      avg_rating: {
        label: "Average rating",
        icon: "/images/icons/auto-conversations_brown.svg",
        bg: "bg-[#F9F5E8]",
      },
    };

  return (
    <div>
      <p className='text-[#364152] text-base font-semibold mt-2 mb-4 flex items-center gap-2'>
        <span className="w-2 h-2 rounded-full bg-primary"></span>
        {t('Key indicators')}
      </p>
      {/* main box */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {getReport?.kpis?.map((kpi, index) => {
          const config = kpiConfig[kpi.key];

          return (
            <motion.div
              key={kpi.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              whileHover={{ y: -4, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.08)' }}
              className="group border border-[#CDD5DF] hover:border-primary rounded-3px p-4 bg-white transition-all duration-300 relative overflow-hidden"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 flex justify-center items-center rounded-3px ${config?.bg || 'bg-gray-100'} group-hover:scale-110 transition-transform duration-300 shadow-2xs`}
                >
                  <img
                    src={config?.icon}
                    alt=""
                    className="w-5 h-5 object-contain"
                  />
                </div>

                <p className="text-[#4B5565] text-sm font-medium group-hover:text-[#0B0E11] transition-colors">
                  {t(config?.label || kpi?.label)}
                </p>
              </div>

              <p className="text-xl font-bold text-[#202939] mt-3.5 flex items-baseline gap-1">
                <span>{kpi?.value?.toLocaleString?.() ?? kpi?.value}</span>

                {kpi?.unit && (
                  <span className="text-xs font-semibold text-[#697586] bg-gray-100 px-2 py-0.5 rounded-3px ms-1">
                    {t("pound")}
                  </span>
                )}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  )
}

export default Boxes