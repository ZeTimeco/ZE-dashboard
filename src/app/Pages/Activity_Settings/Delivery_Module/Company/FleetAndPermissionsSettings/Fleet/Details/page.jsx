'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import EditPage from '../Edit/page'
import { useDispatch, useSelector } from 'react-redux'
import { getDriverSettingThunk, getShowDriverThunk, toggleStatusThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion, AnimatePresence } from 'framer-motion'

function DetailsPage({ open, setOpen ,driverId }) {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getShowDriver}= useSelector((state)=>state.setting)

  useEffect(()=>{
    if(driverId){
      dispatch(getShowDriverThunk(driverId))
    }
  },[dispatch , driverId])

  console.log('getShowDriver' , getShowDriver);

  const [editOpen, setEditOpen] = useState(false)
  const [statusLoading, setStatusLoading] = useState(false)

  console.log('driverId' , driverId);

  const handleToggleStatus = async (isActive) => {
    const targetDriverId = driverId || getShowDriver?.driver?.id
    if (!targetDriverId || statusLoading) return

    try {
      setStatusLoading(true)
      await dispatch(
        toggleStatusThunk({
          id: targetDriverId,
          formData: { is_active: isActive },
        })
      ).unwrap()

      await dispatch(getShowDriverThunk(targetDriverId))
      dispatch(getDriverSettingThunk())
    } catch (error) {
      console.log('Toggle status error:', error)
    } finally {
      setStatusLoading(false)
    }
  }
  
  return (
    <Dialog
      open={open}
      aria-labelledby="details-dialog-title"
      aria-describedby="details-dialog-description"
      PaperProps={{ className: 'rerquest-dialog' }}
    >
      {/* Header */}
      <div className="flex justify-end px-6 mt-6">
        <button
          onClick={() => setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </div>

      <div className='flex flex-col items-center gap-2 mt-5'>
        <h1 className='text-[#364152] text-2xl font-semibold'>{t('Driver file')}</h1>
        <p className='text-[#697586] text-xl font-medium'>{t('Show your fleet')}</p>
      </div>

      {/* Content */}
      <Content getShowDriver={getShowDriver}/>

      {/* btn */}
        <div className='grid grid-cols-2 gap-6 my-4  w-full px-6 '>
            
          <button
            onClick={() => setEditOpen(true)}
            className="h-15 w-full bg-primary text-white rounded-3px cursor-pointer"
          >
            {t('Driver data modification')}
          </button>

          <AnimatePresence mode="wait">
            {getShowDriver?.driver?.status === true ? (
              <motion.button
                key="disable"
                type="button"
                disabled={statusLoading}
                onClick={() => handleToggleStatus(0)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
                className="h-15 w-full border border-[#CDD5DF] text-[#697586] rounded-3px cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                {statusLoading && (
                  <span className="w-4 h-4 border-2 border-[#697586] border-t-transparent rounded-full animate-spin" />
                )}
                <span>{t('Temporary Disable')}</span>
              </motion.button>
            ) : (
              <motion.button
                key="enable"
                type="button"
                disabled={statusLoading}
                onClick={() => handleToggleStatus(1)}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.98 }}
                className="h-15 w-full border border-[#CDD5DF] text-[#697586] rounded-3px cursor-pointer flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                {statusLoading && (
                  <span className="w-4 h-4 border-2 border-[#697586] border-t-transparent rounded-full animate-spin" />
                )}
                <span>{t('Not disabled')}</span>
              </motion.button>
            )}
          </AnimatePresence>
          

        </div>

        <EditPage open={editOpen} setOpen={setEditOpen} getShowDriver={getShowDriver}/>
    </Dialog>
  )
}

export default DetailsPage