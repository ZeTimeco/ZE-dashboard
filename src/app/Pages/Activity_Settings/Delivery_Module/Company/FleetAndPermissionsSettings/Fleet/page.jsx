'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Cards from './Cards'
import { useRouter } from 'next/navigation'
import AddPage from './Add/page'
import DetailsPage from './Details/page'
import { getDriverSettingThunk } from '@/redux/slice/Setting/SettingSlice'
import { useDispatch, useSelector } from 'react-redux'

function FleetPage() {
  const {t} = useTranslation()
  const router = useRouter()
  const [open , setOpen] = useState(false)
  const [openDetails, setOpenDetails] = useState(false)

  //api
  const dispatch = useDispatch()
  const { getDriverSetting, loading } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getDriverSettingThunk())
  }, [dispatch])

  console.log('getDriverSetting' , getDriverSetting);

  return (
    <MainLayout>
      <div>
        <h1 className='text-[#364152] text-2xl font-medium'>{t('Fleet')}</h1>
        <p className='text-[#697586] text-xl font-normal'>
          {getDriverSetting?.summary?.online_drivers}  {' '}
          {t('Connected from')}  {' '}
          {getDriverSetting?.summary?.total_drivers} 
        </p>
      </div>

      <div className='border border-[#CDD5DF] rounded-3px p-6 grid grid-cols-2 gap-6 mt-10'>
        <Cards 
          onClick={() => setOpenDetails(true)} 
          getDriverSetting={getDriverSetting} 
          openDetails={openDetails} 
          setOpenDetails={setOpenDetails}
        />
      </div>

      <button
        onClick={()=>setOpen(true)}  
        className={`flex gap-2 justify-center items-center  bg-primary w-[30%] h-14 rounded-3px px-3 mt-6 cursor-pointer`}
      >
        <span className="text-white text-base font-medium">{t('Adding a driver to the fleet')}</span>
        <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
      </button>

      <AddPage
        open={open}
        setOpen={setOpen}
      />

    

      
    </MainLayout>
  )
}

export default FleetPage