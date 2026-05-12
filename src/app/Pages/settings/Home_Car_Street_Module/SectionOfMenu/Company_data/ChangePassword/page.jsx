"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { resetChangePasswordState, setNewPasswordThunk } from "@/redux/slice/Setting/SettingSlice";

function ChangePasswordPage() {
  const { t } = useTranslation();
  //api
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.setting);


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
  const passwordsMatch =  confirmPassword.length > 0 && password === confirmPassword;

  const handleSaveChanges = () => {
    if (!currentPassword || !password) {
      alert(t("Please fill in all required fields"));
      return;
    }
    if (!passwordsMatch) {
      alert(t("Passwords do not match"));
      return;
    }
    if (!Object.values(rules).every(Boolean)) {
      alert(t("Password does not meet all requirements"));
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
        alert(t("Password changed successfully"));
        setCurrentPassword("");
        setPassword("");
        setConfirmPassword("");
        dispatch(resetChangePasswordState());
      })
      .catch((err) => {
        console.error(err);
        alert(err || t("Something went wrong"));
      });
  };


  return (
    <div className="border border-[#E3E8EF] mb-8">
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
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
              className="w-full h-15 p-3 pl-10 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none"
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
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
              className="w-full h-15 p-3 pl-10 rounded-[3px] border border-[#C8C8C8] shadow-sm outline-none"
            />
          </div>

          {isFocused && (
            <ul className="mt-3 mb-6 space-y-1 text-sm">
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
                      ? "text-green-600 flex gap-2"
                      : "text-[#697586] list-disc mx-5"
                  }
                >
                  {rules[rule.key] && (
                    <img src="/images/icons/true.svg" alt="" />
                  )}
                  <span>{rule.text}</span>
                </li>
              ))}
            </ul>
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
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer"
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
              className={`w-full h-15 p-3 pl-10 rounded-[3px] border shadow-sm outline-none ${
                confirmPassword
                  ? passwordsMatch
                    ? "border-green-500"
                    : "border-red-500"
                  : "border-[#C8C8C8]"
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

        {/* btn */}
        <button 
          onClick={handleSaveChanges}
          className="bg-[var(--color-primary)] h-15 w-62.5 text-white rounded-[3px] mt-6">
              {loading ? t("Saving...") : t("Save changes")}
        </button>

      </section>
    </div>
  );
}

export default ChangePasswordPage;
