"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BasicInformationPage from './BasicInformation/page'
import AddressPage from './Address/page'
import RoomsAndBathroomsPage from './RoomsAndBathrooms/page'
import PropertyDetailsPage from './PropertyDetails/page'
import FacilitiesPage from './Facilities/page'
import PricingPage from './Pricing/page'
import AvailabilityPage from './Availability/page'
import MediaPage from './Media/page'

function AddPage() {
  const {t} = useTranslation()

  const [currentStep, setCurrentStep] = useState(0)
  const stepTitles = [
    t("Basic Information"),
    t("the address"),
    t("Rooms and bathrooms"),
    t("Property details"),
    t("Facilities"),
    t("Pricing"),
    t("Availability"),
    t("Media")
  ]

  const steps = [
    <BasicInformationPage />,
    <AddressPage />,
    <RoomsAndBathroomsPage />,
    <PropertyDetailsPage />,
    <FacilitiesPage />,
    <PricingPage />,
    <AvailabilityPage />,
    <MediaPage />
  ]

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }
  const progressPercentage = ((currentStep + 1) / steps.length) * 100
  return (
    <MainLayout>

      <div className="flex flex-col h-full">
        {/* Header */}
        <section className="mb-4">
          <p className="text-[#364152] text-2xl font-medium mb-5">
            {t("Add a new property")}
          </p>
          <p className="text-[#4B5565] text-base font-normal">
            {t("Complete the following steps to successfully add your property.")}
          </p>
        </section>

        {/* progress bar */}

          {/* Progress Header */}
          <div className="mb-6">

            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">
              {t('Step')} {' '} { currentStep + 1} {t('from')} {steps.length} {' '}
              </p>
              <p className="text-sm text-gray-500">
                  {stepTitles[currentStep]}
              </p>
            </div>


            {/* Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-primary)] transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>


          {/* btn */}
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Previous
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        

      </div>
      
    </MainLayout>
  )
}

export default AddPage