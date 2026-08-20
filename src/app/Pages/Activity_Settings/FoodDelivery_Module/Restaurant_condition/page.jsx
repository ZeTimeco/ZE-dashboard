'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import Content from './Content'
import { useDispatch, useSelector } from 'react-redux'
import { getResturantStatusThunk } from '@/redux/slice/Setting/SettingSlice'

function Restaurant_conditionPage() {
  //API
  const dispatch = useDispatch()
  const {getResturantStatus} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getResturantStatusThunk())
  },[dispatch])

  // console.log('getResturantStatus' , getResturantStatus);
  return (
    <div>
        <div className='border border-[#E3E8EF] rounded-3px mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <Content getResturantStatus={getResturantStatus}/>
          </div>
    
          
          
      </div>
    </div>
  )
}

export default Restaurant_conditionPage