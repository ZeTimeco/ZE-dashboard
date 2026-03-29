"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({ totalPages = 10 }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const generatePages = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const pages = generatePages();

  const isDisabledPrev = currentPage === 1;
  const isDisabledNext = currentPage === totalPages;

  return (
    <div className="flex justify-between items-center mt-4 mb-3">
      
      {/* Prev */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isDisabledPrev}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] ${
          isDisabledPrev
            ? "text-gray-400 border cursor-not-allowed"
            : "bg-[var(--color-primary)] text-white"
        }`}
      >
        <span>{t("the previous")}</span>
      </button>

      {/* Pages */}
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <button
            key={index}
            onClick={() => typeof page === "number" && handlePageChange(page)}
            disabled={page === "..."}
            className={`w-10 h-10 rounded-md ${
              page === currentPage
                ? "bg-[var(--color-primary)] text-white"
                : "border text-gray-500"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isDisabledNext}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] ${
          isDisabledNext
            ? "text-gray-400 border cursor-not-allowed"
            : "bg-[var(--color-primary)] text-white"
        }`}
      >
        <span>{t("the next")}</span>
      </button>
    </div>
  );
};

export default Pagination;