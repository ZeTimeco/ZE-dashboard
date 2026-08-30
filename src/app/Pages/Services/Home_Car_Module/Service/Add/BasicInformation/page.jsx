"use client";
import React from "react";
import { useTranslation } from "react-i18next";
import Image from "./Image";
import Form from "./Form";

function BasicInformationPage({ handleGoBack, handleNext, formData, handleChange }) {
  const { t } = useTranslation();

  return (
    <>
      {/* Upload Image */}
      <Image formData={formData} handleChange={handleChange} />

      {/* Form */}
      <Form formData={formData} handleChange={handleChange} />

      {/* Navigation Buttons */}
      <div className="my-12 flex gap-3">
        <button 
          onClick={handleGoBack} 
          className="border w-48 h-13.5 py-2.5 px-4 rounded-3px border-primary text-primary text-base font-medium cursor-pointer"
        >
          {t('cancel')}
        </button>

        <button 
          onClick={handleNext} 
          className="border w-58 h-13.5 py-2.5 px-4 rounded-3px bg-primary text-white text-base font-medium cursor-pointer"
        >
          {t('the next')}
        </button>
      </div>
    </>
  );
}

export default BasicInformationPage;
