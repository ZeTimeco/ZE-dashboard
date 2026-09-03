"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import BoxPage from './Box/page'
import NavRequest from './NavRequest'
import CardOfRequests from './CardOfRequests'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getReservationsThunk } from '@/redux/slice/Requests/RequestsSlice'
import { motion } from 'framer-motion'

function Queue_ModulePage() {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const {getReservations} = useSelector((state)=>state.requests) 
  const getReservationsSummary = getReservations?.summary
  const getReservationsData = getReservations?.data

  return (
    <MainLayout>
      <motion.p
        className='text-[#364152] text-2xl font-medium mb-10'
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        {t('Reservations')}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
      >
        <BoxPage getReservationsSummary={getReservationsSummary}/>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
      >
        <NavRequest/>
        <CardOfRequests getReservationsData={getReservationsData}/>
      </motion.div>
      
    </MainLayout>
  )
}

export default Queue_ModulePage