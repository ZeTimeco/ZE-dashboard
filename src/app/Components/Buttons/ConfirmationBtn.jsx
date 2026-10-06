"use client";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";

function ConfirmationBtn({ onClick, path, className, loading = false, disabled = false, text, children }) {
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        h-15 px-4 py-2.5 
        bg-primary text-white
        text-base font-medium
        rounded-3px
        flex items-center justify-center gap-2
        transition-all duration-200 shadow-sm
        ${disabled || loading ? "opacity-65 cursor-not-allowed" : "cursor-pointer hover:opacity-95 active:scale-[0.99]"}
        ${className || ""}
      `}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
          <span>{text || t("Please wait...")}</span>
        </>
      ) : (
        children || text || t("confirmation")
      )}
    </button>
  );
}

export default ConfirmationBtn;

