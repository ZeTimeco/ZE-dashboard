"use client";
import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MainLayout from "@/app/Components/MainLayout/MainLayout";
import PersonalDataPage from "./PersonalData/page";
import JobDataPage from "./JobData/page";
import { useDispatch, useSelector } from "react-redux";
import { addWorkerThunk, getDesignationsThunk } from "@/redux/slice/Workers/WorkersSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

function AddPage() {
  const { t } = useTranslation();
  const router = useRouter(); 
  
  //api
  const dispatch = useDispatch();
  const { getDesignations, loading } = useSelector(state => state.workers);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const isSubmitting = loading || isRedirecting;
  
  useEffect(() => {
    dispatch(getDesignationsThunk());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    image: null,
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    country_code: '',
    password: '',
    password_confirmation: '',
    national_id: '',
    designation_id: '',
    provider_areas: [],
    address: '',
    longitude: '',
    latitude: '',
    city: '',
    country: '',
    state: '',   
    working_time: '',
    id_front: null,
    id_back: null
  });

  const [errors, setErrors] = useState({});

  const validatePersonal = () => {
    const errs = {};
    if (!formData.firstname?.trim()) {
      errs.firstname = t("firstname is required");
    }
    if (!formData.lastname?.trim()) {
      errs.lastname = t("lastname is required");
    }
    if (!formData.email?.trim()) {
      errs.email = t("email is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = t("Invalid email address");
    }
    if (!formData.phone || formData.phone.toString().trim() === "") {
      errs.phone = t("phone is required");
    }
    if (!formData.password) {
      errs.password = t("Password is required");
    } else if (formData.password.length < 8) {
      errs.password = t("Your password must be at least 8 characters long");
    }
    if (!formData.password_confirmation) {
      errs.password_confirmation = t("Password confirmation is required");
    } else if (formData.password !== formData.password_confirmation) {
      errs.password_confirmation = t("Passwords do not match");
    }
    if (!formData.national_id?.trim()) {
      errs.national_id = t("national_id is required");
    }
    return errs;
  };

  const validateJob = () => {
    const errs = {};
    if (!formData.designation_id) {
      errs.designation_id = t("Job is required");
    }
    if (!formData.address?.trim()) {
      errs.address = t("Employee address is required");
    }
    if (!formData.provider_areas || formData.provider_areas.length === 0) {
      errs.provider_areas = t("Workplaces are required");
    }
    return errs;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async () => {
    const personalErrors = validatePersonal();
    const jobErrors = validateJob();
    const allErrors = { ...personalErrors, ...jobErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      if (Object.keys(personalErrors).length > 0) {
        setOpenId("Personal");
      }
      const errorList = Object.values(allErrors).filter(Boolean);
      if (errorList.length === 1) {
        toast.error(errorList[0]);
      } else if (errorList.length > 1) {
        errorList.slice(0, 3).forEach(err => toast.error(err));
      }
      return;
    }

    const data = new FormData();

    // append all fields
    data.append("firstname", formData.firstname);
    data.append("lastname", formData.lastname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("country_code", formData.country_code);
    data.append("password", formData.password);
    data.append("password_confirmation", formData.password_confirmation);
    data.append("national_id", formData.national_id);
    data.append("designation_id", formData.designation_id);
    data.append("address", formData.address);
    data.append("working_time", formData.working_time);
    data.append("longitude", formData.longitude);
    data.append("latitude", formData.latitude);
    data.append("city", formData.city);
    data.append("country", formData.country);
    data.append("state", formData.state);

    if (formData.image) data.append("image", formData.image);
    if (formData.id_front) data.append("id_front", formData.id_front);
    if (formData.id_back) data.append("id_back", formData.id_back);

    formData.provider_areas.forEach(areaId => {
      data.append("provider_areas[]", areaId);
    });

    try {
      const resultAction = await dispatch(addWorkerThunk(data));

      if (addWorkerThunk.fulfilled.match(resultAction)) {
        const payload = resultAction.payload;
        if (payload?.status === false) {
          if (payload?.errors) {
            const backendErrors = {};
            const backendMsgs = [];
            Object.entries(payload.errors).forEach(([k, v]) => {
              const msg = Array.isArray(v) ? v[0] : v;
              backendErrors[k] = msg;
              if (msg) backendMsgs.push(msg);
            });
            setErrors(backendErrors);
            const personalFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'password_confirmation', 'national_id', 'image'];
            if (Object.keys(backendErrors).some(k => personalFields.includes(k))) {
              setOpenId("Personal");
            }
            if (backendMsgs.length > 0) {
              backendMsgs.forEach(msg => toast.error(msg));
            } else if (payload?.message) {
              toast.error(payload.message);
            }
          } else if (payload?.message) {
            toast.error(payload.message);
          } else {
            toast.error(t("Failed to update settings."));
          }
          return;
        }

        toast.success(t("Worker added successfully"));
        setIsRedirecting(true);
        router.back();
      } else {
        console.log("Failed to add worker", resultAction);
        const payload = resultAction.payload;
        if (payload?.errors) {
          const backendErrors = {};
          const backendMsgs = [];
          Object.entries(payload.errors).forEach(([k, v]) => {
            const msg = Array.isArray(v) ? v[0] : v;
            backendErrors[k] = msg;
            if (msg) backendMsgs.push(msg);
          });
          setErrors(backendErrors);

          const personalFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'password_confirmation', 'national_id', 'image'];
          if (Object.keys(backendErrors).some(k => personalFields.includes(k))) {
            setOpenId("Personal");
          }
          if (backendMsgs.length > 0) {
            backendMsgs.forEach(msg => toast.error(msg));
          } else if (payload?.message) {
            toast.error(payload.message);
          }
        } else if (payload?.message) {
          toast.error(payload.message);
        } else if (payload?.error) {
          toast.error(payload.error);
        } else if (typeof payload === 'string' && payload.length > 0) {
          toast.error(payload);
        } else if (resultAction.error?.message) {
          toast.error(resultAction.error.message);
        } else {
          toast.error(t("Failed to update settings."));
        }
      }
    } catch (error) {
      console.log("Error submitting form", error);
      const errMsg = error?.response?.data?.message || error?.message || t("Failed to update settings.");
      toast.error(errMsg);
    }
  };

  const personalFields = ['firstname', 'lastname', 'email', 'phone', 'password', 'password_confirmation', 'national_id', 'image'];
  const hasPersonalErrors = Object.keys(errors).some(k => personalFields.includes(k) && Boolean(errors[k]));
  const jobFields = ['designation_id', 'address', 'provider_areas', 'working_time', 'id_front', 'id_back'];
  const hasJobErrors = Object.keys(errors).some(k => jobFields.includes(k) && Boolean(errors[k]));

  const [openId, setOpenId] = useState("Personal");
  const tabs = [
    { id: "Personal", label: t("Personal data"), Component: PersonalDataPage, hasError: hasPersonalErrors },
    { id: "Job", label: t("Job data"), Component: JobDataPage, hasError: hasJobErrors },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.id === openId);

  const handleNext = () => {
    if (currentIndex === 0) {
      const personalErrors = validatePersonal();
      if (Object.keys(personalErrors).length > 0) {
        setErrors((prev) => ({ ...prev, ...personalErrors }));
        const errorList = Object.values(personalErrors).filter(Boolean);
        if (errorList.length === 1) {
          toast.error(errorList[0]);
        } else if (errorList.length > 1) {
          errorList.slice(0, 3).forEach(err => toast.error(err));
        }
        return;
      }
    }
    if (currentIndex < tabs.length - 1) setOpenId(tabs[currentIndex + 1].id);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setOpenId(tabs[currentIndex - 1].id);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <MainLayout>
      {/* Redirect overlay */}
      {isRedirecting && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
            <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin" />
            <div>
              <p className="text-[#364152] font-semibold text-lg mb-1">{t("Saving worker data...")}</p>
              <p className="text-gray-500 text-sm">{t("Please wait...")}</p>
            </div>
          </div>
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="flex flex-col h-full"
      >
        {/* Header */}
        <section className="mb-4">
          <p className="text-[#364152] text-2xl font-medium mb-3 tracking-tight">
            {t("Adding a new worker")}
          </p>
          <p className="text-[#4B5565] text-base font-normal">
            {t("Add the new employee's details to start providing better services to your customers.")}
          </p>
        </section>

        {/* Tabs */}
        <section className="w-full mt-4 flex flex-col flex-1 overflow-hidden">
          <div className="flex justify-around border-b border-gray-300">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`relative px-4 py-4 w-full text-center text-base cursor-pointer transition-all duration-200 flex items-center justify-center gap-2
                  ${
                    openId === tab.id
                      ? "text-[#C69815] font-medium"
                      : "text-[#697586] font-normal hover:text-[#C69815]"
                  }`}
                onClick={() => setOpenId(tab.id)}
              >
                <span>{tab.label}</span>
                {tab.hasError && (
                  <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                )}
                {openId === tab.id && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C69815]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto mt-6 px-2">
            <AnimatePresence mode="wait">
              {tabs.map((tab) => {
                if (openId !== tab.id) return null;
                const CurrentTabComponent = tab.Component;
                return (
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, x: tab.id === "Personal" ? -10 : 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: tab.id === "Personal" ? 10 : -10 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  >
                    <CurrentTabComponent
                      handleGoBack={handleGoBack}
                      handlePrev={handlePrev}
                      handleNext={handleNext}
                      getDesignations={getDesignations}
                      formData={formData}
                      setFormData={setFormData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      isSubmitting={isSubmitting}
                      errors={errors}
                      setErrors={setErrors}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </MainLayout>
  );
}

export default AddPage;
