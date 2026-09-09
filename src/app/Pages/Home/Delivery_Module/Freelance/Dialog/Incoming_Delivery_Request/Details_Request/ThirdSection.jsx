'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function ThirdSection() {
  const { t } = useTranslation()

  const [price, setPrice] = useState('')

  const prices = [25, 50, 75, 100]

  const handlePriceClick = (value) => {
    setPrice(String(value))
  }

  return (
    <>
    <motion.div 
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className="rounded-3px p-3.5 shadow-[0_0_6px_0_rgba(0,0,0,0.12)] hover:shadow-[0_3px_12px_0_rgba(0,0,0,0.10)] border border-[#E3E8EF]/60 transition-all duration-200 bg-white"
    >
      <p className="text-base font-medium text-[#364152]">
        {t('Submit a price quote')}
      </p>

      {/* Input */}
      <div className="mt-2">
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder={t('Enter your price')}
          className="h-14 w-full rounded-3px border border-[#C7C7C7] hover:border-[#A1A1A1] px-4 text-sm text-[#364152] outline-none transition-all duration-200 focus:border-[#D5A900] focus:ring-4 focus:ring-[#D5A900]/15 placeholder:text-[#9AA4B2]"
        />
      </div>

      {/* Quick prices */}
      <div className="mt-4 grid w-full grid-cols-4 gap-4">
        {prices.map((value) => {
          const isSelected = price === String(value)

          return (
            <motion.button
              key={value}
              type="button"
              onClick={() => handlePriceClick(value)}
              whileHover={{ scale: isSelected ? 1.02 : 1.02, y: -1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                scale: isSelected ? 1.02 : 1,
              }}
              transition={{
                duration: 0.18,
              }}
              className={`h-12.5 w-full cursor-pointer rounded-3px border p-4 text-sm transition-all duration-200 flex items-center justify-center
                          ${
                            isSelected
                              ? 'border-[#D5A900] bg-[#FFF8DC] text-[#D5A900] font-semibold shadow-xs'
                              : 'border-[#C7C7C7] text-[#787878] hover:border-[#D5A900] hover:bg-[#FFFDF3] hover:text-[#A88200] font-normal'
                          }
              `}
            >
              {value}
            </motion.button>
          )
        })}
      </div>
    </motion.div>
    </>
  )
}

export default ThirdSection