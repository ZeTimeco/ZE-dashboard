'use client'
import React from 'react'
import Header from './Header'
import Content from './Content'
import { useTranslation } from 'react-i18next'

function Working_hoursPage() {
  const {t} = useTranslation()
  const loading = false
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-3px mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <Content/>

          <button
            disabled={loading}
            // onClick={handleSubmit}
            className={`w-[25%] h-14 rounded-3px text-white transition
              ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary cursor-pointer"
              }`}
          >
            {loading ? t("Saving...") : t("Save changes")}
          </button>
        </div>
  
        
        
      </div>
      

    </>
  )
}

export default Working_hoursPage