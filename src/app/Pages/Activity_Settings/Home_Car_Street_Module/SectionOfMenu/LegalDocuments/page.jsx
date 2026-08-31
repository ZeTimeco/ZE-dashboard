'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './Header'
import TextState from './TextState'
import Files from './Files'
import { useDispatch, useSelector } from 'react-redux'
import { getRequiredDocumentsThunk } from '@/redux/slice/Setting/SettingSlice'

function LegalDocumentsPage() {
  const dispatch = useDispatch();
  const {documents , loading , error}= useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRequiredDocumentsThunk())
  },[dispatch])

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
      >
        <Header/>
        <TextState documents={documents}/>
        <Files documents={documents}/>
      </motion.div>
    </>
  )
}

export default LegalDocumentsPage