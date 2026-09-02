'use client';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

function TileOfSevicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className='flex justify-between mb-10'
      >
        <div>
          <p className='text-[#364152] text-2xl font-medium mb-3'>{t('Today overview')}</p> 
          <p className='text-[#697586] text-base font-normal'>{t('Track and manage real estate service requests easily and efficiently.')}</p>
        </div>
      </motion.div>
    </>
  )
}

export default TileOfSevicesPage