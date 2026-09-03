"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function Filter({activeTab , setActiveTab}) {
  const {t} = useTranslation()

  const tabs = [
    { id: 'coming', label: t('The newcomers') },
    { id: 'waiting', label: t('pending list') },
    { id: 'notified', label: t('Notification given') },
    { id: 'no_show', label: t('He did not attend') },
  ];

  return (
    <>
      <div className='grid grid-cols-4 gap-6'>
        {tabs.map((tab, i) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.06 }}
            whileHover={{
              scale: 1.03,
              boxShadow: activeTab === tab.id
                ? '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.18)'
                : '0 4px 12px 0 rgba(0,0,0,0.08)',
              transition: { duration: 0.18 },
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.12 } }}
            className={`
              rounded-full h-12.5 cursor-pointer border transition-colors duration-200
              ${
                activeTab === tab.id
                  ? 'border-[var(--color-primary)] bg-[#F9F5E8] text-[var(--color-primary)]'
                  : 'border-gray-300 bg-white text-gray-500 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
          >
            <p>{tab.label}</p>
          </motion.button>
        ))}
      </div>
    </>
  )
}

export default Filter