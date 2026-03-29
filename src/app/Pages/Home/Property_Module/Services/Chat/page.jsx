"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ChatPage({conversationsLatestUnseen}) {
  const {t} = useTranslation()

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
      {conversationsLatestUnseen?.map((conversation , index)=>(
        <div
          key={conversation?.conversation_id}
          className='border border-[var(--color-primary)] rounded-[3px]  p-4 mb-8'
        >
          <div className='flex justify-between mb-4'>
            <div className='flex items-center gap-2'>
              <p className='w-9 h-9 flex items-center justify-center bg-[#007AFF] text-white rounded-full'>a</p>
              <div> 
                <p className='text-[#364152] text-sm font-normal'>{conversation?.user_name}</p>
                <p className='text-[#697586] text-xs font-normal '>{conversation?.last_message}</p>
              </div>
            </div>
            <p className='text-[#9AA4B2] text-xs font-normal'> {getTimeAgo(conversation?.created_at)} </p>
          </div>

          <button className='border border-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-14 rounded-[3px] cursor-pointer'>
            <span className='text-[var(--color-primary)] text-sm font-medium '>{t('Start the conversation')}</span>  
            <img src="/images/icons/arrow-left-yellow.svg" className="w-6 h-6" />
          </button>
        </div>
      ))}
      
      
    </>
  )
}

export default ChatPage