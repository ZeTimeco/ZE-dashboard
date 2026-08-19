'use client'
import { Dialog } from '@mui/material'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import EditRole from '../Edit/Dialog/EditRole'
import Disable from './Dialog/Disable'
import { useDispatch, useSelector } from 'react-redux'
import { getStaffDetailsThunk } from '@/redux/slice/Setting/SettingSlice'

function DetailsPage({open , setOpen , selectedId}) {
  const {t} = useTranslation()
  const router = useRouter()
  const [openEditRole, setOpenEditRole] = useState(false)
  const [openDisable, setOpenDisable] = useState(false)

  //API
  const dispatch = useDispatch()
  const {getStaffDetails} = useSelector((state)=>state.setting)

  useEffect(()=>{
    if(selectedId){
      dispatch(getStaffDetailsThunk(selectedId))
    }
  }, [dispatch , selectedId])

  console.log('getStaffDetails' , getStaffDetails)
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{
        className: "ServiceDeletePage-dialog",
      }}
    >
      <div className='pt-6 px-6 flex justify-end'>
        <button 
          onClick={()=>setOpen(false)} 
          className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'
        >
          <img src="/images/icons/xx.svg" alt="" />
        </button>
      </div>

      <header className='flex justify-between px-6 mt-6'>
        <p className='text-[#364152] text-xl font-semibold'>{t('Employee Details')}</p>
        <button onClick={()=>{
          setOpen(false)
          router.push(`/Pages/Activity_Settings/FoodDelivery_Module/Staff_and_shifts/Edit`)
          }}
        className='cursor-pointer'
        >
          <img src="/images/icons/edit_Yellow.svg" alt="" />
        </button>
      </header>

      <div className='border border-[#CDD5DF] my-4 '></div>

      <div className='p-6 flex flex-col gap-1 items-center'>

        <p className='w-22.5 h-22.5 rounded-full bg-[#F9F5E8] flex justify-center items-center'>
          <img src="/images/icons/user_yellow.svg" className="w-12 h-12" />
        </p>

        <p className='text-[#364152] text-xl font-normal'>{getStaffDetails?.data?.name}  </p>
        
        {getStaffDetails?.data?.status === 'inactive' ? (
          <p className='border border-[#F97066] bg-[#FEE4E2] text-[#F97066] w-fit px-3 rounded-full'>
            {t('inactive')}
          </p>
        ):(
          <p className='border border-[#067647] bg-[#DCFAE6] text-[#067647] w-fit px-3 rounded-full'>
            {t('active')}
          </p>
        )}

      </div>

      <div className='p-6 flex flex-col gap-4'>
        {/* Contact information */}
        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-4'>
          <p className='text-[#364152] text-base font-medium'>{t('Contact information')}</p>

          <div className='flex flex-col gap-4 mt-4 '>

            {/* phone number */}
            <div className='border border-[#CDD5DF] rounded-3px p-3 flex gap-3 '>
              <p className='w-8 h-8 bg-[#DCFAE6] rounded-3px flex justify-center items-center'>
                <img src="/images/icons/call_green.svg" alt="" />
              </p>
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-normal'>{t('phone number')}</p>
                <p className='text-[#697586] text-sm font-normal'>{getStaffDetails?.data?.phone}</p>
              </div>
            </div>

            {/* Email */}
            <div className='border border-[#CDD5DF] rounded-3px p-3 flex gap-3 '>
              <p className='w-8 h-8 bg-[#DBCEFA] rounded-3px flex justify-center items-center'>
                <img src="/images/icons/mail-blue.svg" alt="" />
              </p>
              <div className='flex flex-col gap-1'>
                <p className='text-[#364152] text-base font-normal'>{t('Email')}</p>
                <p className='text-[#697586] text-sm font-normal'>{getStaffDetails?.data?.email}</p>
              </div>
            </div>


          </div>
        </div>

        {/* Access Permissions */}
        <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] rounded-3px p-4'>
          <p className='text-[#364152] text-base font-medium'>{t('Access Permissions')}</p>

          <div className='flex flex-col gap-3 mt-3'>
            {getStaffDetails?.data?.role?.permissions?.map((permission , index)=>(
              <div key={index} className=' border border-[#CDD5DF] flex gap-2 p-3 rounded-3px '>
                <p className='flex items-center'>
                  <img src="/images/icons/checkmark-circle-yellow.svg" className="w-5 h-5" />
                </p>
                <p className='text-[#364152] text-sm font-normal'>{permission} </p>
              </div>
            ))}
            
          
          </div>
        </div>


        {/* btn */}
        <div className='flex gap-2 w-full'>
          <button onClick={() => setOpenDisable(true)} className='w-full border border-[#B42318] text-[#B42318] text-base font-semibold py-3 px-6 rounded-[3px]  cursor-pointer'>
            {t('Employee suspension')}
          </button>

          <button
            onClick={() => setOpenEditRole(true)}
            className='w-full bg-primary text-white text-base font-semibold py-3 px-6 rounded-3px  cursor-pointer'
          >
            {t('Role modification')}
          </button>
        </div>


        
      </div>


      </Dialog>

      <EditRole open={openEditRole} setOpen={setOpenEditRole} />
      <Disable open={openDisable} setOpen={setOpenDisable}/>
      
    </>
  )
}

export default DetailsPage