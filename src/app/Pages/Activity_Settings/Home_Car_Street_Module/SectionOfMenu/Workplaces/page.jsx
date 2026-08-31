"use client"
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from './Header';
import HaveWorkplacesPage from './HaveWorkplaces/page';
import NoWorkplacesPage from './NoWorkplaces/page';
import { getWorkplacesThunk } from '@/redux/slice/Setting/SettingSlice';
import { useDispatch, useSelector } from 'react-redux';

function WorkplacesPage() {
    const dispatch = useDispatch()
    const {Workplaces , loading , error} = useSelector((state)=>state.setting)
    const hasWorkplaces = Workplaces?.areas?.length > 0
    useEffect(()=>{
      dispatch(getWorkplacesThunk())
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
        {
          hasWorkplaces? (
            <HaveWorkplacesPage Workplaces={Workplaces}/>
          ):(
            <NoWorkplacesPage/>
          )
        }
      </motion.div>
    </>
  )
}

export default WorkplacesPage