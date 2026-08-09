import React from 'react'
import Header from './Header'
import DeliverySystem from './DeliverySystem'
import DriverAppointments from './DriverAppointments'

function Connection_settingsPage() {
  return (
    <>
      
      <div>
        <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
          <div>
            <Header/>
          </div>
    
          <div className='p-6 flex flex-col gap-4'>
            <DeliverySystem />
            <DriverAppointments />
          </div>
    
          
          
      </div>
      </div>
    </>
  )
}

export default Connection_settingsPage