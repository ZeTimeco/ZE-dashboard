'use client'
import React from 'react'
import Header from './Header'
import AcceptingApplications from './AcceptingApplications'
import PreparationTime from './PreparationTime'
import CustomerModifications from './CustomerModifications'
import AutomaticCancellation from './AutomaticCancellation'
import NewOrderAlerts from './NewOrderAlerts'
import { useTranslation } from 'react-i18next'

function Order_settingsPage() {
  const loading = false
  const {t} = useTranslation()
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <AcceptingApplications/>
          <PreparationTime/>
          <CustomerModifications/>
          <AutomaticCancellation/>
          <NewOrderAlerts/>


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

export default Order_settingsPage