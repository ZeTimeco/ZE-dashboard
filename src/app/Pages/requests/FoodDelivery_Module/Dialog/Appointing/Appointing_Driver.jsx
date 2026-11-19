'use client'
import { assignDriverThunk, getDriversThunk, getOrdersThunk } from '@/redux/slice/Requests/RequestsSlice'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'

function Appointing_Driver({open , setOpen , orderID}) {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getDrivers} = useSelector((state)=>state.requests)
  const [selectedDriverId, setSelectedDriverId] = useState(null)
  const [isAssigning, setIsAssigning] = useState(false)

  useEffect(()=>{
    if(open){
      setSelectedDriverId(null)
      dispatch(getDriversThunk())
    }
  },[dispatch, open])

  const handleAssignDriver = async () => {
    if (!selectedDriverId || isAssigning) return

    try {
      setIsAssigning(true)
      await dispatch(
        assignDriverThunk({
          orderId: orderID,
          driver_id: selectedDriverId,
        })
      ).unwrap()

      toast.success(t('Driver assigned successfully') || 'تم تعيين السائق بنجاح')
      setOpen(false)
      dispatch(getOrdersThunk({ page: 1, status: 'preparing' }))
    } catch (error) {
      toast.error(error?.message || error || t('Failed to assign driver') || 'فشل تعيين السائق')
    } finally {
      setIsAssigning(false)
    }
  }

  const StatusRender = (status) => {
    switch (status) {
      case "available": 
        return (
          <div className='bg-[#DCFAE6] border border-[#067647] text-[#067647] w-fit h-9 rounded-3xl'>
            <div className='py-1.5 px-3'>
              <span className='text-sm font-normal'>{t('available')}</span>
            </div>
          </div>
        );
      case "busy": 
        return (
          <div className='bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] w-fit rounded-3xl'>
            <div className='py-1.5 px-3'>
              <span className='text-xs font-normal flex items-center'>{t('busy')}</span>
            </div>
          </div>
        );
      case "offline": 
        return (
          <div className='bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] w-fit h-9 rounded-3xl'>
            <div className='py-1.5 px-3'>
              <span className='text-sm font-normal'>{t('inactive')}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => !isAssigning && setOpen(false)}
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
          <div className='pt-6 px-6 flex justify-end'>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=>setOpen(false)} 
              className='border border-[rgba(102,107,109,0.20)] w-12 h-12 rounded-[58.182px] flex justify-center items-center hover:bg-gray-50 hover:border-[#9AA4B2] transition-colors duration-150 cursor-pointer'
            >
              <img src="/images/icons/xx.svg" alt="" className="w-5 h-5" />
            </motion.button>
          </div>

          <div className='px-6 pb-6'>
            <p className='text-[rgb(54,65,82)] text-xl font-medium'>{t('Appointing a driver')}</p>
            <div className='py-6 flex flex-col gap-4 max-h-[380px] overflow-y-auto px-1'>
              {(!getDrivers || getDrivers.length === 0) ? (
                <div className='text-center py-8 text-[#697586] text-sm'>
                  {t('No drivers available')}
                </div>
              ) : (
                getDrivers?.map((driver, index)=>(
                  <motion.div  
                    key={driver?.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.04 }}
                    whileHover={{ y: -2, boxShadow: "0 4px 14px rgba(0,0,0,0.07)" }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setSelectedDriverId(driver.id)}
                    className={`border p-3 w-full rounded-[3px] cursor-pointer transition-all duration-200 ${
                      selectedDriverId === driver.id 
                        ? "bg-[#FFFDF5] border-[var(--color-primary)] shadow-xs" 
                        : "bg-white border-[#CDD5DF] hover:border-[#9AA4B2]"
                    }`}
                  >
                    {/* status & name */}
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-2'>
                        <p className='text-[#364152] text-base font-medium'>{driver?.name}</p>
                        {selectedDriverId === driver.id && (
                          <motion.img
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 25 }}
                            src="/images/icons/checkmark-circle-yellow.svg"
                            alt="selected"
                            className="w-5 h-5"
                          />
                        )}
                      </div>

                      <div>{StatusRender(driver?.status)}</div>
                    </div>

                    {/* driver details */}
                    <div className='flex flex-wrap gap-6 sm:gap-8 mt-3'>
                      {/* rate */}
                      <p className='flex items-center gap-1'>
                        <img src="/images/icons/star.svg" className="w-5 h-5" />
                        <span className='text-[#4B5565] text-sm font-normal'>{driver?.rating}</span>
                      </p>

                      {/* location */}
                      <p className='flex items-center gap-1'>
                        <img src="/images/icons/location-gray2.svg" className="w-5 h-5" />
                        <span className='text-[#4B5565] text-sm font-normal'>0.5 كم</span>
                      </p>

                      {/* deliveries */}
                      <p className='text-[#4B5565] text-sm font-normal flex items-center'>
                        {driver?.today_deliveries} {t("Today's deliveries")}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <motion.button
              type="button"
              whileHover={selectedDriverId && !isAssigning ? { scale: 1.01, filter: 'brightness(1.05)' } : {}}
              whileTap={selectedDriverId && !isAssigning ? { scale: 0.98 } : {}}
              onClick={handleAssignDriver}
              disabled={!selectedDriverId || isAssigning}
              className={`h-14 w-full mt-4 rounded-[3px] font-medium flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedDriverId && !isAssigning
                  ? "bg-[var(--color-primary)] text-white cursor-pointer shadow-xs hover:shadow-md"
                  : "bg-[#E3E8EF] text-[#9AA4B2] cursor-not-allowed"
              }`}
            >
              {isAssigning ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  <span>{t('Appointing...')}</span>
                </>
              ) : (
                <span>{t("Confirmation of appointment")}</span>
              )}
            </motion.button>
          </div>
        </motion.div>
      </Dialog>  
    </>
  )
}

export default Appointing_Driver