'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from './Header'
import Boxes from './Boxes'
import Overtime from './Overtime'
import AtWork from './AtWork'
import DetailsPage from './Details/page'
import { useDispatch, useSelector } from 'react-redux'
import { getStaffManageConfigThunk } from '@/redux/slice/Setting/SettingSlice'

function Staff_and_shiftsPage() {
  const [selectedId , setSelectedId] = useState(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('openDetails') === 'true') {
      setSelectedId(true)
    }
  }, [searchParams])

  //api
  const dispatch = useDispatch()
  const {getStaffManageConfig} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getStaffManageConfigThunk())
  },[dispatch])
  // console.log('getStaffManageConfig' , getStaffManageConfig);
  return (
    <>
      
      <div className='border border-[#E3E8EF] rounded-3px mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <Boxes getStaffManageConfig={getStaffManageConfig?.data}/>
          <AtWork setOpenDetails={setSelectedId} getStaffManageConfig={getStaffManageConfig?.data}/>
          <Overtime setOpenDetails={setSelectedId} getStaffManageConfig={getStaffManageConfig?.data}/>
          
        </div>
  
        
        
      </div>

      <DetailsPage
        open={!!selectedId}
        setOpen={(val) => setSelectedId(val ? selectedId : null)}
        selectedId={selectedId}
      />

    </>
  )
}

export default Staff_and_shiftsPage
