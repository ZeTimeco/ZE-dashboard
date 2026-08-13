'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import DeliverySystem from './DeliverySystem'
import DriverAppointments from './DriverAppointments'
import DeliveryBehavior from './DeliveryBehavior'
import DeliveryRange from './DeliveryRange'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditDeliveryConfigThunk, getDeliveryConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { Alert, Slide, Snackbar } from '@mui/material'

function Connection_settingsPage() {
  const {t} = useTranslation()

  //API
  const dispatch = useDispatch()
  const {getDeliveryConfig , loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getDeliveryConfigThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    delivery_type:'',
    delivery_auto_assign_driver:1,
    delivery_driver_accept_time:'',
    delivery_allow_without_touch:1,
    delivery_max_distance:''
  })

  useEffect(() => {
    if (getDeliveryConfig) {
      setFormData({
        delivery_type: getDeliveryConfig.delivery_type ?? "",
        delivery_auto_assign_driver: getDeliveryConfig.delivery_auto_assign_driver ?? 1,
        delivery_driver_accept_time: getDeliveryConfig.delivery_driver_accept_time ?? "",
        delivery_allow_without_touch: getDeliveryConfig.delivery_allow_without_touch ?? 1,
        delivery_max_distance: getDeliveryConfig.delivery_max_distance ?? "",
      });
    }
  }, [getDeliveryConfig]);


  const [alert, setAlert] = useState({
      open: false,
      severity: '',
      message: '',
    }
    )
    
  const handleSubmit = async () => {
    try {
      await dispatch(EditDeliveryConfigThunk(formData)).unwrap()

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
      <div>
        <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <DeliverySystem      formData={formData} setFormData={setFormData}  />
            <DriverAppointments  formData={formData} setFormData={setFormData}  />
            <DeliveryBehavior    formData={formData} setFormData={setFormData}  />
            <DeliveryRange       formData={formData} setFormData={setFormData}  />

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

export default Connection_settingsPage