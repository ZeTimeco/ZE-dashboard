'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Content from './Content'
import EditPage from '../Edit/page'
import { useDispatch, useSelector } from 'react-redux'
import { getShowDriverThunk } from '@/redux/slice/Setting/SettingSlice'

function DetailsPage({ open, setOpen ,driverId }) {
  const {t} = useTranslation()

  //api
  const dispatch = useDispatch()
  const {getShowDriver}= useSelector((state)=>state.setting)

  useEffect(()=>{
    if(driverId){
      dispatch(getShowDriverThunk(driverId))
    }
  },[dispatch , driverId])

  console.log('getShowDriverid' , getShowDriver);


  const [editOpen, setEditOpen] = useState(false)

  console.log('driverId' , driverId);
  
  return (
    <Dialog
      open={open}
      aria-labelledby="details-dialog-title"
      aria-describedby="details-dialog-description"
      PaperProps={{ className: 'rerquest-dialog' }}
    >
      {/* Header */}
      <div className="flex justify-end px-6 mt-6">
        <button
          onClick={() => setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </div>

      <div className='flex flex-col items-center gap-2 mt-5'>
        <h1 className='text-[#364152] text-2xl font-semibold'>{t('Driver file')}</h1>
        <p className='text-[#697586] text-xl font-medium'>{t('Show your fleet')}</p>
      </div>

      {/* Content */}
      <Content getShowDriver={getShowDriver}/>

      {/* btn */}
        <div className='grid grid-cols-2 gap-6 my-4  w-full px-6 '>
            
          <button
            onClick={() => setEditOpen(true)}
            className="h-15 w-full bg-primary text-white rounded-3px cursor-pointer"
          >
            {t('Driver data modification')}
          </button>

          <button
            className="h-15 w-full  border border-[#CDD5DF] text-[#697586] rounded-3px cursor-pointer"
          >
            {t('Temporary Disable')}
          </button>

        </div>

        <EditPage open={editOpen} setOpen={setEditOpen} />
    </Dialog>
  )
}

export default DetailsPage