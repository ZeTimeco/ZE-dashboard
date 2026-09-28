"use client"
import Have_an_account from '@/app/Components/login/Have_an_account'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { useRouter } from "next/navigation";
import { useRegistration } from '../../RegistrationContext'
import { useDispatch, useSelector } from 'react-redux'
import { checkEnterPhoneThunk } from '@/redux/slice/Auth/AuthSlice'

const Spinner = ({ size = "h-5 w-5", color = "text-white" }) => (
  <svg className={`animate-spin ${size} ${color}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
)

function CompanyInformationPage() {
  const { t } = useTranslation()
  const router = useRouter();
  const { registrationData, updateRegistrationData } = useRegistration();
  const { loading, error } = useSelector((state) => state.auth);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isProcessing = loading || isRedirecting;

  const [formData, setFormData] = useState({
    firstname: registrationData?.firstname || '',
    lastname: registrationData?.lastname || '',
    phone: registrationData?.phone || '',
    country_code: registrationData?.country_code || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    updateRegistrationData(updated);
  };

  const handlePhoneChange = (value, country) => {
    const dialCode = `+${country.dialCode}`;
    const phoneNumber = value.replace(country.dialCode, '');
    const updated = { ...formData, country_code: dialCode, phone: phoneNumber };
    setFormData(updated);
    updateRegistrationData(updated);
  };

  const dispatch = useDispatch();

  const handleNext = async () => {
    if (isProcessing) return;
    updateRegistrationData(formData);
    try {
      await dispatch(checkEnterPhoneThunk({
        phone: `${formData.country_code}${formData.phone}`
      })).unwrap();
      setIsRedirecting(true);
      router.push("/Auth/Sign_in/Company/PhoneOtp");
    } catch (error) {
      console.error("Failed to send OTP:", error);
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
              <p className="text-[#364152] font-semibold text-lg mb-1">{t("Redirecting...")}</p>
              <p className="text-gray-500 text-sm">{t("Please wait...")}</p>
            </div>
          </div>
        </div>
      )}

      {/* logo */}
      <div className="flex justify-center gap-1 mt-20">
        <img src="/images/LogoText.svg" alt="" />
        <img src="/images/Logo.svg" alt="" />
      </div>

      {/* title */}
      <div className="px-4 mt-20">
        <p className="text-[#232323] text-2xl font-medium">{t('Create a new account!')}</p>
        <p className="text-[#656565] text-xl font-normal">{t('Complete simple steps to start your journey with us.')}</p>
      </div>

      {/* content */}
      <div className="mt-10">

        {/* First name */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3">{t("First Name")}</label>
          <input
            type="text"
            name="firstname"
            value={formData?.firstname}
            onChange={handleChange}
            disabled={isProcessing}
            className="h-15 p-3 w-full border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={t("Enter first name")}
          />
        </div>

        {/* Last name */}
        <div className="flex flex-col mt-4">
          <label className="text-[#364152] text-base font-normal mb-3">{t("Last Name")}</label>
          <input
            type="text"
            name="lastname"
            value={formData?.lastname}
            onChange={handleChange}
            disabled={isProcessing}
            className="h-15 p-3 w-full border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition focus:border-primary disabled:bg-gray-100 disabled:cursor-not-allowed"
            placeholder={t("Enter last name/family name")}
          />
        </div>

        {/* phone number */}
        <div className="mt-4">
          <label className="text-[#364152] text-base font-normal">{t("Mobile number")}</label>
          <div className="mt-3">
            <PhoneInput
              country={'sa'}
              value={`${formData.country_code}${formData.phone}`}
              onChange={handlePhoneChange}
              placeholder="000000000"
              disabled={isProcessing}
              containerClass="!w-full"
              inputClass="!w-full !h-[60px] !border !border-[#C8C8C8] !rounded-[3px] !pl-24 !text-left !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
              buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
              dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !bg-white !border !border-[#C8C8C8] !rounded-md !shadow-lg"
            />
          </div>
        </div>

        {/* Error */}
        {error && !isProcessing && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium mt-3">
            {typeof error === 'string' ? error : (error.message || t("An error occurred"))}
          </div>
        )}

        {/* btn */}
        <div className="flex flex-col gap-2 mt-8 mb-10">
          <button
            onClick={handleNext}
            disabled={isProcessing || !formData.phone || !formData.firstname}
            className={`
              w-full h-15 bg-primary text-white text-base font-medium rounded-3px
              flex items-center justify-center gap-3
              transition-all duration-200 shadow-sm
              ${isProcessing || !formData.phone || !formData.firstname
                ? 'opacity-65 cursor-not-allowed'
                : 'cursor-pointer hover:opacity-95 active:scale-[0.99]'}
            `}
          >
            {isProcessing ? (
              <>
                <Spinner />
                <span>{isRedirecting ? t("Redirecting...") : t("Sending...")}</span>
              </>
            ) : (
              t('the next')
            )}
          </button>

          {isProcessing && (
            <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-1 animate-pulse">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span>{isRedirecting ? t("Redirecting...") : t("Sending verification code...")}</span>
            </div>
          )}
        </div>

        <Have_an_account />
      </div>
    </>
  )
}

export default CompanyInformationPage