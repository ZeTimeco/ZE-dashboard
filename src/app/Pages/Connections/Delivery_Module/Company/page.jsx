'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import Filter from './Filter';
import Cards from './Cards';

function CompanyPage() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState('All');
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="w-full"
    >
      <motion.p
        variants={itemVariants}
        className='text-[#364152] text-2xl font-medium tracking-tight'
      >
        {t('My deliveries')}
      </motion.p>
      
      <motion.div
        variants={itemVariants}
        className='my-8 sm:my-10'
      >
        <Filter activeTab={activeTab} setActiveTab={setActiveTab} />
      </motion.div>

      <motion.div variants={itemVariants}>
        <Cards activeTab={activeTab} />
      </motion.div>
    </motion.div>
  )
}

export default CompanyPage