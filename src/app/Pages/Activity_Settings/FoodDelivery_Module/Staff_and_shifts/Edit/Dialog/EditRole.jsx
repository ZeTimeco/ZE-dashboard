'use client'
import { getRolesThunk } from '@/redux/slice/Setting/SettingSlice';
import { Dialog } from '@mui/material'
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';

function EditRole({open , setOpen , selectedRole , setSelectedRole}) {
  const {t} = useTranslation()
  const [tempSelected , setTempSelected] = useState(null)
  
  //API
  const dispatch = useDispatch()
  const {getRoles} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRolesThunk())
  },[dispatch])

  // Sync dialog temp selection with current parent value when opening
  useEffect(()=>{
    if(open) setTempSelected(selectedRole ?? null)
  },[open])

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

          <div className='px-6'>
            <p className='text-[#364152] text-xl font-semibold'>{t('Employee Role Selection')}</p>
          </div>

          <div className='border border-[#CDD5DF] my-4 '></div>


          <div className='flex flex-col gap-3 px-6 mb-6'>
            {/*  */}
            {getRoles?.map((role)=>(
              <div
                key={role?.id}
                onClick={() => setTempSelected({id: role?.id , name: role?.name})}
                className={`border rounded-3px p-2 flex gap-3 cursor-pointer transition-colors ${
                  tempSelected?.id === role?.id
                    ? 'border-primary bg-[#F0FDF4]'
                    : 'border-[#E3E8EF]'
                }`}
              >
                <p className='flex items-center'>
                  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    tempSelected?.id === role?.id
                      ? 'border-primary bg-primary'
                      : 'border-gray-300 bg-white'
                  }`}>
                    {tempSelected?.id === role?.id && (
                      <span className='w-2 h-2 rounded-full bg-white block' />
                    )}
                  </span>
                </p>
                <p className='text-[#364152] text-base font-normal'>{role?.name}</p>
              </div>
            ))}
            
          </div>

          {/* btn */}
          <div className='px-6 mb-4'>
            <motion.button
              onClick={()=>{
                if(tempSelected){
                  setSelectedRole(tempSelected)
                }
                setOpen(false)
              }}
              className="bg-primary h-15 w-full rounded-3px text-white text-base font-normal cursor-pointer"
              whileHover={{ y: -1  }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {t('save')}
            </motion.button>
          </div>

        </Dialog>
    
    </>
  )
}

export default EditRole