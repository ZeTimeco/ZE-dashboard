'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import OrderPage from './Order/page'
import Products_RequestedPage from './Products_Requested/page'
import Delivery_DetailsPage from './Delivery_Details/page'
import Price_SummaryPage from './Price_Summary/page'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderByIdThunk, AcceptOrderThunk, getOrdersThunk, ReadyOrderThunk } from '@/redux/slice/Requests/RequestsSlice'
import DeleteReservation from '../Delete/DeleteReservation'
import Appointing_Driver from '../Appointing/Appointing_Driver'

function DetailsPage({open , setOpen ,id}) {
  const {t} = useTranslation()
  const [openDeleteReservation , setOpenDeleteReservation] = useState(false)
  const [openAppointing , setOpenAppointing] = useState(false)


  //api
  const dispatch = useDispatch()
  const {getOrderById} = useSelector((state)=>state.requests)
  useEffect(()=>{
    if(id){
      dispatch(getOrderByIdThunk(id))
    }
  },[dispatch , id])

  console.log('getOrderById' , getOrderById);

  const handleAcceptOrder = async () => {
    if (id) {
      const result = await dispatch(AcceptOrderThunk(id))
      if (AcceptOrderThunk.fulfilled.match(result)) {
        dispatch(getOrderByIdThunk(id))
        dispatch(getOrdersThunk({ page: 1, status: 'new' }))
      }
    }
  }

  const handleReadyOrder = async () => {
    if (id) {
      const result = await dispatch(ReadyOrderThunk(id))
      if (ReadyOrderThunk.fulfilled.match(result)) {
        dispatch(getOrderByIdThunk(id))
        dispatch(getOrdersThunk({ page: 1, status: 'preparing' }))
      }
    }
  }

  const StatusBtn = (status) => {
    switch (status) {
      case "new": 
        return (
          <div className='flex gap-6'>
            <button onClick={handleAcceptOrder} className='bg-[var(--color-primary)] text-white h-14 w-full cursor-pointer rounded-[3px]'>{t('Accepting reservation')}</button>
            <button onClick={()=>setOpenDeleteReservation(true)} className='border border-[#F04438] text-[#F04438] h-14 w-full cursor-pointer rounded-[3px]'>{t('Reservation refused')}</button>
          </div>
        );
      case "preparing":
        return (
          <div className='flex gap-6'>
            <button onClick={handleReadyOrder} className='bg-[#17B26A] text-white h-14 w-full cursor-pointer rounded-[3px]'>{t('Order ready')}</button>
            <button onClick={()=>setOpenAppointing(true)} className='bg-[var(--color-primary)] text-white h-14 w-full cursor-pointer rounded-[3px]'>{t('Appointing a driver')}</button>
          </div>
        );
  
    }
  };
  
  

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "rerquest-dialog" }}
      >
        {/* Header */}
        <section className="flex justify-end px-6 mt-6">
          <button
            onClick={()=>setOpen(false)}
            className="border border-[#CDD5DF] w-12 h-12 cursor-pointer rounded-[100px] flex justify-center items-center"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
          </button>
        </section>

        {/* title */}
        <section className="my-4 flex px-6 justify-between  ">
          <div className='flex flex-col gap-3  '>
            <p className="text-[#364152] text-xl font-medium ">
              {t("Order details")}
            </p>
            <p className="text-[#4B5565] text-sm font-normal ">
              {t("Full details explaining the status and contents of the order")}
            </p>
          </div>

          <div className=' flex items-center '>
            <button
              className='flex gap-2 border border-[var(--color-primary)] rounded-[3px]  px-4 py-2.5 cursor-pointer'
            >
              <img src="/images/icons/Activity log.svg" className="w-6 h-6" />
              <p className='text-[var(--color-primary)] text-base font-normal'>{t('Activity log')}</p>
            </button>

          </div>
        </section>

        <span className="border-[0.5px] border-[#E3E8EF]" />

        <section className='p-6 flex flex-col gap-4'>
          <OrderPage getOrderById={getOrderById}/>
          <Products_RequestedPage getOrderById={getOrderById}/>
          <Delivery_DetailsPage getOrderById={getOrderById}/>
          <Price_SummaryPage getOrderById={getOrderById}/>
        </section>

        <section className='px-6 pb-6'>
          {StatusBtn(getOrderById?.data?.status)}
        </section>
      </Dialog>

      <DeleteReservation
        open={openDeleteReservation}
        setOpen={setOpenDeleteReservation}
        orderID={id}
        setDetailsOpen={setOpen}
      />

      <Appointing_Driver
        open={openAppointing}
        setOpen={setOpenAppointing}
        orderID={id}
      />
    </>

  )
}

export default DetailsPage