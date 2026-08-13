'use client'
import React from 'react'
import Header from './Header'
import Filter from './Filter'
import Boxes from './Boxes'
import BestsellingProducts from './BestsellingProducts'
import Rating from './Rating'
import ExportingReports from './ExportingReports'

function ReportsPage() {
  return (
    <>

    <div className='border border-[#E3E8EF] rounded-[3px] mb-4'>
        <div>
          <Header/>
        </div>
  
        <div className='p-6 flex flex-col gap-6'>
          <Filter/>

          <Boxes/>
          <BestsellingProducts/>
          <Rating/>
          <ExportingReports/>
        </div>
  
        
        
      </div>
      

    </>
  )
}

export default ReportsPage