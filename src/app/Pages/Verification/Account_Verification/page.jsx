"use client";

import React, { useState } from "react";
import MainLayout from "@/app/Components/MainLayout/MainLayout";

import ActivityData from "./ActivityData/page";
import FilesAndDocuments from "./FilesAndDocuments/page";
import ReviewAndSend from "./ReviewAndSend/page";

const steps = [
  { id: 1, title: "بيانات النشاط" },
  { id: 2, title: "البيانات والمستندات" },
  { id: 3, title: "مراجعة وإرسال" },
];

function Account_VerificationPage() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const previousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <MainLayout>
      <div dir="rtl" className="mx-auto w-full max-w-5xl px-4 py-8">
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
              : "border-gray-200 bg-gray-100 text-gray-400"
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
        <div className="rounded-xl bg-white p-4 sm:p-6">
          {currentStep === 1 && <ActivityData />}
          {currentStep === 2 && <FilesAndDocuments />}
          {currentStep === 3 && <ReviewAndSend />}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 1}
              className="rounded-lg border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              الرجوع
            </button>

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F]"
              >
                التالي
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                }}
                className="rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F]"
              >
                إرسال الطلب
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

export default Account_VerificationPage;