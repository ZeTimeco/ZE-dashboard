'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import FirstSection from './FirstSection'
import SecondSection from './SecondSection'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetailsThunk } from '@/redux/slice/Menus/MenusSlice'
import Delete from './Dialog/Delete/Delete'

function DetailsPage({open , setOpen ,itemId}) {
  const {t} = useTranslation()
  const router = useRouter()

  const dispatch = useDispatch()
  const {getProductDetails} = useSelector((state)=>state.Menus)
  useEffect(()=>{
    if(itemId){
      dispatch(getProductDetailsThunk(itemId))
    }

  },[dispatch , itemId])

  console.log('getProductDetails' , getProductDetails );

  const[openDelete , setOpenDelete] = useState(false)
  return (
    <>
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <button
          onClick={()=>setOpen(false)}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </button>
      </section>
      
      <p className='text-[#364152] text-xl font-medium px-6'>{t('Product details')}</p>
      <div className='border border-[#CDD5DF] my-5'></div>

      <div className='px-6'>
        <FirstSection  getProductDetailsData={getProductDetails?.data} />
        <SecondSection getProductDetailsData={getProductDetails?.data} />
      </div>

        {/* btn */}
      <div className='px-6 grid grid-cols-2 gap-6 mb-6'>

        <button onClick={()=>setOpenDelete(true)} className='border border-[#B42318] text-[#B42318] w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('delete')}
        </button>

        <button 
          onClick={()=>{router.push(`/Pages/Menus/FoodDelivery_Module/Products/Edit?id=${getProductDetails?.data?.id}`)}}
          className='bg-[var(--color-primary)] text-white w-full text-base font-medium py-3 px-6 rounded-[3px]  cursor-pointer'>
          {t('modification')}
        </button>

      </div>
      

    </Dialog>
      
      <Delete
        open={openDelete}
        setOpen={setOpenDelete}
        itemId={itemId}
        setOpenDetails={setOpen}
      />

    </>
  )
}

export default DetailsPage