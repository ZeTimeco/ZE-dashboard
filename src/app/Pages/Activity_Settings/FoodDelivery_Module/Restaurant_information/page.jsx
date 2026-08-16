'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import BasicInformation from './BasicInformation'
import Images from './Images'
import Location from './Location'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { editRestaurantInformationConfigThunk, getRestaurantInformationConfigThunk } from '@/redux/slice/Setting/SettingSlice'
import { Alert, Slide, Snackbar } from '@mui/material'

function Restaurant_informationPage() {
  const {t} = useTranslation()

  //API
  const dispatch = useDispatch()
  const {getRestaurantInformationConfig , loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getRestaurantInformationConfigThunk())
  },[dispatch])

  console.log('getRestaurantInformationConfig',getRestaurantInformationConfig);
  const [formData , setFormData] = useState({
    restaurant_type_id:'',
    name:{
      ar:'',
      en:''
    },
    branch_name:{
      ar:'',
      en:''
    },
    latitude:'',
    longitude:'',
    phone_landline:'',
    phone_1:'',
    phone_2:'',
    whatsapp_phone:'',
    email:'',
    country:'',
    city:'',
    area:'',
    address:'',
    existing_images:[],
    images:[],
    description:{
      ar:'',
      en:''
    },
    status:''
  })

  useEffect(() => {
    if (getRestaurantInformationConfig) {
      setFormData({
        restaurant_type_id: getRestaurantInformationConfig.restaurant_type_id ?? "",
        name: {
          ar: getRestaurantInformationConfig.name?.ar ?? "",
          en: getRestaurantInformationConfig.name?.en ?? "",
        },
        branch_name: {
          ar: getRestaurantInformationConfig.branch_name?.ar ?? "",
          en: getRestaurantInformationConfig.branch_name?.en ?? "",
        },
        latitude: getRestaurantInformationConfig.latitude ?? "",
        longitude: getRestaurantInformationConfig.longitude ?? "",
        phone_landline: getRestaurantInformationConfig.phone_landline ?? "",
        phone_1: getRestaurantInformationConfig.phone_1 ?? "",
        phone_2: getRestaurantInformationConfig.phone_2 ?? "",
        whatsapp_phone: getRestaurantInformationConfig.whatsapp_phone ?? "",
        email: getRestaurantInformationConfig.email ?? "",
        country: getRestaurantInformationConfig.country ?? "",
        city: getRestaurantInformationConfig.city ?? "",
        area: getRestaurantInformationConfig.area ?? "",
        address: getRestaurantInformationConfig.address ?? "",
        existing_images: getRestaurantInformationConfig.existing_images ?? [],
        images: [],
        description: {
          ar: getRestaurantInformationConfig.description?.ar ?? "",
          en: getRestaurantInformationConfig.description?.en ?? "",
        },
        status: getRestaurantInformationConfig.status ?? "",
      });
    }
  }, [getRestaurantInformationConfig]);

    const [alert, setAlert] = useState({
      open: false,
      severity: '',
      message: '',
    })

    const handleSubmit = async () => {
      try {
        await dispatch(editRestaurantInformationConfigThunk(formData)).unwrap()
  
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
          <BasicInformation    formData={formData} setFormData={setFormData} />
          <Images              formData={formData} setFormData={setFormData} />
          <Location            formData={formData} setFormData={setFormData} />
          <ContactInformation  formData={formData} setFormData={setFormData} />

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

export default Restaurant_informationPage