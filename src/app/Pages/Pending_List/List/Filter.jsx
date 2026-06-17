"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

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
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            rounded-full h-12.5 cursor-pointer border
            ${
              activeTab === tab.id
                ? 'border-[var(--color-primary)] bg-[#F9F5E8] text-[var(--color-primary)]'
                : 'border-gray-300 bg-white text-gray-500'
            }
          `}
        >
          <p>{tab.label}</p>
        </button>
      ))}
    </div>

    </>
  )
}

export default Filter