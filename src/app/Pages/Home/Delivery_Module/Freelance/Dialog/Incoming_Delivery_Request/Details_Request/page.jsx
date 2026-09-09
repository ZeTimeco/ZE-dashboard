"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import ThirdSection from './ThirdSection'
import Under_ReviewPage from '../Under_Review/page'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.25, 1, 0.5, 1] },
  },
}

function Details_RequestPage({ open, setOpen }) { 
  const { t } = useTranslation()
  const [openUnderReview, setOpenUnderReview] = useState(false)

  const handleSendOffer = () => {
    setOpen(false)
    setOpenUnderReview(true)
  }

  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog overflow-hidden shadow-2xl transition-all duration-300",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full flex flex-col"
      >
        {/* Close button */}
        <motion.div variants={itemVariants} className="pt-6 px-6 flex justify-end">
          <motion.button
            type="button"
            onClick={() => setOpen(false)}
            whileHover={{ scale: 1.08, rotate: 90 }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            className="border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-full flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-black/5 hover:border-[rgba(102,107,109,0.40)] focus:outline-none"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-5 h-5 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* Title and subtitle */}
        <motion.div variants={itemVariants} className="px-6 flex flex-col gap-1">
          <p className="text-[#364152] text-2xl font-medium tracking-tight">{t('Incoming delivery request')}</p>
          <p className="text-[#666B6D] text-base font-normal">{t('Review the details and submit your offer.')}</p>
        </motion.div>

        {/* Divider */}
        <motion.div variants={itemVariants} className="w-full border-t border-[#CDD5DF] my-6" />

        {/* Content sections */}
        <div className="flex flex-col gap-6 px-6 pb-6">
          <motion.div variants={itemVariants}>
            <FirstSection />
          </motion.div>

          <motion.div variants={itemVariants}>
            <SecondSection />
          </motion.div>

          <motion.div variants={itemVariants}>
            <ThirdSection />
          </motion.div>

          {/* Action buttons */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 w-full pt-1">
            <motion.button
              type="button"
              onClick={() => setOpen(false)}
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="border border-[#B42318] w-full h-14 cursor-pointer text-[#B42318] text-base font-semibold rounded-3px transition-all duration-200 hover:bg-[#B42318]/5 hover:border-[#912018] hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B42318]/30"
            >
              {t('reject')}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleSendOffer}
              whileHover={{ scale: 1.015, filter: 'brightness(1.03)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className="bg-primary w-full h-14 cursor-pointer text-white text-base font-semibold rounded-3px transition-all duration-200 hover:shadow-md hover:bg-primary/95 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              {t('Send an offer')}
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </Dialog>

    {/* Under Review Popup */}
    <Under_ReviewPage
      open={openUnderReview}
      setOpen={setOpenUnderReview}
    />
    </>
  )
}

export default Details_RequestPage