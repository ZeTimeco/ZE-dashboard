"use client";
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'

function No_account() {
  const { t } = useTranslation()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/Auth/Sign_in')
  }

  return (
    <>
      <p className="flex justify-center gap-1.5 items-center">
        <span className="text-[#697586] text-lg font-normal">
          {t("Dont have an account?")}
        </span>
        <button
          onClick={handleClick}
          disabled={isNavigating}
          className={`text-[#9E7A11] text-lg font-medium flex items-center gap-1.5 transition ${
            isNavigating ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:underline"
          }`}
        >
          {isNavigating ? (
            <>
              <svg
                className="animate-spin h-4 w-4 text-[#9E7A11]"
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
              <span>{t("Redirecting...")}</span>
            </>
          ) : (
            t("Create an account")
          )}
        </button>
      </p>
    </>
  )
}

export default No_account