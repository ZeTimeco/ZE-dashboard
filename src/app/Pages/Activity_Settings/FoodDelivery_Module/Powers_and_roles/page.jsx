import React from 'react'
import Header from './Header'
import Boxes from './Boxes'
import Roles from './Roles'

function Powers_and_rolesPage() {
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
      <div>
        <Header/>
      </div>

      <div className='p-6 flex flex-col gap-4'>
        <Boxes/>
        <Roles/>

      </div>
  
        
        
      </div>
      
    </>
  )
}

export default Powers_and_rolesPage