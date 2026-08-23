import React from 'react'
import Header from './Header'
import Content from './Content'

function Working_hoursPage() {
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-3px mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-4'>
          <Content/>
        </div>
  
        
        
      </div>
      

    </>
  )
}

export default Working_hoursPage