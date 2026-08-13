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

function ListPage() {
  const {t} = useTranslation()

  //API
  const dispatch = useDispatch()
  const {getMenuConfig , loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getMenuConfigThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    menu_show_out_of_stock:1,
    menu_schedule_enabled:1,
    menu_auto_restock:1,
    menu_auto_restock_after:''
  })

  useEffect(() => {
    if (getMenuConfig) {
      setFormData({
        menu_show_out_of_stock:getMenuConfig.menu_show_out_of_stock ?? 1,
        menu_schedule_enabled:getMenuConfig.menu_schedule_enabled ?? 1,
        menu_auto_restock:getMenuConfig.menu_auto_restock ?? 1,
        menu_auto_restock_after:getMenuConfig.menu_auto_restock_after ?? '',
      })
    }
  }, [getMenuConfig])

    const [alert, setAlert] = useState({
      open: false,
      severity: '',
      message: '',
    }
    )
  
    const handleSubmit = async () => {
      try {
        await dispatch(EditMenuConfigThunk(formData)).unwrap()
  
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
          <OfferForCustomers       formData={formData} setFormData={setFormData} />
          <ScheduledAvailability   formData={formData} setFormData={setFormData} />
          <AutomaticReavailability formData={formData} setFormData={setFormData} />
          <PriceQuote              formData={formData} setFormData={setFormData} />

          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-[3px] text-white transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[var(--color-primary)] cursor-pointer'
            }`}
          >
            {loading
              ? t('Saving...')
              : t('Save changes')}
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

export default ListPage