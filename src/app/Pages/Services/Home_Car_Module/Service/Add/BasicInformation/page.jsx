"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "./Image";
import Form from "./Form";

function BasicInformationPage({ 
  handleGoBack, 
  handleNext, 
  formData, 
  handleChange,
  isBasicInfoValid: propIsValid,
}) {
  const { t } = useTranslation();

  const isBasicInfoValid = propIsValid !== undefined ? propIsValid : Boolean(
    formData?.images?.length > 0 &&
    formData?.category_id &&
    formData?.provider_areas_id?.length > 0 &&
    formData?.duration &&
    formData?.long_description?.trim()
  );

  return (
    <>
      {/* Upload Image */}
      <Image formData={formData} handleChange={handleChange} />

      {/* Form */}
      <Form formData={formData} handleChange={handleChange} />

      {/* Navigation Buttons */}
      <div className="my-12 flex gap-3">
        <button 
          type="button"
          onClick={handleGoBack} 
          className="border w-48 h-13.5 py-2.5 px-4 rounded-3px border-primary text-primary text-base font-medium cursor-pointer transition hover:bg-yellow-50"
        >
          {t('Return')}
        </button>

        <button 
          type="button"
          onClick={handleNext} 
          disabled={!isBasicInfoValid}
          className={`border w-58 h-13.5 py-2.5 px-4 rounded-3px text-white text-base font-medium transition ${
            !isBasicInfoValid
              ? "bg-gray-400 border-gray-400 opacity-60 cursor-not-allowed"
              : "bg-primary border-primary cursor-pointer hover:bg-[#AD850F]"
          }`}
        >
          {t('the next')}
        </button>
      </div>
    </>
  );
}

export default BasicInformationPage;
