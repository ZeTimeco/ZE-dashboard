"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const { t } = useTranslation();

  const [isHovered, setIsHovered] = useState(false);
  const [isHoveredNext, setIsHoveredNext] = useState(false);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
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
    <div className="flex justify-between items-center mt-6 mb-4 select-none">
      {/* Prev */}
      <motion.button
        whileHover={!isDisabledPrev ? { scale: 1.02 } : {}}
        whileTap={!isDisabledPrev ? { scale: 0.98 } : {}}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isDisabledPrev}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition-all duration-200 ${
          isDisabledPrev
            ? "text-[#364152] border border-[#697586] cursor-not-allowed opacity-60"
            : "bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152] cursor-pointer shadow-xs hover:shadow-sm"
        }`}
      >
        <img
          src={
            isDisabledPrev || isHovered
              ? "/images/icons/arrow-right.svg"
              : "/images/icons/arrow-right-white.svg"
          }
          alt=""
        />
        <span>{t("the previous")}</span>
      </motion.button>

      {/* Numbers */}
      <div className="flex gap-2">
        {pages.map((page, index) => (
          <motion.button
            key={index}
            whileHover={typeof page === "number" && page !== currentPage ? { scale: 1.05 } : {}}
            whileTap={typeof page === "number" ? { scale: 0.95 } : {}}
            disabled={page === "..."}
            onClick={() =>
              typeof page === "number" && handlePageChange(page)
            }
            className={`w-10 h-10 rounded-md font-medium transition-all duration-150 ${
              page === currentPage
                ? "bg-[var(--color-primary)] text-white shadow-xs cursor-pointer"
                : page === "..."
                ? "cursor-default text-gray-500"
                : "border border-[#CDD5DF] text-[#697586] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] cursor-pointer"
            }`}
          >
            {page}
          </motion.button>
        ))}
      </div>

      {/* Next */}
      <motion.button
        whileHover={!isDisabledNext ? { scale: 1.02 } : {}}
        whileTap={!isDisabledNext ? { scale: 0.98 } : {}}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isDisabledNext}
        onMouseEnter={() => setIsHoveredNext(true)}
        onMouseLeave={() => setIsHoveredNext(false)}
        className={`px-4 py-2 flex items-center gap-2 rounded-[3px] transition-all duration-200 ${
          isDisabledNext
            ? "text-[#364152] border border-[#697586] cursor-not-allowed opacity-60"
            : "bg-[var(--color-primary)] text-white hover:bg-[#E3E8EF] hover:border hover:border-[#697586] hover:text-[#364152] cursor-pointer shadow-xs hover:shadow-sm"
        }`}
      >
        <span>{t("the next")}</span>

        <img
          src={
            isDisabledNext || isHoveredNext
              ? "/images/icons/arrow-left.svg"
              : "/images/icons/arrow-left-white.svg"
          }
          alt=""
        />
      </motion.button>
    </div>
  );
};

export default Pagination;