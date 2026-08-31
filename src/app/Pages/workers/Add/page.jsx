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

function AddPage() {
  const { t } = useTranslation();
  const router = useRouter(); 
  
  //api
  const dispatch = useDispatch();
  const { getDesignations, addWorker } = useSelector(state => state.workers);
  
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async () => {
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
        router.back();
      } else {
        console.log("Failed to add worker", resultAction);
      }
    } catch (error) {
      console.log("Error submitting form", error);
    }
  };

  const [openId, setOpenId] = useState("Personal");
  const tabs = [
    { id: "Personal", label: t("Personal data"), Component: PersonalDataPage },
    { id: "Job", label: t("Job data"), Component: JobDataPage },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.id === openId);

  const handleNext = () => {
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
                className={`relative px-4 py-4 w-full text-center text-base cursor-pointer transition-all duration-200
                  ${
                    openId === tab.id
                      ? "text-[#C69815] font-medium"
                      : "text-[#697586] font-normal hover:text-[#C69815]"
                  }`}
                onClick={() => setOpenId(tab.id)}
              >
                {tab.label}
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
