'use client'
import React from 'react'
import { useTranslation } from 'react-i18next'

// /provider/food-delivery/ratings
function Rate({
  rating = 4.5,
  totalReviews = 5,
  breakdown = [
    { count: 5, percentage: 50 },
    { count: 4, percentage: 100 },
    { count: 3, percentage: 30 },
    { count: 2, percentage: 20 },
    { count: 1, percentage: 4 }
  ]
}) {
  const { t } = useTranslation()

  const renderStars = (score) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
      if (score >= i) {
        stars.push(
          <img
            key={i}
            src="/images/icons/star_yellow.svg"
            alt="star"
            className="w-4 h-3.5"
          />
        )
      } else if (score >= i - 0.5) {
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
            {rating}
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1">
              {renderStars(rating)}
            </div>
            <span className="text-[#565656] text-[16px] font-normal text-center mt-1">
              {totalReviews} {t('evaluations', 'تقييم')}
            </span>
          </div>
        </div>
        {/* Rating Breakdown Progress Bars */}
        <div className="flex flex-col gap-3 flex-1 max-w-[440px] ">
          {breakdown.map((item, index) => (
            <div key={index} className="flex items-center gap-3 w-full">
              <span className="text-[#697586] text-[13px] font-normal w-2 text-center shrink-0">
                {item.count}
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
