'use client'

import { Alert, Dialog, Snackbar } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import {
  addDriverThunk,
  getDriverSettingThunk
} from '@/redux/slice/Setting/SettingSlice'

function AddPage({ open, setOpen }) {
  const { t } = useTranslation()

  // api
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    name: '',
    phone: ''
  })

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSubmit = async () => {
    try {
      await dispatch(addDriverThunk(formData)).unwrap()

      // refresh drivers
      dispatch(getDriverSettingThunk())

      // success toast
      setToast({
        open: true,
        message: t('Driver added successfully'),
        severity: 'success'
      })

      setFormData({
        name: '',
        phone: ''
      })

      setOpen(false)

    } catch (error) {
      console.log('add driver error:', error)

      setToast({
        open: true,
        message: error?.message || t('Failed to add driver'),
        severity: 'error'
      })
    }
  }

  const handleCloseToast = () => {
    setToast((prev) => ({
      ...prev,
      open: false
    }))
  }

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: 'rerquest-dialog' }}
      >
        {/* Header */}
        <div className="flex justify-end px-6 mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150"
          >
            <img
              src="/images/icons/xx.svg"
              alt=""
              className="w-6 h-6"
            />
          </motion.button>
        </div>

        <div className="flex flex-col items-center gap-2 mt-5">
          <h1 className="text-[#364152] text-2xl font-semibold">
            {t('Add driver')}
          </h1>

          <p className="text-[#697586] text-xl font-medium">
            {t('Add a new driver to your fleet')}
          </p>
        </div>

        <div className="px-6 mt-6 flex flex-col gap-3">

          {/* Driver's name */}
          <div className="w-full">
            <p className="text-sm font-medium mb-1.5">
              <span className="text-[#364152]">
                {t("Driver's name")}
              </span>
            </p>

            <input
              type="text"
              name="name"
              value={formData?.name}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  name: e.target.value
                }))
              }}
              placeholder={t('Full name')}
              className="w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px outline-none"
            />
          </div>

          {/* Phone number */}
          <div className="w-full">
            <p className="text-sm font-medium mb-1.5">
              <span className="text-[#364152]">
                {t('phone number')}
              </span>
            </p>

            <input
              type="text"
              name="phone"
              value={formData?.phone}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  phone: e.target.value
                }))
              }}
              placeholder="+02  1XXXXXXXXXX"
              className="w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px outline-none"
            />
          </div>

          {/* Delivery method */}
          <div className="w-full">
            <p className="text-sm font-medium mb-1.5">
              <span className="text-[#364152]">
                {t('Delivery method')}
              </span>
            </p>

            <div className="w-full h-14 p-3 border border-[#CDD5DF] bg-[#F1F1F1] text-sm text-[#697586] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px">
              Honda PCX 150
            </div>
          </div>

          {/* Info */}
          <div className="border border-[#48A1FF] bg-[#EFF6FF] text-[#13339B] p-3 rounded-3px text-base font-normal">
            {t(
              'The driver will receive an invitation to install the driver app and link their account to the fleet.'
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-6 my-6 w-full">

            <button
              onClick={handleSubmit}
              className="h-15 w-full bg-primary text-white rounded-3px cursor-pointer"
            >
              {t('In addition to the fleet')}
            </button>

            <button
              onClick={() => setOpen(false)}
              className="h-15 w-full border border-[#697586] text-[#697586] rounded-3px cursor-pointer"
            >
              {t('cancel')}
            </button>

          </div>
        </div>
      </Dialog>

      {/* Toast */}
      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default AddPage