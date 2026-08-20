'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import AcceptingApplications from './AcceptingApplications'
import PreparationTime from './PreparationTime'
import CustomerModifications from './CustomerModifications'
import AutomaticCancellation from './AutomaticCancellation'
import NewOrderAlerts from './NewOrderAlerts'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { EditOrderConfigThunk, getOrderConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { Alert, Slide, Snackbar } from '@mui/material'

function Order_settingsPage() {
  const {t} = useTranslation()

  //API

  const dispatch = useDispatch()
  const {getOrderConfig , loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getOrderConfigThunk())
  },[dispatch])

  // console.log('getOrderConfig' , getOrderConfig);

  const [formData , setFormData]= useState({
    order_acceptance_mode:'',
    order_preparation_time:'',
    order_allow_edit:1,
    order_edit_time_limit:'',
    order_auto_cancel_after:'',
    notify_new_orders_sound:1,
    notify_new_orders_vibration:1
  })

  useEffect(() => {
    if (getOrderConfig) {
      setFormData({
        order_acceptance_mode: getOrderConfig.order_acceptance_mode ?? '',
        order_preparation_time: getOrderConfig.order_preparation_time ?? '',
        order_allow_edit: getOrderConfig.order_allow_edit ?? 1,
        order_edit_time_limit: getOrderConfig.order_edit_time_limit ?? '',
        order_auto_cancel_after: getOrderConfig.order_auto_cancel_after ?? '',
        notify_new_orders_sound: getOrderConfig.notify_new_orders_sound ?? 1,
        notify_new_orders_vibration: getOrderConfig.notify_new_orders_vibration ?? 1,
      })
    }
  }, [getOrderConfig])


  const [alert, setAlert] = useState({
    open: false,
    severity: '',
    message: '',
  }
  )

  const handleSubmit = async () => {
    try {
      await dispatch(EditOrderConfigThunk(formData)).unwrap()

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
          <AcceptingApplications    formData={formData} setFormData={setFormData} />
          <PreparationTime          formData={formData} setFormData={setFormData} />
          <CustomerModifications    formData={formData} setFormData={setFormData} />
          <AutomaticCancellation    formData={formData} setFormData={setFormData} />
          <NewOrderAlerts           formData={formData} setFormData={setFormData} />


          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-3px text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-primary cursor-pointer'
            }`}
          >
            {loading
              ? t('Saving...')
              : t('Save changes')}
          </button>


        </div>

        

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

export default Order_settingsPage