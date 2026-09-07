'use client'
import React, { useEffect, useState } from 'react'
import GeneralAssessments from './GeneralAssessments'
import LowRatingAlerts from './LowRatingAlerts'
import ReplyingToReviews from './ReplyingToReviews'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditReviewSettingThunk, getReviewSettingThunk } from '@/redux/slice/Setting/SettingSlice'
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

function RatingSettingPage() {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { getReviewSetting, loading } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getReviewSettingThunk())
  }, [dispatch])

  const [formData, setFormData] = useState({
    public_reviews_enabled: true,
    low_rating_alert_enabled: true,
    alert_threshold_stars: 3,
    auto_reply_templates_enabled: false,
    replies_enabled: true,
  })

  useEffect(() => {
    const data = getReviewSetting?.data || getReviewSetting;
    if (data) {
      setFormData({
        public_reviews_enabled: Boolean(data.public_reviews_enabled ?? true),
        low_rating_alert_enabled: Boolean(data.low_rating_alert_enabled ?? true),
        alert_threshold_stars: data.alert_threshold_stars ?? 3,
        auto_reply_templates_enabled: Boolean(data.auto_reply_templates_enabled ?? false),
        replies_enabled: Boolean(data.replies_enabled ?? true),
      });
    }
  }, [getReviewSetting]);

  const [alert, setAlert] = useState({ open: false, severity: '', message: '' })

  const handleSubmit = async () => {
    try {
      await dispatch(EditReviewSettingThunk(formData))
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
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-4"
    >
      <motion.div variants={sectionItemVariants}>
        <GeneralAssessments formData={formData} setFormData={setFormData} />
      </motion.div>
      <motion.div variants={sectionItemVariants}>
        <LowRatingAlerts formData={formData} setFormData={setFormData} />
      </motion.div>
      <motion.div variants={sectionItemVariants}>
        <ReplyingToReviews formData={formData} setFormData={setFormData} />
      </motion.div>

      <motion.button
        variants={sectionItemVariants}
        whileHover={!loading ? { scale: 1.02, filter: 'brightness(1.06)' } : {}}
        whileTap={!loading ? { scale: 0.98 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        disabled={loading}
        onClick={handleSubmit}
        className={`w-[25%] h-14 rounded-3px text-white transition-all duration-200 shadow-sm
          ${loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-primary cursor-pointer hover:shadow-md"
          }`}
      >
        {loading ? t("Saving...") : t("Save changes")}
      </motion.button>

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
  )
}

export default RatingSettingPage