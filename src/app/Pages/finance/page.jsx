"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import OverviewPage from './Overview/page'
import TaxesPage from './Taxes/page'
import WalletPage from './wallet/page'

const menuItems = [
  { Label: 'Overview', nameKey: 'Overview' },
  { Label: 'Taxes', nameKey: 'Taxes' },
  { Label: 'wallet', nameKey: 'wallet' },
]

function FinancePage() {
  const { t } = useTranslation()
  const [selectedMenu, setSelectedMenu] = useState('Overview')

  return (
    <MainLayout>
      <div className="flex flex-col gap-4">
        {/* Main Tab Bar */}
        <div className="flex justify-center border-b border-gray-200 gap-1 w-full relative">
          {menuItems.map((item) => {
            const isActive = selectedMenu === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => setSelectedMenu(item.Label)}
                className={`relative flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-[#4B5565] hover:text-[#1D2939]'
                }`}
              >
                <span>{t(item.nameKey)}</span>
                {isActive && (
                  <motion.div
                    layoutId="financeActiveTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div className="mt-2">
          <AnimatePresence mode="wait">
            {selectedMenu === 'Overview' && (
              <motion.div
                key="Overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <OverviewPage />
              </motion.div>
            )}
            {selectedMenu === 'Taxes' && (
              <motion.div
                key="Taxes"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <TaxesPage />
              </motion.div>
            )}
            {selectedMenu === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <WalletPage />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </MainLayout>
  )
}

export default FinancePage