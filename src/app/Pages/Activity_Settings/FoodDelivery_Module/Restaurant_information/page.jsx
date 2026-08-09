import React from 'react'
import Header from './Header'
import BasicInformation from './BasicInformation'
import Images from './Images'
import Location from './Location'
import ContactInformation from './ContactInformation'

function Restaurant_informationPage() {
  return (
    <>
    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <BasicInformation/>
          <Images/>
          <Location/>
          <ContactInformation/>
        </div>
  
        
        
      </div>
      
    </>
  )
}

export default Restaurant_informationPage