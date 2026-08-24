'use client'
import React, { useEffect } from 'react'
import Header from './Header'
import Boxes from './Boxes'
import Roles from './Roles'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { getRoleAndPermissionConfigThunk } from '@/redux/slice/Setting/SettingSlice'

function Powers_and_rolesPage() {
  const {t} = useTranslation()
  //API
  const dispatch = useDispatch()
  const {getRoleAndPermissionConfig , loading} = useSelector((state)=>state.setting)

  useEffect(()=>{
    dispatch(getRoleAndPermissionConfigThunk())
  },[dispatch])

  // console.log('getRoleAndPermissionConfig' , getRoleAndPermissionConfig);
  const notes = [
    { id: 1, text:t('Click on any role to customize its permissions.') },
    { id: 2, text:t('When adding a new employee, select their role from this list.') },
    { id: 3, text: t('You can modify the permissions of any employee individually.') },
  ];

  return (
    <>

    <div className='border border-[#E3E8EF] rounded-3px mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <Boxes getRoleAndPermissionConfig={getRoleAndPermissionConfig}/>
        <Roles getRoleAndPermissionConfig={getRoleAndPermissionConfig}/>


      {/* note */}
      <div className="w-full border border-[#48A1FF] bg-[#EFF6FF] px-4 py-3 rounded-3px">
        <div className="flex items-start gap-2">
          <span className=" mt-1">
            <img src="/images/icons/security_blue.svg" className="w-5 h-5" />
          </span>

          <div className="flex flex-col gap-1 text-right flex-1">
            <p className="text-[#364152] text-base font-normal">
              {t('Managing job roles')}
            </p>

            <ul className="flex flex-col gap-1 text-[#1F5C9E] text-sm font-normal">
              {notes.map((note) => (
                <li key={note.id} className="flex gap-1">
                  <span>•</span>
                  <span>{note.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      </div>
  
        
        
      </div>
      
    </>
  )
}

export default Powers_and_rolesPage