"use client";

import React, { useState, useEffect, Suspense, useCallback } from "react";
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
  const [stepError, setStepError] = useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const module_key = searchParams.get('module_key') || (typeof window !== "undefined" ? localStorage.getItem('selected_module_key') : null);
  const { getBusinessModuleRequirements, loading } = useSelector((state) => state.auth);

  // Step 1 state: Activity Data
  const [commercialRegisterFile, setCommercialRegisterFile] = useState(null);
  const [commercialRegisterDeadline, setCommercialRegisterDeadline] = useState(null);
  const [formData, setFormData] = useState({
    commercialRegistrationNumber: '',
    storeBusinessName: '',
    detailedTitle: '',
  });

  // Step 2 state: Files and Documents
  const [documentFiles, setDocumentFiles] = useState({});
  const [documentDeadlines, setDocumentDeadlines] = useState({});

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

  // Step 1 validation
  const validateStep1 = useCallback(() => {
    if (!commercialRegisterFile) {
      return t('Please upload the commercial register file');
    }
    if (!commercialRegisterDeadline) {
      return t('Please specify the commercial register expiry date');
    }
    if (!formData.commercialRegistrationNumber.trim()) {
      return t('Please enter the commercial registration number');
    }
    if (!formData.storeBusinessName.trim()) {
      return t('Please enter the store/business name');
    }
    if (!formData.detailedTitle.trim()) {
      return t('Please enter the detailed title of the activity');
    }
    return null;
  }, [commercialRegisterFile, commercialRegisterDeadline, formData, t]);

  // Step 2 validation: only required documents
  const validateStep2 = useCallback(() => {
    const requirements = getBusinessModuleRequirements?.requirements || [];
    for (const req of requirements) {
      if (req?.is_required) {
        if (!documentFiles[req.field_key]) {
          return t('Please upload the required document:') + ' ' + req.field_key;
        }
        if (req?.has_expiry_date && !documentDeadlines[req.field_key]) {
          return t('Please specify the expiry date for:') + ' ' + req.field_key;
        }
      }
    }
    return null;
  }, [getBusinessModuleRequirements, documentFiles, documentDeadlines, t]);

  const nextStep = () => {
    let error = null;
    if (currentStep === 1) {
      error = validateStep1();
    } else if (currentStep === 2) {
      error = validateStep2();
    }

    if (error) {
      setStepError(error);
      return;
    }

    setStepError(null);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const previousStep = () => {
    setStepError(null);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToFirstStage = () => {
    setStepError(null);
    setCurrentStep(1);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Handlers for document files/deadlines (Step 2)
  const handleDocumentFileChange = useCallback((fieldKey, file) => {
    setDocumentFiles((prev) => ({ ...prev, [fieldKey]: file }));
    setStepError(null);
  }, []);

  const handleDocumentDeadlineChange = useCallback((fieldKey, date) => {
    setDocumentDeadlines((prev) => ({ ...prev, [fieldKey]: date }));
    setStepError(null);
  }, []);

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
          {currentStep === 1 && (
            <ActivityData
              getBusinessModuleRequirements={getBusinessModuleRequirements}
              moduleKey={module_key}
              commercialRegisterFile={commercialRegisterFile}
              onCommercialRegisterFileChange={setCommercialRegisterFile}
              commercialRegisterDeadline={commercialRegisterDeadline}
              onCommercialRegisterDeadlineChange={setCommercialRegisterDeadline}
              formData={formData}
              onFormDataChange={(field, value) => {
                setFormData((prev) => ({ ...prev, [field]: value }));
                setStepError(null);
              }}
            />
          )}
          {currentStep === 2 && (
            <FilesAndDocuments
              getBusinessModuleRequirements={getBusinessModuleRequirements}
              moduleKey={module_key}
              documentFiles={documentFiles}
              documentDeadlines={documentDeadlines}
              onDocumentFileChange={handleDocumentFileChange}
              onDocumentDeadlineChange={handleDocumentDeadlineChange}
            />
          )}
          {currentStep === 3 && (
            <ReviewAndSend
              onGoToFirstStage={goToFirstStage}
              getBusinessModuleRequirements={getBusinessModuleRequirements}
              moduleKey={module_key}
              formData={formData}
              commercialRegisterFile={commercialRegisterFile}
              commercialRegisterDeadline={commercialRegisterDeadline}
              documentFiles={documentFiles}
              documentDeadlines={documentDeadlines}
            />
          )}


          {/* Validation Error */}
          {stepError && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-3px flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#F04438] shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-[#F04438] text-sm font-medium">{stepError}</p>
            </div>
          )}

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
