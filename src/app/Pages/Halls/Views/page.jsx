'use client'
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { Suspense, useEffect, useState } from 'react'
import No_Views_Add from './No_Views_Add'
import CardOfViews from './CardOfViews'
import { useTranslation } from 'react-i18next'
import AddPage from './Add/page'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'next/navigation'
import { deleteViewThunk, getViewsThunk, toggleViewsThunk } from '@/redux/slice/Halls/HallsSlice'
import { motion } from 'framer-motion'

function ViewsContent() {
  const {t} = useTranslation()

  const [openAdd , setOpenAdd] = useState(false)

  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  console.log(id);
    
  //api
  const dispatch = useDispatch()
  const {getViews} = useSelector((state)=>state.halls)
  useEffect(()=>{
    if(id){
      dispatch(getViewsThunk(id))
    }
  },[dispatch , id])

  const handleDelete = async (viewId) => {
    const result = await dispatch(deleteViewThunk(viewId))
    if (!result.error) {
      dispatch(getViewsThunk(id))
    }
  }

  const handleToggle = async (viewId) => {
    const result = await dispatch(toggleViewsThunk(viewId))
    if (!result.error) {
      dispatch(getViewsThunk(id))
    }
  }
  // console.log('getViews',getViews);
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* header */}
        <div className="flex justify-between mb-8">
          <div>
            <p className='text-[#364152] text-2xl font-medium'>{t("Lounge view")}</p>
            <p className='text-[#697586] text-xl font-normal'>{t("Identifying aspects of the showroom offered to customers")}</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={()=>setOpenAdd(true)}
            className='lg1:w-[20%] w-[30%] h-14 flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:opacity-95 hover:shadow-md transition-all duration-200 text-white cursor-pointer rounded-[3px]'
          >
            <span>
              <img src="/images/icons/AddIcon.svg" alt="" />
            </span>
            <span>{t('Add new view')}</span>
          </motion.button>
        </div>

        {/* cards */}
        <div className='border border-[#E3E8EF] py-8 px-6 rounded-[3px] transition-shadow duration-300'>
          <CardOfViews getViews={getViews} handleDelete={handleDelete} handleToggle={handleToggle} refreshViews={() => dispatch(getViewsThunk(id))}/>
        </div>
      </motion.div>

      <AddPage
        open={openAdd}
        setOpen={setOpenAdd}
        Hallid = {id}
      />
    </MainLayout>
  )
}



export default function ViewsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ViewsContent />
    </Suspense>
  );
}