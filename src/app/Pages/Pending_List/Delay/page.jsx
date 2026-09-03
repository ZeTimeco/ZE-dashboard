"use client"
import { delayWaitlistThunk } from '@/redux/slice/Pending_List/Pending_ListSlice'
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { motion } from 'framer-motion'

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: 'easeOut', delay: i * 0.06 },
  }),
}

function DelayPage({open , setOpen , guestID , guestDetails }) {
  const{t} = useTranslation()
  const dispatch = useDispatch();

  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);

  const DelayTime = [
    {name:5 , value:5},
    {name:10 , value:10},
    {name:15 , value:15},
    {name:20 , value:20},
  ]

  const DelayReason = [
    {id:1 , name:t("It hasn't arrived yet.") , value:'did_not_arrive'},
    {id:2 , name:t("Request for postponement") , value:'asked_for_delay'},
    {id:3 , name:t("No response") , value:'do_not_answer'},
    {id:4 , name:t("Another reason") , value:'other'},
  ]

  const [formData , setFormData] = useState({
    delay_time:'',
    reason:'',
  })

  const handleSubmit = async () => {
    try {
      await dispatch(
        delayWaitlistThunk({
          reservation_id: guestID,
          delay_time: formData.delay_time,
          reason: formData.reason,
        })
      ).unwrap();
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log('formData', formData);

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
        <p className="text-[#364152] text-2xl font-medium mb-3">{t("Guest delay")}</p>
      </motion.section>
      <span className="border-[0.5px] border-[#E3E8EF]" />

      <div className='p-6'>
        <motion.section
          className='bg-[#F8FAFC] border border-[#EEF2F6] p-3 rounded-[3px] mb-4 flex gap-1'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
        >
          <img src="/images/icons/user_gray.svg" alt="" />
          <p className='text-[#697586] text-base font-normal'>{t('guest')} : </p>
          <p className='text-[#364152] text-base font-normal'>{guestDetails?.guest_name}</p>
        </motion.section>

        {/* Delay period */}
        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
        >
          <p className='font-normal'>
            <span className='text-[#364152] text-base'>{t('Delay period')}</span>
          </p>
          <div className='grid grid-cols-2 gap-4 my-1.5'>
            {DelayTime?.map((item, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
                onClick={() => {
                  setSelectedTime(index)
                  setFormData((prev) => ({ ...prev, delay_time: item?.value }))
                }}
                className={`py-2.5 px-2 flex gap-2 justify-center items-center rounded-[3px] cursor-pointer border transition-all duration-200 ${
                  selectedTime === index
                    ? 'border-[var(--color-primary)] bg-[#FFFDF5]'
                    : 'border-[#E3E8EF] hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <img src="/images/icons/clock-gray.svg" alt="" />
                <p className='text-[#364152] text-base font-normal'>{item?.name} دقائق</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* the reason */}
        <motion.div
          className='mt-4'
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.15 }}
        >
          <p className='font-normal'>
            <span className='text-[#364152] text-base'>{t('the reason')}</span>
          </p>
          <div className='grid grid-cols-1 gap-4 my-1.5'>
            {DelayReason?.map((item, index) => (
              <motion.div
                key={item?.id}
                custom={index}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ scale: 1.01, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.99, transition: { duration: 0.1 } }}
                onClick={() => {
                  setSelectedReason(item.id)
                  setFormData((prev) => ({ ...prev, reason: item?.value }))
                }}
                className={`py-2.5 px-2 flex items-center rounded-[3px] cursor-pointer border transition-all duration-200 ${
                  selectedReason === item.id
                    ? 'border-[var(--color-primary)] bg-[#FFFDF5]'
                    : 'border-[#E3E8EF] bg-white hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <p className='text-[#364152] text-base font-normal'>{item?.name}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* buttons */}
        <motion.section
          className="w-full flex gap-3 mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.22 }}
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
            onClick={handleSubmit}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 4px 16px 0 rgba(var(--color-primary-rgb,158,122,17),0.25)',
              transition: { duration: 0.18 },
            }}
            whileTap={{ scale: 0.97, transition: { duration: 0.1 } }}
            className="w-full h-14 bg-[var(--color-primary)] text-white rounded-[3px] cursor-pointer transition-opacity duration-200 hover:opacity-90"
          >
            {t('Delay confirmed')}
          </motion.button>
        </motion.section>
      </div>
    </Dialog>
  )
}

export default DelayPage