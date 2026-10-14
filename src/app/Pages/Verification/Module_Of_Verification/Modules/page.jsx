'use client'

import MainLayout from '@/app/Components/MainLayout/MainLayout'
import { useTranslation } from 'react-i18next'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

function ModulesPage() {
  const { t } = useTranslation('')
  const [selectedModule, setSelectedModule] = useState(null)
  const router = useRouter()

  const inputClassName ="w-5 h-5 appearance-none border rounded-full border-gray-300 bg-white checked:border-[var(--color-primary)] relative cursor-pointer checked:after:content-[''] checked:after:w-2.5 checked:after:h-2.5 checked:after:bg-[var(--color-primary)] checked:after:rounded-full checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2"

  const moduleStyle = [
    {
      id: 1,
      bgColor: 'bg-[#FDF7E8]',
      name: 'خدمات الطريق',
      price: 150,
      icon: '/images/icons/car_primary.svg',
    },
    {
      id: 2,
      bgColor: 'bg-[#FAF5FF]',
      name: 'خدمات السيارات',
      price: 150,
      icon: '/images/icons/car-purple.svg',
    },
    {
      id: 3,
      bgColor: 'bg-[#EEF2FF]',
      name: 'تأجير منازل',
      price: 150,
      icon: '/images/icons/key-blue.svg',
    },
    {
      id: 4,
      bgColor: 'bg-[#ECFDF5]',
      name: 'خدمات التوصيل',
      price: 150,
      icon: '/images/icons/square-green.svg',
    },
    {
      id: 5,
      bgColor: 'bg-[#F0F9FF]',
      name: 'خدمات منزلية',
      price: 150,
      icon: '/images/icons/home_blue.svg',
    },
    {
      id: 6,
      bgColor: 'bg-[#F0FDFA]',
      name: 'حجز مطاعم',
      price: 150,
      icon: '/images/icons/Dining green.svg',
    },
  ]

  const handleModuleChange = (id) => {
    setSelectedModule((prev) => (prev === id ? null : id))
  }

  return (
    <MainLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-[#171717] text-2xl font-semibold">
          {t('Choose your business')}
        </h1>

        <p className="text-[#737373] text-base font-medium">
          {t(
            'This option verifies your business type to properly activate your account.'
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-15">
        {moduleStyle.map((module) => {
          const isChecked = selectedModule === module.id

          return (
            <div
              key={module.id}
              className={`border rounded-3px p-3.5 flex justify-between transition-colors duration-200 ${
                isChecked ? 'border-primary' : 'border-[#E5E5E5]'
              }`}
            >
              <div className="flex gap-4">
                <div className="flex items-center">
                  <div
                    className={`w-11 h-11 ${module.bgColor} rounded-xl flex justify-center items-center`}
                  >
                    <img src={module.icon} alt="" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h1 className="text-[#171717] text-lg font-normal">
                    {module.name}
                  </h1>

                  <p className="text-[#737373] text-base font-medium">
                    {t('amount')} : {module.price}$
                  </p>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleModuleChange(module.id)}
                  className={inputClassName}
                />
              </div>
            </div>
          )
        })}
      </div>

      {/* btn */}
      <div className="mt-8 flex gap-4  pt-6">
        <button
          type="button"
          onClick={() => router.push('/Pages/Verification/Account_Verification')}
          className="rounded-3px  w-[20%] h-14  bg-primary px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#AD850F] cursor-pointer"
        >
          التالي
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-3px w-[20%] h-14 border border-gray-300 px-6 py-3 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 cursor-pointer"
        >
          الرجوع
        </button>

        
      </div>
    </MainLayout>
  )
}

export default ModulesPage
