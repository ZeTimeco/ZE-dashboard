'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import OptionsPage from './Options/page'
import AdditionsPage from './Additions/page'
import { motion, AnimatePresence } from 'framer-motion'

function AddOns_Options() {
  const {t} = useTranslation()
  const [activeTab, setActiveTab] = useState('Options')
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className='text-[#364152] text-2xl font-medium mb-10'>{t('Add-ons and Options')}</p>
        <div className='lg1:w-[40%] w-[60%] border border-[#E3E8EF] bg-[#F8FAFC] grid grid-cols-2 gap-2 sm:gap-6 p-2 rounded-[3px]'> 
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('Options')}
            className={`relative flex justify-center items-center gap-1 p-4 cursor-pointer rounded-[3px] transition-colors duration-200 ${
              activeTab !== 'Options' ? "hover:bg-white/60" : ""
            }`}
          >
            {activeTab === 'Options' && (
              <motion.div
                layoutId="addOnsActiveTab"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-[3px]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span 
              className={`relative z-10 text-xl font-normal transition-colors duration-200 ${
                activeTab === 'Options' ? 'text-white font-medium' : 'text-[#364152]'
              }`}
            >
              {t('Options')}
            </span>
          </motion.button>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('Additions')}
            className={`relative flex justify-center items-center gap-1 p-4 cursor-pointer rounded-[3px] transition-colors duration-200 ${
              activeTab !== 'Additions' ? "hover:bg-white/60" : ""
            }`}
          >
            {activeTab === 'Additions' && (
              <motion.div
                layoutId="addOnsActiveTab"
                className="absolute inset-0 bg-[var(--color-primary)] rounded-[3px]"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span 
              className={`relative z-10 text-xl font-normal transition-colors duration-200 ${
                activeTab === 'Additions' ? 'text-white font-medium' : 'text-[#364152]'
              }`}
            >
              {t('Additions')}
            </span>
          </motion.button>
        </div>

        {/* Content */}
        <div className='mt-10'>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'Options' && <OptionsPage />}
              {activeTab === 'Additions' && <AdditionsPage />}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </MainLayout>
  )
}

export default AddOns_Options