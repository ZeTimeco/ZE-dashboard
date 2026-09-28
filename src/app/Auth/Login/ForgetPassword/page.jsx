"use client";
import SecondSection from "@/app/Components/login/SecondSection";
import { forgetPassEnterEmailThunk, forgetPassEnterPhoneThunk } from "@/redux/slice/Auth/AuthSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

function ForgetPasswordpage() {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useDispatch();
  const { otpSent, loading, error } = useSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const isProcessing = loading || isRedirecting;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isProcessing) return;

    setIsRedirecting(false);
    if (inputValue.includes("@")) {
      dispatch(forgetPassEnterEmailThunk({ email: inputValue.trim() }));
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
      localStorage.setItem("email", inputValue.trim());
    } else {
      dispatch(forgetPassEnterPhoneThunk({ phone: inputValue.trim() }));
      localStorage.removeItem("phone");
      localStorage.removeItem("email");
      localStorage.setItem("phone", inputValue.trim());
    }
  };

  useEffect(() => {
    if (otpSent) {
      setIsRedirecting(true);
      router.push("/Auth/Login/VerifyNumber");
    }
  }, [otpSent, router]);

  useEffect(() => {
    if (error) {
      setIsRedirecting(false);
    }
  }, [error]);

  return (
    <>
      <div className="p-8 lg1:flex justify-between gap-8">
        {/* first section */}
        <section className="w-full">
          <div className="lg1:mt-40.5 mt-25 flex flex-col items-center">
            <p className="mb-6 text-primary text-2xl font-semibold">
              {t("Forgot your password?")}
            </p>
            <p className="text-[#656565] text-lg font-normal max-w-[500px] text-center">
              {t(
                "Enter the phone number or email address of the account for which you want to change the password."
              )}
            </p>
            <div className="my-17.5 transition-transform duration-300 hover:scale-105">
              <img src="/images/lockLogIcon.svg" alt="" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label
                className="text-[#364152] fontSizeA font-normal"
                htmlFor="email"
              >
                {t("Email")}/{t("phone number")}
              </label>
              <input
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                type="text"
                name="email"
                id="email"
                placeholder={t("Email")}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isProcessing}
                required
              />
            </div>

            {/* Error Message */}
            {error && !isProcessing && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium">
                {typeof error === "string" ? error : t("Failed to send code")}
              </div>
            )}

            <div className="flex flex-col gap-2 mt-4 mb-8">
              <button
                type="submit"
                disabled={isProcessing || !inputValue.trim()}
                className={`
                  w-full h-14 bg-primary text-white text-base font-medium rounded-3px
                  flex justify-center items-center gap-3
                  transition-all duration-200 shadow-sm
                  ${isProcessing || !inputValue.trim() ? "opacity-65 cursor-not-allowed" : "cursor-pointer hover:opacity-95 active:scale-[0.99]"}
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
                        : t("Sending...")}
                    </span>
                  </>
                ) : (
                  t("send")
                )}
              </button>

              {/* Dynamic status feedback below button */}
              {isProcessing && (
                <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium py-1 animate-pulse">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span>
                    {isRedirecting
                      ? t("Redirecting...")
                      : t("Sending verification code...")}
                  </span>
                </div>
              )}
            </div>

            <p className="flex justify-center gap-1.5">
              <span className="text-[#697586] text-lg font-normal">
                {t("Dont have an account?")}
              </span>
              <Link href="/Auth/Signup" className="text-primary text-lg font-medium hover:underline">
                {t("Create an account")}
              </Link>
            </p>
          </form>
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  );
}

export default ForgetPasswordpage;
