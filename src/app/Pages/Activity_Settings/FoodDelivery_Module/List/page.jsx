'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import OfferForCustomers from './OfferForCustomers'
import ScheduledAvailability from './ScheduledAvailability'
import AutomaticReavailability from './AutomaticReavailability'
import PriceQuote from './PriceQuote'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditMenuConfigThunk, getMenuConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { Alert, Slide, Snackbar } from '@mui/material'
import { motion } from 'framer-motion'

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const sectionItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

function ListPage() {
  const { t } = useTranslation()

  // API
  const dispatch = useDispatch()
  const { getMenuConfig, loading } = useSelector((state) => state.setting)
  useEffect(() => {
    dispatch(getMenuConfigThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    menu_show_out_of_stock: 1,
    menu_schedule_enabled: 1,
    menu_auto_restock: 1,
    menu_auto_restock_after: ''
  })

  useEffect(() => {
    if (getMenuConfig) {
      setFormData({
        menu_show_out_of_stock: getMenuConfig.menu_show_out_of_stock ?? 1,
        menu_schedule_enabled: getMenuConfig.menu_schedule_enabled ?? 1,
        menu_auto_restock: getMenuConfig.menu_auto_restock ?? 1,
        menu_auto_restock_after: getMenuConfig.menu_auto_restock_after ?? '',
      })
    }
  }, [getMenuConfig])

  const [alert, setAlert] = useState({ open: false, severity: '', message: '' })

  const handleSubmit = async () => {
    try {
      await dispatch(EditMenuConfigThunk(formData)).unwrap()
      setAlert({ open: true, severity: 'success', message: t('Saved successfully') })
    } catch (error) {
      console.error(error)
      setAlert({ open: true, severity: 'error', message: 'This is an error Alert.' })
    }
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />
  }

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
            <OfferForCustomers formData={formData} setFormData={setFormData} />
          </motion.div>
          <motion.div variants={sectionItemVariants}>
            <ScheduledAvailability formData={formData} setFormData={setFormData} />
          </motion.div>
          <motion.div variants={sectionItemVariants}>
            <AutomaticReavailability formData={formData} setFormData={setFormData} />
          </motion.div>
          <motion.div variants={sectionItemVariants}>
            <PriceQuote formData={formData} setFormData={setFormData} />
          </motion.div>

          <motion.button
            variants={sectionItemVariants}
            whileHover={!loading ? { scale: 1.02, filter: 'brightness(1.06)' } : {}}
            whileTap={!loading ? { scale: 0.98 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            disabled={loading}
            onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-3px text-white transition-all duration-200 shadow-sm ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary cursor-pointer hover:shadow-md'
            }`}
          >
            {loading ? t('Saving...') : t('Save changes')}
          </motion.button>
        </motion.div>

        {/* alert */}
        <div className='px-6 mb-4 w-[30%]'>
          {alert.open && (
            <Snackbar
              open={alert.open}
              autoHideDuration={5000}
              onClose={() => setAlert({ open: false, severity: '', message: '' })}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              TransitionComponent={SlideTransition}
            >
              <Alert
                severity={alert.severity}
                variant="filled"
                onClose={() => setAlert({ open: false, severity: '', message: '' })}
                sx={{
                  minWidth: '380px',
                  borderRadius: '8px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  '& .MuiAlert-icon': { margin: 0, marginRight: '12px' },
                  '& .MuiAlert-message': { flex: 1, padding: 0 },
                  '& .MuiAlert-action': { margin: 0, padding: 0, marginLeft: '16px' },
                }}
              >
                <div className="font-medium">{alert.message}</div>
              </Alert>
            </Snackbar>
          )}
        </div>
      </motion.div>
    </>
  )
}

export default ListPage