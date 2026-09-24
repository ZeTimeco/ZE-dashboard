'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useEffect } from 'react'
import No_WorkPlaces from './No_WorkPlaces'
import Locations from './Locations'
import { useDispatch, useSelector } from 'react-redux'
import { getCoverageAreasThunk } from '@/redux/slice/Setting/SettingSlice'

function WorkplacesPage() {
  const dispatch = useDispatch()
  const { getCoverageAreas, loading } = useSelector((state) => state.setting)

  useEffect(() => {
    dispatch(getCoverageAreasThunk())
  }, [dispatch])

  const areasList = Array.isArray(getCoverageAreas)
    ? getCoverageAreas
    : Array.isArray(getCoverageAreas?.data)
    ? getCoverageAreas.data
    : Array.isArray(getCoverageAreas?.data?.data)
    ? getCoverageAreas.data.data
    : []

  return (
    <MainLayout>
      {loading && (!getCoverageAreas || areasList.length === 0) ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      ) : areasList.length === 0 ? (
        <No_WorkPlaces />
      ) : (
        <Locations getCoverageAreas={areasList} />
      )}
    </MainLayout>
  )
}

export default WorkplacesPage