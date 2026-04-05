'use client';
import { getProviderRateThunk } from '@/redux/slice/Home/HomeSlice';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

function RatePage() {
  const { t } = useTranslation();


  //API
  const dispatch = useDispatch()
  const {providerRate , providerState , loading} = useSelector((state) => state.Home)
  useEffect(()=>{
    dispatch(getProviderRateThunk())
  },[dispatch])

  // console.log(providerRate);


  const [expandedIndexes, setExpandedIndexes] = useState({});
  const [showAll, setShowAll] = useState(false);

const toggleExpanded = (index) => {
  setExpandedIndexes((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

const maxLength = 130;

  return (
    <>
      <div className='border border-[#CDD5DF] rounded-[3px] my-4  p-6'>
        <div className='flex justify-between items-center'>
          <p className='text-[#0F022E] text-xl font-medium'>{t('Reviews')}</p>
          <button 
            onClick={() => (providerRate?.ratings?.length ?? 0) > 3 && setShowAll(prev => !prev)} 
            className={`text-base font-medium  
                        ${(providerRate?.ratings?.length ?? 0) <= 3 ? 'text-gray-500 cursor-not-allowed' : 'text-[var(--color-primary)] cursor-pointer'}
                      `}
          >
            {showAll ? t('Less') : t('More')}
          </button>
        </div>

        <div className='border border-[#CDD5DF] rounded-[3px] my-4 py-2 px-4 flex  gap-6'>
          <p className='text-[#0F022E] text-[40px] font-semibold'>{providerState?.average_rating}</p>
          <div className='flex flex-col justify-center items-start'>
            <p className='flex gap-1'>
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
                return <img key={i} src={src} alt="star" className='w-5 h-5' />;
              })}
            </p>
            <p className='text-[#565656] text-xl font-medium'>{providerState?.average_count}</p>
          </div>
        </div>

      {(showAll ? providerRate?.ratings : providerRate?.ratings?.slice(0, 3))?.map((rate, index) => {
          const text = rate?.review || "";
          const isLong = text.length > maxLength;
          const shortText = text.slice(0, maxLength);
          const expanded = expandedIndexes[index];

          return(
          <div
            key={index}
            className="border-b border-[#CDD5DF]"
          >
              <div className="flex justify-between">
                <div className="flex mb-4 gap-3">
                  <p className="bg-amber-400 w-10 h-10 flex justify-center items-center rounded-full p-2 mt-2">
                    {rate?.user?.name?.charAt(0)}
                  </p>
                  <div className="flex flex-col gap-1">
                    <p className="text-[#364152] text-base font-medium">
                    {rate?.user?.name} {rate?.user?.lastname}
                    </p>
                    <p className="text-[#697586] text-sm font-normal">
                      {`${new Date(rate?.created_at).getDate()}/${
                        new Date(rate?.created_at).getMonth() + 1
                      }/${new Date(rate?.created_at).getFullYear()}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-center ">
                  <img src="/images/icons/star.svg" className="w-4 h-4 mt-0.5 "/>
                  <p className="text-[#FDB022] text-sm font-medium">
                    {rate?.rating}
                  </p>
                </div>
              </div>

            <p className="mb-4 text-[#4B5565] text-sm font-normal">
              {expanded || !isLong ? text : shortText + "... "}
              {isLong && (
                <span
                  onClick={() => toggleExpanded(index)}
                  className="text-[#4D0CE7] text-sm font-normal cursor-pointer"
                >
                  {expanded ? t("Show less") : t("Read more")}
                </span>
              )}
            </p>

            </div>
        )})}
          
      </div>

    </>
  )
}

export default RatePage