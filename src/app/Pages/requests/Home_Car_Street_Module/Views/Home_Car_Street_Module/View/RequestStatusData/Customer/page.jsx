"use client";
import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';

function CustomerPage({bookingDetails}) {
  const { t } = useTranslation();
  const router = useRouter();
  const userDetails = bookingDetails?.user;

  const handleChatClick = () => {
    const user = bookingDetails?.user;
    const params = new URLSearchParams();
    if (user?.id) params.set('userId', String(user.id));
    
    const fullName = [user?.name, user?.lastname].filter(Boolean).join(' ').trim();
    if (fullName) params.set('name', fullName);
    if (user?.image) params.set('avatar', user.image);
    if (user?.phone) params.set('phone', user.phone);
    if (bookingDetails?.conversation_id) {
      params.set('conversationId', String(bookingDetails.conversation_id));
    }

    router.push(`/Pages/Chat?${params.toString()}`);
  };

  return (
    <>
      {userDetails && (
        <motion.section 
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='flex justify-between items-center shadow-[0_0_4px_0_rgba(0,0,0,0.12)] hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.1)] transition-shadow duration-200 rounded-[3px] p-4 mt-6 bg-white border border-[#F0F2F5]'
        >
          <div className='flex gap-3 items-center'>
            {/* image */}
            <div className='flex items-center'>
              <div className='bg-[#E3E8EF] w-10 h-10 flex items-center justify-center rounded-[999px] shadow-sm'>
                <img src="/images/icons/Customer.svg" alt="" />
              </div>
            </div>
            {/* Name */}
            <div className='text-sm font-normal'>
              <p className='text-[#808080]'>{t('Customer')}</p>
              <p className='text-[#0B2C3E] mt-1 font-medium'>{bookingDetails?.user?.name} {bookingDetails?.user?.lastname}</p>
            </div>
          </div>

          <div className='flex items-center gap-4'>
            {/* chat */}
            <motion.div 
              whileHover={{ scale: 1.08, borderColor: "#7A4BD9", backgroundColor: "rgba(148, 109, 241, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleChatClick}
              title={t("Chat with customer") || "محادثة"}
              className='border border-[#946DF1] w-10 h-10 flex justify-center items-center rounded-[999px] cursor-pointer transition-colors shadow-sm'
            >
              <img src="/images/icons/chatIcon.svg" alt="" />
            </motion.div>

            {/* call */}
            <motion.a
              whileHover={{ scale: 1.08, borderColor: "#7A4BD9", backgroundColor: "rgba(148, 109, 241, 0.05)" }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${bookingDetails?.user?.phone}`}
              title={t("Call") || "اتصال"}
              className='border border-[#946DF1] w-10 h-10 flex justify-center items-center rounded-[999px] cursor-pointer transition-colors shadow-sm'
            >
              <img src="/images/icons/call.svg" alt="" />
            </motion.a>
          </div>
        </motion.section>
      )}
    </>
  )
}

export default CustomerPage
