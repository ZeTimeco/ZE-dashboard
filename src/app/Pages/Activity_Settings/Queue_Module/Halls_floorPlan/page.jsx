'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import EditLayout from './EditLayout'
import Views_Aspects from './Views_Aspects'
import HallManagement from './HallManagement'
import DefaultSettings from './DefaultSettings'
import { useDispatch, useSelector } from 'react-redux'
import { editFloorplanSettingsThunk, getFloorplanSettingsThunk, getRestaurantViewsThunk } from '@/redux/slice/Setting/SettingSlice'

function Halls_floorPlanPage() {
    const {t} = useTranslation() 
    const dispatch = useDispatch()
    const {getRestaurantViews , getFloorplanSettings} = useSelector((state)=>state.setting)
    const getFloorplanSettingsData = getFloorplanSettings?.data
    useEffect(()=>{
      dispatch(getRestaurantViewsThunk())
      dispatch(getFloorplanSettingsThunk())
    },[dispatch])


    const [formData , setFormData] = useState({
        'who_can_edit_floor_plan':[],
        'multi_halls_enabled':1,
        'floor_plan_edit_enabled':1
    })

    useEffect(() => {
      if (getFloorplanSettingsData) {
        setFormData({
          who_can_edit_floor_plan: getFloorplanSettingsData.who_can_edit_floor_plan ?? [],
          multi_halls_enabled: getFloorplanSettingsData.multi_halls_enabled ?? 1,
          floor_plan_edit_enabled: getFloorplanSettingsData.floor_plan_edit_enabled ?? 1,
        });
      }
    }, [getFloorplanSettings]);

    const [loading, setLoading] = useState(false);
    const handleSubmit = async ()=>{
      setLoading(true);
      try{
        await dispatch(editFloorplanSettingsThunk(formData)).unwrap()
        await dispatch(getFloorplanSettingsThunk())
        alert(t('Restaurant information updated successfully.'));
      }catch(error){
        console.log(error);
        alert(error?.message || "Something went wrong.");
      } finally {
        setLoading(false);
    }
    }

  // console.log('*/',getFloorplanSettings);
  
  return (
    <>

    <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <HallManagement formData={formData} setFormData={setFormData} />
            <Views_Aspects getRestaurantViews={getRestaurantViews} formData={formData} setFormData={setFormData}/>
            <EditLayout formData={formData} setFormData={setFormData} />
            <DefaultSettings getFloorplanSettings={getFloorplanSettings} formData={formData} setFormData={setFormData}/>
        
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-[30%] h-14 rounded-[3px] text-white transition
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
      
    </>
  )
}

export default Halls_floorPlanPage