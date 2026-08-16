'use client'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import BasicInformation from './BasicInformation'
import Images from './Images'
import Location from './Location'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { editRestaurantInformationConfigThunk, getRestaurantInformationConfigThunk, getRestaurantTypeThunk } from '@/redux/slice/Setting/SettingSlice'
import { Alert, Slide, Snackbar } from '@mui/material'

function Restaurant_informationPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  //API
  const dispatch = useDispatch()
  const {getRestaurantInformationConfig ,getRestaurantType, loading} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getRestaurantTypeThunk())
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
          ar: currentLang === "ar" ? getRestaurantInformationConfig.name || "" : (typeof getRestaurantInformationConfig.name === "object" ? getRestaurantInformationConfig.name?.ar || "" : ""),
          en: currentLang === "en" ? getRestaurantInformationConfig.name || "" : (typeof getRestaurantInformationConfig.name === "object" ? getRestaurantInformationConfig.name?.en || "" : ""),
        },
        branch_name: {
          ar: currentLang === "ar" ? getRestaurantInformationConfig.branch_name || "" : (typeof getRestaurantInformationConfig.branch_name === "object" ? getRestaurantInformationConfig.branch_name?.ar || "" : ""),
          en: currentLang === "en" ? getRestaurantInformationConfig.branch_name || "" : (typeof getRestaurantInformationConfig.branch_name === "object" ? getRestaurantInformationConfig.branch_name?.en || "" : ""),
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
        images: getRestaurantInformationConfig.images || [],
        description: {
          ar: currentLang === "ar" ? getRestaurantInformationConfig.description || "" : (typeof getRestaurantInformationConfig.description === "object" ? getRestaurantInformationConfig.description?.ar || "" : ""),
          en: currentLang === "en" ? getRestaurantInformationConfig.description || "" : (typeof getRestaurantInformationConfig.description === "object" ? getRestaurantInformationConfig.description?.en || "" : ""),
        },
        status: getRestaurantInformationConfig.status ?? "",
      });
    }
  }, [getRestaurantInformationConfig, currentLang]);

    const [alert, setAlert] = useState({
      open: false,
      severity: '',
      message: '',
    })

    const handleSubmit = async () => {
      const data = new FormData();

      data.append("restaurant_type_id", formData.restaurant_type_id || "");

      if (formData.name) {
        data.append("name[ar]", formData?.name?.ar || "");
        data.append("name[en]", formData?.name?.en || "");
      }
      if (formData.branch_name) {
        data.append("branch_name[ar]", formData?.branch_name?.ar || "");
        data.append("branch_name[en]", formData?.branch_name?.en || "");
      }
      if (formData.description) {
        data.append("description[ar]", formData?.description?.ar || "");
        data.append("description[en]", formData?.description?.en || "");
      }

      data.append("latitude",       formData?.latitude       || "");
      data.append("longitude",      formData?.longitude      || "");
      data.append("phone_landline", formData?.phone_landline || "");
      data.append("phone_1",        formData?.phone_1        || "");
      data.append("phone_2",        formData?.phone_2        || "");
      data.append("whatsapp_phone", formData?.whatsapp_phone || "");
      data.append("email",          formData?.email          || "");
      data.append("country",        formData?.country        || "");
      data.append("city",           formData?.city           || "");
      data.append("area",           formData?.area           || "");
      data.append("address",        formData?.address        || "");
      data.append("status",         formData?.status         || "");

      if (formData?.images && Array.isArray(formData?.images)) {
        let newIndex = 0;
        let existingIndex = 0;
        formData?.images.forEach((img) => {
          if (img instanceof File) {
            data.append(`images[${newIndex}]`, img);
            newIndex++;
          } else if (img && typeof img === "object" && img.id) {
            data.append(`existing_images[${existingIndex}]`, img.id);
            existingIndex++;
          }
        });
      }

      try {
        await dispatch(editRestaurantInformationConfigThunk(data)).unwrap()
        dispatch(getRestaurantInformationConfigThunk())

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
          message: error?.message || 'This is an error Alert.',
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
          <BasicInformation    formData={formData} setFormData={setFormData} getRestaurantType={getRestaurantType} currentLang={currentLang} />
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