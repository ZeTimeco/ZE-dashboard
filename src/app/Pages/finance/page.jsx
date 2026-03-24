"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
        <div className="flex justify-center border-b border-gray-200 gap-1 w-full">
          {menuItems.map((item) => {
            const isActive = selectedMenu === item.Label
            return (
              <button
                key={item.Label}
                onClick={() => setSelectedMenu(item.Label)}
                className={`flex items-center justify-center w-full gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                    : 'border-transparent text-[#4B5565] '
                }`}
              >
                {t(item.nameKey)}
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div>
          {selectedMenu === 'Overview' && <OverviewPage />}
          {selectedMenu === 'Taxes' && <TaxesPage />}
          {selectedMenu === 'wallet' && <WalletPage />}
        </div>
      </div>
    </MainLayout>
  )
}

export default FinancePage