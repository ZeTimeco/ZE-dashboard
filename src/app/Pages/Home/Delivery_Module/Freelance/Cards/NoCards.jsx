'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from "framer-motion";


function NoCards() {
  const {t } = useTranslation()
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 my-20">
        {/* Empty State Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{opacity: 1,scale: [1, 1.03, 1], y: [0, -5, 0]}}
          transition={{
            opacity: { duration: 0.5 },
            scale: {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            y: {
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <img src="/images/Container.svg" alt="" />
        </motion.div>

        {/* Text */}
        <motion.div
          className="flex flex-col items-center gap-2 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <h1 className="text-[#292929] text-3xl font-bold">
            {t("No requests")}
          </h1>

          <p className="text-[#787878] text-xl font-normal">
            {t("There are no contact requests available at the moment.")}
          </p>
        </motion.div>
      </div>
    </>
  )
}

export default NoCards