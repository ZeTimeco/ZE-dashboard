"use client";
import React from 'react'
import { useTranslation } from 'react-i18next'

function SearchForm({ placeholderKey ,width, ...props }) {
  const {t}= useTranslation();
// 546--556
  return (
    <>
      <div className={`relative h-14 w-[50%] lg1:w-[60%] rounded-[3px]`} >
        <img
          src="/images/icons/search.svg"
          alt="search"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
        />
        <input
          type="text"
          placeholder={t(placeholderKey)}
          className="w-full h-14 pl-5  pr-10 border border-[#C8C8C8] rounded-[3px] text-[#364152] placeholder-[#9AA4B2] focus:outline-none"
          {...props}
        />
      </div>
    </>
  )
}

export default SearchForm