'use client'
import React, { Suspense, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import NavRequest from './NavRequest'
import TableRequest from './TableRequest'
import Pagination from './Pagination'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getBookingsThunk } from '@/redux/slice/Requests/RequestsSlice'
import Loader from '@/app/Components/Loader/Loader'

function RequestsPage() {
  const dispatch = useDispatch()
  const {bookings ,bookingDetails, loading , error, pagination } =useSelector((state)=>state.requests)
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(()=>{
    const fetchBookings = () => {
      dispatch(getBookingsThunk({ page: currentPage, ...filters }))
    }

    fetchBookings()

    window.addEventListener('booking_updated', fetchBookings)

    return () => {
      window.removeEventListener('booking_updated', fetchBookings)
    }
  },[dispatch, currentPage, filters])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setFilters({})
    setCurrentPage(1)
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0.1, 0.25, 1],
        staggerChildren: 0.1
      }
    }
  }

  return (
    <MainLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <NavRequest 
          onApplyFilters={handleApplyFilters} 
          onResetFilters={handleResetFilters} 
          onSearch={setSearchTerm}
        />

        <Suspense fallback={<Loader />}>
          <TableRequest bookings={bookings} bookingDetails={bookingDetails} searchTerm={searchTerm}/>
        </Suspense>
        
        <Pagination
          totalPages={pagination?.last_page || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </motion.div>
    </MainLayout>
  )
}

export default RequestsPage