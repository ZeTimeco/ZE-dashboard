'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { addReplyThunk, getRatingConfigThunk } from '@/redux/slice/Setting/SettingSlice';

import Pagination from './Pagination';

function CommentItem({ rate }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [showReply, setShowReply] = useState(false);
  const [replyInput, setReplyInput] = useState('');
  const [reply, setReply] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const existingReply =
    reply ||
    (typeof rate?.provider_reply === 'string'
      ? rate?.provider_reply
      : rate?.provider_reply?.reply || rate?.provider_reply?.comment || rate?.provider_reply?.text || null);

  const rating = Number(rate?.rating ?? rate?.stars ?? 1);

  const handleSendReply = () => {
    if (replyInput.trim() && !existingReply && !isSubmitting) {
      const text = replyInput.trim();
      setIsSubmitting(true);
      dispatch(addReplyThunk({ id: rate?.id, formData: { reply: text } }))
        .unwrap()
        .then(() => {
          setReply(text);
          setReplyInput('');
          setShowReply(false);
          dispatch(getRatingConfigThunk());
        })
        .catch((err) => {
          console.error('Failed to send reply:', err);
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className='shadow-[0_0_4px_0_rgba(0,0,0,0.30)] rounded-3px p-4'>
      {/* Header */}
      <div className='flex justify-between'>
        <div>
          <p className='text-[#364152] text-base font-medium'>{rate?.customer_name}</p>
          <p className='text-[#697586] text-sm font-light'>{rate?.created_at}</p>
        </div>

        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-base ${
                star <= Number(rate?.rating || 0) ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* Comment text */}
      <p className='text-[#364152] text-base font-normal mt-3'>{rate?.comment}</p>

      <div className='border border-[#E3E8EF] my-4'></div>

      {/* Footer */}
      <div className='flex justify-between items-center'>
        <p className='text-[#4B5565] text-sm font-normal'>{t('to request')}/ {rate?.order_number}</p>
        {!existingReply && !showReply && (
          <button onClick={() => setShowReply(true)} className='flex gap-1 cursor-pointer'>
            <span className='flex items-center'><img src="/images/icons/comment-yellow.svg" alt="" /></span>
            <span className='text-primary text-base font-normal'>{t('to reply')}</span>
          </button>
        )}
      </div>

      {/* Reply input */}
      {showReply && !existingReply && (
        <div>
          <div className='border border-[#E3E8EF] my-4'></div>
          <div className='flex w-full'>
            <input 
              type="text" 
              value={replyInput}
              disabled={isSubmitting}
              onChange={(e) => setReplyInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              className='border border-primary w-[90%] h-12 rounded-3px outline-0 px-3 disabled:opacity-60'
            />
            
            <div className='w-[10%] flex justify-end'>
              <button 
                type="button"
                onClick={handleSendReply}
                disabled={isSubmitting || !replyInput.trim()}
                className='bg-[#CDD5DF] w-13.5 h-12 rounded-3px flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
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

      {/* Provider Reply */}
      {existingReply && (
        <div className='mt-3 p-3 bg-[#F9F5E8] rounded-3px'>
          <p className='flex gap-2'>
            <span><img src="/images/icons/like-yellow.svg" alt="" /></span>
            <span className='text-[#4B5565] text-sm font-normal'>{t('Your reply')} : </span>
          </p>
          <p className='text-[#364152] text-base font-normal mt-1'>{existingReply}</p>
        </div>
      )}
    </div>
  );
}

function Comment({ getRatingConfig }) {
  const reviewsList = getRatingConfig?.data || [];
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(reviewsList.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentReviews = reviewsList.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-4 mt-4">
      {currentReviews.map((rate, index) => (
        <CommentItem key={rate?.id ?? `${currentPage}-${index}`} rate={rate} />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default Comment;