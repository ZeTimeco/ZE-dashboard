"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import BoxPage from './Box/page'
import RatePage from './Rate/page'
import AbbreviationsPage from './Abbreviations/page'
import TileOfSevicesPage from './TileOfSevices/page'
import CardsPage from './Cards/page'

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

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
}

function ServicesPage() {
  const [current_module_key, setCurrentModuleKey] = useState(null)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    setCurrentModuleKey(userData?.current_module_key ?? null)
  }, [])

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6 pb-8"
      >
        <motion.div variants={sectionVariants}>
          <TileOfSevicesPage current_module_key={current_module_key} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <BoxPage current_module_key={current_module_key} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <CardsPage current_module_key={current_module_key} />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <RatePage />
        </motion.div>

        <motion.div variants={sectionVariants}>
          <AbbreviationsPage />
        </motion.div>
      </motion.div>
    </MainLayout>
  )
}

export default ServicesPage