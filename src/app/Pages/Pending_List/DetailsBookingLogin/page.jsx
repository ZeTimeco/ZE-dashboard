'use client'
import { Dialog } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SeatingDetails from './SeatingDetails'
import GuestInformation from './GuestInformation'
import { useDispatch, useSelector } from 'react-redux'
import { getScanWaitlistThunk, seatedWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

function DetailsBookingLoginPage({open , setOpen ,guestID, refresh ,token}) {
  const {t} = useTranslation()

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  console.log('token===', token);

  const handleSeated = async () => {
    try {
      setLoading(true)
      const payload = { reservation_id: guestID }
      await dispatch(seatedWaitlistThunk(payload)).unwrap()
      toast.success(t('Guest seated successfully'))
      setOpen(false)
      if (refresh) refresh()
    } catch (error) {
      console.error(error)
      toast.error(error?.message || t('Failed to seat guest'))
    } finally {
      setLoading(false)
    }
  }

  const {getScanWaitlist} = useSelector((state)=>state.PendingList)
  useEffect(() => {
    if (token) {
      dispatch(getScanWaitlistThunk({ qr_token: token }));
    }
  }, [dispatch, token]);

  console.log('getScanWaitlist+++++++', getScanWaitlist);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      PaperProps={{ className: "rerquest-dialog" }}
    >
      {/* header */}
      <section className="flex justify-end px-6 mt-6">
        <motion.button
          onClick={() => setOpen(false)}
          whileHover={{ scale: 1.08, rotate: 5, transition: { duration: 0.18 } }}
          whileTap={{ scale: 0.93, transition: { duration: 0.1 } }}
          className="border border-[#CDD5DF] w-12 h-12 rounded-[100px] flex justify-center items-center cursor-pointer transition-colors duration-200 hover:bg-[#f3f4f6]"
        >
          <img src="/images/icons/xx.svg" alt="" className="w-6 h-6" />
        </motion.button>
      </section>

      <motion.section
        className="mt-4 px-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Booking Login")}</p>
      </motion.section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <div className='p-6'>
        <motion.div
          className='border border-[#17B26A] bg-[#ECFDF3] p-4 flex gap-3 rounded-[3px]'
          initial={{ opacity: 0, scale: 0.97, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className='flex items-center'>
            <motion.p
              className='w-10 h-10 bg-[#17B26A] rounded-full flex justify-center items-center'
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
            >
              <img src="/images/icons/checkmark-circle.svg" className="w-6 h-6" alt="" />
            </motion.p>
          </div>
          <div className='flex flex-col gap-2'>
            <p className='text-[#364152] text-base font-medium'>{t('The code was successfully verified.')}</p>
            <p className='text-[#4B5565] text-sm font-normal'>{t('The booking was found')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.08 }}
        >
          <GuestInformation getScanWaitlist={getScanWaitlist} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.14 }}
        >
          <SeatingDetails getScanWaitlist={getScanWaitlist} />
        </motion.div>

        {/* buttons */}
        <motion.div
          className="w-full flex gap-3 mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
        >
          <motion.button
            onClick={() => setOpen(false)}
            whileHover={{ scale: 1.02, transition: { duration: 0.18 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            className="w-full h-14 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] cursor-pointer transition-colors duration-200 hover:bg-[#fffdf5]"
          >
            {t('cancel')}
          </motion.button>

          <motion.button
            onClick={handleSeated}
            disabled={loading}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
              transition: { duration: 0.18 },
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer transition-opacity duration-200 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? t('Loading...') : t('Successfully seated')}
          </motion.button>
        </motion.div>
      </div>
    </Dialog>
  )
}

export default DetailsBookingLoginPage