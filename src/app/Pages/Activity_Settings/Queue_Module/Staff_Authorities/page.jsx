'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import Role from './Role'
import ReceptionistPrivileges from './ReceptionistPrivileges'
import { editPaymentSettingsThunk, getPaymentSettingsThunk } from '@/redux/slice/Setting/SettingSlice'
import { useDispatch, useSelector } from 'react-redux'

function Staff_AuthoritiesPage() {
  const {t} = useTranslation() 
  
    //api
    const dispatch = useDispatch()
    const {getPaymentSettings} = useSelector((state)=>state.setting)
    useEffect(()=>{
      dispatch(getPaymentSettingsThunk())
    },[dispatch])
  
    const[formData , setFormData] = useState({
      roles:[]
    })
    useEffect(() => {
      if (getPaymentSettings) {
        setFormData({
          roles: getPaymentSettings.roles || [],
        });
      }
    }, [getPaymentSettings]);
  
    const [loading, setLoading] = useState(false);
    const handleSubmit = async ()=>{
      setLoading(true);
      try{
        await dispatch(editPaymentSettingsThunk(formData)).unwrap()
        await dispatch(getPaymentSettingsThunk())
        alert(t('Restaurant information updated successfully.'));
      }catch(error){
        console.log(error);
        alert(error?.message || "Something went wrong.");
      } finally {
          setLoading(false);
      }
    }
    

  return (
    <>

      <div className='border border-[#E3E8EF] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <Role/>
            <ReceptionistPrivileges/>

            {/* note */}
            <div className='flex gap-2 border border-[#48A1FF] bg-[#EFF6FF] rounded-[3px] p-3'>
              <div className='mt-0.5'>
                <img src="/images/icons/i_blue.svg" alt="" />
              </div>
              <div>
                <p className='text-[#364152] text-sm font-normal'>{t('Authority Guidelines')}</p>
                <p className='text-[#1F5C9E] text-xs font-normal mt-1'>{t("Managers have full access by default. Adjust permissions based on your restaurant's workflow and employee responsibilities.")}</p>
              </div>
            </div>





            {/* btn */}
            <button className='w-[30%] bg-[var(--color-primary)] text-white h-14 rounded-[3px] cursor-pointer'>
            {t('Save changes')}
            </button>

          </div>
    
          
          
      </div>

    </>
  )
}

export default Staff_AuthoritiesPage