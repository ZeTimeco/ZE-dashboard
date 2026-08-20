'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

// /provider/food-delivery/ratings
function Rate({
  rating = 0,
  totalReviews = 0,
  breakdown = [],
  getRatingConfig
}) {
  const { t } = useTranslation()

  const summary = getRatingConfig?.summary || getRatingConfig?.data?.summary || getRatingConfig || {}
  const displayRating = summary?.avg_rating ?? rating
  const displayTotal = summary?.total_ratings ?? totalReviews
  const distributionList = summary?.distribution || breakdown

  const renderStars = (score) => {
    const numericScore = Number(score) || 0
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (numericScore >= i) {
        stars.push(
          <img
            key={i}
            src="/images/icons/star.svg"
            alt="star"
            className="w-4 h-4"
          />
        )
      } else if (numericScore >= i - 0.2) {
        stars.push(
          <img
            key={i}
            src="/images/icons/star-half.svg"
            alt="half star"
            className="w-4 h-3.5"
          />
        )
      } else {
        stars.push(
          <img
            key={i}
            src="/images/icons/star-empty.svg"
            alt="empty star"
            className="w-4 h-3.5"
          />
        )
      }
    }
    return stars
  }

  return (
    <div className="shadow-[0_0_4px_0_rgba(0,0,0,0.30)] py-4 px-3  rounded-[3px] flex ">
      <div className="flex items-center justify-center gap-6 w-full ">
        {/* Rating Summary & Score */}
        <div className="flex flex-col items-center justify-center px-4 py-2 shrink-0 w-[111px] gap-4 ">
          <span className="text-[#0F022E] text-[32px] font-semibold leading-tight text-center">
            {displayRating}
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              {renderStars(displayRating)}
            </div>
            <span className="text-[#565656] text-[16px] font-normal text-center mt-1">
              {displayTotal} {t('evaluations', 'تقييم')}
            </span>
          </div>
        </div>
        {/* Rating Breakdown Progress Bars */}
        <div className="flex flex-col gap-3 flex-1 max-w-[440px] ">
          {distributionList?.map((item, index) => (
            <div key={index} className="flex items-center gap-3 w-full">
              <span className="text-[#697586] text-[13px] font-normal w-2 text-center shrink-0">
                {item.stars ?? item.count}
              </span>
              <div className="flex-1 bg-[#EBEBEF] h-1 rounded-[360px] overflow-hidden relative">
                <div
                  className="bg-[#FFC233] h-full rounded-[360px] transition-all duration-300"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  )
}

export default Rate
