"use client"
import SecondSection from '@/app/Components/login/SecondSection'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegistration } from './RegistrationContext'

const Spinner = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
  </svg>
)

function Sign_inPage() {
  const { t } = useTranslation()
  const router = useRouter();
  const { updateRegistrationData } = useRegistration();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRole = (role) => {
    if (selectedRole) return; // prevent double click
    setSelectedRole(role);
    updateRegistrationData({ role });
    router.push('/Auth/Sign_in/Company');
  }

  return (
    <>
      {/* Redirect overlay */}
      {selectedRole && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white px-8 py-7 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm w-full">
            <div className="w-14 h-14 rounded-full border-4 border-gray-100 border-t-primary animate-spin"></div>
            <p className="text-[#364152] font-semibold text-lg">{t("Redirecting...")}</p>
          </div>
        </div>
      )}

      <div className="p-8 lg1:flex justify-between gap-8">
        <section className="w-full mt-12.5 lg1:mt-28.5">
          <div className="mb-37.5">
            <div className="flex justify-center gap-1 mb-6">
              <img src="/images/LogoText.svg" alt="" />
              <img src="/images/Logo.svg" alt="" />
            </div>
            <p className="text-[#364152] text-xl font-normal text-center">
              {t('Welcome to our platform, where your journey begins with ease and clarity.')}
            </p>
          </div>

          <div className="flex flex-col items-center mb-14">
            <p className="text-primary text-2xl font-medium mb-6">
              {t('Choose your account type to get started?')}
            </p>
            <p className="w-[500px] text-center text-[#656565] text-xl font-normal">
              {t('Please select whether you are registering as a company or as an individual to provide you with a personalized experience that suits your needs.')}
            </p>
          </div>

          <div className="flex justify-center gap-12">
            <div
              onClick={() => handleRole('company')}
              className={`flex flex-col justify-center w-62.5 h-62.5 border border-primary bg-[#F9F5E8] rounded-3px transition-all duration-200
                ${selectedRole === 'company' ? 'opacity-70 cursor-not-allowed scale-95' : 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-95'}
              `}
            >
              {selectedRole === 'company' ? (
                <div className="flex flex-col items-center gap-3">
                  <Spinner />
                  <p className="text-primary text-base font-medium">{t("Redirecting...")}</p>
                </div>
              ) : (
                <>
                  <span className="flex justify-center mb-5">
                    <img src="/images/Company.svg" alt="" />
                  </span>
                  <p className="flex justify-center text-[#000] text-2xl font-medium">{t('Company')}</p>
                </>
              )}
            </div>

            <div
              onClick={() => handleRole('freelance')}
              className={`flex flex-col justify-center w-62.5 h-62.5 border border-primary bg-[#F9F5E8] rounded-3px transition-all duration-200
                ${selectedRole === 'freelance' ? 'opacity-70 cursor-not-allowed scale-95' : 'cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-95'}
              `}
            >
              {selectedRole === 'freelance' ? (
                <div className="flex flex-col items-center gap-3">
                  <Spinner />
                  <p className="text-primary text-base font-medium">{t("Redirecting...")}</p>
                </div>
              ) : (
                <>
                  <span className="flex justify-center mb-5">
                    <img src="/images/Freelance.svg" alt="" />
                  </span>
                  <span className="flex justify-center text-[#000] text-2xl font-medium">{t('Freelance')}</span>
                </>
              )}
            </div>
          </div>
        </section>

        {/* second section */}
        <SecondSection />
      </div>
    </>
  )
}

export default Sign_inPage