"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect, useState, Suspense } from 'react'
import NavRequest from './NavRequest'
import CardOfRequest from './CardOfRequest'
import Pagination from './Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBookingPropertyThunk } from '@/redux/slice/Requests/RequestsSlice'
import Loader from '@/app/Components/Loader/Loader'

function Property_ModulePage() {

  const dispatch = useDispatch()
  const { getBooking, getBookingPagination } = useSelector((state) => state.requests)

  const [filters, setFilters] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
 
  useEffect(() => {
    dispatch(getAllBookingPropertyThunk({ ...filters, page: currentPage, per_page: 10 }))
  }, [dispatch, filters, currentPage])

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const hasActiveFilters = Object.values(filters).some(v =>
    Array.isArray(v) ? v.length > 0 : v !== '' && v !== undefined && v !== null
  )

  return (
    <MainLayout>
      <Suspense fallback={<div><Loader/></div>}>
        <NavRequest onApplyFilters={handleApplyFilters}/>

        <div className='grid grid-cols-2 lg1:grid-cols-3 gap-6'>
          <CardOfRequest getBooking={getBooking} hasActiveFilters={hasActiveFilters}/>
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={getBookingPagination?.total_pages || 1}
          onPageChange={handlePageChange}
        />
      </Suspense>
    </MainLayout>
  )
}

export default Property_ModulePage