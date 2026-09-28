"use client";
import PreviousBtn from "@/app/Components/Buttons/PreviousBtn";
import SecondSection from "@/app/Components/login/SecondSection";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { resetPasswordThunk } from "@/redux/slice/Auth/AuthSlice";

function CreateNewPasswordpage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();

  const { loading } = useSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isProcessing = loading || isRedirecting;

  // values from localStorage
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState(""); 

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedOtp = localStorage.getItem("otp");
    const storedPhone = localStorage.getItem("phone");

    if (storedEmail) setEmail(storedEmail);
    if (storedOtp) setOtp(storedOtp);
    if (storedPhone) setPhone(storedPhone);
  }, []);

  // validation rules
  const rules = {
    uppercase: /[A-Z]/.test(password),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    number: /[0-9]/.test(password),
    length: password.length >= 8,
  };

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setError(t("Password does not match"));
    } else {
      setError("");
    }
  }, [password, confirmPassword, t]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    if (password !== confirmPassword) {
      setError(t("Password does not match"));
      return;
    }

    if (!rules.length) {
      setError(t("Your password must be at least 8 characters long"));
      return;
    }

    setError("");
    const formData = {
      email,
      otp,
      phone, // optional
      password,
      password_confirmation: confirmPassword,
    };

    const result = await dispatch(resetPasswordThunk(formData));

    if (resetPasswordThunk.fulfilled.match(result)) {
      setIsRedirecting(true);
      router.push("../Login/ConfirmationDone");
    } else {
      setError(result.payload?.message || (typeof result.payload === "string" ? result.payload : t("Something went wrong")));
    }
  };

  return (
    <>
      {/* Full screen redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
              <div className="w-14 h-14 rounded-full border-4 border-transparent border-b-primary opacity-40 animate-spin"></div>
            </div>
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">
                {t("Updating password...")}
              </p>
              <p className="text-gray-500 text-sm">
                {t("Redirecting...")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        <section className="w-full mt-15">
          <div className="flex flex-col items-center">
            <p className="mb-6 text-primary text-2xl font-semibold">
              {t("Create a new password")}
            </p>
            <p className="text-[#656565] text-lg font-normal max-w-[500px] text-center">
              {t("Your phone number has been verified and you can create a new password.")}
            </p>
            <div className="my-12 lg1:my-17.5 transition-transform duration-300 hover:scale-105">
              <img src="/images/lockLogIcon.svg" alt="" />
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Password */}
            <label className="text-[#364152] fontSizeA font-normal">
              {t("New Password")}
            </label>
            <div className="relative mt-3 mb-3">
              <input
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-primary"
                type={showPassword ? "text" : "password"}
                placeholder={t("Enter the new password")}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isProcessing}
                required
              />
              <span
                onClick={() => !isProcessing && setShowPassword(!showPassword)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {showPassword ? (
                  <img src="/images/icons/eyeClose.svg" alt="" />
                ) : (
                  <img src="/images/icons/eyeOpen.svg" alt="" />
                )}
              </span>
            </div>

            {isFocused && (
              <ul className="mb-6 space-y-1.5 text-sm p-3 bg-gray-50 rounded-3px border border-gray-100 transition-all duration-200">
                <li className={`flex items-center gap-2 ${rules.uppercase ? "text-green-600 font-medium" : "text-[#697586]"}`}>
                  <span>{rules.uppercase ? "✓" : "○"}</span>
                  {t("Use at least one uppercase letter")}
                </li>
                <li className={`flex items-center gap-2 ${rules.symbol ? "text-green-600 font-medium" : "text-[#697586]"}`}>
                  <span>{rules.symbol ? "✓" : "○"}</span>
                  {t("Use at least one symbol")}
                </li>
                <li className={`flex items-center gap-2 ${rules.number ? "text-green-600 font-medium" : "text-[#697586]"}`}>
                  <span>{rules.number ? "✓" : "○"}</span>
                  {t("Use at least one number")}
                </li>
                <li className={`flex items-center gap-2 ${rules.length ? "text-green-600 font-medium" : "text-[#697586]"}`}>
                  <span>{rules.length ? "✓" : "○"}</span>
                  {t("Your password must be at least 8 characters long")}
                </li>
              </ul>
            )}

            {/* Confirm Password */}
            <label className="text-[#364152] fontSizeA font-normal">
              {t("Confirm password")}
            </label>
            <div className="relative mt-3">
              <input
                className={`w-full h-15 p-3 border rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed focus:border-primary ${
                  error ? "border-red-500" : "border-[#C8C8C8]"
                }`}
                type={showNewPassword ? "text" : "password"}
                placeholder={t("Re-enter the new password")}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                disabled={isProcessing}
                required
              />
              <span
                onClick={() => !isProcessing && setShowNewPassword(!showNewPassword)}
                className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
              >
                {showNewPassword ? (
                  <img src="/images/icons/eyeClose.svg" alt="" />
                ) : (
                  <img src="/images/icons/eyeOpen.svg" alt="" />
                )}
              </span>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium mt-3">
                {error}
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col items-center gap-3 mb-12 mt-10">
              <div className="flex gap-6 justify-center w-full">
                <PreviousBtn path="../Login/VerifyNumber" className="w-48 sm:w-78" />
                <button
                  type="submit"
                  disabled={isProcessing || !password || !confirmPassword}
                  className={`
                    w-48 sm:w-78 h-15 bg-primary text-white font-medium rounded-3px
                    flex items-center justify-center gap-3
                    transition-all duration-200 shadow-sm
                    ${isProcessing || !password || !confirmPassword ? "opacity-65 cursor-not-allowed" : "cursor-pointer hover:opacity-95 active:scale-[0.99]"}
                  `}
                >
                  {isProcessing ? (
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
                      <span>
                        {isRedirecting
                          ? t("Redirecting...")
                          : t("Updating password...")}
                      </span>
                    </>
                  ) : (
                    t("Confirm")
                  )}
                </button>
              </div>

              {/* Status Indicator */}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-1 animate-pulse">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span>
                    {isRedirecting
                      ? t("Redirecting...")
                      : t("Updating password...")}
                  </span>
                </div>
              )}
            </div>
          </form>

          <p className="flex justify-center gap-1.5">
            <span className="text-[#697586] text-lg font-normal">
              {t("Dont have an account?")}
            </span>
            <Link href="/Auth/Signup" className="text-primary text-lg font-medium hover:underline">
              {t("Create an account")}
            </Link>
          </p>
        </section>

        {/* Second section */}
        <SecondSection />
      </div>
    </>
  );
}

export default CreateNewPasswordpage;
