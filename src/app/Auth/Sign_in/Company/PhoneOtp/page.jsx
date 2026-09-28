"use client"
import Have_an_account from '@/app/Components/login/Have_an_account'
import SecondSection from '@/app/Components/login/SecondSection'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { VerifyPhoneOtpThunk, checkEnterPhoneThunk } from '@/redux/slice/Auth/AuthSlice'
import { useRegistration } from '../../RegistrationContext'

const Spinner = ({ size = "h-5 w-5", color = "text-white" }) => (
  <svg className={`animate-spin ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
)

function PhoneOtpPage() {
  const { t } = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch();
  const { registrationData } = useRegistration();
  const { loading, error } = useSelector((state) => state.auth);

  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [showError, setShowError] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isProcessing = loading || isRedirecting;

  const handleChangeOtp = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues];
      newOtp[index] = value;
      setOtpValues(newOtp);
    }
    if (value.length === 1) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 4);
    if (pasteData) {
      const newOtp = ["", "", "", ""];
      for (let i = 0; i < pasteData.length; i++) newOtp[i] = pasteData[i];
      setOtpValues(newOtp);
      const focusIndex = Math.min(pasteData.length, 3);
      document.getElementById(`otp-${focusIndex}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleVerify();
    }
  };

  // timer
  const [timeLeft, setTimeLeft] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (!canResend && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
    if (timeLeft === 0) setCanResend(true);
  }, [timeLeft, canResend]);

  const handleResend = async () => {
    if (!canResend || isProcessing) return;
    setIsResending(true);
    try {
      await dispatch(checkEnterPhoneThunk({
        phone: `${registrationData.country_code}${registrationData.phone}`
      })).unwrap();
      setTimeLeft(30);
      setCanResend(false);
      setOtpValues(["", "", "", ""]);
      setShowError(false);
    } catch (err) {
      console.error("Failed to resend OTP:", err);
    } finally {
      setIsResending(false);
    }
  };

  const handleVerify = async () => {
    const otpCode = otpValues.join('');
    if (otpCode.length !== 4 || isProcessing) {
      setShowError(true);
      return;
    }
    setShowError(false);
    try {
      await dispatch(VerifyPhoneOtpThunk({
        phone: `${registrationData.country_code}${registrationData.phone}`,
        otp: otpCode
      })).unwrap();
      setIsRedirecting(true);
      router.push('/Auth/Sign_in/Company/SetPassword');
    } catch (err) {
      console.error("OTP verification failed:", err);
      setShowError(true);
    }
  };

  return (
    <>
      {/* Redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
              <div className="w-14 h-14 rounded-full border-4 border-transparent border-b-primary opacity-40 animate-spin absolute top-0"></div>
            </div>
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">{t("Code verified! Redirecting...")}</p>
              <p className="text-gray-500 text-sm">{t("Please wait...")}</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        {/* first section */}
        <section className="w-full mt-20">
          {/* logo */}
          <div className="WHLogA bg-[#EEF2F6] rounded-[100px] flex justify-center items-center mx-auto mb-5 transition-transform duration-300 hover:scale-105">
            <p className="WHLogB bg-[#CDD5DF] rounded-[100px] flex justify-center items-center">
              <img src="/images/icons/call-received.svg" className="WHLogC animate-pulse" alt="" />
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-primary text-xl font-bold">{t("Verify number")}</p>
            <p className="text-center text-lg text-[#656565] mt-4 max-w-[400px]">
              {t('Please enter the code we sent you')}
              <span className="font-semibold text-primary" dir="ltr">
                {' '}{registrationData?.country_code}{registrationData?.phone || '***'}
              </span>
              {' '}{t('To check the code')}
            </p>
          </div>

          <div className="my-10">
            <p className="text-[#4D4D4D] text-base font-medium mb-3 text-center">
              {t("verification code")}
            </p>

            <form className="flex gap-4 justify-center" dir="ltr" onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength="1"
                  value={otpValues[i]}
                  onPaste={handlePaste}
                  onChange={(e) => handleChangeOtp(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  disabled={isProcessing}
                  className="border border-[#C7C7C7] bg-white w-20 sm:w-25 h-16 sm:h-20 rounded-3px text-center text-xl font-bold transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              ))}
            </form>

            {(showError || (error && !isProcessing)) && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium max-w-sm mx-auto mt-4">
                {typeof error === 'string' ? error : t("Invalid OTP code. Please try again.")}
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium mt-4 animate-pulse">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>{isRedirecting ? t("Code verified! Redirecting...") : t("Verifying code...")}</span>
              </div>
            )}
          </div>

          <div className="mt-6 mb-4">
            {!canResend ? (
              <div className="flex justify-center items-center gap-2">
                <span className="text-[#4D4D4D] text-base">{t("Resend after")}</span>
                <span className="text-primary text-base font-bold">
                  00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                </span>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={handleResend}
                  disabled={isProcessing || isResending}
                  className="text-primary text-base font-bold hover:underline transition disabled:opacity-50 flex items-center gap-2"
                >
                  {isResending ? <><Spinner size="h-4 w-4" color="text-primary" /><span>{t("Sending...")}</span></> : t("Resend")}
                </button>
              </div>
            )}
          </div>

          {/* btn */}
          <div className="flex gap-6 justify-center mb-12 mt-4">
            <button
              onClick={() => router.push('/Auth/Sign_in/Company')}
              disabled={isProcessing}
              className="px-4 py-2 w-48 sm:w-64 flex justify-center items-center border border-primary text-primary rounded-3px transition hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("the previous")}
            </button>

            <button
              onClick={handleVerify}
              disabled={isProcessing || otpValues.some(v => v === "")}
              className={`
                px-4 py-2 w-48 sm:w-64 h-15 bg-primary text-white rounded-3px
                flex items-center justify-center gap-3
                transition-all duration-200
                ${isProcessing || otpValues.some(v => v === "") ? 'opacity-65 cursor-not-allowed' : 'cursor-pointer hover:opacity-95 active:scale-[0.99]'}
              `}
            >
              {isProcessing ? (
                <><Spinner /><span>{isRedirecting ? t("Redirecting...") : t("Verifying code...")}</span></>
              ) : (
                t("the next")
              )}
            </button>
          </div>

          <Have_an_account />
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  )
}

export default PhoneOtpPage