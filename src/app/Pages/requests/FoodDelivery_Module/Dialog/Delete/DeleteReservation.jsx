'use client'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { RejectOrderThunk, getOrdersThunk } from '@/redux/slice/Requests/RequestsSlice'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'

function DeleteReservation({open , setOpen ,orderID, setDetailsOpen}) {
  const {t} = useTranslation()
  const dispatch = useDispatch()
  const [isRejecting, setIsRejecting] = useState(false)
  
  const handleRejectOrder = async () => {
    if (!orderID || isRejecting) return
    try {
      setIsRejecting(true)
      await dispatch(RejectOrderThunk(orderID)).unwrap()
      toast.success(t('Order rejected successfully') || 'تم رفض الطلب بنجاح')
      setOpen(false)
      if (setDetailsOpen) {
        setDetailsOpen(false)
      }
      dispatch(getOrdersThunk({ page: 1, status: 'new' }))
    } catch (error) {
      toast.error(error?.message || error || t('Failed to reject order') || 'فشل رفض الطلب')
    } finally {
      setIsRejecting(false)
    }
  }

  return (
    <>
      <Dialog
        open={open}
        onClose={() => !isRejecting && setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "ServiceDeletePage-dialog",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <div className='pt-6 px-6'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>setOpen(false)} 
              disabled={isRejecting}
              className='border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-[58.182px] flex justify-center items-center hover:bg-gray-50 transition-colors cursor-pointer'
            >
              <img src="/images/icons/xx.svg" alt="" />
            </motion.button>
          </div>
    
          <div className='flex flex-col items-center mb-6 px-6'>
            <p className='text-[#4B5565] text-lg font-medium mb-2 text-center'>
              {t('Are you sure this request will be rejected?')}
            </p>
            <p className='text-[#364152] text-xl font-semibold text-center'>
              #{orderID}
            </p>
          </div>
    
          <div className="w-full h-px bg-[#CDD5DF]"></div>
    
          <section className='w-full flex p-6 gap-3'>
            <motion.button 
              type="button"
              whileHover={!isRejecting ? { scale: 1.02 } : {}}
              whileTap={!isRejecting ? { scale: 0.98 } : {}}
              onClick={handleRejectOrder}
              disabled={isRejecting}
              className={`w-full bg-[#D92D20] text-white h-13.5 rounded-[3px] font-medium flex items-center justify-center gap-2 cursor-pointer shadow-xs transition-all ${
                isRejecting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#B42318]'
              }`}
            >
              {isRejecting ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>{t('Rejecting...')}</span>
                </>
              ) : (
                <span>{t('Confirmation of rejection')}</span>
              )}
            </motion.button>

            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpen(false)}
              disabled={isRejecting}
              className='w-full border border-[#697586] text-[#4B5565] h-13.5 rounded-[3px] font-normal hover:bg-gray-50 transition-colors cursor-pointer'
            >
              <span>{t('cancel')}</span>
            </motion.button>
          </section>
        </motion.div>
      </Dialog>
    </>
  )
}

export default DeleteReservation