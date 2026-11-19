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
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: 'success'
  })

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.phone.trim()) {
      setToast({
        open: true,
        message: t('Please fill in all fields') || 'يرجى ملء جميع الحقول',
        severity: 'error'
      })
      return
    }

    try {
      setIsSubmitting(true)
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
    } finally {
      setIsSubmitting(false)
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
        onClose={() => !isSubmitting && setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: 'rerquest-dialog' }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
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
                className="w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px outline-none focus:border-primary transition-colors"
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
                className="w-full h-14 p-3 border border-[#CDD5DF] text-sm text-[#7d8d84] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Delivery method */}
            <div className="w-full">
              <p className="text-sm font-medium mb-1.5">
                <span className="text-[#364152]">
                  {t('Delivery method')}
                </span>
              </p>

              <div className="w-full h-14 p-3 border border-[#CDD5DF] bg-[#F1F1F1] text-sm text-[#697586] shadow-[0_1px_2px_0_rgba(16,24,40,0.05)] rounded-3px flex items-center">
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

              <motion.button
                type="button"
                whileHover={!isSubmitting ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`h-15 w-full bg-primary text-white rounded-3px cursor-pointer flex items-center justify-center gap-2 shadow-xs transition-all ${
                  isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>{t('Adding...')}</span>
                  </>
                ) : (
                  <span>{t('In addition to the fleet')}</span>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
                className="h-15 w-full border border-[#697586] text-[#697586] rounded-3px cursor-pointer hover:bg-gray-50 transition-colors"
              >
                {t('cancel')}
              </motion.button>

            </div>
          </div>
        </motion.div>
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