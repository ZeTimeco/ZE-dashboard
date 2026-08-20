'use client'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const { t } = useTranslation()
  const [isHoveredPrev, setIsHoveredPrev] = useState(false)
  const [isHoveredNext, setIsHoveredNext] = useState(false)

  if (totalPages <= 1) return null

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return
    onPageChange?.(page)
  }

  const generatePages = () => {
    const pages = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    return pages
  }

  const pages = generatePages()
  const isDisabledPrev = currentPage === 1
  const isDisabledNext = currentPage === totalPages

  return (
    <div className="flex justify-between items-center mt-6 mb-3">
      {/* Prev */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isDisabledPrev}
        onMouseEnter={() => setIsHoveredPrev(true)}
        onMouseLeave={() => setIsHoveredPrev(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition ${
          isDisabledPrev
            ? 'text-[#364152] border border-[#697586] cursor-not-allowed opacity-50'
            : 'bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152] cursor-pointer'
        }`}
      >
        <img
          src={
            isDisabledPrev || isHoveredPrev
              ? '/images/icons/arrow-right.svg'
              : '/images/icons/arrow-right-white.svg'
          }
          alt=""
        />
        <span>{t('the previous')}</span>
      </button>

      {/* Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <button
            key={index}
            type="button"
            disabled={page === '...'}
            onClick={() => typeof page === 'number' && handlePageChange(page)}
            className={`w-10 h-10 rounded-md transition ${
              page === currentPage
                ? 'bg-[var(--color-primary)] text-white font-medium'
                : page === '...'
                ? 'cursor-default text-gray-500'
                : 'border border-[#CDD5DF] text-[#697586] hover:bg-gray-50 cursor-pointer'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isDisabledNext}
        onMouseEnter={() => setIsHoveredNext(true)}
        onMouseLeave={() => setIsHoveredNext(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition ${
          isDisabledNext
            ? 'text-[#364152] border border-[#697586] cursor-not-allowed opacity-50'
            : 'bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152] cursor-pointer'
        }`}
      >
        <span>{t('the next')}</span>
        <img
          src={
            isDisabledNext || isHoveredNext
              ? '/images/icons/arrow-left.svg'
              : '/images/icons/arrow-left-white.svg'
          }
          alt=""
        />
      </button>
    </div>
  )
}

export default Pagination