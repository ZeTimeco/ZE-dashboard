'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

function Role({formData , setFormData , getPaymentSettings, selectedRoleKey, setSelectedRoleKey}) {
    const {t, i18n} = useTranslation() 
    const currentLang = i18n.language.startsWith("ar") ? "ar" : "en";

  return (
    <>
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'>
      <p className='text-[#364152] text-base font-medium'>{t('Select your role')}</p>

      <div className='grid grid-cols-3 gap-4 mt-4'>
        {getPaymentSettings?.map((Role)=>(
          <div key={Role?.role_key}>
            <button  
              onClick={() => setSelectedRoleKey(Role?.role_key)}
              className={`border rounded-[3px] text-base w-full h-14 cursor-pointer transition-colors duration-200
                ${selectedRoleKey === Role?.role_key 
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[white] font-medium' 
                  : 'border-[#E3E8EF] text-[#4B5565] font-normal hover:bg-gray-50'
                }`}
            >
              {Role?.role_name?.[currentLang] || Role?.role_name?.en || Role?.role_name?.ar}
            </button>
          </div>

        ))}
          

      </div>
    </div>

    </>
  )
}

export default Role