'use client'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import EditLayout from './EditLayout'
import Views_Aspects from './Views_Aspects'
import HallManagement from './HallManagement'
import DefaultSettings from './DefaultSettings'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantViewsThunk } from '@/redux/slice/Setting/SettingSlice'

function Halls_floorPlanPage() {
    const {t} = useTranslation() 
    const dispatch = useDispatch()
    const {getRestaurantViews} = useSelector((state)=>state.setting)

    useEffect(()=>{
      dispatch(getRestaurantViewsThunk())
    },[dispatch])

    console.log('getRestaurantViews' , getRestaurantViews);
  
  return (
    <>

    <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <HallManagement/>
            <Views_Aspects getRestaurantViews={getRestaurantViews}/>
            <EditLayout/>
            <DefaultSettings/>
        
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
          </button>
          </div>
    
          
          
      </div>
      
    </>
  )
}

export default Halls_floorPlanPage