"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';

function PersonalDataPage({handleNext , handleGoBack ,formData ,setFormData ,handleChange }) {
  const { t } = useTranslation();

  // images
  const fileInputRef = useRef(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/webp", "image/png", "image/svg+xml", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      alert(t("Please select a valid image file (WEBP, PNG, SVG, JPG)"));
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert(t("File size should not exceed 5MB"));
      return;
    }

    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    // ⭐ ربط الصورة بالـ formData
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleDeleteFile = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";

    // ⭐ مسح الصورة من formData
    setFormData((prev) => ({
      ...prev,
      image: null,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rules, setRules] = useState({
    uppercase: false,
    symbol: false,
    number: false,
    length: false,
  });

  // ✅ Handle password input and update rules
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));

    setRules({
      uppercase: /[A-Z]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      number: /[0-9]/.test(value),
      length: value.length >= 8,
    });
  };

  const handleConfirmPasswordChange = (e) => {
    setFormData(prev => ({ ...prev, password_confirmation: e.target.value }));
  };

  // ✅ Check if passwords match
  const passwordsMatch =
    formData?.password_confirmation.length > 0 &&
    formData?.password === formData?.password_confirmation;

  return (
    <>
      {/* image */}
      <div className="w-full md:w-[35%] max-w-sm mb-8">
        <div className="py-4 px-2">
          {!imagePreview ? (
            <>
              <div className="w-full flex justify-center mb-6">
                <div className="w-38 h-38 border border-[#CDD5DF] rounded-[138px] flex justify-center items-center bg-white shadow-xs">
                  <span
                    className="cursor-pointer transition-transform duration-200 hover:scale-105"
                    onClick={handleFileSelect}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleFileSelect();
                    }}
                  >
                    <img src="/images/Avatar Image.svg" alt="" />
                  </span>
                </div>
              </div>

              <div>
                <motion.button
                  whileHover={{ scale: 1.02, filter: "brightness(1.02)" }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className="w-full flex justify-center items-center gap-2 border border-[var(--color-primary)] text-[var(--color-primary)] font-medium py-2.5 px-4 rounded-[3px] cursor-pointer shadow-xs transition-all"
                  onClick={handleFileSelect}
                >
                  <span>{t("Image selection")}</span>  
                  <span><img src="/images/upload.svg" alt="" /></span>
                </motion.button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Company Logo"
                className="w-[112px] h-[112px] object-cover border border-[#EEF2F6] p-1 rounded-full shadow-sm"
              />

              <div className="mt-3 flex gap-2 w-full justify-center">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="w-[140px] h-10 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-[3px] font-medium hover:bg-yellow-50 transition-colors cursor-pointer"
                  onClick={handleFileSelect}
                >
                  {t("replace")}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="button"
                  className="w-[140px] h-10 border border-[#F04438] text-[#F04438] rounded-[3px] font-medium hover:bg-red-50 transition-colors cursor-pointer"
                  onClick={handleDeleteFile}
                >
                  {t("delete")}
                </motion.button>
              </div>
            </div>
          )}
          <input
            ref={fileInputRef}
            name="image"
            type="file"
            accept=".webp,.png,.svg,.jpg,.jpeg,image/webp,image/png,image/svg+xml"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      <form action="" className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* first name */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('First Name')}</label>
          <input 
            type="text"
            name='firstname' 
            value={formData?.firstname}
            onChange={handleChange}
            placeholder={t('Enter first name')}
            className="h-15 p-3 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[#C69815] transition-colors" 
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('Last Name')}</label>
          <input 
            type="text" 
            name='lastname'
            value={formData?.lastname}
            onChange={handleChange}
            placeholder={t('Enter last name/family name')}
            className="h-15 p-3 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[#C69815] transition-colors" 
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">{t('Email')}</label>
          <input 
            type="text" 
            name='email'
            value={formData?.email}
            onChange={handleChange}
            placeholder={t('Enter your email')}
            className="h-15 p-3 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[#C69815] transition-colors" 
          />
        </div>

        {/* Mobile number */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal mb-3 block">
            {t("Mobile number")}
          </label>

          <div className="relative">
            <PhoneInput
              country={"sa"}
              value={formData?.phone}  
              onChange={(value, country) => {
                setFormData({
                  ...formData,
                  phone: value,               
                  country_code: country.dialCode  
                });
              }}
              placeholder="000000000"
              containerClass="!w-full"
              inputClass="!w-full !h-[60px] !border !border-[#C8C8C8] !rounded-[3px] !pl-24 !text-left !shadow-sm !text-[#364152] placeholder-[#9A9A9A] focus:border-[#C69815] outline-none"
              buttonClass="!absolute !left-0 !top-0 !h-full !px-3 !flex !items-center !gap-2 !bg-transparent !border-r-0"
              dropdownClass="!absolute !left-0 !top-full !mt-1 !z-50 !border !border-[#C8C8C8] !rounded-md !shadow-sm"
            />
          </div>
        </div>
    
        {/* New Password */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">
            {t("password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
            >
              {showPassword ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" />
              )}
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={formData?.password}
              placeholder={t("Enter your password")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handlePasswordChange}
              className="w-full h-15 p-3 pl-10 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[#C69815] transition-colors"
            />
          </div>

          {/* Show rules only when focused */}
          {isFocused && (
            <ul className="mt-3 mb-6 space-y-1 text-sm">
              <li
                className={
                  rules.uppercase
                    ? "text-green-600 list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.uppercase && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one uppercase letter")}</span>
              </li>

              <li
                className={
                  rules.symbol
                    ? "text-green-600 list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.symbol && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one symbol")}</span>
              </li>

              <li
                className={
                  rules.number
                    ? "text-green-600 list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.number && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Use at least one number")}</span>
              </li>

              <li
                className={
                  rules.length
                    ? "text-green-600 list-none flex gap-2"
                    : "text-[#697586] list-disc mx-5"
                }
              >
                <span>
                  {rules.length && <img src="/images/icons/true.svg" alt="" />}
                </span>
                <span>{t("Your password must be at least 8 characters long")}</span>
              </li>
            </ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">
            {t("Confirm password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 cursor-pointer p-1"
            >
              {showPasswordConfirm ? (
                <img src="/images/icons/eyeClose.svg" alt="Hide password" />
              ) : (
                <img src="/images/icons/eyeOpen.svg" alt="Show password" />
              )}
            </span>
            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={formData?.password_confirmation}
              placeholder={t("Re-enter your password")}
              onChange={handleConfirmPasswordChange}
              className={`w-full h-15 p-3 pl-10 rounded-[3px] border shadow-sm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal transition-colors ${
                formData?.password_confirmation
                  ? formData?.password === formData?.password_confirmation
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-[#C8C8C8] focus:border-[#C69815]"
              }`}
            />
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-sm ${
                passwordsMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordsMatch
                ? t("Passwords match") 
                : t("Passwords do not match")}
            </p>
          )}
        </div>
      </form>

      {/* National ID number */}
      <div className="flex flex-col w-full mb-6">
        <label className="text-[#364152] text-base font-normal">{t('National ID number')}</label>
        <input 
          type="text" 
          name="national_id"
          value={formData?.national_id}
          onChange={handleChange}
          placeholder={t('Enter your national ID number')}
          className="h-15 p-3 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none mt-3 placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal focus:border-[#C69815] transition-colors" 
        />
      </div>
      
      {/* btns */}
      <div className="my-12 flex gap-3">
        <motion.button 
          whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoBack}
          className="border w-48 h-13.5 py-2.5 px-4 rounded-[3px] border-[#C69815] text-[#C69815] text-base font-medium cursor-pointer transition-colors"
        >
          {t('cancel')}
        </motion.button>

        <motion.button 
          whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleNext}
          className="border border-[#C69815] w-58 h-13.5 py-2.5 px-4 rounded-[3px] bg-[#C69815] text-[#fff] text-base font-medium cursor-pointer shadow-xs transition-all"
        >
          {t('the next')}
        </motion.button>
      </div>
    </>
  );
}

export default PersonalDataPage;
