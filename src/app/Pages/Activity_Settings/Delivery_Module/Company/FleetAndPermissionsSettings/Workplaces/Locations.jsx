'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { DeleteCoverageAreasThunk, getCoverageAreasThunk } from '@/redux/slice/Setting/SettingSlice'
import Delete from './Dialog/Delete'

function Locations({ getCoverageAreas }) {
  const { t } = useTranslation()
  const router = useRouter()
  const dispatch = useDispatch()
  const [pendingDeleteId, setPendingDeleteId] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const areasList = Array.isArray(getCoverageAreas)
    ? getCoverageAreas
    : Array.isArray(getCoverageAreas?.data)
    ? getCoverageAreas.data
    : Array.isArray(getCoverageAreas?.data?.data)
    ? getCoverageAreas.data.data
    : []

  const handleDelete = async (id) => {
    if (!id) return
    try {
      setIsDeleting(true)
      await dispatch(DeleteCoverageAreasThunk(id)).unwrap()
      toast.success(t('Workplace deleted successfully'))
      dispatch(getCoverageAreasThunk())
    } catch (error) {
      toast.error(error?.message || error?.data?.message || t('Failed to delete workplace'))
    } finally {
      setIsDeleting(false)
      setPendingDeleteId(null)
    }
  }

  return (
    <>
      <h1 className='text-[#364152] text-2xl font-medium mb-6'>{t('Workplaces')}</h1>
      <div className='border border-[#CDD5DF] p-6 rounded-3px'>
        <div className='grid grid-cols-2 gap-6'>
          <AnimatePresence>
            {areasList?.map((wp) => (
              <motion.div
                key={wp.id || wp._id}
                className='border border-[#E7E7E7] rounded-lg p-4 bg-white flex items-start justify-between gap-3 shadow-sm hover:shadow-md transition-shadow'
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                {/* Icon + Address */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="flex items-center justify-center shrink-0 mt-0.5">
                    <img src="/images/icons/location.svg" alt="" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-[#364152] text-base font-semibold truncate">
                      {wp.city && wp.area ? `${wp.city} - ${wp.area}` : (wp.city || wp.area || wp.address || '')}
                    </span>
                    {wp.address && (
                      <span className="text-[#697586] text-xs font-normal truncate mt-0.5" title={wp.address}>
                        {wp.address}
                      </span>
                    )}
                  </div>
                </div>

                {/* Delete button */}
                <div className=' '>
                  <motion.button
                    type="button"
                    className="cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setPendingDeleteId(wp.id || wp._id)}
                  >
                    <img src="/images/icons/xxxx.svg" className="w-6 h-6" alt="delete" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* btn */}
      <div className='flex justify-between my-6'>
        <button
          onClick={() => router.push(`/Pages/Activity_Settings/Delivery_Module`)}
          className={`flex gap-2 justify-center items-center bg-primary w-[20%] h-14 rounded-3px px-3 cursor-pointer`}
        >
          <span className="text-white text-base font-medium">{t('Return')}</span>
        </button>

        <button
          onClick={() => router.push(`/Pages/Activity_Settings/Delivery_Module/Company/FleetAndPermissionsSettings/Workplaces/Add`)}
          className={`flex gap-2 justify-center items-center bg-primary w-[20%] h-14 rounded-3px px-3 cursor-pointer`}
        >
          <span className="text-white text-base font-medium">{t('Add a place')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
        </button>
      </div>

      {/* Delete confirmation dialog */}
      <Delete
        isOpen={pendingDeleteId !== null}
        loading={isDeleting}
        onConfirm={() => handleDelete(pendingDeleteId)}
        onCancel={() => !isDeleting && setPendingDeleteId(null)}
      />
    </>
  )
}

export default Locations