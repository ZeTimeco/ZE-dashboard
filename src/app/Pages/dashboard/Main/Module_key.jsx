"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getmodulesThunk } from '@/redux/slice/Services/ServicesSlice'
import { setModuleIdThunk } from '@/redux/slice/Home/HomeSlice'
import { getProfileThunk } from '@/redux/slice/Setting/SettingSlice'
import { IMAGE_BASE_URL } from '../../../../../config/imageUrl'

function Module_key({ onClose }) {
    const {t} = useTranslation()
    //api
      const dispatch= useDispatch()
      const {getmodules , loadingDetails,errorDetails}=useSelector((state)=>state.services)

      // Read current_module_key from localStorage
      const userData = typeof window !== 'undefined' ? localStorage.getItem('user') : null
      const current_module_key = userData ? JSON.parse(userData)?.current_module_key : null

      useEffect(()=>{
        dispatch(getmodulesThunk())

        // Sync user data on mount
        const fetchProfile = async () => {
            try {
                const profileData = await dispatch(getProfileThunk()).unwrap()
                const updatedUser = profileData?.provider
                if (updatedUser) {
                    localStorage.removeItem('user')
                    localStorage.setItem('user', JSON.stringify(updatedUser))
                    window.dispatchEvent(new Event('user_updated'))
                }
            } catch (error) {
                console.error("Failed to sync profile on mount", error)
            }
        }
        fetchProfile()
      },[dispatch])

      // Pre-select the module that matches current_module_key
      useEffect(() => {
        if (getmodules.length > 0 && current_module_key) {
          const matchingModule = getmodules.find(
            (service) => service.module_key === current_module_key
          )
          if (matchingModule) {
            setSelectedService(matchingModule.id)
          }
        }
      }, [getmodules, current_module_key])

    const router = useRouter()
    const [selectedService, setSelectedService] = useState(null)
  
    const handleServiceClick = async (serviceId) => {
      setSelectedService(serviceId)
      
      try {
        // 1. Set the module ID on the server
        await dispatch(setModuleIdThunk(serviceId)).unwrap()

        // 2. Fetch the latest profile data
        const profileData = await dispatch(getProfileThunk()).unwrap()
        const updatedUser = profileData?.provider

        // 3. Update localStorage with the new data
        if (updatedUser) {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(updatedUser))
          window.dispatchEvent(new Event('user_updated'))

          const { national_id, status, has_subscription } = updatedUser
        
           // Check conditions and route accordingly
          if (national_id === null) {
            router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData')
          } else if (status === 'pending') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval')
          } else if (status === 'rejected') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount')
          } else if (status === 'active') {
            if (has_subscription === true) {
              if (onClose) onClose()
              router.push('/Pages/Home')
            } else {
              if (onClose) onClose()
              router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount')
            }
          }
        }
      } catch (error) {
        console.error("Error updating module or fetching profile:", error)
      }
    }
    
  return (
    <>
    
        <div className='flex flex-col items-center mb-12'>
          <p className='text-[#232323] text-2xl font-medium mb-4'>{t('Service selection')}</p>
          <p className='text-[#656565] text-xl font-normal'>{t('Choose the service that best suits your needs')}</p>
        </div>

        <div className='grid grid-cols-2 gap-4 '>
          {getmodules.map((service) => (
            <button
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className={`
                py-6 px-4 flex flex-col  items-center transition-all duration-200 cursor-pointer rounded-[3px]
                border-1
                ${selectedService === service.id 
                  ? 'border-[var(--color-primary)]' 
                  : 'border-[#E3E8EF] hover:border-[var(--color-primary)]'
                }
              `}
            >
              <img src={`${IMAGE_BASE_URL}${service?.image}`} className='w-17.5 h-16' />
              <p className='text-[#364152] text-base mt-4'>{service?.name}</p>
            </button>
          ))}
        </div>
    </>
  )
}

export default Module_key