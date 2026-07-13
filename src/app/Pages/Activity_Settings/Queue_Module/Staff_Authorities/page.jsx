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
    
    console.log('getPaymentSettings' , getPaymentSettings);
    const [selectedRoleKey, setSelectedRoleKey] = useState('');
    const[formData , setFormData] = useState({
      roles:[]
    })
    useEffect(() => {
      if (getPaymentSettings) {
        setFormData({
          roles: getPaymentSettings || [],
        });
      }
    }, [getPaymentSettings]);

    useEffect(() => {
      if (getPaymentSettings && getPaymentSettings.length > 0 && !selectedRoleKey) {
        setSelectedRoleKey(getPaymentSettings[0].role_key);
      }
    }, [getPaymentSettings, selectedRoleKey]);
  
    const [loading, setLoading] = useState(false);

    const handleSubmit = async ()=>{
      const roleWithNoPermission = formData.roles.find(
        (role) => !role.permissions.some((perm) => perm.is_selected)
      );
      if (roleWithNoPermission) {
        alert(t('Please select at least one permission for every role before saving.'));
        return;
      }

      setLoading(true);
      try{
        const payload = {
          roles: formData.roles.map((role) => ({
            role_key: role.role_key,
            permissions: role.permissions
              .filter((perm) => perm.is_selected)
              .map((perm) => perm.key),
          })),
        };
        console.log('payload to send', payload);
        await dispatch(editPaymentSettingsThunk(payload)).unwrap()
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
            <Role 
              formData={formData} 
              setFormData={setFormData} 
              getPaymentSettings={getPaymentSettings}
              selectedRoleKey={selectedRoleKey}
              setSelectedRoleKey={setSelectedRoleKey}
            />
            <ReceptionistPrivileges 
              formData={formData} 
              setFormData={setFormData}
              getPaymentSettings={getPaymentSettings}
              selectedRoleKey={selectedRoleKey}
            />

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

export default Staff_AuthoritiesPage