"use client";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "@/redux/slice/Auth/AuthSlice";
import { useRouter } from "next/navigation";
import SecondSection from "@/app/Components/login/SecondSection";
import No_account from "@/app/Components/login/No_account";



function LoginPage() {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  // link api 
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error, user: authUser } = useSelector((state) => state.auth);
  const router = useRouter();

  const isProcessing = loading || isRedirecting;

  const [formData, setFormData] = useState({
    login: "",
    password: "",    
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev, 
      [e.target.name]: e.target.value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsRedirecting(false);
    dispatch(loginThunk(formData));
  };

  useEffect(() => {
    if (error) {
      setIsRedirecting(false);
    }
  }, [error]);

  // after login 
  useEffect(() => {
    if (isAuthenticated) {
      setIsRedirecting(true);
      // Get user data from localStorage or Redux state
      let user = null;
      try {
        const userData = localStorage.getItem("user");
        user = userData ? JSON.parse(userData) : authUser;
      } catch (err) {
        user = authUser;
      }

      if (user) {
        const { current_module_key, has_subscription, national_id, status } = user;
        
        // Check conditions and route accordingly
        if ((has_subscription === false && current_module_key === null) || has_subscription === false) {
          router.push("/Pages/dashboard/Main");
        } else {
          if (national_id === null) {
            router.push("/Pages/dashboard/TemporaryDashboard/CompleteSignupData");
          } else if (status === "pending") {
            router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval");
          } else if (status === "rejected") {
            router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount");
          } else if (status === "active") {
            if (has_subscription === true) {
              if (current_module_key === "food_delivery") {
                router.push("/Pages/requests/FoodDelivery_Module");
              } else {
                router.push("/Pages/Home");
              }
            } else {
              router.push("/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount");
            }
          } else {
            router.push("/Pages/dashboard/Main");
          }
        }
      } else {
        router.push("/Pages/dashboard/Main");
      }
    }
  }, [isAuthenticated, router, authUser]);

  return (
    <>
      {/* Full screen redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full animate-in fade-in zoom-in duration-200">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-[var(--color-primary)] animate-spin"></div>
              <div className="w-14 h-14 rounded-full border-4 border-transparent border-b-[var(--color-primary)] opacity-40 animate-spin"></div>
            </div>
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">
                {t("Redirecting...")}
              </p>
              <p className="text-gray-500 text-sm">
                {t("Please wait while we load your dashboard...")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        <section className="w-full">

          {/* 📱Tablet screen only */}
          <div className="lg1:hidden flex justify-center gap-1 my-20">
            <img src="/images/LogoText.svg" alt="" />
            <img src="/images/Logo.svg" alt="" />
          </div>

          {/* title  */}
          <div className="lg1:mt-50.5 lg1:mb-25 lg1:items-center mb-17.5 flex flex-col rounded-[10px]">
            <p className="text-[#9E7A11] text-[32px] font-semibold mb-6">
              {t("Welcome back!")}
            </p>
            <p className="text-[#656565] text-2xl font-normal">
              {t("Log in to access your account.")}{" "}
            </p>
          </div>

          <form 
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-6"
          >

            {/* email form */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[#364152] fontSizeA font-normal"
                htmlFor="email"
              >
                {t("phone number")}/{t("Email")}
              </label>
              <input
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                type="text"
                name="login"
                id="email"
                placeholder={t("Email")}
                value={formData.login}
                onChange={handleChange}
                disabled={isProcessing}
                required
              />
            </div>

            {/* password form */}
            <div className="flex flex-col gap-3">
              <label
                className="text-[#364152] fontSizeA font-normal"
                htmlFor="password"
              >
                {t("password")}
              </label>

              <div className="relative">
                <input
                  className="w-full h-15 p-3 border border-[#C8C8C8] rounded-3px placeholder-[#9A9A9A] placeholder:text-sm outline-none transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder={t("password")}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isProcessing}
                  required
                />
                <span
                  onClick={() => !isProcessing && setShowPassword(!showPassword)}
                  className={`absolute left-3 top-1/2 -translate-y-1/2 ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer text-gray-500"}`}
                >
                  {showPassword ? (
                    <img src="/images/icons/eyeClose.svg" alt="" />
                  ) : (
                    <img src="/images/icons/eyeOpen.svg" alt="" />
                  )}
                </span>
              </div>

              {/* btn of forget password */}
              <Link
                href="/Auth/Login/ForgetPassword"
                className="flex justify-end text-[#9E7A11] fontSizeA font-normal hover:underline"
              >
                {t("Forgot your password?")}
              </Link>
            </div>

            {/* Error Message */}
            {error && !isProcessing && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium">
                {typeof error === "string" ? t('Incorrect password') : t("Login failed. Please check your credentials.")}
              </div>
            )}

            {/* Submit button */}
            <div className="flex flex-col gap-2 mt-4 mb-8">
              <button  
                type="submit"
                disabled={isProcessing}
                className={`
                  w-full h-14
                  bg-primary
                  text-white text-base font-medium
                  rounded-3px
                  flex items-center justify-center gap-3
                  transition-all duration-200 shadow-sm
                  ${isProcessing ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:opacity-95 active:scale-[0.99]"}
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
                        : t("Logging in...")}
                    </span>
                  </>
                ) : (
                  t("Log in")
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
                      ? t("Redirecting to dashboard, please wait...")
                      : t("Verifying data, please wait...")}
                  </span>
                </div>
              )}
            </div>

            {/* btn to open signup */}
            <No_account />
          </form>
          
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  );
}

export default LoginPage;
