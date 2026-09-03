'use client'
import { assignDriverThunk, getDriversThunk } from '@/redux/slice/Requests/RequestsSlice'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'

function Appointing_Driver({open , setOpen , orderID}) {
  const {t} = useTranslation()
  //api
  const dispatch = useDispatch()
  const {getDrivers} = useSelector((state)=>state.requests)
  useEffect(()=>{
    if(open){
      dispatch(getDriversThunk())
    }
  },[dispatch, open])

  const handleAssignDriver = async () => {
    if (!selectedDriverId) return;

    const result = await dispatch(
      assignDriverThunk({
        orderId: orderID,
        driver_id: selectedDriverId,
      })
    );

    if (assignDriverThunk.fulfilled.match(result)) {
      setOpen(false);
    }
  };

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

  const [selectedDriverId, setSelectedDriverId] = useState(null);

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
          <div className='py-6 flex flex-col gap-4'>
            {getDrivers?.map((driver)=>(
              <motion.div  
                key={driver?.id}
                whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.06)" }}
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
            ))}
            
            <motion.button
              whileHover={selectedDriverId ? { scale: 1.01 } : {}}
              whileTap={selectedDriverId ? { scale: 0.98 } : {}}
              onClick={handleAssignDriver}
              disabled={!selectedDriverId}
              className={`h-14 w-full mt-4 rounded-[3px] font-medium transition-all duration-200 ${
                selectedDriverId
                  ? "bg-[var(--color-primary)] text-white cursor-pointer hover:opacity-95 hover:shadow-md"
                  : "bg-[#E3E8EF] text-[#9AA4B2] cursor-not-allowed"
              }`}
            >
              {t("Confirmation of appointment")}
            </motion.button>
          </div>
        </div>
      </Dialog>  
    </>
  )
}

export default Appointing_Driver