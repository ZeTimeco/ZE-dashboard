"use client"
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SecondSection from '@/app/Components/login/SecondSection'
import Have_an_account from '@/app/Components/login/Have_an_account'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { FirstRegistrationThunk } from '@/redux/slice/Auth/AuthSlice'
import { useRegistration } from '../../RegistrationContext'

const Spinner = ({ size = "h-5 w-5", color = "text-white" }) => (
  <svg className={`animate-spin ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
)

function SetPasswordPage() {
  const { t } = useTranslation()
  const router = useRouter();
  const dispatch = useDispatch();
  const { registrationData, updateRegistrationData } = useRegistration();
  const { loading, error: apiError } = useSelector((state) => state.auth);

  const [password, setPassword] = useState(registrationData.password || '');
  const [password_confirmation, setPassword_confirmation] = useState(registrationData.password_confirmation || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isProcessing = loading || isRedirecting;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
      updateRegistrationData({ password: value });
    } else if (name === "password_confirmation") {
      setPassword_confirmation(value);
      updateRegistrationData({ password_confirmation: value });
    }
  };

  const rules = {
    uppercase: /[A-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  };

  useEffect(() => {
    if (password_confirmation && password !== password_confirmation) {
      setError(t("Password does not match"));
    } else {
      setError("");
    }
  }, [password, password_confirmation, t]);

  const handleConfirm = async () => {
    if (isProcessing || error || !rules.length || !rules.uppercase || !rules.number || !rules.symbol) return;

    const fullData = { ...registrationData, password, password_confirmation };
    const result = await dispatch(FirstRegistrationThunk(fullData));
    if (result.meta.requestStatus === 'fulfilled') {
      setIsRedirecting(true);
      router.push('/Auth/Sign_in/Company/Confirmation');
    }
  };

  return (
    <>
      {/* Redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
            <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">{t("Creating your account...")}</p>
              <p className="text-gray-500 text-sm">{t("Please wait...")}</p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        {/* first section */}
        <section className="w-full">
          {/* title */}
          <div className="mt-20 mb-12">
            <p className="text-[#232323] text-2xl font-medium">{t('Create a password?')}</p>
            <p className="text-[#656565] text-xl font-normal">{t('Choose a strong password to protect your account.')}</p>
          </div>

          <form>
            <label className="text-[#364152] fontSizeA font-normal">{t("password")}</label>
            <div className="relative mt-3 mb-3">
              <input
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder={t("Enter the new password")}
                value={password}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isProcessing}
              />
              <span
                onClick={() => !isProcessing && setShowPassword(!showPassword)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} text-[#9A9A9A] text-xl`}
              >
                {showPassword ? <img src="/images/icons/eyeClose.svg" alt="" /> : <img src="/images/icons/eyeOpen.svg" alt="" />}
              </span>
            </div>

            {isFocused && (
              <ul className="mb-6 space-y-1.5 text-sm p-3 bg-gray-50 rounded-3px border border-gray-100">
                {[
                  { rule: rules.uppercase, label: "Use at least one uppercase letter" },
                  { rule: rules.symbol, label: "Use at least one symbol" },
                  { rule: rules.number, label: "Use at least one number" },
                  { rule: rules.length, label: "Your password must be at least 8 characters long" },
                ].map(({ rule, label }) => (
                  <li key={label} className={`flex items-center gap-2 ${rule ? "text-green-600 font-medium" : "text-[#697586]"}`}>
                    <span>{rule ? "✓" : "○"}</span>
                    <span>{t(label)}</span>
                  </li>
                ))}
              </ul>
            )}

            <label className="text-[#364152] fontSizeA font-normal">{t("Confirm password")}</label>
            <div className="relative mt-3">
              <input
                className={`w-full h-15 p-3 border rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed ${
                  error ? "border-red-500" : "border-[#C8C8C8]"
                }`}
                type={showNewPassword ? "text" : "password"}
                name="password_confirmation"
                id="password_confirmation"
                placeholder={t("Re-enter the new password")}
                value={password_confirmation}
                onChange={handleChange}
                disabled={isProcessing}
              />
              <span
                onClick={() => !isProcessing && setShowNewPassword(!showNewPassword)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} text-[#9A9A9A] text-xl`}
              >
                {showNewPassword ? <img src="/images/icons/eyeClose.svg" alt="" /> : <img src="/images/icons/eyeOpen.svg" alt="" />}
              </span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium mt-3">
                {error}
              </div>
            )}

            {apiError && !isProcessing && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium mt-3">
                {typeof apiError === 'string' ? apiError : (apiError.message || t("An error occurred"))}
              </div>
            )}
          </form>

          <div className="flex flex-col gap-2 mb-12 mt-10">
            <div className="flex gap-6 justify-center">
              <button
                onClick={() => router.push('/Auth/Sign_in/Company/PhoneOtp')}
                disabled={isProcessing}
                className="px-4 py-2 w-48 sm:w-64 flex justify-center items-center border border-primary text-primary rounded-3px transition hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('the previous')}
              </button>
              <button
                onClick={handleConfirm}
                disabled={isProcessing || !!error || !password || !password_confirmation || !rules.length}
                className={`
                  px-4 py-2 w-48 sm:w-64 h-15 bg-primary text-white rounded-3px
                  flex items-center justify-center gap-3
                  transition-all duration-200
                  ${isProcessing || !!error || !password || !password_confirmation || !rules.length
                    ? 'opacity-65 cursor-not-allowed'
                    : 'cursor-pointer hover:opacity-95 active:scale-[0.99]'}
                `}
              >
                {isProcessing ? (
                  <><Spinner /><span>{isRedirecting ? t("Creating account...") : t("Please wait...")}</span></>
                ) : (
                  t('confirmation')
                )}
              </button>
            </div>

            {isProcessing && (
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-1 animate-pulse">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>{isRedirecting ? t("Creating your account...") : t("Please wait...")}</span>
              </div>
            )}
          </div>

          <Have_an_account />
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  )
}

export default SetPasswordPage