"use client"
import React from 'react'
import { useTranslation } from 'react-i18next'

function ChatPage() {
  const {t} = useTranslation()
  return (
    <>
      <div className='border border-[var(--color-primary)] rounded-[3px]  p-4 mb-10'>

        <div className='flex justify-between mb-4'>
          <div className='flex items-center gap-2'>
            <p className='w-9 h-9 flex items-center justify-center bg-[#007AFF] text-white rounded-full'>a</p>
            <div> 
              <p className='text-[#364152] text-sm font-normal'>شريف اكرامي</p>
              <p className='text-[#697586] text-xs font-normal '>{t('Hello! I have a question about the check-in process for tomorrow...')}</p>
            </div>
          </div>
          <p className='text-[#9AA4B2] text-xs font-normal'>منذ 5 دقايق</p>
        </div>

        <button className='border border-[var(--color-primary)] flex items-center justify-center gap-2 w-full h-14 rounded-[3px] cursor-pointer'>
          <span className='text-[var(--color-primary)] text-sm font-medium '>{t('Start the conversation')}</span>  
          <img src="/images/icons/arrow-left-yellow.svg" className="w-6 h-6" />
        </button>
      </div>
      
    </>
  )
}

export default ChatPage