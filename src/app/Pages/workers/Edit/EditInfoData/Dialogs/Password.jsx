"use client"
import { Dialog } from '@mui/material'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateWorkerThunk } from '@/redux/slice/Workers/WorkersSlice';

function Password({openPassword , setOpenPassword ,worker}) {
  const {t}= useTranslation();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.workers);

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
    setPassword(value);

    setRules({
      uppercase: /[A-Z]/.test(value),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      number: /[0-9]/.test(value),
      length: value.length >= 8,
    });
  };

  // ✅ Check if passwords match
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!passwordsMatch) return;
    
    const formData = new FormData();
    formData.append('id', worker?.id);
    formData.append('password', password);
    formData.append('password_confirmation', confirmPassword);
    
    const result = await dispatch(UpdateWorkerThunk(formData));
    if (UpdateWorkerThunk.fulfilled.match(result)) {
      setOpenPassword(false);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      <Dialog 
        open={openPassword} 
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ className: "ServicePage-dialog" }}
      >
        <button className='pt-8 px-6 pb-2 cursor-pointer flex justify-end w-full' onClick={()=>setOpenPassword(false)}>
          <span className='border border-[#DDD] rounded-[100%] w-10 h-10 flex justify-center items-center hover:bg-gray-50 transition-colors'>
            <img src="/images/icons/xx.svg" alt="" className="transition-transform duration-200 hover:rotate-90" />
          </span>
        </button>

        <div className='flex flex-col gap-5 items-center justify-center mb-8'>
          {/* icon */}
          <div className='bg-[#EEF2F6] w-17.5 h-17.5 rounded-[100%] flex items-center justify-center shadow-xs'>
            <div className='bg-[#CDD5DF] w-12.5 h-12.5 rounded-[100%] flex items-center justify-center'>
              <img src="/images/icons/emailotp.svg" className="w-7.5 h-7.5" alt="" />
            </div>
          </div>

          {/* title */}
          <p className='text-[var(--color-primary)] text-xl font-bold'>{t('Change email')}</p>
        </div>
        
        <form action="" className='px-6'>
          {/* New Password */}
          <div className="flex flex-col mb-3">
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

              {/* Input field */}
              <input
                type={showPassword ? "text" : "password"}
                value={password}
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
                value={confirmPassword}
                placeholder={t("Re-enter your password")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full h-15 p-3 pl-10 rounded-[3px] border shadow-sm outline-none placeholder:text-[#9A9A9A] placeholder:text-sm placeholder:font-normal transition-colors ${
                  confirmPassword
                    ? passwordsMatch
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

          <div className='my-6 flex gap-3'>
            <motion.button 
              whileHover={{ scale: 1.02, filter: "brightness(1.05)" }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={loading || !passwordsMatch}
              className='w-full h-15 bg-[var(--color-primary)] text-[#fff] cursor-pointer rounded-[3px] flex justify-center items-center disabled:opacity-50 font-medium shadow-xs transition-all'
            >
              {loading ? t('loading...') : t('save')}
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: "rgba(198, 152, 21, 0.04)" }}
              whileTap={{ scale: 0.98 }}
              onClick={()=>setOpenPassword(false)} 
              className='w-full h-15 border border-[var(--color-primary)] text-[var(--color-primary)] cursor-pointer rounded-[3px] flex justify-center items-center font-medium transition-colors'
            >
              {t('cancel')}
            </motion.button>
          </div>
        </form>
      </Dialog>
    </>
  )
}

export default Password