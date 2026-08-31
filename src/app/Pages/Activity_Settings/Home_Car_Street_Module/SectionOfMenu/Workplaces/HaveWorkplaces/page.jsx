'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import MapDialog from '../Dialog/MapDialog'
import { useTranslation } from 'react-i18next'
import DeleteDialog from '../Dialog/DeleteDialog'

function HaveWorkplacesPage({Workplaces}) {
  const {t} = useTranslation()
  const [openMap, setOpenMap] = useState(false)
  const [openDelete , setOpenDelete] = useState(false)
  const [selectedAreaId, setSelectedAreaId] = useState(null)
    
  return (
    < >
      <div className='grid grid-cols-1 lg1:grid-cols-2 gap-4 px-6 pt-6'>
        {Workplaces?.areas?.map((Workplace ,index)=>(
          <motion.section 
            key={Workplace?.id || index}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.04 }}
            whileHover={{ y: -2, boxShadow: "0 4px 16px rgba(0,0,0,0.06)", borderColor: "#B2BAC6" }}
            className='flex justify-between items-center border border-[#CDD5DF] py-4 px-4 rounded-lg bg-white transition-all duration-200 shadow-2xs'
          >
            <div className='flex gap-2.5 items-center'>
              <p className='flex items-center justify-center w-7 h-7 bg-amber-50 rounded-full'>
                <img src="/images/icons/location.svg" alt="" className='w-4 h-4' />
              </p>
              <div className='flex gap-2 text-[#364152] text-base font-medium items-center'>
                <p>{Workplace?.city}</p>
                <p className='flex items-center'>
                  <img src="/images/icons/Ellipse.svg" alt="" className='w-1.5 h-1.5 opacity-60' />
                </p>
                <p className='text-[#697586] font-normal'>{Workplace?.state}</p>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className='cursor-pointer p-1 text-slate-400 hover:text-red-500 rounded-full transition-colors' 
              onClick={()=>{setSelectedAreaId(Workplace?.id); setOpenDelete(true)}}
            >
              <img src="/images/icons/xxxx.svg" alt="remove" className='w-4 h-4' />
            </motion.button>
          </motion.section>
        ))}
      </div>

      <div className='px-6'>
        <motion.button 
          whileHover={{ scale: 1.02, filter: 'brightness(1.05)' }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setOpenMap(true)}
          className='flex items-center justify-center gap-2 w-full sm:w-[50%] lg1:w-[30%] h-14 bg-[var(--color-primary)] text-white rounded-[4px] cursor-pointer my-6 font-semibold shadow-xs transition-all'
        >
          <span>{t('Add a place')}</span>
          <img src="/images/icons/AddIcon.svg" alt="" className='w-5 h-5'/>
        </motion.button>
      </div>
      
      <MapDialog open={openMap} handleClose={() => setOpenMap(false)} />
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} areaId={selectedAreaId}/>
    </>
  )
}

export default HaveWorkplacesPage