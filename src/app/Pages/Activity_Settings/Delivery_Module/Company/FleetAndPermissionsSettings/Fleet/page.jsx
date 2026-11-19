'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import AddPage from './Add/page'
import DetailsPage from './Details/page'
import { getDriverSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function FleetPage() {
  const {t} = useTranslation()
  const router = useRouter()
  const [open , setOpen] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  //api
  const dispatch = useDispatch()
  const { getDriverSetting, loading } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getDriverSettingThunk())
  }, [dispatch])

  // console.log('getDriverSetting' , getDriverSetting);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div>
          <h1 className='text-[#364152] text-2xl font-medium'>{t('Fleet')}</h1>
          <p className='text-[#697586] text-xl font-normal mt-1'>
            {getDriverSetting?.summary?.online_drivers || 0}  {' '}
            {t('Connected from')}  {' '}
            {getDriverSetting?.summary?.total_drivers || 0} 
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
          className='border border-[#CDD5DF] rounded-3px p-6 grid grid-cols-1 lg1:grid-cols-2 gap-6 mt-10 min-h-[140px]'
        >
          <Cards 
            onClick={() => setOpenDetails(true)} 
            getDriverSetting={getDriverSetting} 
            openDetails={openDetails} 
            setOpenDetails={setOpenDetails}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
          className='flex flex-wrap justify-between items-center gap-4 mt-6'
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>router.back()}
            className="flex gap-2 justify-center items-center bg-primary min-w-[140px] px-6 h-14 rounded-3px my-4 cursor-pointer shadow-xs transition-colors hover:bg-primary/95"
          >
            <span className="text-white text-base font-medium">{t('Return')}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>setOpen(true)}  
            className="flex gap-2 justify-center items-center bg-primary min-w-[220px] px-6 h-14 rounded-3px my-4 cursor-pointer shadow-xs transition-colors hover:bg-primary/95"
          >
            <span className="text-white text-base font-medium">{t('Adding a driver to the fleet')}</span>
            <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
          </motion.button>
        </motion.div>
        
        <AddPage
          open={open}
          setOpen={setOpen}
        />
      </motion.div>
    </MainLayout>
  )
}

export default FleetPage