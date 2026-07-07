'use client'
import React, { useEffect, useState } from 'react'
import BasicInformation from './BasicInformation'
import Header from './Header'
import RestaurantPhotos from './RestaurantPhotos'
import Location from './Location'
import BookingStatus from './BookingStatus'
import ContactInformation from './ContactInformation'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { editRestaurantInformationThunk, getRestaurantInformationThunk, getRestaurantTypesThunk } from '@/redux/slice/Setting/SettingSlice'

function Restaurant_informationPage() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";


  const dispatch = useDispatch()
  const {getRestaurantTypes , getRestaurantInformation} = useSelector((state)=>state.setting)
  useEffect(()=>{
    dispatch(getRestaurantTypesThunk())
    dispatch(getRestaurantInformationThunk())
  },[dispatch])

  const [formData , setFormData] = useState({
    restaurant_type_id:'',
    name:{ar:'' , en:''},
    branch_name:{ar:'' , en:''},
    latitude:'',
    longitude:'',
    country:'',
    city:'',
    area:'',
    address:'',

    phone_landline:'',
    phone_1:'',
    phone_2:'',
    whatsapp_phone:'',
    email:'',
    images:[],
    description:{ar:'' , en:''},
    status:''

  })

  useEffect(() => {
    if (getRestaurantInformation) {
      setFormData({
        restaurant_type_id: getRestaurantInformation.restaurant_type_id || '',
        name: {
          ar: currentLang === "ar" ? getRestaurantInformation.name || '' : '',
          en: currentLang === "en" ? getRestaurantInformation.name || '' : '',
        },
        branch_name: {
          ar: currentLang === "ar" ? getRestaurantInformation.branch_name || "" : "",
          en: currentLang === "en" ? getRestaurantInformation.branch_name || "" : "",
        },

        description: {
          ar: currentLang === "ar" ? getRestaurantInformation.description || "" : "",
          en: currentLang === "en" ? getRestaurantInformation.description || "" : "",
        },
        latitude: getRestaurantInformation.latitude || '',
        longitude: getRestaurantInformation.longitude || '',
        country: getRestaurantInformation.country || '',
        city: getRestaurantInformation.city || '',
        area: getRestaurantInformation.area || '',
        address: getRestaurantInformation.address || '',
        
        phone_landline: getRestaurantInformation.phone_landline || '',
        phone_1: getRestaurantInformation.phone_1 || '',
        phone_2: getRestaurantInformation.phone_2 || '',
        whatsapp_phone: getRestaurantInformation.whatsapp_phone || '',
        email: getRestaurantInformation.email || '',
        
        images: getRestaurantInformation.images || [],
        status: getRestaurantInformation.status || '',
      });
    }
  }, [getRestaurantInformation , currentLang]);


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

    // Split images: existing ones (from API) go as existing_images[i] = id
    //               new File objects go as images[i] = file
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
      await dispatch(editRestaurantInformationThunk(data)).unwrap();
      dispatch(getRestaurantInformationThunk());
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <>
    <div className='border border-[#E3E8EF] mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <BasicInformation getRestaurantTypes={getRestaurantTypes} formData={formData} setFormData={setFormData} currentLang={currentLang}/>
        <RestaurantPhotos formData={formData} setFormData={setFormData}/>
        <Location formData={formData} setFormData={setFormData}/>
        <BookingStatus formData={formData} setFormData={setFormData}/>
        <ContactInformation formData={formData} setFormData={setFormData}/>



        <button 
          onClick={handleSubmit}
          className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'
        >
        {t('Save changes')}
      </button>
      </div>

      
      
    </div>

      

    </>
  )
}

export default Restaurant_informationPage