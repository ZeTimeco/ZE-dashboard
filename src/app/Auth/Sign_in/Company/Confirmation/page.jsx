"use client"
import SecondSection from '@/app/Components/login/SecondSection';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

function ConfirmationPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (isNavigating) return;
    setIsNavigating(true);
    router.push('/Auth/Login');
  };

  return (
    <>
      {/* Redirect overlay */}
      {isNavigating && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
            <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">{t("Redirecting...")}</p>
              <p className="text-gray-500 text-sm">{t("Please wait...")}</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        {/* first section */}
        <section className="w-full">
          <div className="flex flex-col items-center gap-4 mt-25 text-center">
            <p className="text-[#0F022E] text-2xl sm:text-3xl font-bold flex items-center gap-2">
              <span>{t('Your account has been created successfully.')}</span>
              <span className="inline-block animate-bounce">🎉</span>
            </p>
            <p className="text-[#656565] text-lg font-medium max-w-lg">
              {t('You have successfully created your account, log in now and enjoy our services.')}
            </p>
            <div className="mt-8 mb-12 transition-transform duration-500 hover:scale-105">
              <img
                src="/images/ConfirmationDone.svg"
                alt=""
                className="max-w-[280px] sm:max-w-xs drop-shadow-md"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              disabled={isNavigating}
              className={`
                w-[50%] sm:w-[30%] h-15 bg-primary text-white text-base font-medium rounded-3px
                flex items-center justify-center gap-3
                transition-all duration-200 shadow-sm
                ${isNavigating ? 'opacity-75 cursor-not-allowed' : 'cursor-pointer hover:opacity-95 active:scale-[0.99]'}
              `}
            >
              {isNavigating ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                  <span>{t("Redirecting...")}</span>
                </>
              ) : (
                t('Log in')
              )}
            </button>
          </div>
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  )
}

export default ConfirmationPage