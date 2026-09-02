"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'

function ChatPage({ conversationsLatestUnseen }) {
  const { t } = useTranslation()

  const getTimeAgo = (date) => {
    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return "منذ لحظات"

    const minutes = Math.floor(diffInSeconds / 60)
    if (minutes < 60) return `منذ ${minutes} دقيقة`

    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `منذ ${hours} ساعة`

    const days = Math.floor(hours / 24)
    return `منذ ${days} يوم`
  }

  return (
    <>
      {conversationsLatestUnseen?.map((conversation) => (
        <motion.div
          key={conversation?.conversation_id}
          whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className='group border border-[var(--color-primary)]/80 hover:border-[var(--color-primary)] bg-white rounded-[3px] p-4 mb-2 transition-colors duration-200'
        >
          <div className='flex justify-between items-start mb-4'>
            <div className='flex items-center gap-2.5'>
              <p className='w-9 h-9 flex items-center justify-center bg-[#007AFF] text-white rounded-full font-medium shadow-xs'>
                {conversation?.user_name ? conversation.user_name.charAt(0) : 'U'}
              </p>
              <div> 
                <p className='text-[#364152] text-sm font-medium'>{conversation?.user_name}</p>
                <p className='text-[#697586] text-xs font-normal mt-0.5 line-clamp-1'>{conversation?.last_message}</p>
              </div>
            </div>
            <p className='text-[#9AA4B2] text-xs font-normal whitespace-nowrap ml-2'>
              {getTimeAgo(conversation?.created_at)}
            </p>
          </div>

          <motion.button 
            whileHover={{ scale: 1.01, backgroundColor: 'rgba(var(--color-primary-rgb, 245, 158, 11), 0.05)' }}
            whileTap={{ scale: 0.98 }}
            className='border border-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-12 rounded-[3px] cursor-pointer transition-all duration-200'
          >
            <span className='text-[var(--color-primary)] text-sm font-medium'>{t('Start the conversation')}</span>  
            <img src="/images/icons/arrow-left-yellow.svg" className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" alt="" />
          </motion.button>
        </motion.div>
      ))}
    </>
  )
}

export default ChatPage