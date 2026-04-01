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

  //link api 
  const dispatch = useDispatch();
  const {isAuthenticated , loading} = useSelector((state)=>state.auth)
  const router = useRouter();

  const [formData , setFormData] = useState({
    login:"",
    password:"",    
  })

  const handleChange =(e)=>{
    setFormData((prev)=>({
      ...prev , 
      [e.target.name]:e.target.value
    }))
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginThunk(formData));
  };


  // const module_key = 'home_services';
  
  // after login 
  useEffect(() => {
    if (isAuthenticated) {
      // Get user data from localStorage
      const userData = localStorage.getItem('user');
      
      if (userData) {
        const user = JSON.parse(userData);
        const { current_module_key, has_subscription, national_id, status } = user;
        
        // Check conditions and route accordingly
        if ( has_subscription === false && current_module_key === null || has_subscription === false ) {
          router.push("/Pages/dashboard/Main");
        } else {
          if (national_id === null) {
            router.push('/Pages/dashboard/TemporaryDashboard/CompleteSignupData');
          } else if (status === 'pending') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/waitingApproval')
          } else if (status === 'rejected') {
            router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/RejectAccount')
          } else if (status === 'active') {
            if (has_subscription === true) {
              // switch (current_module_key) {
              //   case 'home_services':
              //     router.push('/Pages/Home/Home_services');
              //     break;
              //   case 'delivery':
              //     router.push('/Pages/Home/Delivery_services');
              //     break;
              //   case 'property_rental':
              //     router.push('/Pages/Home/Renting_houses');
              //     break;
              //   case 'queue':
              //     router.push('/Pages/Home/Restaurant_reservations');
              //     break;
              //   case 'street_assistant':
              //     router.push('/Pages/Home/Road_assistant');
              //     break;
              //   case 'car_services':
              //     router.push('/Pages/Home/Car_services');
              //     break;
              //   default:
              //     router.push('/Pages/dashboard/Main');
              //               break;
              // }
            router.push('/Pages/Home/Services')
            } else {
              router.push('/Pages/dashboard/TemporaryDashboard/StatusOfProvider/AcceptAccount')
            }
          }
        }
      } else {
        <p>fddddddddddd</p>
        // router.push("/Pages/dashboard");
      }
    }
  }, [isAuthenticated, router]);


  return (
    <>
      <div className="p-8 lg1:flex justify-between gap-8  ">
        <section className="w-full">

          {/* 📱Tablet screen only */}
          <div className="lg1:hidden flex justify-center gap-1 my-20">
            <img src="/images/LogoText.svg" alt="" />
            <img src="/images/Logo.svg" alt="" />
          </div>

          {/* title  */}
          <div className=" lg1:mt-50.5  lg1:mb-25 lg1:items-center mb-17.5  flex flex-col   rounded-[10px]">
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
                className="w-full h-15 p-3 border border-[#C8C8C8] rounded-[3px] placeholder-[#9A9A9A] placeholder:text-sm outline-none"
                type="text"
                name="login"
                id="email"
                placeholder={t("Email")}
                value={formData.login}
                onChange={handleChange}
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
                  className="w-full h-15 p-3 border border-[#C8C8C8] rounded-[3px] placeholder-[#9A9A9A] placeholder:text-sm  outline-none"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder={t("password")}
                  value={formData.password}
                  onChange={handleChange}

                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >
                  {showPassword ?
                    (
                      <img src="/images/icons/eyeClose.svg" alt="" />
                    )
                    :(
                      <img src="/images/icons/eyeOpen.svg" alt="" />
                    )
                  }
                </span>
              </div>

              {/* btn of forget password */}
              <Link
                href="/Auth/Login/ForgetPassword"
                className="flex justify-end text-[#9E7A11] fontSizeA font-normal"
              >
                {t("Forgot your password?")}
              </Link>

            </div>

            <button  
              type="submit"
              disabled={loading}
              className={`
                w-full h-14
                bg-[var(--color-primary)]
                text-white text-base font-medium
                rounded-[3px] mt-4 mb-8
                ${loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              {loading ? t("Loading...") : t("Log in")}
            </button>

            
            {/*btn to open signup */}
              <No_account/>
          </form>
          
        </section>

        {/* second section */}
      <SecondSection />


      </div>
    </>
  );
}

export default LoginPage;
