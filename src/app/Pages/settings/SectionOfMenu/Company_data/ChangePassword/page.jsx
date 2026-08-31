"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { resetChangePasswordState, setNewPasswordThunk } from "@/redux/slice/Setting/SettingSlice";
import { toast } from "react-toastify";

function ChangePasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.setting);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  const [rules, setRules] = useState({
    uppercase: false,
    symbol: false,
    number: false,
    length: false,
  });

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setRules({
      uppercase: /[A-Z]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      number: /[0-9]/.test(value),
      length: value.length >= 8,
    });
  };
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;

  const handleSaveChanges = () => {
    if (!currentPassword || !password) {
      toast.error(t("Please fill in all required fields"));
      return;
    }
    if (!passwordsMatch) {
      toast.error(t("Passwords do not match"));
      return;
    }
    if (!Object.values(rules).every(Boolean)) {
      toast.error(t("Password does not meet all requirements"));
      return;
    }

    dispatch(
      setNewPasswordThunk({
        current_password: currentPassword,
        new_password: password,
        new_password_confirmation: confirmPassword,
      })
    )
      .unwrap()
      .then(() => {
        toast.success(t("Password changed successfully"));
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
        dispatch(resetChangePasswordState());
      })
      .catch((err) => {
        console.error(err);
        toast.error(err?.message || err || t("Something went wrong"));
      });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-[#E3E8EF] mb-8 bg-white rounded-[3px] shadow-xs"
    >
      <Header />

      <section className="p-6">
        {/* Current Password */}
        <div className="flex flex-col mb-4">
          <label className="text-[#364152] text-base font-normal">
            {t("Current Password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
            >
              <img
                src={
                  showCurrentPassword
                    ? "/images/icons/eyeClose.svg"
                    : "/images/icons/eyeOpen.svg"
                }
                alt=""
              />
            </span>

            <input
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              placeholder={t("Enter your current password")}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full h-15 p-3 pl-10 rounded-[3px] border border-[#C8C8C8] shadow-xs outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="flex flex-col mb-4">
          <label className="text-[#364152] text-base font-normal">
            {t("New Password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
            >
              <img
                src={
                  showPassword
                    ? "/images/icons/eyeClose.svg"
                    : "/images/icons/eyeOpen.svg"
                }
                alt=""
              />
            </span>

            <input
              type={showPassword ? "text" : "password"}
              value={password}
              placeholder={t("Enter your password")}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onChange={handlePasswordChange}
              className="w-full h-15 p-3 pl-10 rounded-[3px] border border-[#C8C8C8] shadow-xs outline-none focus:border-[var(--color-primary)] transition-colors"
            />
          </div>

          {isFocused && (
            <motion.ul 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 mb-6 space-y-1 text-sm overflow-hidden"
            >
              {[
                { key: "uppercase", text: t("Use at least one uppercase letter") },
                { key: "symbol", text: t("Use at least one symbol") },
                { key: "number", text: t("Use at least one number") },
                {
                  key: "length",
                  text: t("Your password must be at least 8 characters long"),
                },
              ].map((rule) => (
                <li
                  key={rule.key}
                  className={
                    rules[rule.key]
                      ? "text-green-600 flex gap-2 items-center"
                      : "text-[#697586] list-disc mx-5"
                  }
                >
                  {rules[rule.key] && (
                    <img src="/images/icons/true.svg" alt="" className="w-4 h-4" />
                  )}
                  <span>{rule.text}</span>
                </li>
              ))}
            </motion.ul>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col">
          <label className="text-[#364152] text-base font-normal">
            {t("Confirm new password")}
          </label>

          <div className="relative mt-3">
            <span
              onClick={() =>
                setShowPasswordConfirm(!showPasswordConfirm)
              }
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-1"
            >
              <img
                src={
                  showPasswordConfirm
                    ? "/images/icons/eyeClose.svg"
                    : "/images/icons/eyeOpen.svg"
                }
                alt=""
              />
            </span>

            <input
              type={showPasswordConfirm ? "text" : "password"}
              value={confirmPassword}
              placeholder={t("Re-enter your password")}
              onChange={handleConfirmPasswordChange}
              className={`w-full h-15 p-3 pl-10 rounded-[3px] border shadow-xs outline-none transition-colors ${
                confirmPassword
                  ? passwordsMatch
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-[#C8C8C8] focus:border-[var(--color-primary)]"
              }`}
            />
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`mt-2 text-sm font-medium ${
                passwordsMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordsMatch
                ? t("Passwords match")
                : t("Passwords do not match")}
            </p>
          )}
        </div>

        {/* btn */}
        <motion.button 
          whileHover={!loading ? { scale: 1.02, filter: 'brightness(1.05)' } : {}}
          whileTap={!loading ? { scale: 0.98 } : {}}
          disabled={loading}
          onClick={handleSaveChanges}
          className={`bg-[var(--color-primary)] h-15 w-full sm:w-62.5 text-white font-medium rounded-[3px] mt-6 flex items-center justify-center gap-2 shadow-xs transition-all ${
            loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
              <span>{t("Saving...")}</span>
            </>
          ) : (
            <span>{t("Save changes")}</span>
          )}
        </motion.button>
      </section>
    </motion.div>
  );
}

export default ChangePasswordPage;
