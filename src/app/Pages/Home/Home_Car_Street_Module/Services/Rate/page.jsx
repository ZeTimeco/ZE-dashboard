'use client';
import { getProviderRateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

function RatePage() {
  const { t } = useTranslation();

  //API
  const dispatch = useDispatch()
  const {providerRate , providerState , loading} = useSelector((state) => state.Home)
  useEffect(()=>{
    dispatch(getProviderRateThunk())
  },[dispatch])

  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [showAll, setShowAll] = useState(false);

  const toggleExpanded = (index) => {
    setExpandedIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const maxLength = 130;
  const ratingsCount = providerRate?.ratings?.length ?? 0;

  return (
    <>
      <div className='bg-white border border-slate-200/90 rounded-3px p-6 shadow-xs hover:shadow-sm transition-all duration-300'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-2.5'>
            <p className='text-slate-900 text-xl font-semibold tracking-tight'>{t('Reviews')}</p>
            {ratingsCount > 0 && (
              <span className='bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-0.5 rounded-3px'>
                {ratingsCount}
              </span>
            )}
          </div>
          <button 
            onClick={() => ratingsCount > 3 && setShowAll(prev => !prev)} 
            className={`text-sm font-medium px-3 py-1.5 rounded-3px transition-all
                        ${ratingsCount <= 3 
                          ? 'text-slate-400 cursor-not-allowed' 
                          : 'text-primary hover:bg-amber-50 cursor-pointer active:scale-95'}
                      `}
          >
            {showAll ? t('Less') : t('More')}
          </button>
        </div>

        {/* Overall Rating Banner */}
        <div className='bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-200/70 rounded-3px p-5 my-5 flex items-center gap-6'>
          <p className='text-slate-900 text-4xl lg1:text-5xl font-bold tracking-tight'>
            {providerState?.average_rating ?? 0}
          </p>
          <div className='flex flex-col justify-center items-start gap-1'>
            <p className='flex gap-1.5 items-center'>
              {Array.from({ length: 5 }, (_, i) => {
                const rating = providerState?.average_rating ?? 0;
                const full = Math.floor(rating);
                const hasHalf = rating - full >= 0.5;
                let src;
                if (i < full) {
                  src = "/images/icons/star.svg";
                } else if (i === full && hasHalf) {
                  src = "/images/icons/star-half.svg";
                } else {
                  src = "/images/icons/star-empty.svg";
                }
                return <img key={i} src={src} alt="star" className='w-5 h-5 transition-transform hover:scale-110' />;
              })}
            </p>
            <p className='text-slate-500 text-sm font-medium'>
              {providerState?.average_count ?? 0}
            </p>
          </div>
        </div>

        {/* Reviews List */}
        <div className='divide-y divide-slate-100'>
          {(showAll ? providerRate?.ratings : providerRate?.ratings?.slice(0, 3))?.map((rate, index) => {
            const text = rate?.review || "";
            const isLong = text.length > maxLength;
            const shortText = text.slice(0, maxLength);
            const expanded = expandedIndexes[index];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="py-4 px-3 rounded-xl hover:bg-slate-50/80 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex mb-3 gap-3 items-center">
                    <div className="bg-gradient-to-tr from-amber-400 to-amber-300 text-slate-900 font-bold text-sm w-10 h-10 flex justify-center items-center rounded-full shadow-xs ring-2 ring-white">
                      {rate?.user?.name?.charAt(0) || "U"}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-slate-800 text-sm md:text-base font-semibold">
                        {rate?.user?.name} {rate?.user?.lastname}
                      </p>
                      <p className="text-slate-400 text-xs font-normal">
                        {rate?.created_at ? `${new Date(rate?.created_at).getDate()}/${
                          new Date(rate?.created_at).getMonth() + 1
                        }/${new Date(rate?.created_at).getFullYear()}` : ""}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50/80 border border-amber-200/60 px-2.5 py-1 rounded-full">
                    <img src="/images/icons/star.svg" className="w-3.5 h-3.5" alt="rating" />
                    <p className="text-amber-600 text-xs font-semibold">
                      {rate?.rating}
                    </p>
                  </div>
                </div>

                <p className="text-slate-600 text-sm font-normal leading-relaxed pl-13">
                  {expanded || !isLong ? text : shortText + "... "}
                  {isLong && (
                    <span
                      onClick={() => toggleExpanded(index)}
                      className="text-primary font-semibold text-xs cursor-pointer hover:underline inline-block mr-1"
                    >
                      {expanded ? t("Show less") : t("Read more")}
                    </span>
                  )}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default RatePage
