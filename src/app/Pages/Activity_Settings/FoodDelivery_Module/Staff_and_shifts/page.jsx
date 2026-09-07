'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from './Header'
import Boxes from './Boxes'
import Overtime from './Overtime'
import AtWork from './AtWork'
import DetailsPage from './Details/page'
import { useDispatch, useSelector } from 'react-redux'
import { getStaffManageConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const sectionItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function Staff_and_shiftsPage() {
  const [selectedId, setSelectedId] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('openDetails') === 'true') {
      setSelectedId(true)
    }
  }, [searchParams])

  // api
  const dispatch = useDispatch()
  const { getStaffManageConfig } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getStaffManageConfigThunk())
  }, [dispatch])

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className='border border-[#E3E8EF] rounded-3px mb-4 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]'
      >
        <Header />

        <motion.div
          className='p-6 flex flex-col gap-4'
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={sectionItemVariants}>
            <Boxes getStaffManageConfig={getStaffManageConfig?.data} />
          </motion.div>
          <motion.div variants={sectionItemVariants}>
            <AtWork setOpenDetails={setSelectedId} getStaffManageConfig={getStaffManageConfig?.data} />
          </motion.div>
          <motion.div variants={sectionItemVariants}>
            <Overtime setOpenDetails={setSelectedId} getStaffManageConfig={getStaffManageConfig?.data} />
          </motion.div>
        </motion.div>
      </motion.div>

      <DetailsPage
        open={!!selectedId}
        setOpen={(val) => setSelectedId(val ? selectedId : null)}
        selectedId={selectedId}
      />
    </>
  )
}

export default Staff_and_shiftsPage
