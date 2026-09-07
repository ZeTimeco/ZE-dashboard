'use client'
import { Dialog } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EditRole from '../Edit/Dialog/EditRole'
import Disable from './Dialog/Disable'
import { useDispatch, useSelector } from 'react-redux'
import { getStaffDetailsThunk } from '@/redux/slice/Setting/SettingSlice'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const sectionItemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function DetailsPage({ open, setOpen, selectedId }) {
  const { t } = useTranslation()
  const router = useRouter()
  const [openEditRole, setOpenEditRole] = useState(false)
  const [openDisable, setOpenDisable] = useState(false)

  // API
  const dispatch = useDispatch()
  const { getStaffDetails } = useSelector((state) => state.setting)

  useEffect(() => {
    if (selectedId) {
      dispatch(getStaffDetailsThunk(selectedId))
    }
  }, [dispatch, selectedId])

  const isInactive = getStaffDetails?.data?.status === 'inactive'

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "ServiceDeletePage-dialog",
          style: {
            borderRadius: '12px',
            boxShadow: '0 20px 40px -8px rgba(0,0,0,0.18)',
          },
        }}
      >
        {/* Close button */}
        <div className='pt-6 px-6 flex justify-end'>
          <motion.button
            whileHover={{ scale: 1.08, rotate: 90, backgroundColor: 'rgba(0,0,0,0.04)' }}
            whileTap={{ scale: 0.92 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-[58.182px] flex justify-center items-center cursor-pointer transition-colors'
            aria-label="Close"
          >
            <img src="/images/icons/xx.svg" alt="" />
          </motion.button>
        </div>

        {/* Header */}
        <header className='flex justify-between items-center px-6 mt-6'>
          <p className='text-[#364152] text-xl font-semibold'>{t('Employee Details')}</p>
          <motion.button
            whileHover={{ scale: 1.1, filter: 'brightness(1.1)' }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            onClick={() => {
              setOpen(false)
              router.push(`/Pages/Activity_Settings/FoodDelivery_Module/Staff_and_shifts/Edit?id=${selectedId}`)
            }}
            className='cursor-pointer p-1 rounded-md transition-colors hover:bg-gray-50'
            aria-label="Edit employee"
          >
            <img src="/images/icons/edit_Yellow.svg" alt="" />
          </motion.button>
        </header>

        <div className='border border-[#CDD5DF] my-4'></div>

        {/* Avatar + Name + Status */}
        <motion.div
          className='px-6 flex flex-col gap-1 items-center pb-2'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='w-22.5 h-22.5 rounded-full bg-[#F9F5E8] flex justify-center items-center cursor-default'
          >
            <img src="/images/icons/user_yellow.svg" className="w-12 h-12" />
          </motion.p>

          <p className='text-[#364152] text-xl font-normal mt-1'>{getStaffDetails?.data?.name}</p>

          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
            className={`w-fit px-3 rounded-full text-sm font-medium ${
              isInactive
                ? 'border border-[#F97066] bg-[#FEE4E2] text-[#F97066]'
                : 'border border-[#067647] bg-[#DCFAE6] text-[#067647]'
            }`}
          >
            {isInactive ? t('inactive') : t('active')}
          </motion.p>
        </motion.div>

        {/* Details sections */}
        <motion.div
          className='p-6 flex flex-col gap-4'
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Contact information */}
          <motion.div
            variants={sectionItemVariants}
            className='shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-3px p-4 transition-shadow duration-200'
          >
            <p className='text-[#364152] text-base font-medium mb-4'>{t('Contact information')}</p>

            <div className='flex flex-col gap-4'>
              {/* Phone number */}
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className='border border-[#CDD5DF] rounded-3px p-3 flex gap-3 hover:border-gray-300 transition-colors'
              >
                <p className='w-8 h-8 bg-[#DCFAE6] rounded-3px flex justify-center items-center flex-shrink-0'>
                  <img src="/images/icons/call_green.svg" alt="" />
                </p>
                <div className='flex flex-col gap-1'>
                  <p className='text-[#364152] text-base font-normal'>{t('phone number')}</p>
                  <p className='text-[#697586] text-sm font-normal'>{getStaffDetails?.data?.phone}</p>
                </div>
              </motion.div>

              {/* Email */}
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.15 }}
                className='border border-[#CDD5DF] rounded-3px p-3 flex gap-3 hover:border-gray-300 transition-colors'
              >
                <p className='w-8 h-8 bg-[#DBCEFA] rounded-3px flex justify-center items-center flex-shrink-0'>
                  <img src="/images/icons/mail-blue.svg" alt="" />
                </p>
                <div className='flex flex-col gap-1'>
                  <p className='text-[#364152] text-base font-normal'>{t('Email')}</p>
                  <p className='text-[#697586] text-sm font-normal'>{getStaffDetails?.data?.email}</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Access Permissions */}
          <motion.div
            variants={sectionItemVariants}
            className='shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-3px p-4 transition-shadow duration-200'
          >
            <p className='text-[#364152] text-base font-medium mb-3'>{t('Access Permissions')}</p>

            <div className='flex flex-col gap-3'>
              {getStaffDetails?.data?.role?.permissions?.map((permission, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                  className='border border-[#CDD5DF] flex gap-2 p-3 rounded-3px hover:border-gray-300 hover:bg-gray-50/50 transition-all duration-150'
                >
                  <p className='flex items-center flex-shrink-0'>
                    <img src="/images/icons/checkmark-circle-yellow.svg" className="w-5 h-5" />
                  </p>
                  <p className='text-[#364152] text-sm font-normal'>{permission}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={sectionItemVariants}
            className='flex gap-2 w-full'
          >
            {isInactive ? (
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(6,118,71,0.06)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={() => setOpenDisable(true)}
                className='w-full border border-[#067647] text-[#067647] text-base font-semibold py-3 px-6 rounded-[3px] cursor-pointer transition-all duration-200'
              >
                {t('Cancel employee suspension')}
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(180,35,24,0.05)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.15 }}
                onClick={() => setOpenDisable(true)}
                className='w-full border border-[#B42318] text-[#B42318] text-base font-semibold py-3 px-6 rounded-[3px] cursor-pointer transition-all duration-200'
              >
                {t('Employee suspension')}
              </motion.button>
            )}

            <motion.button
              whileHover={{ scale: 1.02, filter: 'brightness(1.06)' }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => setOpenEditRole(true)}
              className='w-full bg-primary text-white text-base font-semibold py-3 px-6 rounded-3px cursor-pointer shadow-sm hover:shadow-md transition-shadow duration-200'
            >
              {t('Role modification')}
            </motion.button>
          </motion.div>
        </motion.div>
      </Dialog>

      <EditRole open={openEditRole} setOpen={setOpenEditRole} />
      <Disable
        open={openDisable}
        setOpen={setOpenDisable}
        selectedId={selectedId}
        staffName={getStaffDetails?.data?.name}
        status={getStaffDetails?.data?.status}
      />
    </>
  )
}

export default DetailsPage