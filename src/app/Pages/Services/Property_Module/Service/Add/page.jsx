"use client"
import MainLayout from '@/app/Components/MainLayout/MainLayout'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import BasicInformationPage from './Form/BasicInformation/page'
import AddressPage from './Form/Address/page'
import RoomsAndBathroomsPage from './Form/RoomsAndBathrooms/page'
import PropertyDetailsPage from './Form/PropertyDetails/page'
import FacilitiesPage from './Form/Facilities/page'
import PricingPage from './Form/Pricing/page'
import AvailabilityPage from './Form/Availability/page'
import MediaPage from './Form/Media/page'



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

  const stepsCount = 8;

  const steps = [
    <BasicInformationPage   prevStep={prevStep} nextStep={nextStep} />,
    <AddressPage            prevStep={prevStep} nextStep={nextStep} />,
    <RoomsAndBathroomsPage  prevStep={prevStep} nextStep={nextStep} />,
    <PropertyDetailsPage    prevStep={prevStep} nextStep={nextStep} />,
    <FacilitiesPage         prevStep={prevStep} nextStep={nextStep} />,
    <PricingPage            prevStep={prevStep} nextStep={nextStep} />,
    <AvailabilityPage       prevStep={prevStep} nextStep={nextStep} />,
    <MediaPage              prevStep={prevStep} nextStep={nextStep} />
  ]
  
  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  return (
    <MainLayout>

      <div className="flex flex-col h-full">
        {/* Header */}
        <section className="mb-10">
          <p className="text-[#364152] text-2xl font-medium mb-5">
            {t("Add a new property")}
          </p>
          <p className="text-[#4B5565] text-base font-normal">
            {t("Complete the following steps to successfully add your property.")}
          </p>
        </section>

        {/* progress bar */}

          {/* Progress Header */}
          <div className="mb-4">

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

          {/* content*/}
          <div className="flex-1 mt-6">
            {steps[currentStep]}
          </div>

      </div>
        
    </MainLayout>
  )
}

export default AddPage