'use client'
import { Dialog } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { RejectOrderThunk, getOrdersThunk } from '@/redux/slice/Requests/RequestsSlice';

function DeleteReservation({open , setOpen ,orderID, setDetailsOpen}) {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    
    const handleRejectOrder = async () => {
        const result = await dispatch(RejectOrderThunk(orderID));
        if (RejectOrderThunk.fulfilled.match(result)) {
            setOpen(false);
            if (setDetailsOpen) {
                setDetailsOpen(false);
            }
            dispatch(getOrdersThunk({ page: 1, status: 'new' }));
        }
    };

  return (
    <>

    <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "ServiceDeletePage-dialog",
        }}
      >
        <div className='pt-6 px-6'>
          <button 
            onClick={()=>setOpen(false)} 
            className='border border-[rgba(102,107,109,0.20)] w-12 h-12  rounded-[58.182px] flex justify-center items-center'
          >
            <img src="/images/icons/xx.svg" alt="" />
          </button>
        </div>
  
  
        <div className='flex flex-col  items-center mb-6'>
          <p className='text-[#4B5565] text-lg font-medium mb-2'>
            {t('Are you sure this request will be rejected?')}
          </p>
          <p className='text-[#364152] text-lg font-semibold w-97 text-center '>
            #{orderID}
          </p>
        </div>
  
        <div className="w-full h-px bg-[#CDD5DF] "></div>
  
        <section className='w-full flex p-6 gap-3'>
          <button 
            onClick={handleRejectOrder}
            className='w-full  bg-[#D92D20] text-white  h-13.5  rounded-[3px] '
          >
            <span className='text-base font-medium'>{t('Confirmation of rejection')}</span>
          </button>
          <button
            onClick={()=>setOpen(false)}
            className='w-full border border-[#697586] text-[#4B5565]  h-13.5  rounded-[3px] '>
            <span className='text-base font-normal'>{t('cancel')}</span>
          </button>
  
        
        </section>
  
  
  
  
      </Dialog>

    </>
  )
}

export default DeleteReservation