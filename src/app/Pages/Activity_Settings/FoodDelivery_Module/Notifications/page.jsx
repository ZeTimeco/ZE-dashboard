'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import TypesOfAlerts from './TypesOfAlerts'
import SoundAndVibration from './SoundAndVibration'
import DoNotDisturb from './DoNotDisturb'
import { useTranslation } from 'react-i18next'
import { EditDeliveryConfigThunk, EditNotificationConfigThunk, getNotificationConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Alert, Slide, Snackbar } from '@mui/material'

function NotificationsPage() {
  const {t} = useTranslation()

  //API
  const dispatch = useDispatch()
  const {getNotificationConfig , loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getNotificationConfigThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    notify_new_orders:1,
    notify_order_updates:1,
    notify_delivery_issues:1,
    notify_customer_messages:1,
    notify_sound_enabled:1,
    notification_sound_type:1,
    notify_vibration_enabled:1,
    notify_dnd_enabled:1,
    notify_dnd_start:'',
    notify_dnd_end:''
  })

  useEffect(() => {
    if (getNotificationConfig) {
      setFormData({
        notify_new_orders: getNotificationConfig.notify_new_orders ?? 1,
        notify_order_updates: getNotificationConfig.notify_order_updates ?? 1,
        notify_delivery_issues: getNotificationConfig.notify_delivery_issues ?? 1,
        notify_customer_messages: getNotificationConfig.notify_customer_messages ?? 1,
        notify_sound_enabled: getNotificationConfig.notify_sound_enabled ?? 1,
        notification_sound_type: getNotificationConfig.notification_sound_type ?? 1,
        notify_vibration_enabled: getNotificationConfig.notify_vibration_enabled ?? 1,
        notify_dnd_enabled: getNotificationConfig.notify_dnd_enabled ?? 1,
        notify_dnd_start: getNotificationConfig.notify_dnd_start ?? "",
        notify_dnd_end: getNotificationConfig.notify_dnd_end ?? "",
      });
    }
  }, [getNotificationConfig]);

  const [alert, setAlert] = useState({
      open: false,
      severity: '',
      message: '',
    }
    )
    
  const handleSubmit = async () => {
    try {
      await dispatch(EditNotificationConfigThunk(formData)).unwrap()

      setAlert({
        open: true,
        severity: 'success',
        message: t('Saved successfully'),
      })
    } catch (error) {
      console.error(error)

      setAlert({
        open: true,
        severity: 'error',
        message: 'This is an error Alert.',
      })
    }
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="left" />
  }
    
  
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <TypesOfAlerts     formData={formData} setFormData={setFormData} />
          <SoundAndVibration formData={formData} setFormData={setFormData} />
          <DoNotDisturb      formData={formData} setFormData={setFormData} />


          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-[3px] text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[var(--color-primary)] cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </button>

        </div>
  
        
        

      {/* alert */}
      <div className='px-6 mb-4 w-[30%]' >
        {alert.open && (
          <Snackbar
            open={alert.open}
            autoHideDuration={5000}
            onClose={() =>
              setAlert({
                open: false,
                severity: '',
                message: '',
              })
            }
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            TransitionComponent={SlideTransition}
          >
            <Alert
            severity={alert.severity}
            variant="filled"
            onClose={() =>
              setAlert({
                open: false,
                severity: '',
                message: '',
              })
            }
            sx={{
              minWidth: '380px',
              borderRadius: '8px',
              padding: '12px 16px',

              display: 'flex',
              alignItems: 'center',

              '& .MuiAlert-icon': {
                margin: 0,
                marginRight: '12px',
              },

              '& .MuiAlert-message': {
                flex: 1,
                padding: 0,
              },

              '& .MuiAlert-action': {
                margin: 0,
                padding: 0,
                marginLeft: '16px',
              },
            }}
          >
            <div className="font-medium">
              {alert.message}
            </div>
            </Alert>
          </Snackbar>
        )}
      </div>

      </div>
      


    </>
  )
}

export default NotificationsPage