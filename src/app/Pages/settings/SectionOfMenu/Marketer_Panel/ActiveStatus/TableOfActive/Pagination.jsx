
"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";



const Pagination = ({ totalPages = 1, currentPage = 1, onPageChange }) => {
  const { t } = useTranslation();

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === "...") return;
    if (onPageChange) onPageChange(page);
  };

  const generatePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const pages = generatePages();
  const [isHoveredPrev, setIsHoveredPrev] = useState(false);
  const [isHoveredNext, setIsHoveredNext] = useState(false);

  const isDisabledPrev = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;

  return (
    <div className="flex justify-between items-center mt-4 mb-3">
      {/* Prev Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isDisabledPrev}
        onMouseEnter={() => setIsHoveredPrev(true)}
        onMouseLeave={() => setIsHoveredPrev(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition ${
          isDisabledPrev
            ? "text-[#364152] border border-[#697586] cursor-not-allowed bg-transparent"
            : "cursor-pointer bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152]"
        }`}
      >
        <img
          src={isDisabledPrev || isHoveredPrev ? "/images/icons/arrow-right.svg" : "/images/icons/arrow-right-white.svg"}
          alt="arrow"
        />
        <span>{t("the previous")}</span>
      </button>

      {/* Page Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            disabled={page === "..."}
            className={`px-3 py-1 text-sm font-medium rounded-md w-10 h-10 transition ${
              page === currentPage
                ? "text-white bg-[var(--color-primary)] shadow"
                : page === "..."
                ? "text-gray-500 cursor-default"
                : "border border-[#CDD5DF] text-[#697586] hover:bg-gray-100 cursor-pointer"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isDisabledNext}
        onMouseEnter={() => setIsHoveredNext(true)}
        onMouseLeave={() => setIsHoveredNext(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition ${
          isDisabledNext
            ? "text-[#364152] border border-[#697586] cursor-not-allowed bg-transparent"
            : "cursor-pointer bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152]"
        }`}
      >
        <span>{t("the next")}</span>
        <img
          src={isDisabledNext || isHoveredNext ? "/images/icons/arrow-left.svg" : "/images/icons/arrow-left-white.svg"}
          alt="arrow"
        />
      </button>
    </div>
  );
};

export default Pagination;
