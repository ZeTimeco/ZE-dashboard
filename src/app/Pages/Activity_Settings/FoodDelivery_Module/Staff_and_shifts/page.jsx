import React from 'react'
import Header from './Header'
import Boxes from './Boxes'
import Overtime from './Overtime'
import AtWork from './AtWork'

function Staff_and_shiftsPage() {
  return (
    <>
      
      <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <Boxes/>
          <AtWork/>
          <Overtime/>
          
        </div>
  
        
        
      </div>
    </>
  )
}

export default Staff_and_shiftsPage