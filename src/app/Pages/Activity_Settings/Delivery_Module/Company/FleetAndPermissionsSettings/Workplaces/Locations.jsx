'use client'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import No_WorkPlaces from './No_WorkPlaces'
import Delete from './Dialog/Delete'

function Locations() {
  const { t } = useTranslation()
  const router = useRouter()
  const [workplaces, setWorkplaces] = useState([])
  const [pendingDeleteId, setPendingDeleteId] = useState(null)

  /* قراءة العناوين من localStorage */
  useEffect(() => {
    const load = () => {
      const data = JSON.parse(localStorage.getItem('workplaces') || '[]')
      setWorkplaces(data)
    }
    load()
    window.addEventListener('focus', load)
    return () => window.removeEventListener('focus', load)
  }, [])

  const handleDelete = (id) => {
    const updated = workplaces.filter((w) => w.id !== id)
    localStorage.setItem('workplaces', JSON.stringify(updated))
    setWorkplaces(updated)
    setPendingDeleteId(null)
  }

  if (workplaces.length === 0) {
    return (
      <No_WorkPlaces/>
    )
  }

  return (
    <>
      <h1 className='text-[#364152] text-2xl font-medium mb-6'>{t('Workplaces')}</h1>
      <div className='border border-[#CDD5DF] p-6 rounded-3px'>
        <div className='grid grid-cols-2 gap-6'>
          <AnimatePresence>
            {workplaces.map((wp) => (
              <motion.div
                key={wp.id}
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
                    
                    {(wp.country || wp.city) && (
                      <p className="text-[#364152] font-normal text-base mt-0.5" dir="rtl">
                        {[wp.city, wp.country].filter(Boolean).join('، ')}
                      </p>
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
                    onClick={() => setPendingDeleteId(wp.id)}
                  >
                  <img src="/images/icons/xxxx.svg" className="w-6 h-6" />
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
          onClick={()=>router.push(`/Pages/Activity_Settings/Delivery_Module`)}
          className={`flex gap-2 justify-center items-center  bg-primary w-[20%] h-14 rounded-3px px-3 cursor-pointer`}
        >
          <span className="text-white text-base font-medium">{t('Return')}</span>
        </button>

        <button
          onClick={()=>router.push(`/Pages/Activity_Settings/Delivery_Module/Company/FleetAndPermissionsSettings/Workplaces/Add`)}
          className={`flex gap-2 justify-center items-center  bg-primary w-[20%] h-14 rounded-3px px-3 cursor-pointer`}
        >
          <span className="text-white text-base font-medium">{t('Add a place')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className="w-6 h-6" />
        </button>
      </div>
    
      {/* Delete confirmation dialog */}
      <Delete
        isOpen={pendingDeleteId !== null}
        onConfirm={() => handleDelete(pendingDeleteId)}
        onCancel={() => setPendingDeleteId(null)}
      />
    </>
  )
}

export default Locations