"use client";

import React, { useState, useEffect, Suspense, useCallback, useMemo } from "react";
import ActivityData from "./ActivityData/page";
import FilesAndDocuments from "./FilesAndDocuments/page";
import ReviewAndSend from "./ReviewAndSend/page";
import { useTranslation } from "react-i18next";
import HiddenItemsLayout from "@/app/Components/MainLayout/HiddenItemsLayout";
import { useSearchParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getBusinessModuleRequirementsThunk, BusinessModuleApplicationsThunk } from "@/redux/slice/Auth/AuthSlice";
import { toast } from "react-toastify";
import dayjs from "dayjs";


function Account_VerificationContent() {
  const {t} = useTranslation('')
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [stepError, setStepError] = useState(null);
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const module_key = searchParams.get('module_key') || (typeof window !== "undefined" ? localStorage.getItem('selected_module_key') : null);
  const { getBusinessModuleRequirements, loading, user } = useSelector((state) => state.auth);

  // Step 1 state: Activity Data
  const [nationalIdFrontFile, setNationalIdFrontFile] = useState(null);
  const [nationalIdFrontDeadline, setNationalIdFrontDeadline] = useState(null);
  const [nationalIdBackFile, setNationalIdBackFile] = useState(null);
  const [nationalIdBackDeadline, setNationalIdBackDeadline] = useState(null);
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

  // Step 3 state: Review & Submit
  const [isAcknowledged, setIsAcknowledged] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const [showErrors, setShowErrors] = useState(true);
  const isErrorShown = showErrors || Boolean(stepError);

  const isStep1Valid = Boolean(
    nationalIdFrontFile &&
    nationalIdBackFile &&
    (nationalIdFrontDeadline || nationalIdBackDeadline) &&
    commercialRegisterFile &&
    commercialRegisterDeadline &&
    formData?.commercialRegistrationNumber?.trim() &&
    formData?.storeBusinessName?.trim() &&
    formData?.detailedTitle?.trim()
  );

  const isStep2Valid = useMemo(() => {
    const requirements = getBusinessModuleRequirements?.requirements || [];
    for (const req of requirements) {
      if (req?.is_required) {
        if (!documentFiles[req.field_key]) {
          return false;
        }
        if (req?.has_expiry_date && !documentDeadlines[req.field_key]) {
          return false;
        }
      }
    }
    return true;
  }, [getBusinessModuleRequirements, documentFiles, documentDeadlines]);

  const isNextDisabled = currentStep === 1 ? !isStep1Valid : currentStep === 2 ? !isStep2Valid : false;

  // Step 1 validation
  const validateStep1 = useCallback(() => {
    if (!nationalIdFrontFile) {
      return t('Please upload the front national ID card');
    }
    if (!nationalIdFrontDeadline && !nationalIdBackDeadline) {
      return t('Please specify the national ID expiry date');
    }
    if (!nationalIdBackFile) {
      return t('Please upload the back national ID card');
    }
    if (!commercialRegisterFile) {
      return t('Please upload the commercial register file');
    }
    if (!commercialRegisterDeadline) {
      return t('Please specify the commercial register expiry date');
    }
    if (!formData?.commercialRegistrationNumber?.trim()) {
      return t('Please enter the commercial registration number');
    }
    if (!formData?.storeBusinessName?.trim()) {
      return t('Please enter the store/business name');
    }
    if (!formData?.detailedTitle?.trim()) {
      return t('Please enter the detailed title of the activity');
    }
    return null;
  }, [
    nationalIdFrontFile,
    nationalIdFrontDeadline,
    nationalIdBackFile,
    nationalIdBackDeadline,
    commercialRegisterFile,
    commercialRegisterDeadline,
    formData,
    t,
  ]);

  // Step 2 validation: only required documents
  const validateStep2 = useCallback(() => {
    const requirements = getBusinessModuleRequirements?.requirements || [];
    for (const req of requirements) {
      if (req?.is_required) {
        if (!documentFiles[req.field_key]) {
          return t('Please upload the required document:') + ' ' + (req.label || req.field_key);
        }
        if (req?.has_expiry_date && !documentDeadlines[req.field_key]) {
          return t('Please specify the expiry date for:') + ' ' + (req.label || req.field_key);
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
      setShowErrors(true);
      return;
    }

    setStepError(null);
    setShowErrors(false);
    setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  };

  const previousStep = () => {
    setStepError(null);
    setShowErrors(false);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const goToFirstStage = () => {
    setStepError(null);
    setShowErrors(false);
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

  // Submit application
  const handleSubmitApplication = async () => {
    if (!isAcknowledged) {
      toast.error(t('Please acknowledge the accuracy of all entered data and documents.'));
      return;
    }

    if (!module_key) {
      toast.error(t('Module key is missing'));
      return;
    }

    const step1Err = validateStep1();
    if (step1Err) {
      toast.error(step1Err);
      setCurrentStep(1);
      setShowErrors(true);
      return;
    }

    const step2Err = validateStep2();
    if (step2Err) {
      toast.error(step2Err);
      setCurrentStep(2);
      setShowErrors(true);
      return;
    }

    try {
      setIsSubmitting(true);
      const submissionData = new FormData();

      // Form text fields
      if (formData.storeBusinessName) {
        submissionData.append('business_name', formData.storeBusinessName.trim());
      }
      if (formData.detailedTitle) {
        submissionData.append('business_address', formData.detailedTitle.trim());
      }
      if (formData.commercialRegistrationNumber) {
        submissionData.append('commercial_registration_number', formData.commercialRegistrationNumber.trim());
      }
      const identityNumber = formData.identityNumber || user?.national_id || formData.commercialRegistrationNumber;
      if (identityNumber) {
        submissionData.append('identity_number', identityNumber.toString().trim());
      }

      // Commercial Register
      if (commercialRegisterFile) {
        submissionData.append('commercial_registration', commercialRegisterFile);
        submissionData.append('documents[commercial_register]', commercialRegisterFile);
      }
      if (commercialRegisterDeadline) {
        const commExpiry = dayjs(commercialRegisterDeadline).isValid()
          ? dayjs(commercialRegisterDeadline).format('YYYY-MM-DD')
          : String(commercialRegisterDeadline);
        submissionData.append('expiry_dates[commercial_register]', commExpiry);
      }

      // National ID
      if (nationalIdFrontFile) {
        submissionData.append('identity_front_image', nationalIdFrontFile);
        submissionData.append('documents[national_id]', nationalIdFrontFile);
      }
      if (nationalIdBackFile) {
        submissionData.append('identity_back_image', nationalIdBackFile);
      }
      const idExpiryDate = nationalIdFrontDeadline || nationalIdBackDeadline;
      if (idExpiryDate) {
        const formattedIdExpiry = dayjs(idExpiryDate).isValid()
          ? dayjs(idExpiryDate).format('YYYY-MM-DD')
          : String(idExpiryDate);
        submissionData.append('identity_expiry_date', formattedIdExpiry);
        submissionData.append('expiry_dates[national_id]', formattedIdExpiry);
      }

      // Dynamic documents (Step 2)
      if (documentFiles) {
        Object.entries(documentFiles).forEach(([key, file]) => {
          if (file) {
            submissionData.append(`documents[${key}]`, file);
          }
        });
      }

      // Dynamic expiry dates (Step 2)
      if (documentDeadlines) {
        Object.entries(documentDeadlines).forEach(([key, date]) => {
          if (date) {
            const formatted = dayjs(date).isValid()
              ? dayjs(date).format('YYYY-MM-DD')
              : String(date);
            submissionData.append(`expiry_dates[${key}]`, formatted);
          }
        });
      }

      const queryParams = {};
      if (formData.commercialRegistrationNumber) {
        queryParams.commercial_registration_number = formData.commercialRegistrationNumber.trim();
      }

      const resultAction = await dispatch(
        BusinessModuleApplicationsThunk({
          module_key,
          formData: submissionData,
          params: queryParams,
        })
      );

      if (BusinessModuleApplicationsThunk.fulfilled.match(resultAction)) {
        toast.success(t('Application submitted successfully') || 'Application submitted successfully');
        const responseData = resultAction.payload;
        const applicationId = responseData?.data?.id || responseData?.id || '';
        const orderQuery = applicationId ? `&order_id=${encodeURIComponent(applicationId)}` : '';
        router.push(
          `/Pages/Verification/Account_Verification/Confirmation/Waiting?module_key=${encodeURIComponent(module_key)}${orderQuery}`
        );
      } else {
        const payload = resultAction.payload;
        let errorMessage = t('Failed to submit application');
        if (payload?.message) {
          errorMessage = payload.message;
        } else if (payload?.error) {
          errorMessage = payload.error;
        } else if (payload?.errors) {
          const firstErr = Object.values(payload.errors).flat()[0];
          if (firstErr) errorMessage = firstErr;
        }
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error(err?.message || t('Something went wrong'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <HiddenItemsLayout>
      <h1 className="text-[#171717] text-2xl font-semibold mb-10 ">{t('Account verification')}</h1>
      <div  className="mx-auto w-full ">
        {/* Stepper */}
        <div className="relative mb-10">
          <div className="relative grid grid-cols-3">
          
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div
                  key={step.id}
                  className="relative flex flex-col items-center gap-3"
                >
                  {/* Connector line to next step */}
                  {index < steps.length - 1 && (
                    <div
                      className={`absolute top-6 start-1/2 ltr:left-1/2 rtl:right-1/2 w-full h-[2px] -translate-y-1/2 z-0 ${
                        index === 0 ? 'bg-primary' : (currentStep > 2 ? 'bg-primary' : 'bg-gray-200')
                      }`}
                    />
                  )}

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
              nationalIdFrontFile={nationalIdFrontFile}
              onNationalIdFrontFileChange={setNationalIdFrontFile}
              nationalIdFrontDeadline={nationalIdFrontDeadline}
              onNationalIdFrontDeadlineChange={setNationalIdFrontDeadline}
              nationalIdBackFile={nationalIdBackFile}
              onNationalIdBackFileChange={setNationalIdBackFile}
              nationalIdBackDeadline={nationalIdBackDeadline}
              onNationalIdBackDeadlineChange={setNationalIdBackDeadline}
              formData={formData}
              showErrors={isErrorShown}
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
              showErrors={isErrorShown}
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
              nationalIdFrontFile={nationalIdFrontFile}
              nationalIdFrontDeadline={nationalIdFrontDeadline}
              nationalIdBackFile={nationalIdBackFile}
              nationalIdBackDeadline={nationalIdBackDeadline}
              documentFiles={documentFiles}
              documentDeadlines={documentDeadlines}
              isAcknowledged={isAcknowledged}
              onAcknowledgeChange={setIsAcknowledged}
            />
          )}




          {/* Navigation */}
          <div className="mt-8 flex gap-4 py-6">
            {currentStep < steps.length ? (
              <>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={isNextDisabled}
                  className="rounded-3px w-[20%] h-14 bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
                >
                  {t('the next')}
                </button>

                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={previousStep}
                    className="rounded-3px w-[20%] h-14 border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50 cursor-pointer"
                  >
                    {t('Return')}
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleSubmitApplication}
                  disabled={isSubmitting || !isAcknowledged}
                  className="rounded-3px min-w-[20%] px-7 h-14 bg-primary text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      <span>{t('Submitting...')}</span>
                    </>
                  ) : (
                    t('Submit the request for review')
                  )}
                </button>

                <button
                  type="button"
                  onClick={goToFirstStage}
                  disabled={isSubmitting}
                  className="rounded-3px min-w-[20%] px-6 h-14 border border-primary text-sm text-primary transition hover:bg-yellow-50 cursor-pointer whitespace-nowrap disabled:opacity-50"
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
