'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function Comment() {
  const rating = 1;
  const {t} = useTranslation()
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [reply, setReply] = useState(null);

  const handleSendReply = () => {
    if (replyInput.trim() && !reply) {
      setReply(replyInput.trim());
      setReplyInput('');
      setShowReply(false);
    }
  };

  return (
    <>

    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] rounded-3px p-4'>
      {/*  */}
      <div className='flex justify-between'>

        <div>
          <p className='text-[#364152] text-base font-medium'>أحمد محمد</p>
          <p className='text-[#697586] text-sm font-light'>منذ يوم واحد</p>
        </div>

        <div className="flex ">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-base ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>

      </div>

      {/*  */}
      <p className='text-[#364152] text-base font-normal mt-3'>طعام رائع وتوصيل سريع، الجودة ممتازة والطلب وصل ساخناً. شكراً لكم</p>

      <div className='border border-[#E3E8EF] my-4'></div>

      {/*  */}
      <div className='flex justify-between items-center'>
        <p className='text-[#4B5565] text-sm font-normal'>{t('to request')}/555662</p>
        {!reply && !showReply && (
          <button onClick={() => setShowReply(true)} className='flex gap-1 cursor-pointer'>
            <span className='flex items-center'><img src="/images/icons/comment-yellow.svg" alt="" /></span>
            <span className='text-primary text-base font-normal'>{t('to reply')}</span>
          </button>
        )}
      </div>


      {/* btn click */}
      {showReply && !reply && (
        <div>
          <div className='border border-[#E3E8EF] my-4'></div>
          <div className='flex  w-full'>
            <input 
              type="text" 
              value={replyInput}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              className='border border-primary w-[90%] h-12 rounded-3px outline-0 px-3'
            />
            
            <div className='w-[10%] flex justify-end'>
              <button 
                type="button"
                onClick={handleSendReply}
                className='bg-[#CDD5DF] w-13.5 h-12 rounded-3px flex items-center justify-center cursor-pointer'
              >
                <img src="/images/icons/telegram-gray.svg" alt="" />
              </button>
            </div>
          </div>

          <button onClick={() => setShowReply(false)} className='text-[#364152] text-sm font-normal mt-2 cursor-pointer'>
            {t('cancel')}
          </button>
          
        </div>
      )}

      {/* reply */}
      {reply && (
        <div className='mt-3 p-3 bg-[#F9F5E8] rounded-3px '>
          <p className='flex gap-2'>
            <span><img src="/images/icons/like-yellow.svg" alt="" /></span>
            <span className='text-[#4B5565] text-sm font-normal'>{t('Your reply')} : </span>
          </p>
          <p className='text-[#364152] text-base font-normal mt-1'>{reply}</p>
        </div>
      )}


    </div>
      
    </>
  )
}

export default Comment