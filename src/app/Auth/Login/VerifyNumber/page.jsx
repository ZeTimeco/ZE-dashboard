"use client";
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import ConfirmationBtn from '../../../Components/Buttons/ConfirmationBtn';
import PreviousBtn from '../../../Components/Buttons/PreviousBtn';
import Link from 'next/link';
import SecondSection from '@/app/Components/login/SecondSection';
import { useDispatch, useSelector } from 'react-redux';
import { forgetPassVerifyEmailOtpThunk, forgetPassVerifyPhoneOtpThunk } from '@/redux/slice/Auth/AuthSlice';
import { useRouter } from 'next/navigation';


function VerifyNumberpage() {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useDispatch();
  const { loading, error, verified, method } = useSelector((state) => state.auth);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const isProcessing = loading || isRedirecting;

  const [otp, setOtp] = useState(["", "", "", ""]); // 4 separate digits

  useEffect(() => {
    if (typeof window !== "undefined") {
      setEmail(localStorage.getItem("email"));
      setPhone(localStorage.getItem("phone"));
    }
  }, []);

  const handleVerify = () => {
    const code = otp.join("");
    if (code.length < 4 || isProcessing) return;

    setIsRedirecting(false);

    if (typeof window !== "undefined") {
      localStorage.setItem("otp", code);
    }

    if (method === "email") {
      dispatch(forgetPassVerifyEmailOtpThunk({ email, otp: code }));
    } else {
      dispatch(forgetPassVerifyPhoneOtpThunk({ phone, otp: code }));
    }
  };

  useEffect(() => {
    if (verified) {
      setIsRedirecting(true);
      router.push("/Auth/Login/CreateNewPassword");
    }
  }, [verified, router]);

  useEffect(() => {
    if (error) {
      setIsRedirecting(false);
      setIsResending(false);
    }
  }, [error]);

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = val ? val.slice(-1) : "";
    setOtp(newOtp);

    if (val && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, 4);
    if (pasteData) {
      const newOtp = ["", "", "", ""];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const focusIndex = Math.min(pasteData.length, 3);
      const targetInput = document.getElementById(`otp-${focusIndex}`);
      if (targetInput) targetInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
      }
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
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setCanResend(true);
    }
  }, [timeLeft, canResend]);

  const handleResend = async () => {
    if (!canResend || isProcessing) return;
    setTimeLeft(30);
    setCanResend(false);
    setIsResending(true);

    if (method === "email") {
      await dispatch(forgetPassVerifyEmailOtpThunk({ email }));
    } else {
      await dispatch(forgetPassVerifyPhoneOtpThunk({ phone }));
    }
    setIsResending(false);
  };

  const displayTarget = phone || email || "*******15";

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
                {t("Code verified! Redirecting...")}
              </p>
              <p className="text-gray-500 text-sm">
                {t("Please wait...")}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="p-8 flex justify-between gap-8">
        <section className="w-full mt-25 lg1:mt-50.5">
          {/* 📱Tablet screen only */}
          <div className="lg1:hidden flex justify-center gap-1 mb-17.5 lg1:mb-20">
            <img src="/images/LogoText.svg" alt="" />
            <img src="/images/Logo.svg" alt="" />
          </div>

          {/* logo */}
          <div className="WHLogA bg-[#EEF2F6] rounded-[100px] flex justify-center items-center mx-auto mb-5 transition-transform duration-300 hover:scale-105">
            <p className="WHLogB bg-[#CDD5DF] rounded-[100px] flex justify-center items-center">
              <img src="/images/icons/call-received.svg" className="WHLogC animate-pulse" alt="" />
            </p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-primary text-xl font-bold">{t("Verify number")}</p>
            <p className="text-center text-lg text-[#656565] mt-4 max-w-[400px]">
              {t("Please enter the code we sent to your number.")}{" "}
              <span className="font-semibold text-primary" dir="ltr">
                {displayTarget}
              </span>{" "}
              {t("To verify the code")}
            </p>
          </div>

          <div className="my-10">
            <p className="text-[#4D4D4D] text-base font-medium mb-3 flex justify-center">
              {t("verification code")}
            </p>
            <form className="flex gap-4 justify-center" dir="ltr" onSubmit={(e) => { e.preventDefault(); handleVerify(); }}>
              {[0, 1, 2, 3].map((i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength="1"
                  value={otp[i]}
                  onPaste={handlePaste}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  disabled={isProcessing}
                  className="border border-[#C7C7C7] bg-[#fff] w-20 sm:w-25 h-16 sm:h-20 rounded-3px text-center text-xl font-bold transition outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              ))}
            </form>

            {/* Error Message */}
            {error && !isProcessing && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-3px text-sm text-center font-medium max-w-sm mx-auto mt-4">
                {typeof error === "string" ? error : t("Invalid verification code")}
              </div>
            )}

            {/* Dynamic Status Feedback */}
            {isProcessing && (
              <div className="flex items-center justify-center gap-2 text-primary text-sm font-medium mt-4 animate-pulse">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span>
                  {isRedirecting
                    ? t("Code verified! Redirecting...")
                    : t("Verifying code...")}
                </span>
              </div>
            )}

            <div className="mt-6">
              {!canResend ? (
                <div className="flex justify-center items-center gap-2">
                  <span className="text-[#4D4D4D] text-base font-normal">
                    {t("Resend after")}
                  </span>
                  <span className="text-primary text-base font-bold">
                    00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                  </span>
                </div>
              ) : (
                <div className="flex justify-center">
                  <button
                    onClick={handleResend}
                    disabled={isProcessing || isResending}
                    className="text-primary text-base font-bold hover:underline transition disabled:opacity-50"
                  >
                    {isResending ? t("Sending...") : t("Resend")}
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-6 justify-center mb-12">
            <PreviousBtn path="../Login/ForgetPassword" className="w-48 sm:w-64" />
            <ConfirmationBtn
              onClick={handleVerify}
              loading={isProcessing}
              disabled={isProcessing || otp.some((d) => d === "")}
              text={isRedirecting ? t("Redirecting...") : (isProcessing ? t("Verifying code...") : t("confirmation"))}
              className="w-48 sm:w-64"
            />
          </div>

          <p className="flex justify-center gap-1.5">
            <span className="text-[#697586] text-lg font-normal">
              {t("Dont have an account?")}
            </span>
            <Link href="/Auth/Signup" className="text-primary text-lg font-medium hover:underline">
              {t("Create an account")}
            </Link>
          </p>
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  );
}

export default VerifyNumberpage;