"use client";
import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { getServiceAnalysisByIdThunk, getServiceByIdThunk } from "@/redux/slice/Services/ServicesSlice";
import { IMAGE_BASE_URL } from "../../../../../../../config/imageUrl";

const DetailsPage = dynamic(
  () => import("./Details/page"),
  { ssr: false }
);
const AnalysisPage = dynamic(
  () => import("./Analysis/page"),
  { ssr: false }
);
const EvaluationPage = dynamic(
  () => import("./Evaluation/page"),
  { ssr: false }
);

function ViewPage({ open, handleClose ,serviceId }) {
  const { t } = useTranslation();
  const router = useRouter();

  const dispatch = useDispatch();
  const {service ,serviceAnalysis }= useSelector((state) => state.services);

  useEffect(() => {
    if (open && serviceId) {
      dispatch(getServiceByIdThunk(serviceId));
      dispatch(getServiceAnalysisByIdThunk(serviceId));
    }
  }, [open, serviceId, dispatch]);

  const [current, setCurrent] = useState(0);
  const [openId, setOpenId] = useState("Details");

  const images = service?.images?.length
    ? service.images.map((img) => `${IMAGE_BASE_URL}${img.image_path}`)
    : ["/images/important/Empty State Illustrations_Light Mode_No Image.svg"]; 

  const tabs = [
    {
      id: "Details",
      label: t("Details"),
      defaultIcon: "Detail.svg",
      activeIcon: "Details.svg",
      Component: DetailsPage,
    },
    {
      id: "Analysis",
      label: t("Analysis"),
      defaultIcon: "Analysis.svg",
      activeIcon: "Analysiss.svg",
      Component: AnalysisPage,
    },
    {
      id: "Evaluation",
      label: t("Evaluation"),
      defaultIcon: "Evaluation.svg",
      activeIcon: "Evaluations.svg",
      Component: EvaluationPage,
    },
  ];

  const StatusRender = (status) => {
    switch (status) {
      case "active":
        return (
          <div className="bg-[#DCFAE6] border border-[#067647] text-[#067647] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="py-1 px-3 flex gap-1 items-center">
              <img
                src="/images/icons/Active Status.svg"
                alt=""
                className="mt-0.5"
              />
              <span className="font-normal">{t("active")}</span>
            </div>
          </div>
        );

      case "inactive":
        return (
          <div className="bg-[#EFF4FF] border border-[#518BFF] text-[#004EEB] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="py-1 px-3 flex gap-1 items-center">
              <img
                src="/images/icons/inactive Status.svg"
                alt=""
                className="mt-0.5"
              />
              <span className="font-normal">{t("inactive")}</span>
            </div>
          </div>
        );

      case "pending":
        return (
          <div className="bg-[#FFFAEB] border border-[#F79009] text-[#DC6803] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="py-1 px-3 flex gap-1 items-center">
              <img
                src="/images/icons/pending Status.svg"
                alt=""
                className="mt-0.5"
              />
              <span className="font-normal">{t("pending")}</span>
            </div>
          </div>
        );

      case "stopped":
        return (
          <div className="bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="py-1 px-3 flex gap-1 items-center">
              <img
                src="/images/icons/stopped Status.svg"
                alt=""
                className="mt-0.5"
              />
              <span className="font-normal">{t("stopped")}</span>
            </div>
          </div>
        );

      case "refused":
        return (
          <div className="bg-[#FEE4E2] border border-[#F97066] text-[#D92D20] h-9.5 rounded-3xl transition-transform duration-150 hover:scale-[1.02]">
            <div className="py-1 px-3 flex gap-1 items-center">
              <img
                src="/images/icons/refused Status.svg"
                alt=""
                className="mt-0.5"
              />
              <span className="font-normal">{t("refused")}</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          className: "ServiceViewPage-dialog",
          style: { maxHeight: '90vh', overflowY: 'auto' }
        }}
      >
        {/* Close Button */}
        <section className="px-6 mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClose}
            className="border border-[#CDD5DF] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-50 transition-colors"
          >
            <img src="/images/icons/xx.svg" alt="" className="w-5 h-5 transition-transform duration-200 hover:rotate-90" />
          </motion.button>
        </section>

        {/* Title */}
        <section className="mt-3 px-6">
          <p className="text-[#364152] text-xl font-medium mb-2 tracking-tight">
            {t("Service Details")}
          </p>
          <p className="text-[#4B5565] text-sm font-normal mb-5">
            {t("A comprehensive overview of service specifications and information")}
          </p>
        </section>

        <span className="border-[0.5px] border-[#E3E8EF]" />
        
        <div className="overflow-y-auto overflow-x-hidden">
          {/* Image Slider */}
          <section className="relative w-[586px] h-[261px] m-6 rounded-[6px] overflow-hidden shadow-sm">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`service-image-${index}`}
                className={`absolute top-0 left-0 w-[586px] h-[261px] object-cover transition-opacity duration-500 ${
                  index === current ? "opacity-100 scale-100" : "opacity-0 scale-98 pointer-events-none"
                }`}    
              />
            ))}

            {/* Status Tag */}
            <div className="absolute top-4 left-4 z-10">
              {StatusRender(service?.status)}
            </div>

            {/* Image Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-xs h-5.5 px-3 py-1.5 rounded-[20px] flex items-center gap-1.5 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrent(index)}
                    className={`transition-all duration-200 rounded-full ${
                      current === index
                        ? "w-4 h-2 bg-white"
                        : "w-2 h-2 bg-white/50 hover:bg-white/80"
                    }`}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Tabs */}
          <section className="w-full mt-4 flex flex-col flex-1 overflow-hidden">
            <div className="px-6">
              <div className="flex justify-around border-b border-gray-300 bg-white">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setOpenId(tab.id)}
                    className={`relative flex items-center justify-center gap-2 px-4 py-4 w-full text-center text-base cursor-pointer transition-colors ${
                      openId === tab.id
                        ? "text-[var(--color-primary)] font-medium"
                        : "text-[#697586] font-normal hover:text-[#364152]"
                    }`}
                  >
                    <img
                      src={`/images/icons/${
                        openId === tab.id ? tab.activeIcon : tab.defaultIcon
                      }`}
                      alt=""
                      className="w-5 h-5"
                    />
                    <p>{tab.label}</p>
                    {openId === tab.id && (
                      <motion.div
                        layoutId="activeViewTabUnderline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-primary)]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 mt-4">
              <AnimatePresence mode="wait">
                {tabs.map(
                  (tab) =>
                    openId === tab.id && (
                      <motion.div
                        key={tab.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.2 }}
                      >
                        <tab.Component
                          handleClose={handleClose}
                          status={service?.status}
                          service={service}
                          serviceAnalysis={serviceAnalysis}
                        />
                      </motion.div>
                    )
                )}
              </AnimatePresence>
            </div>
          </section>
        </div>
      </Dialog>
    </>
  );
}

export default ViewPage;
