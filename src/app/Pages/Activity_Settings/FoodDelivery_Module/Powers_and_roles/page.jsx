'use client'
import React from 'react'
import Header from './Header'
import Boxes from './Boxes'
import Roles from './Roles'
import { useTranslation } from 'react-i18next'

function Powers_and_rolesPage() {
  const loading = false
  const {t} = useTranslation()
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <Boxes/>
        <Roles/>


        <button
            disabled={loading}
            className={`w-[25%] h-14 rounded-[3px] text-white transition
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

export default Powers_and_rolesPage