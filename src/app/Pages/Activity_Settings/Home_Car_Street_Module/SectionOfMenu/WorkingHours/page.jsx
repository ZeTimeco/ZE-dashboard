import React, { Suspense } from 'react'
import Header from './Header'
import DayAndTime from './DayAndTime'
import Loader from '@/app/Components/Loader/Loader'

function WorkingHoursPage() {
  return (
    <>
    <Suspense fallback={<Loader />}>
      <div className="border border-[#E3E8EF] mb-8">
        <Header/>
        <DayAndTime/>
      </div>
    </Suspense>
    </>
  )
}

export default WorkingHoursPage