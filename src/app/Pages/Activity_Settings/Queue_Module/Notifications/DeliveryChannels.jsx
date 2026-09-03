'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function DeliveryChannels({formData , setFormData}) {
    const {t} = useTranslation() 
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className='shadow-[0_0_4px_0_rgba(0,0,0,0.20)] p-4'
      >
        <p className='text-[#364152] text-base font-medium'>{t('Delivery channels')}</p>

        {/* notify_reservation_channel */}
        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Booking confirmation')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/* app  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reservation_channel:prev.notify_reservation_channel==='app' ? " " :'app'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reservation_channel==='app' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reservation_channel==='app'
                ? "/images/icons/notification-yellow.svg" 
                :"/images/icons/notification-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('pay')}</p>
            </motion.button>

            {/*sms  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reservation_channel:prev.notify_reservation_channel==='sms' ? " " :'sms'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reservation_channel==='sms' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reservation_channel==='sms'
                ? "/images/icons/smart-phone-yellow.svg" 
                :"/images/icons/smart-phone-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('text message')}</p>
            </motion.button>

            {/* email */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reservation_channel:prev.notify_reservation_channel==='email' ? " " :'email'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reservation_channel==='email' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reservation_channel==='email'
                ? "/images/icons/mail-yellow.svg" 
                :"/images/icons/mail-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('mail')}</p>
            </motion.button>
          </div>
        </div>

        {/* notify_waitlist_channel */}
        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Ready-made table notice')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/* app  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_waitlist_channel:prev.notify_waitlist_channel==='app' ? " " :'app'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_waitlist_channel==='app' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_waitlist_channel==='app'
                ? "/images/icons/notification-yellow.svg" 
                :"/images/icons/notification-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('pay')}</p>
            </motion.button>

            {/*sms  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_waitlist_channel:prev.notify_waitlist_channel==='sms' ? " " :'sms'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_waitlist_channel==='sms' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_waitlist_channel==='sms'
                ? "/images/icons/smart-phone-yellow.svg" 
                :"/images/icons/smart-phone-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('text message')}</p>
            </motion.button>

            {/* email */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_waitlist_channel:prev.notify_waitlist_channel==='email' ? " " :'email'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_waitlist_channel==='email' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_waitlist_channel==='email'
                ? "/images/icons/mail-yellow.svg" 
                :"/images/icons/mail-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('mail')}</p>
            </motion.button>
          </div>
        </div>

        {/* notify_reminders_channel */}
        <div className='mt-4'>
          <p className='text-[#364152] text-sm font-normal'>{t('Provider alerts')}</p>
          <div className='grid grid-cols-3 gap-4 mt-3'>
            {/* app  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reminders_channel:prev.notify_reminders_channel==='app' ? " " :'app'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reminders_channel==='app' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reminders_channel==='app'
                ? "/images/icons/notification-yellow.svg" 
                :"/images/icons/notification-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('pay')}</p>
            </motion.button>

            {/*sms  */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reminders_channel:prev.notify_reminders_channel==='sms' ? " " :'sms'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reminders_channel==='sms' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reminders_channel==='sms'
                ? "/images/icons/smart-phone-yellow.svg" 
                :"/images/icons/smart-phone-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('text message')}</p>
            </motion.button>

            {/* email */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>{
                setFormData((prev)=>({
                  ...prev,
                  notify_reminders_channel:prev.notify_reminders_channel==='email' ? " " :'email'
                }))
              }}
              className={`border flex justify-center items-center gap-3 h-14 rounded-[3px] cursor-pointer transition-all duration-200
                ${formData?.notify_reminders_channel==='email' 
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)] bg-[#FFFDF5]' 
                  : 'border-[#E3E8EF] text-[#4B5565] hover:border-[#9AA4B2] hover:bg-gray-50/60'
                }
              `}>
              <img src={
                formData?.notify_reminders_channel==='email'
                ? "/images/icons/mail-yellow.svg" 
                :"/images/icons/mail-gray.svg" 
                } 
                className="w-5 h-5" 
              />
              <p className=' text-sm font-normal'>{t('mail')}</p>
            </motion.button>
          </div>
        </div>

      </motion.div>

    </>
  )
}

export default DeliveryChannels