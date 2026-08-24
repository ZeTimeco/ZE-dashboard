'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function BestsellingProducts() {
  const { t } = useTranslation()
  const { getReport } = useSelector((state) => state.setting)

  const rankBadgeStyles = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-amber-100 text-amber-700 font-bold border border-amber-300 shadow-2xs'
      case 2:
        return 'bg-slate-200 text-slate-700 font-bold border border-slate-300'
      case 3:
        return 'bg-amber-700/10 text-amber-800 font-bold border border-amber-600/30'
      default:
        return 'bg-[#EEF2F6] text-[#697586] font-medium'
    }
  }

  return (
    <div>
      {getReport?.top_products?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[#364152] text-base font-semibold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            {t('Bestselling products')}
          </p>

          <div className="flex flex-col gap-3">
            {getReport.top_products.map((product, index) => (
              <motion.div
                key={product?.rank || index}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.07 }}
                whileHover={{ scale: 1.01, x: 4 }}
                className="group border border-[#E3E8EF] hover:border-primary/50 p-3.5 rounded-3px flex justify-between items-center bg-white transition-all duration-200 shadow-2xs hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full text-xs flex justify-center items-center ${rankBadgeStyles(product?.rank)} shadow-2xs`}>
                    {product?.rank}
                  </span>

                  <div className="flex flex-col gap-0.5">
                    <p className="text-[#364152] text-sm font-semibold group-hover:text-primary transition-colors">
                      {product?.name}
                    </p>

                    <p className="text-[#697586] text-xs font-normal">
                      {product?.total_orders} {t('to request')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-[#F8FAFC] px-3 py-1.5 rounded-3px border border-slate-100 group-hover:border-primary/20 transition-colors">
                  <p className="text-primary text-sm font-bold">
                    {product?.total_revenue?.toLocaleString?.() ?? product?.total_revenue} <span className="text-xs font-medium">{t('pound')}</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default BestsellingProducts