"use client";

import React, { useState, useEffect, Suspense } from "react";
import ActivityData from "./ActivityData/page";
import FilesAndDocuments from "./FilesAndDocuments/page";
import ReviewAndSend from "./ReviewAndSend/page";
import { useTranslation } from "react-i18next";
import HiddenItemsLayout from "@/app/Components/MainLayout/HiddenItemsLayout";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessModuleRequirementsThunk } from "@/redux/slice/Auth/AuthSlice";

function Account_VerificationContent() {
  const {t} = useTranslation('')
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const module_key = searchParams.get('module_key') || (typeof window !== "undefined" ? localStorage.getItem('selected_module_key') : null);
  const { getBusinessModuleRequirements, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (module_key) {
      dispatch(getBusinessModuleRequirementsThunk(module_key));
    }
  }, [dispatch, module_key]);

  const steps = [
  { id: 1, title: t('Activity data') },
  { id: 2, title: t('Files and documents') },
  { id: 3, title: t('Review and send') },
];

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToFirstStage = () => {
    setCurrentStep(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  console.log('module_key:', module_key);
  console.log('getBusinessModuleRequirements:', getBusinessModuleRequirements);
  return (
    <HiddenItemsLayout>
      <h1 className="text-[#171717] text-2xl font-semibold mb-10 ">{t('Account verification')}</h1>
      <div  className="mx-auto w-full ">
        {/* Stepper */}
        <div className="relative mb-10">
          <div className="absolute left-[16.66%] right-[16.66%] top-6 h-px bg-gray-200" />

          <div className="relative grid grid-cols-3">
          
            {steps.map((step) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className={`z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                      isCompleted
                        ? "border-primary bg-primary text-white"
                        : isActive
                          ? "border-primary bg-white text-primary"
                          : "border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]"
                    }`}
                  >
                    {isCompleted ? "✓" : step.id}
                  </div>

                  <span
                    className={`text-center text-xs transition-colors sm:text-sm ${
                      isActive
                        ? "font-semibold text-primary"
                        : isCompleted
                          ? "text-primary"
                          : "text-gray-400"
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
              );
            })}

          </div>
        </div>

        {/* Current Component */}
        <div className="rounded-xl bg-white ">
          {currentStep === 1 && <ActivityData requirements={getBusinessModuleRequirements} moduleKey={module_key} />}
          {currentStep === 2 && <FilesAndDocuments requirements={getBusinessModuleRequirements} moduleKey={module_key} />}
          {currentStep === 3 && <ReviewAndSend onGoToFirstStage={goToFirstStage} requirements={getBusinessModuleRequirements} moduleKey={module_key} />}

          {/* Navigation */}
          <div className="mt-8 flex gap-4 py-6">
            {currentStep < steps.length ? (
              <>
                <button
                  type="button"
                  onClick={nextStep}
                  className="rounded-3px w-[20%] h-14 bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer"
                >
                  {t('the next')}
                </button>

                <button
                  type="button"
                  onClick={previousStep}
                  disabled={currentStep === 1}
                  className="rounded-3px w-[20%] h-14 border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
                >
                  {t('Return')}
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="rounded-3px min-w-[20%] px-7 h-14 bg-primary text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer whitespace-nowrap"
                >
                  {t('Submit the request for review')}
                </button>

                <button
                  type="button"
                  onClick={goToFirstStage}
                  className="rounded-3px min-w-[20%] px-6 h-14 border border-primary text-sm text-primary transition hover:bg-yellow-50 cursor-pointer whitespace-nowrap"
                >
                  {t('Edit previous data')}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </HiddenItemsLayout>
  );
}

function Account_VerificationPage() {
  return (
    <Suspense fallback={null}>
      <Account_VerificationContent />
    </Suspense>
  );
}

export default Account_VerificationPage;