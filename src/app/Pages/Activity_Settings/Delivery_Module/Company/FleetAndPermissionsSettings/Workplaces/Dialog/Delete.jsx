'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

function Delete({ isOpen, onConfirm, onCancel }) {
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isOpen && (
        /* Backdrop */
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onCancel}
        >
          {/* Blur overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

          {/* Dialog card */}
          <motion.div
            className="relative z-10 bg-white rounded-2xl shadow-2xl w-[90%] max-w-md p-8 flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.88, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 20 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Warning icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Text */}
            <div className="text-center" dir="rtl">
              <h2 className="text-[#0F022E] text-lg font-semibold mb-2">
                {t('Are you sure about deleting the workplace?')}
              </h2>
              <p className="text-[#697586] text-sm font-medium leading-relaxed">
                {t('You will not be able to receive requests related to this location after deletion.')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full mt-1" >
              {/* Confirm delete */}
              <motion.button
                type="button"
                className="flex-1 h-12 rounded-3px bg-[#D92D20] text-white text-sm font-medium cursor-pointer"
                whileHover={{ scale: 1.02, filter: 'brightness(1.08)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={onConfirm}
              >
                {t('delete')}
              </motion.button>

              {/* Cancel */}
              <motion.button
                type="button"
                className="flex-1 h-12 rounded-3px border border-[#CDD5DF] text-[#364152] text-sm font-medium cursor-pointer"
                whileHover={{ scale: 1.02, backgroundColor: '#F9FAFB' }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15 }}
                onClick={onCancel}
              >
                {t('cancel')}
              </motion.button>

              
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Delete